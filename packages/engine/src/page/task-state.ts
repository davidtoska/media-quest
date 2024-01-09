export type TaskState = {
  audioIsPlaying: boolean;
  isGifMode: boolean;
  videoIsPlaying: boolean;
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
      a.videoIsPlaying === b.videoIsPlaying &&
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
    if (curr.videoIsPlaying !== prev.videoIsPlaying) {
      diff.videoIsPlaying = curr.videoIsPlaying;
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
