import { DStyle } from "./DStyle";
import { DElementBaseDto } from "../dto/DElement.dto";
import { DCommand, ElementCommand } from "../commands/DCommand";
import { DCommandBus } from "../commands/DCommandBus";
import { DEventHandler } from "../event-handlers/DEventHandler";
import { DUtil } from "../utils/DUtil";
import { EventBus } from "../events/event-bus";
import { DTimestamp } from "../common/DTimestamp";
import { AnimationDto } from "../dto/AnimationDto";
import { ScaleService } from "../engine/scale";
import { DState } from "../state/Dstate";

export abstract class DElement<T extends HTMLElement> {
    protected readonly el: T;
    private clickHandlerIsEnabled = true;
    readonly id: string;
    private isAnimatingSelf = false;
    protected currStyle: Partial<DStyle> = {
        fontSize: { _unit: "px", value: 100 },
        fontWeight: 500,
        textColor: "black",
        opacity: 1,
    };

    // private readonly onQueryChangedHandlers =
    private readonly eventHandlers: DEventHandler.LookUp;
    protected readonly commandBus: DCommandBus;
    protected readonly eventBus: EventBus;
    protected scale: ScaleService;
    private readonly baseDto: DElementBaseDto;
    protected readonly subscriptions = new Set<() => void>();

    protected constructor(
        el: T,
        eventBus: EventBus,
        commandBus: DCommandBus,
        dto: DElementBaseDto,
        scale: ScaleService
    ) {
        this.el = el;
        this.id = dto.id;
        this.baseDto = dto;
        // this.el.style.position = "absolute";
        this.commandBus = commandBus;
        this.eventBus = eventBus;
        this.eventHandlers = DEventHandler.createLookUp(dto.eventHandlers);
        this.scale = scale;
        // CLICK
        this.onClickHandler = this.onClickHandler.bind(this);
        this.el.onclick = this.onClickHandler;

        // HOVER
        this.onMouseOver = this.onMouseOver.bind(this);
        this.el.onmouseover = this.onMouseOver;

        if (dto) {
            this.updateStyles(dto?.style);
        }
        const commandSubscription = this.commandBus.subscribe((c) => {
            if (c.kind === "ELEMENT_STYLE_COMMAND" && c.targetId === this.id) {
                this.setStyle(c.payload.changes);
            }
            if (c.kind === "ELEMENT_DISABLE_CLICK_COMMAND" && c.targetId === this.id) {
                this.clickHandlerIsEnabled = false;
            }
            if (c.kind === "ELEMENT_ENABLE_CLICK_COMMAND" && c.targetId === this.id) {
                this.clickHandlerIsEnabled = true;
            }
            if (c.kind === "ELEMENT_ANIMATE_COMMAND" && c.targetId === this.id) {
                console.log("TODO IMPLEMENT ANIMATION_HANDLER IN DElement.");
            }
        }, this.id);
        // TODO MEMORY LEAK
        const eventSubscription = this.eventBus.subscribe((event) => {
            const handlers = this.eventHandlers.get(event.kind) ?? [];
            // TODO Apply Conditions in WHEN.
            const commands = handlers.map((h) => h.thenExecute).flat(1);
            commands.forEach((command) => {
                this.commandBus.emit(command);
                // this.doAction(command);
            });

            if (event.kind === "HOST_SCALE_CHANGED_EVENT") {
                console.log("HANDLE THIS SCALE CHANGE!!");
                this.updateStyles({});
            }

            if (event.kind === "STATE_QUERY_RESULT_CHANGED_EVENT") {
                this.queryChangedHandler(event.data);
            }
        }, "ELEMENT: ");
        this.normalize();
        this.subscriptions.add(commandSubscription);
        this.subscriptions.add(eventSubscription);
    }

    abstract destroy(): void;

    // abstract setScale(scale: number): void;

    // /**
    //  * The purpose of this function is to re-emit commands from event-handlers?
    //  * @param command
    //  * @private
    //  */
    // private handleCommandsEmittedByPrivateEventHandlers(command: DCommand) {
    //     console.log(command);
    //     switch (command.kind) {
    //         case "ELEMENT_STYLE_COMMAND":
    //             if (command.targetId === this.id) {
    //                 this.updateStyles(command.payload.changes);
    //             }
    //             break;
    //         case "ELEMENT_ANIMATE_COMMAND":
    //             // TODO CHECK FOR TARGET ID
    //             this.handleAnimateSelfAction(command.payload);
    //             break;
    //         case "ELEMENT_ENABLE_CLICK_COMMAND":
    //             this.clickHandlerIsEnabled = true;
    //             // this.updateStyles(command.payload.changes);
    //             break;
    //         case "ELEMENT_DISABLE_CLICK_COMMAND":
    //             this.clickHandlerIsEnabled = false;
    //             // this.handleAnimateSelfAction(command.payload);
    //             break;
    //         case "VIDEO_PLAY_COMMAND":
    //             this.commandBus.emit(command);
    //             break;
    //         case "VIDEO_PAUSE_COMMAND":
    //             this.commandBus.emit(command);
    //             break;
    //         case "ENGINE_LEAVE_PAGE_COMMAND":
    //             this.commandBus.emit(command);
    //             break;
    //         case "VIDEO_JUMP_TO_COMMAND":
    //             this.commandBus.emit(command);
    //             break;
    //         case "VIDEO_SET_VOLUME_COMMAND":
    //             this.commandBus.emit(command);
    //             break;
    //         case "AUDIO_PLAY_COMMAND":
    //             this.commandBus.emit(command);
    //             break;
    //         case "AUDIO_PAUSE_COMMAND":
    //             this.commandBus.emit(command);
    //             break;
    //         case "AUDIO_SET_VOLUME_COMMAND":
    //             this.commandBus.emit(command);
    //             break;
    //         case "PAGE_QUE_NEXT_PAGE_COMMAND":
    //             this.commandBus.emit(command);
    //             break;
    //         case "PAGE_QUE_GO_TO_SEQUENCE_COMMAND":
    //             this.commandBus.emit(command);
    //             break;
    //         case "PAGE_QUE_GO_TO_PAGE_COMMAND":
    //             this.commandBus.emit(command);
    //             break;
    //         case "PAGE_QUE_EXCLUDE_BY_PAGE_ID_COMMAND":
    //             this.commandBus.emit(command);
    //             break;
    //         case "PAGE_QUE_JUMP_TO_PAGE_COMMAND":
    //             this.commandBus.emit(command);
    //             break;
    //         case "PAGE_QUE_EXCLUDE_BY_TAG_COMMAND":
    //             this.commandBus.emit(command);
    //             break;
    //         case "STATE_MUTATE_COMMAND":
    //             this.commandBus.emit(command);
    //             break;
    //         default:
    //             DUtil.neverCheck(command);
    //     }
    // }

    private queryChangedHandler(result: DState.StateQueryResult) {
        const maybeHandlers = this.baseDto.onStateChange;
        if (!maybeHandlers) {
            return;
        }
        const queryHandlers = maybeHandlers.filter((h) => h.queryName === result.queryName);
        queryHandlers.forEach((h) => {
            if (result.curr) {
                h.whenTrue.forEach((command) => {
                    // this.doAction(command);
                    this.commandBus.emit(command);
                });
            } else {
                h.whenFalse.forEach((command) => {
                    // this.doAction(command);
                    this.commandBus.emit(command);
                });
            }
        });
        // console.log(findByQuery, value);
        // const all = this.baseDto.stateQueryChange ?? [];
    }

    private onClickHandler(_: MouseEvent) {
        // console.log();
        if (!this.clickHandlerIsEnabled) {
            console.log(this.id + "Click disabled");
            return;
        }
        const clickAction = this.baseDto.onClick;
        // console.log("NATIVE CLICK ELEMENT: Handlers " + clickAction?.length);
        if (clickAction && clickAction.length > 0) {
            // console.log("TARGETID: " + clickAction[0].targetId + " " + this.id);
            this.eventBus.emit({
                kind: "USER_CLICKED_EVENT",
                producer: "DUser",
                producerId: this.id,
                data: { elementId: this.id },
                timestamp: DTimestamp.now(),
            });
            clickAction.forEach((command) => {
                this.commandBus.emit(command);
            });
        }
    }

    private onMouseOver(_: MouseEvent) {
        // console.log(ev);
    }

    setStyle(style: Partial<DStyle>) {
        this.updateStyles(style);
    }

    appendYourself(parent: HTMLElement) {
        parent.append(this.el);
        // console.log(parent);
    }

    private handleAnimateSelfAction(dto: AnimationDto) {
        this.isAnimatingSelf = true;
        const { keyframes, options } = dto;

        const animation = this.el.animate(keyframes, options.duration);
        animation.onfinish = (e: AnimationPlaybackEvent) => {
            console.log(e.type);
            this.isAnimatingSelf = false;
        };
        animation.onremove = () => {
            console.warn("ANIMATION REMOVED: " + animation.id);
            this.isAnimatingSelf = false;
        };
        animation.oncancel = () => {
            console.warn("ANIMATION CANCELED: " + animation.id);
            this.isAnimatingSelf = false;
        };
    }

    private normalize() {
        DStyle.normalize(this.el);
    }

    protected updateStyles(style: Partial<DStyle>) {
        this.currStyle = Object.assign(this.currStyle, style);
        DStyle.applyStyles(this.el, this.currStyle, this.scale.scale);
        window.getComputedStyle(this.el);
    }
}
