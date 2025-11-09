import { SchemaDto } from "./SchemaDto";
import { DPlayer } from "./dplayer";
import { ScaleService } from "./scale";
import { Page } from "../page/Page";
import { TaskManager } from "../page/task-manager";
import { PageResult } from "../page/page-result";
import { SchemaResult } from "./SchemaResult";
export interface EngineLogger {
  info(message: string): void;
  error(message: string): void;
  warn(message: string): void;
}

const voidLogger: EngineLogger = {
  info: (message: string) => {},
  error: (message: string) => {},
  warn: (message: string) => {},
};

export interface ISchemaEngine {
  onProgress(handler: (result: SchemaResult) => void): void;
  onFatalError(handler: (error: { message: string }) => void): void;
  setLogger(logger: EngineLogger): void;
}

export class SchemaEngine implements ISchemaEngine {
  private readonly TAG = "[ SCHEMA_ENGINE ] :";
  private readonly scale: ScaleService;
  private readonly hostElement: HTMLDivElement;
  private readonly taskManager: TaskManager;
  private logger: EngineLogger = voidLogger;
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
      containerWidth: this.width,
      containerHeight: this.height,
    });
    this.logger.info(this.TAG + "Scale: " + JSON.stringify(this.scale));
    this.player = new DPlayer(this.schema);
    this.taskManager = new TaskManager(this.mediaLayer, this.scale, (error) => {
      console.log(error);
    });

    this.styleSelf();
    this.handlePageCompleted = this.handlePageCompleted.bind(this);
    this.nextPage();
  }

  private handlePageCompleted(result: PageResult) {
    // 1 Save data from last page
    this.player.saveHistory(result);

    // 2 Emit progress
    const currentResults = this.player.getResults();
    const a: SchemaResult = {
      schemaId: this.schema.id,
      pagesLeft: currentResults.pagesLeft,
      predefinedFacts: currentResults.predefinedFacts,
      eventLog: currentResults.eventLog,
      answers: currentResults.answerFacts,
    };
    if (this._onProgress) {
      this._onProgress(a);
    }

    // 3. Next page
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

    // console.log(nextPage);
    if (nextPage && nextPage.videoPlayer && nextPage.videoPlayer.style) {
      this.taskManager.setVideoStyles(nextPage.videoPlayer.style);
    }

    if (!nextPage) {
      // TODO FIGURE OUT WHAQT TO DO AT END OF TEST!! Start over??
      this.player = new DPlayer(this.schema);
      if (this.player.pagesLeft > 0) {
        this.nextPage();
      }
      return false;
    }

    const newPage = new Page(nextPage, this.taskManager, this.scale, (result) => {
      this.handlePageCompleted(result);
    });
    this.currentPage = newPage;
    newPage.appendYourself(this.uiLayer);
    return true;
  }

  destroy() {
    if (this.currentPage) {
      this.currentPage.destroy();
      this.uiLayer.innerHTML = "";
    }
  }

  private _onProgress: ((result: SchemaResult) => void) | false = false;
  onProgress(handler: (result: SchemaResult) => void) {
    this._onProgress = handler;
  }

  private _onFatalError: ((error: { message: string }) => void) | false = false;
  onFatalError(handler: (error: { message: string }) => void): void {
    this._onFatalError = handler;
  }
  setLogger(logger: EngineLogger) {
    this.logger = logger;
  }
}
