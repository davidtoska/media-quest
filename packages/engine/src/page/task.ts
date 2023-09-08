type BaseTask = {
  readonly blockAudio: boolean;
  readonly blockVideo: boolean;
  readonly blockResponseButton: boolean;
  readonly blockFormInput: boolean;
  readonly priority:
    | "run-if-idle"
    | "follow-queue"
    | "replace-all"
    | "replace-current"
    | "replace-queue"
    | "prepend-to-queue"
    | "append-to-queue";
};
export type DelayTask = BaseTask & {
  readonly kind: "delay-task";
  readonly duration: number;
};

export type PlayAudioTask = BaseTask & {
  readonly kind: "play-audio-task";
  readonly url: string;
  readonly audioId: string;
};

export type PlayVideoTask = BaseTask & {
  readonly kind: "play-video-task";
  readonly url: string;
  readonly videoId: string;
  readonly loop?: boolean;
  readonly startAt?: number;
  readonly stopAt?: "end" | "start" | number;
  readonly volume?: number;
};
const eq = (a: Task, b: Task) => {
  if (!b) {
    return false;
  }
  if (a.kind !== b.kind) {
    return false;
  }
  if (a.kind === "delay-task" && b.kind === "delay-task") {
    return a.duration === b.duration;
  }

  if (a.kind === "play-audio-task" && b.kind === "play-audio-task") {
    return a.url === b.url && a.audioId === b.audioId;
  }
  if (a.kind === "play-video-task" && b.kind === "play-video-task") {
    return (
      a.url === b.url &&
      a.videoId === b.videoId &&
      a.startAt === b.startAt &&
      a.stopAt === b.stopAt &&
      a.volume === b.volume
    );
  }
  return false;
};
const deleteTaskList = (task: Task) => {
  return task.priority === "replace-all" || task.priority === "replace-queue";
};
const shallRemoveCurrent = (task: Task) => {
  return task.priority === "replace-current" || task.priority === "replace-all";
};
const notEq = (a: Task, b: Task) => !eq(a, b);
const is = (task: Task | undefined | false | null | {}): task is Task => {
  if (!task) {
    return false;
  }
  if (typeof task !== "object") {
    return false;
  }
  if (Array.isArray(task)) {
    return false;
  }
  return true;
};

export const Task = {
  eq,
  is,
  notEq,
  deleteTaskList,
  shallRemoveCurrent,
};
export type Task = PlayVideoTask | PlayAudioTask | DelayTask;
