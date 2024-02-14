import { DElement } from "./DElement";
import { DDiv, DDivDto } from "./Ddiv";
import { DImg } from "./DImg";
import { DText } from "./DText";
import { ScaleService } from "../engine/scale";
import { DElementDto } from "./DElement.dto";
import { DButton } from "./DButton";

export const createDElement = (dto: DElementDto, scale: ScaleService): DElement<any> => {
  switch (dto._tag) {
    case "div":
      const childEls = createChildrenForDiv(dto, scale);
      return new DDiv(dto, scale, childEls);
    case "img":
      return new DImg(dto, scale);
    case "p":
      return new DText(dto, scale);
    case "button":
      return new DButton(dto, scale);
    default:
      const check: never = dto;
      throw new Error("Unknown dto given to the createDElement function.");
    // TODO LOGGING or create any HTML-ELEMENT??
  }
};

const createChildrenForDiv = (dto: DDivDto, scale: ScaleService): DDiv["children"] => {
  const childDto = dto.children;
  const childEls: Array<DImg | DText | DButton> = [];
  childDto.forEach((dto) => {
    switch (dto._tag) {
      case "p":
        const newText = new DText(dto, scale);
        childEls.push(newText);
        break;
      case "img":
        const newImage = new DImg(dto, scale);
        childEls.push(newImage);
        break;
      case "button":
        const newButton = new DButton(dto, scale);
        childEls.push(newButton);
        break;
      default:
        const check: never = dto;
    }
  });
  return childEls;
};
