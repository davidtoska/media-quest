import { SchemaDto } from "./SchemaDto";
import { DPlayer } from "./dplayer";
import { ScaleService } from "./scale";
// import { DEvent } from "../events/DEvents";
import { Page } from "../page/Page";
import { TaskManager } from "../page/task-manager";
// import { AnsweredQuestion, PageHistory } from "./history-que";
import { PageResult } from "../page/page-result";

export interface EngineLogger {
  error(message: string): void;
  warn(message: string): void;
  // appEvent(event: DEvent): void;
}

export interface SchemaResult {
  readonly eventLog: ReadonlyArray<any>;
  readonly answers: ReadonlyArray<any>;
}
export interface ISchemaEngine {
  onComplete(handler: (result: SchemaResult) => void): void;
  // onCommandOrEvent(item: DEvent | DCommand): void;
  setSchema(schema: SchemaDto): void;
  onFatalError(handler: (error: { message: string }) => void): void;
}

export class SchemaEngine implements ISchemaEngine {
  private readonly TAG = "[ SCHEMA_ENGINE ] :";
  private readonly scale: ScaleService;
  private readonly hostElement: HTMLDivElement;
  private readonly taskManager: TaskManager;
  private readonly uiLayer: HTMLDivElement = document.createElement("div");
  private readonly mediaLayer: HTMLDivElement = document.createElement("div");
  private player: DPlayer;
  private currentPage: Page | false = false;
  private readonly tickerRef: number | false = false;

  constructor(
    hostEl: HTMLDivElement,
    private readonly height: number,
    private readonly width: number,
    private readonly schema: SchemaDto,
  ) {
    this.tickerRef = window.setInterval(() => {
      if (this.currentPage) {
        this.currentPage.tick();
      }
    }, 100);
    this.hostElement = hostEl;
    this.hostElement.appendChild(this.mediaLayer);
    this.hostElement.appendChild(this.uiLayer);
    this.scale = new ScaleService({
      baseHeight: schema.baseHeight,
      baseWidth: schema.baseWidth,
      containerWidth: width,
      containerHeight: height,
    });
    this.player = new DPlayer(this.schema);
    this.taskManager = new TaskManager(this.mediaLayer, this.scale, (error) => {
      console.log(error);
    });
    this.styleSelf();
    this.handlePageCompleted = this.handlePageCompleted.bind(this);
    this.nextPage();
  }

  private handlePageCompleted(result: PageResult) {
    this.player.saveHistory(result);
    this.nextPage();
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

    makeStatic(this.uiLayer);
    this.uiLayer.style.zIndex = "10";
    this.mediaLayer.style.zIndex = "8";
    makeStatic(this.mediaLayer);
  }

  private nextPage() {
    const nextPage = this.player.getNextPage();
    if (this.currentPage) {
      this.currentPage.destroy();

      this.uiLayer.innerHTML = "";
    }

    if (!nextPage) {
      // console.log("NO MORE PAGES");
      // TODO FIGURE OUT WHAQT TO DO AT END OF TEST!! Start over??
      this.player = new DPlayer(this.schema);
      if (this.player.pageCount > 0) {
        this.nextPage();
      }
      return false;
    }

    const newPage = new Page(nextPage, this.taskManager, this.scale, (result) => {
      this.handlePageCompleted(result);
    });

    // console.log("APPENDING PAGE");

    this.currentPage = newPage;
    // this.uiContainer.innerHTML = "";

    newPage.appendYourself(this.uiLayer);
    return true;
  }

  destroy() {
    if (this.currentPage) {
      this.currentPage.destroy();
      this.uiLayer.innerHTML = "";
    }
  }
  onComplete(handler: (result: SchemaResult) => void) {
    console.log(handler);
  }

  onFatalError(handler: (error: { message: string }) => void): void {
    console.log(handler);
  }

  onCommandOrEvent(_event_or_command: any) {}

  setSchema(schema: SchemaDto): void {
    console.log(schema);
  }
}
