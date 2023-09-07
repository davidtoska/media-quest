import { DElement } from "../Delement/DElement";
import { TaskManager } from "./task-manager";
import { DElementDto } from "../dto/DElement.dto";
import { createDElement } from "../engine/element-factory";
import { ScaleService } from "../engine/scale";
import { Task } from "./task";
import { PStyle } from "../Delement/DStyle";
import { DDivDto } from "../Delement/Ddiv";
import { ButtonClickAction } from "../dto/button-click-action";

export interface VideoPlayerDto {
  playUrl: string;
  style?: PStyle;
}
export interface Page2Dto {
  readonly id: string;
  readonly tags: string[];
  staticElements: Array<DElementDto>;
  background: string;
  videoPlayer?: VideoPlayerDto;
  responseButtons: Array<DDivDto>;
  mediaControls: Array<DDivDto>;
  initialTasks: Array<Task>;
}

export const Page2Dto = {
  createDummy: (id: number): Page2Dto => {
    return {
      id: "id" + id,
      tags: [],
      staticElements: [],
      background: "white",
      // videoList: [],
      responseButtons: [
        {
          _tag: "div",
          style: { x: 10, y: 0, w: 40, h: 20, backgroundColor: "red" },
          children: [],
          innerText: "Next btn " + id,
          onClick2: { kind: "next-page" },
        },
      ],
      mediaControls: [],
      initialTasks: [],
    };
  },
};

export interface IPage2 {
  render(parent: HTMLElement): void;
  destroy(): void;
}

export class Page2 implements IPage2 {
  private readonly TAG = "[ DPage ]: ";
  private elements: DElement<HTMLElement>[] = [];
  private prevState = "";
  private readonly mediaControls: DElement<any>[] = [];
  private responseButtons: DElement<any>[] = [];

  constructor(
    private readonly dto: Page2Dto,
    private readonly taskManager: TaskManager,
    private readonly scaleService: ScaleService,
    private readonly onCompleted: () => void,
  ) {
    this.mediaControls = dto.mediaControls.map((el) => {
      const element = createDElement(el, scaleService);
      this.elements.push(element);
      element.onclick = (actions) => {
        this.handleButtonAction(actions);
      };
      return element;
    });

    this.responseButtons = dto.responseButtons.map((el) => {
      const element = createDElement(el, scaleService);
      element.onclick = (actions) => {
        this.handleButtonAction(actions);
      };
      this.elements.push(element);
      return element;
    });
    dto.staticElements.forEach((el) => {
      const element = createDElement(el, scaleService);
      this.elements.push(element);
    });
    if (dto.videoPlayer) {
      this.taskManager.loadVideo(dto.videoPlayer.playUrl);
    }
    if (dto.initialTasks.length) {
      this.taskManager.autoPlaySequence(dto.initialTasks);
      console.log(this.taskManager);
    }
  }

  private handleButtonAction(a: ButtonClickAction) {
    console.log("CLICKED");
    switch (a.kind) {
      case "next-page":
        this.onCompleted();
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
        break;
      case "submit-form":
        break;
      default:
        const _exhaustiveCheck: never = a;
        console.log(_exhaustiveCheck);
    }
  }

  appendYourself(parent: HTMLElement) {
    this.elements.forEach((el) => {
      el.appendYourself(parent);
    });
  }

  destroy() {
    // console.log("DESTROY PAGE ");
    this.taskManager.clear();
  }

  tick() {
    const state = this.taskManager.getState();
    const entries = Object.entries(state);
    const divider = "xxx";
    const curr = this.prevState;
    const mapped = entries.map(([key, value], index) => {
      return key + " -> " + value;
    });
    mapped.forEach((str) => {
      if (curr.indexOf(str) === -1) {
        console.log("NEW STATE " + str);
      }
    });
    this.prevState = mapped.join(divider);
    // console.log("TICK");
  }

  log(): void {
    // console.log(this.TAG + 'scale - ' + this.scale);
  }

  get id() {
    return this.dto.id;
  }

  render(parent: HTMLElement): void {}
}
