import { DElement, DElementBaseDto } from "./DElement";
import { ScaleService } from "../engine/scale";
import { DTimestamp } from "../common/DTimestamp";
import { ButtonClickAction } from "./button-click-action";

export interface DImgDto extends DElementBaseDto {
  readonly _tag: "img";
  // readonly id: string;
  readonly url: string;
}

export class DImg extends DElement<HTMLImageElement> {
  private static IMAGE_COUNT = 0;
  private readonly imageCount: number;
  readonly TAG: string;
  readonly TIMING_TAG: string;
  private readonly loadStart: DTimestamp;
  registerClickHandler(clickHandler: (action: ButtonClickAction) => void): void {
    this.el.onclick = () => {
      const action = this.dto.onClick;
      if (action) {
        clickHandler(action);
      }
    };
  }

  constructor(
    protected readonly dto: DImgDto,
    readonly scaleService: ScaleService,
  ) {
    super(document.createElement("img"), dto, scaleService);
    DImg.IMAGE_COUNT += 1;
    this.imageCount = DImg.IMAGE_COUNT;
    this.TAG = "[D_IMG " + DImg.IMAGE_COUNT + " ]: ";
    this.TIMING_TAG = "load-time (" + DImg.IMAGE_COUNT + ") ";
    this.el.loading = "eager";
    this.el.style.position = "absolute";
    this.setStyle(dto.style);

    this.loadStart = DTimestamp.now();
    this.el.onload = () => {};
    this.el.onerror = () => {};
    this.el.src = dto.url;
    console.time(this.TIMING_TAG);
  }

  log(): void {}
}
