import { DCommand } from "./DCommand";
import { DTimestamp } from "../common/DTimestamp";

export interface DCommandStore {
    subscribe(callback: () => void, subscriberId: string): void;
}

export interface DCommandDispatcher {
    emit(command: DCommand): void;
}

interface CommandSubscriberData {
    readonly subscriberId: string;
    readonly callback: (command: DCommand) => void;
}
export class DCommandBus implements DCommandStore, DCommandDispatcher {
    private readonly TAG = "[ COMMAND_BUS ] ";
    logCommands = false;
    private readonly commandLog: Array<DCommand & { timestamp: DTimestamp }> = [];
    readonly subscribers = new Set<CommandSubscriberData>();
    // readonly sub

    subscribe(cb: (command: DCommand) => void, subscriberId: string) {
        const sub: CommandSubscriberData = {
            subscriberId,
            callback: cb,
        };

        this.subscribers.add(sub);
        return () => {
            this.subscribers.delete(sub);
        };
    }

    emit(command: DCommand) {
        const timestamp = DTimestamp.now();
        this.commandLog.push({ ...command, timestamp });
        if (this.logCommands) {
            this.logCommand(command);
        }
        this.subscribers.forEach((subscriber) => {
            subscriber.callback(command);
        });
    }

    getStats() {
        return {
            commands: [...this.commandLog],
            subscribers: [...this.subscribers],
            subscribersCount: this.subscribers.size,
        };
    }

    private logCommand(command: DCommand) {
        console.groupCollapsed(this.TAG + " " + command.kind);
        console.log("TargetID : " + command.targetId);
        console.log(command.payload);
        console.groupEnd();
    }
}
