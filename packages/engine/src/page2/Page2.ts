import { DElement } from "../Delement/DElement";
import { TaskManager } from "./task-manager";
import { DElementDto } from "../dto/DElement.dto";
import { createDElement } from "../engine/element-factory";
import { ScaleService } from "../engine/scale";
import { Task } from "./task";
import { PStyle } from "../Delement/DStyle";
import { ButtonClickAction } from "../Delement/button-click-action";
import { PageComponent, PageComponentDto } from "./page-component";

export interface VideoPlayerDto {
  playUrl: string;
  style?: PStyle;
}
export interface Page2Dto {
  readonly id: string;
  readonly tags: string[];
  staticElements: Array<DElementDto>;
  background: string;
  components: Array<PageComponentDto>;
  videoPlayer?: VideoPlayerDto;
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
      components: [
        {
          el: {
            _tag: "div",
            style: { x: 10, y: 0, w: 40, h: 20, backgroundColor: "red" },
            children: [],
            innerText: "Next btn " + id,
            onClick2: { kind: "next-page" },
          },
        },
      ],

      initialTasks: [],
    };
  },
};

export class Page2 {
  private readonly TAG = "[ DPage ]: ";
  private staticElements: DElement<HTMLElement>[] = [];
  private prevState = "";
  private components: PageComponent[] = [];

  constructor(
    private readonly dto: Page2Dto,
    private readonly taskManager: TaskManager,
    private readonly scaleService: ScaleService,
    private readonly onCompleted: () => void,
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
    }

    if (dto.initialTasks.length) {
      this.taskManager.autoPlaySequence(dto.initialTasks);
    }
  }

  private handleButtonAction(a: ButtonClickAction) {
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
    const state = this.taskManager.getState();
    this.components.forEach((comp) => {
      comp.setCurrentState(state);
    });
  }
}
