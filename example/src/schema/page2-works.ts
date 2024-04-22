import { IExampleSchema } from "./IExample-schema";
import * as E from "../../../packages/engine/src/public-api";
import * as B from "../../../packages/builder/src/public-api";
import { getDummyAudioFiles, dummyVideoFiles } from "../dummy-data/hardcoded-media";

const dummyAudioFiles = getDummyAudioFiles();
const playVideoTask0 = (
  priority: E.PlayVideoTask["priority"],
  mode: "gif" | "normal" = "normal",
): E.PlayVideoTask => ({
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

const playAudioTask0 = (priority: E.PlayAudioTask["priority"]): E.PlayAudioTask => ({
  kind: "play-audio-task",
  url: dummyAudioFiles[0].downloadUrl,
  audioId: "id_audio_1_url",
  blockResponseButton: false,
  blockFormInput: true,
  priority,
  blockAudio: false,
  blockVideo: false,
});
const createText = (text: string): E.DTextDto => ({
  _tag: "p",
  innerText: text,
  style: { x: 20, y: 70, fontSize: { _unit: "px", value: 60 }, backgroundColor: "gray" },
});

const createNextButton = (): E.DButtonDto => ({
  _tag: "button",
  style: {
    x: 30,
    y: 5,
    w: 40,
    h: 10,
    backgroundColor: "red",
    textColor: "yellow",
    fontSize: { _unit: "px", value: 60 },
  },
  innerText: "Next btn ",
  onClick: { kind: "next-page" },
});

const playVideoBtn = (task: E.PlayVideoTask) => {
  const btn: E.DDivDto = {
    _tag: "div",
    style: {
      x: 0,
      y: 35,
      w: 10,
      h: 10,
      fontSize: { _unit: "px", value: 40 },
      backgroundColor: "gray",
    },
    children: [],
    innerText: "Play video",
    onClick: { kind: "play-video", task },
  };
  return btn;
};
const pauseVideoBtn = (): E.DDivDto => {
  const btn: E.DDivDto = {
    _tag: "div",
    style: {
      x: 20,
      y: 35,
      w: 10,
      h: 10,
      fontSize: { _unit: "px", value: 40 },
      backgroundColor: "gray",
    },
    children: [],
    innerText: "Pause video",
    onClick: { kind: "pause-video" },
  };
  return btn;
};

const playAudioBtn = (task: E.PlayAudioTask): E.DDivDto => {
  const btn: E.DDivDto = {
    _tag: "div",
    style: {
      x: 0,
      y: 20,
      w: 10,
      h: 10,
      fontSize: { _unit: "px", value: 40 },
      backgroundColor: "gray",
    },
    children: [],
    innerText: "Play audio",
    onClick: { kind: "play-audio", task },
  };
  return btn;
};

const pauseAudioBtn = (): E.DDivDto => {
  const btn: E.DDivDto = {
    _tag: "div",
    style: {
      x: 20,
      y: 20,
      w: 10,
      h: 10,
      fontSize: { _unit: "px", value: 40 },
      backgroundColor: "gray",
    },
    children: [],
    innerText: "Pause audio",
    onClick: { kind: "pause-audio" },
  };
  return btn;
};
export const Page2Works: IExampleSchema = {
  menuLabel: "page2-works",
  schema: {
    id: "spu:dummy-schema" as B.SchemaID,
    baseHeight: 1300,
    baseWidth: 1024,
    backgroundColor: "white",

    pages: [
      {
        id: B.PageID.create(),
        background: "white",
        pageNumber: 0,
        prefix: B.PagePrefix.create().value,
        tags: [],
        elements: [
          {
            _tag: "div",
            children: [
              {
                _tag: "button",
                innerText: "Button1",
                style: { backgroundColor: "blue", display: "block", position: "relative" },
              },
              {
                _tag: "button",
                innerText: "B2",
                style: {
                  backgroundColor: "blue",
                  display: "block",
                  position: "relative",
                  borderColor: "",
                  borderRadius: { _unit: "px", value: 50 },
                },
              },
            ],
            style: {
              x: 5,
              y: 40,
              h: 10,
              w: 90,
              backgroundColor: "red",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            },
          },
          playVideoBtn(playVideoTask0("replace-all")),
          createNextButton(),
          pauseVideoBtn(),
        ],
        videoPlayer: { playUrl: playVideoTask0("replace-all").url },
        initialTasks: [],
      },
      {
        id: B.PageID.create(),
        pageNumber: 1,
        background: "white",
        prefix: B.PagePrefix.create().value,
        elements: [
          createText("Audio works"),
          playAudioBtn(playAudioTask0("replace-all")),
          createNextButton(),
          pauseAudioBtn(),
        ],
        tags: [],
        initialTasks: [],
      },
      {
        id: B.PageID.create(),
        pageNumber: 2,
        background: "white",
        prefix: B.PagePrefix.create().value,
        tags: [],
        elements: [
          createText("Gif-mode works"),
          pauseVideoBtn(),
          createNextButton(),
          playAudioBtn(playAudioTask0("replace-all")),
          playVideoBtn(playVideoTask0("replace-all")),
          pauseAudioBtn(),
        ],
        initialTasks: [playVideoTask0("follow-queue", "gif")],
      },
      {
        id: B.PageID.create(),
        pageNumber: 3,
        prefix: B.PagePrefix.create().value,
        tags: [],
        elements: [
          createText("Destroy mode works"),
          pauseVideoBtn(),
          createNextButton(),
          playAudioBtn(playAudioTask0("replace-all")),
          playVideoBtn(playVideoTask0("replace-all")),
          pauseAudioBtn(),
        ],
        background: "white",
        initialTasks: [playVideoTask0("follow-queue"), playAudioTask0("follow-queue")],
      },
      {
        id: B.PageID.create(),
        pageNumber: 4,
        prefix: B.PagePrefix.create().value,
        tags: [],
        elements: [
          createText("Video works"),
          pauseVideoBtn(),
          createNextButton(),
          playVideoBtn(playVideoTask0("replace-all")),
        ],
        background: "white",
        videoPlayer: { playUrl: playVideoTask0("replace-all").url },
        initialTasks: [],
      },
    ],
    rules: [],
  },
};
