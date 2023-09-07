import { PlayAudioTask, PlayVideoTask } from "../page2/task";
import { Fact } from "../rules/fact";

export type ButtonClickAction =
  | { kind: "play-audio"; task: PlayAudioTask }
  | { kind: "pause-audio" }
  | { kind: "play-video"; task: PlayVideoTask }
  | { kind: "pause-video" }
  | { kind: "submit-fact"; fact: Fact }
  | { kind: "next-page" }
  | { kind: "submit-form" };
