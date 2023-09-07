import { DElement } from "../Delement/DElement";
import { DDiv, DDivDto } from "../Delement/Ddiv";
import { DImg } from "../Delement/DImg";
import { DText } from "../Delement/DText";
import { DElementDto } from "../dto/DElement.dto";
import { ScaleService } from "./scale";

export const createDElement = (dto: DElementDto, scale: ScaleService): DElement<any> => {
  switch (dto._tag) {
    case "div":
      const childEls = createChildrenForDiv(dto, scale);
      const newDiv = new DDiv(dto, scale, childEls);
      return newDiv;
    case "img":
      return new DImg(dto, scale);
    case "p":
      return new DText(dto, scale);
    default:
      const check: never = dto;
      throw new Error("Unknown dto given to the createDElement function.");
    // TODO LOGGING or create any HTML-ELEMENT??
  }
};

const createChildrenForDiv = (dto: DDivDto, scale: ScaleService): DDiv["children"] => {
  const childDto = dto.children;
  const childEls: Array<DImg | DText> = [];
  // console.log(childElements);
  childDto.forEach((dto) => {
    if (dto._tag === "p") {
      const newText = new DText(dto, scale);
      childEls.push(newText);
    }
    if (dto._tag === "img") {
      const newImage = new DImg(dto, scale);
      childEls.push(newImage);
    }
  });
  return childEls;
};
