import { Fact } from "../rules/fact";
import { Result } from "../common/result";
import { Condition } from "../rules/condition";
import { DState } from "./Dstate";
import { DEventDispatcher } from "../events/event-bus";
import { DTimestamp } from "../common/DTimestamp";
import { QueryChangedEvent } from "../events/DEvents";
import { DCommandBus } from "../commands/DCommandBus";

export class StateService {
    private readonly TAG = " [ STATE_SERVICE ] :";
    private readonly factsString = new Map<string, Fact.String>();
    private readonly factsNumeric = new Map<string, Fact.Numeric>();
    private readonly propDefinitions = new Map<string, DState.Prop>();
    private readonly queries = new Map<string, { query: DState.StateQuery; lastResult: boolean }>();
    private readonly unsubscribeCommands: () => void;
    constructor(
        private readonly eventBus: DEventDispatcher,
        private readonly commandBus: DCommandBus,
        private readonly props: ReadonlyArray<DState.Prop>,
        private readonly queryList: ReadonlyArray<DState.StateQuery> = []
    ) {
        props.forEach((prop) => {
            this.registerProperty(prop);
        });
        const facts = this.getAllFacts();
        queryList.forEach((definition) => {
            this.registerQuery(definition, facts);
        });

        this.evaluateQueries();
        this.unsubscribeCommands = this.commandBus.subscribe((command) => {
            if (command.kind === "STATE_MUTATE_COMMAND") {
                this.mutation(command.payload.mutation);
            }
        }, this.TAG);
    }

    destroy() {
        this.unsubscribeCommands();
    }

    private registerQuery(query: DState.StateQuery, currentFacts: ReadonlyArray<Fact>) {
        const result = Condition.evaluate(query.condition, currentFacts);
        this.queries.set(query.name, { query: query, lastResult: result });
        this.emitQueryChangedEvent({ queryName: query.name, prev: result, curr: result });
    }

    private registerProperty(prop: DState.Prop) {
        if (this.propDefinitions.has(prop.propName)) {
            // LOGGING
            console.warn("Prop excists already.", prop.propName);
        }

        this.propDefinitions.set(prop.propName, prop);

        if (prop.initialValue === undefined) {
            return;
        }

        if (prop._type === "string") {
            const fact = DState.stringPropToFact(prop, prop.initialValue);
            this.factsString.set(fact.referenceId, fact);
        }
        if (prop._type === "number") {
            const fact = DState.numericPropToFact(prop, prop.initialValue);
            this.factsNumeric.set(fact.referenceId, fact);
        }
    }

    private mutateString(prop: DState.StringProp, value: string) {
        const curr = this.factsString.get(prop.propName);
        if (curr) {
            const updated: Fact.String = { ...curr, value };
            this.setFact(updated);
        } else {
            const created: Fact.String = {
                kind: "string-fact",
                referenceId: prop.propName,
                referenceLabel: "label for: " + prop.propName,
                value,
                label: "Value: " + value,
            };
            this.setFact(created);
        }
    }

    private mutateNumber(prop: DState.NumericProp, mutation: DState.NumberMutations) {
        const curr = this.factsNumeric.get(prop.propName);
        if (!curr) {
            switch (mutation.kind) {
                case "set-number":
                    this.setFact(DState.numericPropToFact(prop, mutation.value));
                    break;
                case "decrement-number":
                    this.setFact(DState.numericPropToFact(prop, mutation.ifNotExistThenSetTo));
                    break;
                case "increment-number":
                    this.setFact(DState.numericPropToFact(prop, mutation.ifNotExistThenSetTo));
                    break;
                default:
                    const check: never = mutation;
            }
        }
        if (curr) {
            switch (mutation.kind) {
                case "set-number":
                    this.setFact({ ...curr, value: mutation.value });
                    break;
                case "decrement-number":
                    this.setFact({ ...curr, value: curr.value - mutation.stepSize });
                    break;
                case "increment-number":
                    this.setFact({ ...curr, value: curr.value + mutation.stepSize });
                    break;
                default:
                    const check: never = mutation;
            }
        }
    }

    private evaluateQueries(): ReadonlyArray<{ queryName: string; prev: boolean; curr: boolean; didChange: boolean }> {
        const facts = this.getAllFacts();
        const all: Array<{ queryName: string; prev: boolean; curr: boolean; didChange: boolean }> = [];
        this.queries.forEach((q) => {
            const prev = q.lastResult;

            const curr = Condition.evaluate(q.query.condition, facts);
            const didChange = prev !== curr;
            q.lastResult = curr;
            all.push({ queryName: q.query.name, prev, curr, didChange });
            // def.value = value;
        });
        return all;
    }

    private mutation(mutation: DState.StateMutation): { success: boolean } {
        const propDef = this.propDefinitions.get(mutation.propName);
        if (!propDef) {
            // TODO LOGGING
            return { success: false };
        }

        if (propDef._type === "string" && DState.isStringMutation(mutation)) {
            this.mutateString(propDef, mutation.value);
        }

        if (propDef._type === "number" && DState.isNumberMutation(mutation)) {
            this.mutateNumber(propDef, mutation);
        }
        const queryResults = this.evaluateQueries();
        const changedResult = queryResults.filter((r) => r.didChange);
        changedResult.forEach((res) => {
            this.emitQueryChangedEvent({ queryName: res.queryName, prev: res.prev, curr: res.curr });
        });

        return { success: true };
    }

    private emitQueryChangedEvent(data: { queryName: string; prev: boolean; curr: boolean }) {
        const queryChangedEvent: QueryChangedEvent = {
            kind: "STATE_QUERY_RESULT_CHANGED_EVENT",
            producer: "STATE-SERVICE",
            producerId: "STATE-SERVICE",
            timestamp: DTimestamp.now(),
            data,
        };
        const { queryName, curr, prev } = queryChangedEvent.data;
        console.log("[ QUERY_CHANGED " + queryName + "] : " + prev + " -> " + curr);
        this.eventBus.emit(queryChangedEvent);
    }

    getPropAsFact(propName: string): Result<Fact> {
        const propDef = this.propDefinitions.get(propName);
        if (!propDef) {
            return Result.failure(
                "No definition form property ny name " + propName + " is registered. (Pass in constructor.)"
            );
        }
        const value = this.factsString.get(propName) ?? this.factsNumeric.get(propName);

        return value ? Result.ok(value) : Result.failure("Property " + propName + " has no value.");
    }

    private setFact(fact: Fact) {
        switch (fact.kind) {
            case "numeric-fact":
                this.factsNumeric.set(fact.referenceId, fact);
                break;
            case "string-fact":
                this.factsString.set(fact.referenceId, fact);
                break;
            default:
                const check: never = fact;
        }
    }

    getState() {
        const props: Record<string, string | number | null | boolean> = {};
        this.propDefinitions.forEach((def) => {
            let value: string | number | null = null;
            const maybeFact = this.getAnyFact(def.propName);
            if (maybeFact) {
                value = maybeFact.value;
            }
            props[def.propName] = value;
        });
        this.queries.forEach((query) => {
            props[query.query.name] = query.lastResult;
        });

        const propNames = Object.keys(props);
        const propCount = propNames.length;
        const propArray = [...this.propDefinitions.values()];

        return { propCount, propNames, propArray, state: props };
    }

    private getAnyFact(propName: string): Fact | false {
        return this.factsString.get(propName) ?? this.factsNumeric.get(propName) ?? false;
    }

    private getAllFacts(): ReadonlyArray<Fact> {
        return [...this.factsNumeric.values(), ...this.factsString.values()];
    }

    /**
     * Will check that all referenceIds used in Condition is registered as a valid property in state.
     * @param condition
     */
    canBeMatched(condition: Condition): boolean {
        const simpleConditions = Condition.getAllSimpleConditions(condition);
        let hasAll = true;

        const allIds = simpleConditions.map((c) => c.referenceId);

        const missingIds: string[] = [];
        allIds.forEach((id) => {
            if (!this.propDefinitions.has(id)) {
                hasAll = false;
                missingIds.push(id);
            }
        });
        console.log(this.TAG, missingIds);

        return hasAll;
    }
    isMatched(condition: Condition) {
        return Condition.evaluate(condition, this.getAllFacts());
    }
}
