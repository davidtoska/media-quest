import { DImgDto } from "../Delement/DImg";
import { DTextDto } from "../Delement/DText";
import { DDivDto } from "../Delement/Ddiv";
import { DElementBaseDto } from "../Delement/DElement";

export type DElementDto = DTextDto | DImgDto | DDivDto;

export interface DVideoDto extends DElementBaseDto {
  readonly _tag: "video";
  readonly id: string;
  readonly url: string;
  // readonly loop: boolean;
}

export interface DAudioDto {
  readonly id: string;
  readonly _tag: "audio";
  readonly url: string;
  // readonly eventHandlers: ReadonlyArray<DEventHandler>;

  // readonly isMediaBlocking: boolean;
}
