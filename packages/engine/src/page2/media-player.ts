import { DStyle, PStyle } from "../Delement/DStyle";

type MediaPlayerEvent =
  | { kind: "video-ended"; url: string }
  | { kind: "audio-ended"; url: string }
  | { kind: "error"; message: string };
export interface IMediaPlayer {
  playVideo(url: string, loop: boolean): void;

  playAudio(url: string, loop: boolean): void;

  pauseVideo(): void;

  pauseAudio(): void;

  clear(): void;
  hideVideo(): void;
  loadVideo(url: string): void;
  appendToParent(el: { appendChild: (el: HTMLElement) => void }): void;
}

export const createMediaPlayer = (onEvent: (mediaPlayerEvent: MediaPlayerEvent) => void): IMediaPlayer => {
  const videoElement = document.createElement("video");
  const audioElement = document.createElement("audio");
  const videoStyles: PStyle = { h: 40, w: 80, borderStyle: "solid", borderWidth: { _unit: "px", value: 5 } };

  DStyle.normalize(videoElement);
  DStyle.applyStyles(videoElement, videoStyles, 1);
  videoElement.onended = () => {
    console.log("VIDEO ENDED");
  };
  videoElement.onerror = () => {
    console.log("VIDEO ERROR WHY ?? ");
  };
  audioElement.onended = () => {
    console.log("AUDIO ENDED");
  };

  const playVideo = (url: string, loop = false) => {
    if (videoElement.src !== url) {
      videoElement.src = url;
    }

    try {
      videoElement.play();
    } catch (e) {
      console.log("VIDEO PLAY ERROR");
      console.log(e);
    }
  };

  const playAudio = (url: string, loop = false) => {
    audioElement.loop = loop;
    if (audioElement.src !== url) {
      audioElement.src = url;
    }
    // audioElement.play();
    try {
      audioElement.play();
    } catch (e) {
      console.log("AUDIO PLAY ERROR");
      console.log(e);
    }
  };

  const showVideo = () => {
    videoElement.style.visibility = "visible";
  };

  const pauseVideo = () => {
    try {
      videoElement.pause();
    } catch (e) {
      console.log("VIDEO PAUSE ERROR");
      console.log(e);
    }
  };

  const loadVideo = (url: string) => {
    if (videoElement.src !== url) {
      videoElement.src = url;
    }
  };
  const pauseAudio = () => {
    try {
      audioElement.pause();
    } catch (e) {
      console.log("AUDIO PAUSE ERROR");
      console.log(e);
    }
  };
  const appendToParent = (el: { appendChild: (el: HTMLElement) => void }) => {
    el.appendChild(videoElement);
    el.appendChild(audioElement);
  };
  const clear = () => {
    pauseVideo();
    pauseAudio();
    videoElement.src = "";
    audioElement.src = "";
  };
  const hideVideo = () => {
    videoElement.style.visibility = "hidden";
  };

  return {
    playVideo,
    playAudio,
    pauseVideo,
    loadVideo,
    clear,
    pauseAudio,
    hideVideo,
    appendToParent,
    // mediaLayer,
    // videoElement,
    // audioElement,
    // videoStyles,
  };
};
