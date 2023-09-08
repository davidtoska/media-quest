export type TaskState = {
  audioIsPlaying: boolean;
  isGifMode: boolean;
  videoIsPlaying: boolean;
  blockFormInput: boolean;
  blockResponseButton: boolean;
  blockAudio: boolean;
  blockVideo: boolean;
};
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

  getDiff: (a: TaskState, b: TaskState): Partial<TaskState> => {
    const diff: Partial<TaskState> = {};
    if (a.audioIsPlaying !== b.audioIsPlaying) {
      diff.audioIsPlaying = b.audioIsPlaying;
    }
    if (a.isGifMode !== b.isGifMode) {
      diff.isGifMode = b.isGifMode;
    }
    if (a.videoIsPlaying !== b.videoIsPlaying) {
      diff.videoIsPlaying = b.videoIsPlaying;
    }
    if (a.blockFormInput !== b.blockFormInput) {
      diff.blockFormInput = b.blockFormInput;
    }
    if (a.blockResponseButton !== b.blockResponseButton) {
      diff.blockResponseButton = b.blockResponseButton;
    }
    if (a.blockAudio !== b.blockAudio) {
      diff.blockAudio = b.blockAudio;
    }
    if (a.blockVideo !== b.blockVideo) {
      diff.blockVideo = b.blockVideo;
    }
    return diff;
  },
};
