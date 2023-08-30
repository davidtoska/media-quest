import { SchemaDto } from "../dto/SchemaDto";
import { DMediaManager } from "../services/DMedia-manager";
import { DCommandBus } from "../commands/DCommandBus";
import { EventBus } from "../events/event-bus";
import { DPlayer } from "../player/dplayer";
import { AnsweredQuestion } from "../player/history-que";
import { DTimestamp } from "../common/DTimestamp";
import { DPage } from "./DPage";
import { ScaleService } from "./scale";
import { ResourceProvider } from "../services/resource-provider";
import { StateService } from "../state/state-service";
import { DCommand, StateCommand } from "../commands/DCommand";
import { DEvent } from "../events/DEvents";

export interface EngineLogger {
  error(message: string): void;
  warn(message: string): void;
  appEvent(event: DEvent): void;
  appCommand(command: DCommand): void;
}

export interface SchemaResult {
  readonly eventLog: ReadonlyArray<DEvent>;
  readonly commandLog: ReadonlyArray<DCommand>;
  readonly answers: ReadonlyArray<any>;
}
export interface ISchemaEngine {
  onComplete(handler: (result: SchemaResult) => void): void;
  onCommandOrEvent(item: DEvent | DCommand): void;
  setSchema(schema: SchemaDto): void;
  onFatalError(handler: (error: { message: string }) => void): void;
}

export class SchemaEngine implements ISchemaEngine {
  private readonly TAG = "[ SCHEMA_ENGINE ] :";
  private readonly commandBus = new DCommandBus();
  private readonly eventBus = new EventBus();
  private readonly mediaManager: DMediaManager;
  private readonly scale: ScaleService;
  private readonly hostElement: HTMLDivElement;
  private readonly uiContainer: HTMLDivElement = document.createElement("div");
  private readonly mediaContainer: HTMLDivElement = document.createElement("div");
  private readonly resourceProvider: ResourceProvider;
  private readonly stateService: StateService;
  private readonly globalEventToStateHandlers = new Map<string, ReadonlyArray<StateCommand>>();
  private player: DPlayer;
  private currentPage: DPage | false = false;
  private readonly subs: Array<() => void> = [];

  constructor(
    hostEl: HTMLDivElement,
    private readonly height: number,
    private readonly width: number,
    private readonly schema: SchemaDto,
  ) {
    this.hostElement = hostEl;
    this.hostElement.appendChild(this.uiContainer);
    this.hostElement.appendChild(this.mediaContainer);
    const stateProps = this.schema.stateProps ?? [];
    const stateQueries = this.schema.stateQueries ?? [];
    this.stateService = new StateService(this.eventBus, this.commandBus, stateProps, stateQueries);
    this.scale = new ScaleService({
      baseHeight: schema.baseHeight,
      baseWidth: schema.baseWidth,
      containerWidth: width,
      containerHeight: height,
    });
    // this.commandBus.logCommands = true;
    const globalEventHandlers = schema.stateFromEvent ?? [];

    globalEventHandlers.forEach((h) => {
      this.globalEventToStateHandlers.set(h.onEvent, h.thenExecute);
    });

    const resources = SchemaDto.getResources(this.schema);
    this.resourceProvider = new ResourceProvider({ videos: resources.videoList, audio: resources.audioList });
    this.mediaManager = new DMediaManager(
      this.mediaContainer,
      this.commandBus,
      this.eventBus,
      this.resourceProvider,
      this.scale,
    );
    this.player = new DPlayer(this.schema);
    this.styleSelf();
    this.nextPage();
    this.hookUpListeners();
  }

  private hookUpListeners() {
    const eventSubscription = this.eventBus.subscribe((ev) => {
      this.onCommandOrEvent(ev);
      const globalHandlers = this.globalEventToStateHandlers.get(ev.kind) ?? [];
      globalHandlers.forEach((stateCommand) => {
        this.commandBus.emit(stateCommand);
      });
    }, this.TAG + "HOOK_UP_LISTENERS");
    const commandSubscription = this.commandBus.subscribe((command) => {
      // switch (command.kind) {
      //
      // }
      this.onCommandOrEvent(command);
      if (command.kind === "PAGE_QUE_NEXT_PAGE_COMMAND") {
        this.nextPage();
      }

      if (command.kind === "ENGINE_LEAVE_PAGE_COMMAND") {
        console.log(this.TAG + "SEQUENCE STARTED -- TODO EVENT FOR THIS??");
        console.log(command);
        const pageId = command.payload.pageId;
        const facts = command.payload.factsCollected;
        const timestamp = DTimestamp.now();
        const ans: AnsweredQuestion[] = facts.map((f) => ({
          timestamp,
          fact: f,
        }));
        this.player.saveHistory({
          answeredQuestions: ans,
          pageId,
        });

        this.nextPage();
        // const history: PageHistory = { page: {}, answeredQuestions: [] };
      }
    }, this.TAG);

    this.subs.push(commandSubscription);
    this.subs.push(eventSubscription);
  }

  private styleSelf() {
    this.hostElement.style.height = this.scale.pageHeight + "px";
    this.hostElement.style.width = this.scale.pageWidth + "px";
    this.hostElement.style.backgroundColor = this.schema.backgroundColor ?? "white";
    this.hostElement.style.position = "relative";
    // this.hostElement.style.overflow = "hidden";
    const makeStatic = (div: HTMLDivElement) => {
      div.style.height = "0px";
      div.style.width = "0px";
      div.style.position = "static";
    };

    makeStatic(this.uiContainer);
    makeStatic(this.mediaContainer);
  }

  private nextPage() {
    // TODO SHOULD THIS BE PART OF THE SCHEMA?? THIS IS CLEANUP LOGIC
    // this.commandBus.emit({ kind: "VIDEO_PAUSE_COMMAND", target: "VIDEO", targetId: "VIDEO", payload: {} });
    // this.commandBus.emit({ kind: "AUDIO_PAUSE_COMMAND", target: "AUDIO", targetId: "AUDIO", payload: {} });
    // const currPageId = this.currentPage ? this.currentPage.id : "NO_PAGE";
    // console.groupCollapsed("NEXT_PAGE FROM: " + currPageId);
    // console.log(this.TAG + " NEXT_PAGE STARTED AT: " + currPageId);
    this.mediaManager.clearAllMedia();
    const nextPage = this.player.getNextPage();
    // const state = this.stateService.getState();
    // console.log(state);
    // TODO CLEAN UP PAGE COMPONENTS this.page.CleanUp()
    if (this.currentPage) {
      this.currentPage.destroy();
      this.uiContainer.innerHTML = "";
    }
    if (!nextPage) {
      // TODO FIGURE OUT WHAQT TO DO AT END OF TEST!! Start over??
      this.player = new DPlayer(this.schema);
      if (this.schema.pages.length > 0) {
        this.nextPage();
      }
      return false;
    }
    const newPage = new DPage(nextPage, this.eventBus, this.commandBus, this.scale);

    this.currentPage = newPage;
    newPage.appendYourself(this.uiContainer);

    this.mediaManager.setPage(nextPage);
    const s1 = this.stateService.getState();
    // console.log(s1);
    // console.log("Next-page: " + newPage.id);
    // console.groupEnd();
    return true;
  }

  destroy() {
    if (this.currentPage) {
      this.currentPage.destroy();
      this.uiContainer.innerHTML = "";
    }
    this.mediaManager.destroy();
    this.stateService.destroy();
    this.subs.forEach((sub) => {
      sub();
    });
    const evStats = this.eventBus.getStats();
    const cmdStats = this.commandBus.getStats();
    console.assert(evStats.subscribersCount === 0, this.TAG + " Eventbus should have no subscribers ", evStats);
    console.assert(cmdStats.subscribersCount === 0, this.TAG + "Commandbus should have no subscribers", cmdStats);
  }
  onComplete(handler: (result: SchemaResult) => void) {
    console.log(handler);
  }

  onFatalError(handler: (error: { message: string }) => void): void {
    console.log(handler);
  }

  onCommandOrEvent(_event_or_command: DEvent | DCommand) {}

  setSchema(schema: SchemaDto): void {
    console.log(schema);
  }
}
