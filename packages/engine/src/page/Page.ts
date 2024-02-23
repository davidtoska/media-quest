import { DElement } from "../Delement/DElement";
import { TaskManager } from "./task-manager";
import { createDElement } from "../Delement/element-factory";
import { ScaleService } from "../engine/scale";
import { Task } from "./task";
import { PStyle } from "../Delement/DStyle";
import { ButtonClickAction } from "../Delement/button-click-action";
import { DElementDto } from "../Delement/DElement.dto";
import { Fact } from "../rules/fact";
import { DTimestamp } from "../common/DTimestamp";
import { PageResult } from "./page-result";
import { TaskState } from "./task-state";
import { MqEvent } from "../events/mq-events";

export interface VideoPlayerDto {
  playUrl: string;
  style?: PStyle;
}

export interface PageDto {
  readonly id: string;
  readonly prefix: string;
  readonly tags: string[];
  background: string;
  elements: Array<DElementDto>;
  videoPlayer?: VideoPlayerDto;
  initialTasks: Array<Task>;
}

export const PageDto = {
  createDummy: (id: number): PageDto => {
    return {
      id: "id" + id,
      prefix: "prefix" + id,
      tags: [],
      background: "white",
      elements: [
        {
          _tag: "div",
          style: { x: 10, y: 0, w: 40, h: 20, backgroundColor: "red" },
          children: [],
          innerText: "Next btn " + id,
        },
      ],

      initialTasks: [],
    };
  },
};

export class Page {
  private readonly TAG = "[ DPage ]: ";
  private elements: DElement<HTMLElement>[] = [];
  // private elements: PageComponent[] = [];
  // private layoutComponents: PageLayoutComponent[] = [];
  private pageEntered: DTimestamp = DTimestamp.now();
  private previousState: TaskState | false = false;
  private eventLog = new Array<MqEvent>();

  constructor(
    private readonly dto: PageDto,
    private readonly taskManager: TaskManager,
    private readonly scaleService: ScaleService,
    private readonly onCompleted: (result: PageResult) => void,
  ) {
    dto.elements.forEach((el) => {
      const element = createDElement(el, scaleService);
      // if (element instanceof DDiv) {
      // }
      element.registerClickHandler((action) => {
        this.handleButtonAction(action);
      });

      this.elements.push(element);

      // if(element.)
      // element= (action) => {
      //   console.log("TODO ONCLICK ");
      //   this.handleButtonAction(action);
      // };
      // this.elements.push(element);
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
    const pageExit = MqEvent.pageLeave(this.dto.id, this.dto.prefix);
    this.eventLog.push(pageExit);
    const eventLog = [...this.eventLog];
    return {
      pagePrefix: this.dto.prefix,
      pageId: this.dto.id,
      eventLog,
      pageTime,
      collectedFacts: facts,
    };
  }
  private handleButtonAction(a: ButtonClickAction) {
    const event = MqEvent.userClicked({
      pageId: this.dto.id,
      pagePrefix: this.dto.prefix,
      action: a.kind,
      descriptions: ButtonClickAction.describe(a),
    });
    this.eventLog.push(event);
    navigator.vibrate(200);
    const { vibrateMs } = a;
    if (vibrateMs) {
      navigator.vibrate(vibrateMs);
    }

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
      case "mute-video":
        this.taskManager.muteVideo();
        break;
      case "un-mute-video":
        this.taskManager.unMuteVideo();
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
    const pageEnterEvent = MqEvent.pageEnter(this.dto.id, this.dto.prefix);
    this.pageEntered = DTimestamp.now();
    this.eventLog.push(pageEnterEvent);
    this.elements.forEach((el) => {
      el.appendYourself(parent);
    });

    // this.components.forEach((comp) => {
    //   comp.appendToParent(parent);
    // });
    // this.layoutComponents.forEach((comp) => {
    //   comp.appendToParent(parent);
    // });
  }

  destroy() {
    this.taskManager.clear();
  }

  tick() {
    const prev = this.previousState;
    const curr = this.taskManager.getState();
    const diff = TaskState.getDiff(curr, prev);
    this.elements.forEach((element) => {
      element.updateState(diff);
    });
  }
}
