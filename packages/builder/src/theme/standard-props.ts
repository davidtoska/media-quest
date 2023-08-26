import { DState, BooleanStateProperty } from "@media-quest/engine";

export namespace DStateProps {
  export const mediaBlockedBySequence = new BooleanStateProperty(
    "media-blocked-by-autoplay-sequence",
    false,
    "Should be true if the page is in a autoplay-sequence. The autoplay-sequence will always block other media.",
  );
  export const inputBlockingBySequence = new BooleanStateProperty("input-blocked-by-autoplay-sequence", false, "");
  export const mediaBlockedByAudio = new BooleanStateProperty("media-blocked-by-audio", false, "");
  export const inputBlockedByAudio = new BooleanStateProperty("input-blocked-by-audio", false, "");
  export const mediaBlockedByVideo = new BooleanStateProperty("media-blocked-by-video", false, "");
  export const inputBlockedByVideo = new BooleanStateProperty(
    "input-blocked-by-video",
    false,
    "Should be true if a video is playing, and this video is suppose to block user-input.",
  );
  export const userPausedVideo = new BooleanStateProperty(
    "user-paused-video",
    false,
    "Should be true if user paused the video by pressing the pause-button.",
  );
  export const videoIsPlaying = new BooleanStateProperty(
    "video-is-playing",
    false,
    "Should be true if any video is playing on the page.",
  );
  export const audioIsPlaying = new BooleanStateProperty(
    "audio-is-playing",
    false,
    "Should be tru if any audio is playing on page",
  );
  const _props = {
    inputBlockedByAudio,
    mediaBlockedByAudio,
    inputBlockingBySequence,
    mediaBlockedBySequence,
    inputBlockedByVideo,
    mediaBlockedByVideo,
    userPausedVideo,
    videoIsPlaying,
  };

  const disableAudioIconQuery: DState.StateQuery = {
    name: "disable-Audio",
    condition: {
      kind: "complex-condition",
      name: "audio-controls-are-blocked",
      some: [
        mediaBlockedBySequence.getIsTrueCondition(),
        mediaBlockedByAudio.getIsTrueCondition(),
        mediaBlockedByVideo.getIsTrueCondition(),
      ],
      all: [],
    },
  };
  const hideVideoPlayQuery: DState.StateQuery = {
    name: "hide-video-play-button",
    condition: {
      kind: "complex-condition",
      name: "video-is-playing-condition",
      all: [videoIsPlaying.getIsTrueCondition()],
      some: [],
    },
  };

  const hideVideoPauseQuery: DState.StateQuery = {
    name: "hide-video-pause-button",
    condition: {
      kind: "complex-condition",
      name: "video-is-not-playing-condition",
      all: [videoIsPlaying.getIsFalseCondition()],
      some: [],
    },
  };

  const disableVideoPlayQuery: DState.StateQuery = {
    name: "disable-video",
    condition: {
      kind: "complex-condition",
      name: "video-play shall be disabled",
      all: [userPausedVideo.getIsFalseCondition()],
      some: [
        mediaBlockedBySequence.getIsTrueCondition(),
        mediaBlockedByAudio.getIsTrueCondition(),
        mediaBlockedByVideo.getIsTrueCondition(),
        audioIsPlaying.getIsTrueCondition(),
      ],
    },
  };
  const disableUserInputQuery: DState.StateQuery = {
    name: "disable-user-input",
    condition: {
      kind: "complex-condition",
      name: "User input shall be disabled (Response-buttons, FormControls...)",
      all: [],
      some: [
        inputBlockedByAudio.getIsTrueCondition(),
        inputBlockedByVideo.getIsTrueCondition(),
        inputBlockingBySequence.getIsTrueCondition(),
      ],
    },
  };
  export const _Queries = {
    disableAudioIconQuery,
    disableVideoPlayQuery,
    disableUserInputQuery,
    hideVideoPauseQuery,
    hideVideoPlayQuery,
  };
  export const allDefaultProperties = Object.values(_props);
  export const allDefaultQueries = Object.values(_Queries);
}
