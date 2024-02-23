import { DTimestamp } from "../common/DTimestamp";
import diff = DTimestamp.diff;

export type TaskState = {
  audioIsPlaying: boolean;
  isGifMode: boolean;
  videoPlayState:
    | "playing"
    | "paused"
    | "ended"
    | "playing-and-muted"
    | "paused-and-muted"
    | "ended-and-muted";
  blockFormInput: boolean;
  blockResponseButton: boolean;
  blockAudio: boolean;
  blockVideo: boolean;
};

export type TaskStateDiff = Partial<TaskState> & { __diffed__: true };
export const TaskState = {
  eq: (a: TaskState, b: TaskState) => {
    return (
      a.audioIsPlaying === b.audioIsPlaying &&
      a.isGifMode === b.isGifMode &&
      a.videoPlayState === b.videoPlayState &&
      a.blockFormInput === b.blockFormInput &&
      a.blockResponseButton === b.blockResponseButton &&
      a.blockAudio === b.blockAudio &&
      a.blockVideo === b.blockVideo
    );
  },

  getDiff: (curr: TaskState, prev: TaskState | false): TaskStateDiff => {
    if (prev === false) {
      return curr as TaskStateDiff;
    }

    const diff = {} as TaskStateDiff;

    if (curr.audioIsPlaying !== prev.audioIsPlaying) {
      diff.audioIsPlaying = curr.audioIsPlaying;
    }
    if (curr.isGifMode !== prev.isGifMode) {
      diff.isGifMode = curr.isGifMode;
    }
    if (curr.videoPlayState !== prev.videoPlayState) {
      diff.videoPlayState = curr.videoPlayState;
    }

    if (curr.blockFormInput !== prev.blockFormInput) {
      diff.blockFormInput = curr.blockFormInput;
    }
    if (curr.blockResponseButton !== prev.blockResponseButton) {
      diff.blockResponseButton = curr.blockResponseButton;
    }
    if (curr.blockAudio !== prev.blockAudio) {
      diff.blockAudio = curr.blockAudio;
    }
    if (curr.blockVideo !== prev.blockVideo) {
      diff.blockVideo = curr.blockVideo;
    }
    return diff;
  },
};
