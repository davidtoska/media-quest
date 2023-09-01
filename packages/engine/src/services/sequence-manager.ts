import { DTimestamp } from "../common/DTimestamp";

export interface DelayTask {
  readonly kind: "delay-task";
  readonly duration: number;
}

export interface NoopTask {
  readonly kind: "noop-task";
}

export interface AudioTask {
  readonly kind: "autoplay-audio-task";
  readonly url: string;
  readonly audioId: string;
}

export interface VideoTask {
  readonly kind: "autoplay-video-task";
  readonly url: string;
  readonly videoId: string;
}

export type AutoplayTask = VideoTask | AudioTask | DelayTask;
type TaskHistory = {
  readonly startedAt: DTimestamp;
  readonly completedAt: DTimestamp;
  readonly task: AutoplayTask;
};
class SequenceHistory {
  private taskHistory: Array<TaskHistory> = [];
  constructor(private readonly startedAt: DTimestamp) {}

  add(task: TaskHistory) {
    this.taskHistory.push(task);
  }
}

export class SequenceManager {
  private runningTask: { task: AutoplayTask; startedAt: DTimestamp } | false;
  private taskList: Array<DelayTask | AudioTask | VideoTask>;
  private readonly t0: DTimestamp;
  private readonly history: SequenceHistory;

  constructor(private readonly tasks: ReadonlyArray<AudioTask | DelayTask | VideoTask>) {
    this.t0 = DTimestamp.now();
    const [first, ...rest] = tasks;
    if (first && first.kind === "delay-task") {
      this.runningTask = { task: first, startedAt: this.t0 };
      this.taskList = [...rest];
    } else {
      this.runningTask = false;
      this.taskList = [...tasks];
    }
    this.history = new SequenceHistory(this.t0);
  }

  audioCompleted(audio: { audioId: string; url: string }) {
    const curr = this.runningTask;
    if (curr && curr.task.kind === "autoplay-audio-task") {
      const { audioId, url } = curr.task;
      if (url === audio.url) {
        this.runningTask = false;
      } else {
        // WARN ABOUT UNEXPECTED AUDIO ID && URL ??
        console.warn("Unexpected audio completed url.");
      }
    }
  }

  videoCompleted(video: { videoId: string; url: string }) {
    const curr = this.runningTask;
    if (curr && curr.task.kind === "autoplay-video-task") {
      const { url } = curr.task;
      if (url === video.url) {
        this.runningTask = false;
      } else {
        // WARN ABOUT UNEXPECTED AUDIO ID && URL ??
        console.warn("Unexpected video completed url.");
      }
    }
  }

  abort() {
    this.taskList = [];
    this.runningTask = false;
  }
  get isCompleted() {
    return !this.isRunning;
  }
  get isRunning() {
    return this.runningTask || this.taskList.length;
  }

  nextTask(now: DTimestamp): NoopTask | AudioTask | VideoTask {
    const curr = this.runningTask;

    if (curr && curr.task.kind === "delay-task") {
      const progress = DTimestamp.diff(curr.startedAt, now);
      // DELAY COMPLETED.
      if (progress >= curr.task.duration) {
        this.runningTask = false;
      }
    }

    // RETURN IF A TASK IS RUNNING.
    if (this.runningTask) {
      return { kind: "noop-task" };
    }

    const first = this.taskList.shift();
    if (!first) {
      return { kind: "noop-task" };
    }

    if (first.kind === "delay-task") {
      this.runningTask = { task: first, startedAt: now };
      return { kind: "noop-task" };
    }

    if (first.kind === "autoplay-video-task") {
      this.runningTask = { task: first, startedAt: now };
      return first;
    }

    if (first.kind === "autoplay-audio-task") {
      this.runningTask = { task: first, startedAt: now };
      return first;
    }

    return { kind: "noop-task" };
  }
}
