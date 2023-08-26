import { DState } from "./Dstate";
import { BooleanStateProperty } from "./boolean-property";

const propA = new BooleanStateProperty("a", false, "a-description");
const propB = new BooleanStateProperty("b", false, "b-description");
const propC = new BooleanStateProperty("c", false, "c-description");
const propD = new BooleanStateProperty("d", false, "d-description");
const propE = new BooleanStateProperty("e", false, "e-description");
const propF = new BooleanStateProperty("f", false, "f-description");

const A_or_B_or_C_Query: DState.StateQuery = {
    name: "a_or_b_or_c",
    condition: {
        kind: "complex-condition",
        name: "audio-controls-are-blocked",
        some: [
            {
                kind: "numeric-condition",
                referenceId: propA.propName,
                operator: "eq",
                value: 1,
                valueLabel: "TRUE",
                referenceLabel: propA.propName,
            },
            {
                kind: "numeric-condition",
                referenceId: propB.propName,
                value: 1,
                operator: "eq",
                valueLabel: "TRUE",
                referenceLabel: propB.propName,
            },
            {
                kind: "numeric-condition",
                referenceId: propC.propName,
                value: 1,
                operator: "eq",
                valueLabel: "TRUE",
                referenceLabel: propC.propName,
            },
        ],
        all: [],
    },
};
export const _Q = {
    A_or_B_or_C_Query,
};

export const _P = {
    propA,
    propB,
    propC,
    propD,
    propE,
    propF,
} as const;

// export const DEFAULT_STATE_PROPS_LIST = Object.values(DEFAULT_STATE_PROPS);
// export const DEFAULT_STATE_DERIVED_LIST = Object.values(DERIVED_STATE);
