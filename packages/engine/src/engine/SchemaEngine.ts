import { SchemaDto } from "./SchemaDto";
import { DPlayer } from "../player/dplayer";
import { ScaleService } from "./scale";
import { DCommand } from "../commands/DCommand";
import { DEvent } from "../events/DEvents";
import { Page2 } from "../page2/Page2";
import { TaskManager } from "../page2/task-manager";

export interface EngineLogger {
  error(message: string): void;
  warn(message: string): void;
  appEvent(event: DEvent): void;
  appCommand(command: DCommand): void;
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
  private currentPage: Page2 | false = false;
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
    }, 1200);
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
    // this.nextPage = this.nextPage.bind(this);
    this.handlePageCompleted = this.handlePageCompleted.bind(this);
    this.nextPage();
  }

  private handlePageCompleted() {
    console.log("PAGE COMPLETED");
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

    const newPage = new Page2(nextPage, this.taskManager, this.scale, () => {
      this.handlePageCompleted();
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

  onCommandOrEvent(_event_or_command: DEvent | DCommand) {}

  setSchema(schema: SchemaDto): void {
    console.log(schema);
  }
}
