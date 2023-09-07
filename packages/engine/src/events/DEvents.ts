import { DTimestamp } from "../common/DTimestamp";
import { AnsweredQuestion } from "../player/history-que";

type EventProducer =
  | "DVideo"
  | "DUser"
  | "DAudio"
  | "DImage"
  | "MediaManager"
  | "DPage"
  | "Window"
  | "HOST"
  | "RuleEngine"
  | "Engine"
  | "STATE-SERVICE";

interface Ev<K extends EventKind, P extends EventProducer, T> {
  readonly kind: K;
  readonly timestamp: DTimestamp;
  readonly producer: P;
  readonly producerId: string;
  readonly data: T;
}

type EventKind = `${Uppercase<string>}_EVENT`;

export type AudioPlayEvent = Ev<"AUDIO_PLAY_EVENT", "DAudio", {}>;

export type DAudioEvent =
  | AudioPlayEvent
  // | AudioWillPlayEvent
  | Ev<"AUDIO_PAUSED_EVENT", "DAudio", {}>
  | Ev<"AUDIO_ENDED_EVENT", "DAudio", { url: string }>
  | Ev<"AUDIO_ERROR_EVENT", "DAudio", { error: unknown }>
  | Ev<"AUDIO_METADATA_LOADED_EVENT", "DAudio", {}>
  | Ev<"AUDIO_LOAD_EVENT", "DAudio", {}>
  | Ev<"AUDIO_CAN_PLAY_THROUGH_EVENT", "DAudio", {}>
  | Ev<"AUDIO_DURATION_CHANGE_EVENT", "DAudio", { duration: number; isInfinity: boolean }>
  | Ev<"AUDIO_PROGRESS_EVENT", "DAudio", {}>;

export type DVideoEvent =
  | Ev<"VIDEO_PLAY_EVENT", "DVideo", {}>
  | Ev<"VIDEO_PAUSED_EVENT", "DVideo", {}>
  | Ev<"VIDEO_ERROR_EVENT", "DVideo", { error: unknown }>
  | Ev<"VIDEO_EVENT", "DVideo", { error: unknown }>
  | Ev<"VIDEO_LOADED_METADATA_EVENT", "DVideo", { duration: number; isInfinity: boolean }>
  | Ev<"VIDEO_DURATION_CHANGE_EVENT", "DVideo", { duration: number; isInfinity: boolean }>
  | Ev<"VIDEO_PROGRESS_EVENT", "DVideo", { duration: number; progress: number }>
  | Ev<"VIDEO_ENDED_EVENT", "DVideo", {}>;

export type DImageEvent =
  | Ev<
      "IMAGE_LOADED_EVENT",
      "DImage",
      { naturalHeight: number; naturalWidth: number; loadTime: DTimestamp.Diff; height: number; width: number }
    >
  | Ev<"IMAGE_ERROR_EVENT", "DImage", { error: unknown }>;

export type DPageEvents =
  | Ev<"PAGE_ENTER_EVENT", "DPage", { pageId: string }>
  | Ev<"PAGE_COMPLETED_EVENT", "DPage", { pageId: string; answers: AnsweredQuestion[] }>;

export type DWindowEvents =
  | Ev<"WINDOW_VISIBILITY_CHANGE_EVENT", "Window", {}>
  | Ev<"WINDOW_ONLINE_STATUS_CHANGE_EVENT", "Window", {}>;

export type DEvent =
  | DImageEvent
  | DAudioEvent
  | DVideoEvent
  | DPageEvents
  | DWindowEvents
  | Ev<"USER_CLICKED_EVENT", "DUser", { elementId: string }>
  | Ev<"RULE_MATCH_EVENT", "Window", { ruleId: string }>
  | Ev<
      "ENGINE_SCHEMA_LOADED_EVENT",
      "Engine",
      { pageCount: number; hostHeight: number; hostWidth: number; scale: number }
    >
  | Ev<"HOST_SCALE_CHANGED_EVENT", "HOST", { scale: number }>;
