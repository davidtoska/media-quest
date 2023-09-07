import { IExampleSchema } from "./IExample-schema";
import { DDivDto, DTextDto, PageComponent, PageID, SchemaID } from "../../../packages/engine";
import { dummyAudioFiles, dummyVideoFiles } from "../dummy-data/hardcoded-media";
import { PlayAudioTask, PlayVideoTask, Task } from "../../../packages/engine/src/page2/task";
import { PageComponentDto } from "../../../packages/engine/src/page2/page-component";

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

const createNextButton = (): PageComponentDto => ({
  el: {
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
  },
  onClick: { kind: "next-page" },
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
  const component: PageComponentDto = {
    el: btn,
    onClick: { kind: "play-video", task },
  };
  return component;
};
const pauseVideoBtn = (): PageComponentDto => {
  const btn: DDivDto = {
    _tag: "div",
    style: { x: 20, y: 35, w: 10, h: 10, fontSize: { _unit: "px", value: 40 }, backgroundColor: "gray" },
    children: [],
    innerText: "Pause video",
  };
  const component: PageComponentDto = {
    el: btn,
    onClick: { kind: "pause-video" },
  };
  return component;
};

const playAudioBtn = (task: PlayAudioTask): PageComponentDto => {
  const btn: DDivDto = {
    _tag: "div",
    style: { x: 0, y: 20, w: 10, h: 10, fontSize: { _unit: "px", value: 40 }, backgroundColor: "gray" },
    children: [],
    innerText: "Play audio",
  };
  const component: PageComponentDto = {
    el: btn,
    onClick: { kind: "play-audio", task },
  };
  return component;
};

const pauseAudioBtn = (): PageComponentDto => {
  const btn: DDivDto = {
    _tag: "div",
    style: { x: 20, y: 20, w: 10, h: 10, fontSize: { _unit: "px", value: 40 }, backgroundColor: "gray" },
    children: [],
    innerText: "Pause audio",
  };
  const component: PageComponentDto = {
    el: btn,
    onClick: { kind: "pause-audio" },
  };
  return component;
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
        staticElements: [],
        components: [
          playVideoBtn(playVideoTask0("replace-all")),
          createNextButton(),
          { el: createText("Video works"), onClick: { kind: "next-page" } },
          pauseVideoBtn(),
        ],
        videoPlayer: { playUrl: playVideoTask0("replace-all").url },
        initialTasks: [],
      },
      {
        id: PageID.create(),
        background: "white",
        components: [playAudioBtn(playAudioTask0("replace-all")), createNextButton(), pauseAudioBtn()],
        tags: [],
        staticElements: [createText("Audio works")],
        initialTasks: [],
      },
      {
        id: PageID.create(),
        background: "white",
        tags: [],
        components: [
          pauseVideoBtn(),
          createNextButton(),
          playAudioBtn(playAudioTask0("replace-all")),
          playVideoBtn(playVideoTask0("replace-all")),
          pauseAudioBtn(),
        ],
        staticElements: [createText("Gif-mode works")],
        initialTasks: [playVideoTask0("follow-queue", "gif")],
      },
      {
        id: PageID.create(),
        tags: [],
        components: [
          pauseVideoBtn(),
          createNextButton(),
          playAudioBtn(playAudioTask0("replace-all")),
          playVideoBtn(playVideoTask0("replace-all")),
          pauseAudioBtn(),
        ],
        background: "white",
        staticElements: [createText("Destroy mode works")],
        initialTasks: [playVideoTask0("follow-queue"), playAudioTask0("follow-queue")],
      },
      {
        id: PageID.create(),
        tags: [],
        staticElements: [createText("Video works")],
        background: "white",
        components: [pauseVideoBtn(), createNextButton(), playVideoBtn(playVideoTask0("replace-all"))],
        videoPlayer: { playUrl: playVideoTask0("replace-all").url },
        initialTasks: [],
      },
    ],
    pages: [],
    rules: [],
  },
};
