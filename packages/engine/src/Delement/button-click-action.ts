import { PlayAudioTask, PlayVideoTask } from "../page/task";
import { Fact } from "../rules/fact";

export type ButtonClickAction =
  | { kind: "play-audio"; task: PlayAudioTask; vibrateMs?: number }
  | { kind: "pause-audio"; vibrateMs?: number }
  | { kind: "play-video"; task: PlayVideoTask; vibrateMs?: number }
  | { kind: "mute-video"; vibrateMs?: number }
  | { kind: "un-mute-video"; vibrateMs?: number }
  | { kind: "pause-video"; vibrateMs?: number }
  | { kind: "submit-fact"; fact: Fact; vibrateMs?: number }
  | { kind: "next-page"; vibrateMs?: number }
  | { kind: "submit-form"; vibrateMs?: number };

// export type ButtonClickAction = _ButtonClickAction & ;
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
      case "mute-video":
        return "mute-video";
      case "un-mute-video":
        return "un-mute-video";
      default:
        const _exhaustiveCheck: never = a;
        return "";
    }
  },
};
