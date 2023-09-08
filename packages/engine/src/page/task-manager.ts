import { DTimestamp } from "../common/DTimestamp";
import { Task } from "./task";
import { DStyle, PStyle } from "../Delement/DStyle";
import { ScaleService } from "../engine/scale";
import { TaskState } from "./task-state";

export class TaskManager {
  private readonly TAG = "[TaskManager]: ";
  private readonly videoElement = document.createElement("video");
  private readonly audioElement = document.createElement("audio");
  private readonly showConsoleLogs = false;
  private videoStyles: PStyle = {
    h: 40,
    w: 80,
    y: 60,
    x: 10,
  };
  private runningTask: { task: Task; startedAt: DTimestamp } | false = false;
  private taskList: Array<Task> = [];
  private delayRef: number | false = false;

  clear() {
    if (this.showConsoleLogs) console.log(this.TAG + "CLEAR");
    if (typeof this.delayRef === "number") {
      window.clearTimeout(this.delayRef);
    }

    this.pauseVideo();
    this.pauseAudio();
    this.videoElement.src = "";
    this.audioElement.src = "";
    this.taskList = [];
    this.runningTask = false;
    this.hideVideo();
  }

  getState(): TaskState {
    const c = this.runningTask;
    const isGifMode = this.videoElement.loop;
    const audioIsPlaying = c && c.task.kind === "play-audio-task" && !this.audioElement.paused;
    const videoIsPlaying = c && c.task.kind === "play-video-task" && !this.videoElement.paused;
    const blockResponseButton = c && c.task.blockResponseButton;
    const blockAudio = c && c.task.blockAudio;
    const blockVideo = c && c.task.blockVideo;
    const blockFormInput = c && c.task.blockFormInput;
    return {
      audioIsPlaying,
      isGifMode,
      videoIsPlaying,
      blockFormInput,
      blockResponseButton,
      blockAudio,
      blockVideo,
    };
  }

  constructor(
    private readonly mediaLayer: HTMLDivElement,
    private readonly scale: ScaleService,
    private readonly onError: (error: string) => void,
  ) {
    this.hideVideo();
    this.mediaLayer.appendChild(this.videoElement);
    this.mediaLayer.appendChild(this.audioElement);
    DStyle.normalize(this.videoElement);
    DStyle.applyStyles(this.videoElement, this.videoStyles, this.scale.scale);

    this.videoElement.onended = () => {
      const next = this.getNextTask();
      if (next) {
        this.execute(next);
      } else {
        this.runningTask = false;
      }
    };
    this.videoElement.onerror = (e) => {
      if (e instanceof Event) {
        console.log(e.target);
        console.log("IS EVENT");
      }
      console.log("VIDEO ERROR WHY ?? ");
      onError("Error playing video." + this.videoElement.src);
    };
    this.audioElement.onended = () => {
      const next = this.getNextTask();
      if (next) {
        this.execute(next);
      } else {
        this.runningTask = false;
      }
    };
  }

  execute(task: Task): boolean {
    // console.log("EXECUTE TASK" + task.kind);
    const curr = this.runningTask;

    // Check if we should remove the current task.
    if (curr && Task.shallRemoveCurrent(task) && Task.notEq(curr.task, task)) {
      this.pauseAudio();
      this.pauseVideo();
      this.runningTask = false;
    }

    if (!curr) {
      this.runningTask = { startedAt: DTimestamp.now(), task: task };
    } else if (Task.notEq(curr.task, task)) {
      this.runningTask = { startedAt: DTimestamp.now(), task: task };
    }

    if (task.priority === "replace-all" || task.priority === "replace-queue") {
      this.taskList = [];
    }

    // STARTING PLAY VIDEO
    if (task.kind === "play-video-task") {
      this.showVideo();
      // this.pauseAudio()
      this.loadVideo(task.url);
      if (task.loop) {
        this.videoElement.loop = true;
      } else {
        this.videoElement.loop = false;
      }

      try {
        this.videoElement.play();
      } catch (e) {
        console.error(e);
      }
    }

    // STARTING PLAY AUDIO
    if (task.kind === "play-audio-task") {
      if (!this.videoElement.loop) {
        this.pauseVideo();
      }
      if (task.url !== this.audioElement.src) {
        this.audioElement.src = task.url;
      }
      this.audioElement.play();
    }
    return true;
  }

  setVideoStyles(styles: PStyle) {
    this.videoStyles = styles;
    DStyle.applyStyles(this.videoElement, this.videoStyles, this.scale.scale);
  }

  autoPlaySequence(tasks: Task[]) {
    this.taskList = [...tasks];
    const next = this.getNextTask();
    if (next) {
      this.execute(next);
    }
  }

  loadVideo(url: string) {
    // console.log("LOAD VIDEO " + !!url + " ");
    if (this.videoElement.src !== url) {
      this.videoElement.src = url;
    }
    this.showVideo();
  }

  private showVideo() {
    this.videoElement.style.display = "block";
  }

  private hideVideo() {
    this.videoElement.style.display = "none";
  }

  pauseVideo() {
    try {
      if (!this.videoElement.loop) {
        this.videoElement.pause();
      }
    } catch (e) {
      console.log(e);
      this.onError("Error pausing video.");
    }
  }

  pauseAudio() {
    try {
      if (!this.audioElement.loop) {
        this.audioElement.pause();
      }
    } catch (e) {
      console.log(e);
      this.onError("Error pausing audio.");
    }
  }

  private getNextTask(): Task | false {
    // console.log("Getting next task.");
    // console.log(this.taskList);
    const first = this.taskList.shift();
    return first ?? false;
  }
}
