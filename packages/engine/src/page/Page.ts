import { DElement } from "../Delement/DElement";
import { TaskManager } from "./task-manager";
import { createDElement } from "../Delement/element-factory";
import { ScaleService } from "../engine/scale";
import { Task } from "./task";
import { PStyle } from "../Delement/DStyle";
import { ButtonClickAction } from "../Delement/button-click-action";
import { PageComponent, PageComponentDto } from "./page-component";
import { DElementDto } from "../Delement/DElement.dto";
import { Fact } from "../rules/fact";
import { DTimestamp } from "../common/DTimestamp";
import { PageResult } from "./page-result";
import { TaskState, TaskStateDiff } from "./task-state";

export interface VideoPlayerDto {
  playUrl: string;
  style?: PStyle;
}

export interface PageDto {
  readonly id: string;
  readonly tags: string[];
  staticElements: Array<DElementDto>;
  background: string;
  components: Array<PageComponentDto>;
  videoPlayer?: VideoPlayerDto;
  initialTasks: Array<Task>;
}

export const PageDto = {
  createDummy: (id: number): PageDto => {
    return {
      id: "id" + id,
      tags: [],
      staticElements: [],
      background: "white",
      // videoList: [],
      components: [
        {
          el: {
            _tag: "div",
            style: { x: 10, y: 0, w: 40, h: 20, backgroundColor: "red" },
            children: [],
            innerText: "Next btn " + id,
          },
        },
      ],

      initialTasks: [],
    };
  },
};

export class Page {
  private readonly TAG = "[ DPage ]: ";
  private staticElements: DElement<HTMLElement>[] = [];
  private components: PageComponent[] = [];
  private pageEntered: DTimestamp = DTimestamp.now();
  private previousState: TaskState | false = false;

  constructor(
    private readonly dto: PageDto,
    private readonly taskManager: TaskManager,
    private readonly scaleService: ScaleService,
    private readonly onCompleted: (result: PageResult) => void,
  ) {
    this.components = dto.components.map((el) => {
      const component = new PageComponent(el, scaleService);
      component.onClick = (actions) => {
        this.handleButtonAction(actions);
      };
      this.components.push(component);

      return component;
    });
    dto.staticElements.forEach((el) => {
      const element = createDElement(el, scaleService);
      this.staticElements.push(element);
    });

    if (dto.videoPlayer) {
      this.taskManager.loadVideo(dto.videoPlayer.playUrl);
      if (dto.videoPlayer.style) {
        this.taskManager.setVideoStyles(dto.videoPlayer.style);
      }
    }

    if (dto.initialTasks.length) {
      this.taskManager.autoPlaySequence(dto.initialTasks);
    }
  }

  private createPageResult(facts: Fact[]): PageResult {
    const pageExited = DTimestamp.now();
    const pageTime = DTimestamp.diff(this.pageEntered, pageExited);
    return {
      pageId: this.dto.id,
      pageEntered: this.pageEntered,
      pageExited,
      pageTime,
      collectedFacts: facts,
    };
  }
  private handleButtonAction(a: ButtonClickAction) {
    switch (a.kind) {
      case "next-page":
        const nextPageResult = this.createPageResult([]);
        this.onCompleted(nextPageResult);
        break;
      case "play-video":
        this.taskManager.execute(a.task);
        break;
      case "play-audio":
        this.taskManager.execute(a.task);
        break;
      case "pause-video":
        this.taskManager.pauseVideo();
        break;
      case "pause-audio":
        this.taskManager.pauseAudio();
        break;
      case "submit-fact":
        const submitFactResult = this.createPageResult([a.fact]);
        this.onCompleted(submitFactResult);
        break;
      case "submit-form":
        // TODO IMPLEMENT Collection of form-data // LOOP OVER ALL INPUTS
        const submitFormResult = this.createPageResult([]);
        this.onCompleted(submitFormResult);
        break;
      default:
        const _exhaustiveCheck: never = a;
        console.log(_exhaustiveCheck);
    }
  }

  appendYourself(parent: HTMLElement) {
    this.staticElements.forEach((el) => {
      el.appendYourself(parent);
    });

    this.components.forEach((comp) => {
      comp.appendToParent(parent);
    });
  }

  destroy() {
    // console.log("DESTROY PAGE ");
    this.taskManager.clear();
  }

  tick() {
    const prev = this.previousState;
    const curr = this.taskManager.getState();
    const diff = TaskState.getDiff(curr, prev);
    this.components.forEach((comp) => {
      comp.updateState(diff);
    });
    // UPDATE PREVIOUS-STATE FOR NEXT TICK!!
    // this.previousState = curr;
  }
}
