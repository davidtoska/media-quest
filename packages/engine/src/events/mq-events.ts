import { DTimestamp } from "../common/DTimestamp";
interface _MqEvent<K extends string, P extends object> {
  readonly kind: K;
  readonly timestamp: DTimestamp;
  readonly payload: P;
}

export type MqEventEngineStart = _MqEvent<
  "engine-start",
  {
    readonly schemaId: string;
    readonly schemaPrefix: string;
  }
>;
export interface MqEventPageEnter
  extends _MqEvent<
    "page-enter",
    { readonly pageId: string; readonly pageNumber: number; readonly pagePrefix: string }
  > {}

export interface MqEventPageLeave
  extends _MqEvent<
    "page-leave",
    { readonly pageId: string; readonly pageNumber: number; readonly pagePrefix: string }
  > {}

export type MqEventUserClicked = _MqEvent<
  "user-clicked",
  {
    readonly pageId: string;
    readonly pagePrefix: string;
    readonly pageNumber: number;
    action: string;
    descriptions: string;
  }
>;

export type MqEvent = MqEventPageEnter | MqEventPageLeave | MqEventEngineStart | MqEventUserClicked;

export const MqEvent = {
  engineStart(schemaId: string, schemaPrefix: string): MqEventEngineStart {
    return {
      kind: "engine-start",
      timestamp: DTimestamp.now(),
      payload: { schemaId, schemaPrefix },
    };
  },
  pageEnter(pageId: string, pagePrefix: string, pageNumber: number): MqEventPageEnter {
    return {
      kind: "page-enter",
      timestamp: DTimestamp.now(),
      payload: { pageId, pagePrefix, pageNumber },
    };
  },
  pageLeave(pageId: string, pagePrefix: string, pageNumber: number): MqEventPageLeave {
    return {
      kind: "page-leave",
      timestamp: DTimestamp.now(),
      payload: { pageId, pagePrefix, pageNumber },
    };
  },
  userClicked(data: {
    pageId: string;
    pagePrefix: string;
    pageNumber: number;
    action: string;
    descriptions: string;
  }): MqEventUserClicked {
    const { pageId, pageNumber, pagePrefix, action, descriptions } = data;
    return {
      kind: "user-clicked",
      timestamp: DTimestamp.now(),
      payload: { pageId, pagePrefix, action, descriptions, pageNumber },
    };
  },
} as const;
