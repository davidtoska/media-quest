import { DEvent } from "./DEvents";

interface SubscriberData {
    readonly subscriberId: string;
    readonly cb: (event: DEvent) => void;
}

export interface DEventStore {
    subscribe(cb: (event: DEvent) => void, subscriberId: string): void;
}

export interface DEventDispatcher {
    emit(event: DEvent): void;
}
export class EventBus implements DEventStore, DEventDispatcher {
    private readonly TAG = "[  EVENT_BUS  ] :";
    // private readonly subscribers = new Set<(event: DEvent) => void>();
    private readonly subscribers = new Set<SubscriberData>();

    /**
     * Emit on module end.
     * @private
     */
    private readonly eventLog: DEvent[] = [];
    consoleLogEvents = false;
    // readonly sub

    subscribe(cb: (event: DEvent) => void, subscriberId: string) {
        // this.subscribers.add(cb);
        const subscriberData: SubscriberData = {
            subscriberId,
            cb,
        };
        this.subscribers.add(subscriberData);
        if (this.consoleLogEvents) {
            console.log(this.TAG + "subscription added: " + subscriberId);
            console.log(this.TAG + "subscription count: " + this.subscribers.size);
        }
        return () => {
            if (this.consoleLogEvents) {
                console.log(this.TAG + "subscription removed: " + subscriberId);
                console.log(this.TAG + "subscription count  : " + this.subscribers.size);
            }
            // this.subscribers.delete(cb);
            this.subscribers.delete(subscriberData);
        };
    }

    getStats() {
        return {
            subscribersCount: this.subscribers.size,
            eventLog: [...this.eventLog],
            subscribers: [...this.subscribers],
        };
    }

    emit(event: DEvent) {
        if (this.consoleLogEvents) {
            this.logEvent(event);
        }
        this.eventLog.push(event);
        this.subscribers.forEach((data) => {
            // console.log('CALLING EMIT');
            data.cb(event);
        });
        // this.logEvents();
    }

    private logEvent(event: DEvent) {
        console.groupCollapsed(this.TAG + " " + event.kind);
        console.log("ProducerId: " + event.producerId);
        console.log(event.data);
        console.groupEnd();
    }

    private logEvents() {
        console.group(this.TAG + "LOGG");
        console.table(this.eventLog);
        console.groupEnd();
    }
}
