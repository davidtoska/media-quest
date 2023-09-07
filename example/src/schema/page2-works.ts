import { IExampleSchema } from "./IExample-schema";
import { DDivDto, DTextDto, PageID, SchemaID } from "../../../packages/engine";
import { Page2Dto } from "../../../packages/engine/src/page2/Page2";
import { dummyAudioFiles, dummyVideoFiles } from "../dummy-data/hardcoded-media";
import { PlayAudioTask, PlayVideoTask, Task } from "../../../packages/engine/src/page2/task";

const playVideoTask0 = (priority: PlayVideoTask["priority"], mode: "gif" | "normal" = "normal"): PlayVideoTask => ({
  kind: "play-video-task",
  url: dummyVideoFiles[1].downloadUrl,
  videoId: dummyVideoFiles[1].id,
  blockResponseButton: false,
  blockFormInput: true,
  priority,
  loop: mode === "gif",
  blockAudio: false,
  blockVideo: false,
  startAt: 0,
  stopAt: "end",
  volume: 1,
});

const playAudioTask0 = (priority: PlayAudioTask["priority"]): PlayAudioTask => ({
  kind: "play-audio-task",
  url: dummyAudioFiles[0].downloadUrl,
  audioId: "id_audio_1_url",
  blockResponseButton: false,
  blockFormInput: true,
  priority,
  blockAudio: false,
  blockVideo: false,
});
const createText = (text: string): DTextDto => ({
  _tag: "p",
  innerText: text,
  style: { x: 20, y: 70, fontSize: { _unit: "px", value: 60 }, backgroundColor: "gray" },
});

const createNextButton = (): DDivDto => ({
  _tag: "div",
  style: {
    x: 30,
    y: 5,
    w: 40,
    h: 10,
    backgroundColor: "red",
    textColor: "yellow",
    fontSize: { _unit: "px", value: 60 },
  },
  children: [],
  innerText: "Next btn ",
  onClick2: { kind: "next-page" },
});

const playVideoBtn = (task: PlayVideoTask) => {
  const btn: DDivDto = {
    _tag: "div",
    style: { x: 0, y: 35, w: 10, h: 10, fontSize: { _unit: "px", value: 40 }, backgroundColor: "gray" },
    children: [],
    innerText: "Play video",
    onClick2: {
      kind: "play-video",
      task,
    },
  };
  return btn;
};
const pauseVideoBtn = () => {
  const btn: DDivDto = {
    _tag: "div",
    style: { x: 20, y: 35, w: 10, h: 10, fontSize: { _unit: "px", value: 40 }, backgroundColor: "gray" },
    children: [],
    innerText: "Pause video",
    onClick2: {
      kind: "pause-video",
    },
  };
  return btn;
};

const playAudioBtn = (task: PlayAudioTask) => {
  const btn: DDivDto = {
    _tag: "div",
    style: { x: 0, y: 20, w: 10, h: 10, fontSize: { _unit: "px", value: 40 }, backgroundColor: "gray" },
    children: [],
    innerText: "Play audio",
    onClick2: {
      kind: "play-audio",
      task,
    },
  };
  return btn;
};

const pauseAudioBtn = () => {
  const btn: DDivDto = {
    _tag: "div",
    style: { x: 20, y: 20, w: 10, h: 10, fontSize: { _unit: "px", value: 40 }, backgroundColor: "gray" },
    children: [],
    innerText: "Pause audio",
    onClick2: {
      kind: "pause-audio",
    },
  };
  return btn;
};
export const Page2Works: IExampleSchema = {
  menuLabel: "page2-works",
  schema: {
    id: "spu:dummy-schema" as SchemaID,
    baseHeight: 1300,
    baseWidth: 1024,
    backgroundColor: "white",

    pages2: [
      {
        id: PageID.create(),
        background: "white",
        tags: [],
        staticElements: [createText("Video works")],
        videoPlayer: { playUrl: playVideoTask0("replace-all").url },
        responseButtons: [createNextButton()],
        mediaControls: [playVideoBtn(playVideoTask0("replace-all")), pauseVideoBtn()],
        initialTasks: [],
      },
      {
        id: PageID.create(),
        background: "white",
        tags: [],
        staticElements: [createText("Audio works")],
        responseButtons: [createNextButton()],
        mediaControls: [playAudioBtn(playAudioTask0("replace-all")), pauseAudioBtn()],
        initialTasks: [],
      },
      {
        id: PageID.create(),
        background: "white",
        tags: [],
        staticElements: [createText("Gif-mode works")],
        responseButtons: [createNextButton()],
        mediaControls: [
          playVideoBtn(playVideoTask0("replace-all")),
          pauseVideoBtn(),
          playAudioBtn(playAudioTask0("replace-all")),
          pauseAudioBtn(),
        ],
        initialTasks: [playVideoTask0("follow-queue", "gif")],
      },
      {
        id: PageID.create(),
        tags: [],
        background: "white",
        staticElements: [createText("Destroy mode works")],
        responseButtons: [createNextButton()],
        mediaControls: [
          playVideoBtn(playVideoTask0("replace-all")),
          pauseVideoBtn(),
          playAudioBtn(playAudioTask0("replace-all")),
          pauseAudioBtn(),
        ],
        initialTasks: [playVideoTask0("follow-queue"), playAudioTask0("follow-queue")],
      },
      {
        id: PageID.create(),
        tags: [],
        staticElements: [createText("Video works")],
        background: "white",
        videoPlayer: { playUrl: playVideoTask0("replace-all").url },
        responseButtons: [createNextButton()],
        mediaControls: [playVideoBtn(playVideoTask0("replace-all")), pauseVideoBtn()],
        initialTasks: [],
      },
    ],
    pages: [],
    rules: [],
  },
};
