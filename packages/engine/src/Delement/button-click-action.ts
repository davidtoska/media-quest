import { PlayAudioTask, PlayVideoTask } from "../page/task";
import { Fact } from "../rules/fact";

export type ButtonClickAction =
  | { kind: "play-audio"; task: PlayAudioTask }
  | { kind: "pause-audio" }
  | { kind: "play-video"; task: PlayVideoTask }
  | { kind: "pause-video" }
  | { kind: "submit-fact"; fact: Fact }
  | { kind: "next-page" }
  | { kind: "submit-form" };

export const ButtonClickAction = {
  describe: (a: ButtonClickAction): string => {
    switch (a.kind) {
      case "next-page":
        return "go to next page";
      case "play-video":
        return "VideoId = " + a.task.videoId;
      case "play-audio":
        return "AudioId = " + a.task.audioId;
      case "pause-video":
        return "";
      case "pause-audio":
        return "";
      case "submit-fact":
        return a.fact.label + " = " + a.fact.value;
      case "submit-form":
        return "";
      default:
        const _exhaustiveCheck: never = a;
        return "";
    }
  },
};
