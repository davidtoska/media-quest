import { DUtil } from "@media-quest/engine";
import { BuilderPage, BuilderPageDto } from "./Builder-page";
import { PageID, PagePrefix, SumScoreVariableID } from "../public-api";
import { SumScoreVariableCollection } from "../sum-score/sum-score-variable-collection";
import { SumScoreVariable } from "../sum-score/sum-score-variable";

const U = DUtil;
export type BuilderPageType = "info-page" | "question";

export class BuilderPageCollection implements Iterable<BuilderPage> {
  private _all: Array<BuilderPage> = [];

  public static create(pages: BuilderPageDto[]) {
    const page = new BuilderPageCollection(pages);
    page._all = pages.map((p) => BuilderPage.fromJson(p));
    return page;
  }
  private constructor(initialPages: BuilderPageDto[]) {}

  /** @internal - used by Schema*/
  _init(pages: BuilderPageDto[]) {
    this._all = pages.map(BuilderPage.fromJson);
  }

  add(type: BuilderPageType, atIndex = -1): BuilderPage {
    const pagePrefix = PagePrefix.create();
    const newPage = BuilderPage.create(type, pagePrefix.value);
    if (atIndex >= 0 && atIndex < this._all.length) {
      this._all.splice(atIndex, 0, newPage);
    } else {
      this._all.push(newPage);
    }
    return newPage;
  }

  deleteById(id: PageID) {
    const index = this._all.findIndex((p) => p.id === id);
    if (index !== -1) {
      this._all.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  private getPageById(pageId: PageID) {
    const maybePage = this._all.find((p) => p.id === pageId);
    return maybePage ?? false;
  }
  get size() {
    return this._all.length;
  }
  get pages(): ReadonlyArray<BuilderPage> {
    return [...this._all];
  }
  toJson(): ReadonlyArray<BuilderPageDto> {
    return this._all.map((p) => p.toJson());
  }

  [Symbol.iterator]() {
    const list = [...this._all];
    return list[Symbol.iterator]();
  }

  movePage(page: BuilderPage, toIndex: number) {
    const index = this._all.indexOf(page);
    if (index < 0) {
      return false;
    }
    const isValidIndex = U.isInRange(0, this._all.length - 1);
    if (!isValidIndex(toIndex)) {
      return false;
    }
    // console.log('Moving from :' + index + ' to: ' + toIndex);
    this._all.splice(index, 1);
    this._all.splice(toIndex, 0, page);
    return true;
  }

  insertPage(page: BuilderPage, atIndex: number) {
    const isValidIndex = U.isInRange(0, this._all.length - 1);
    if (!isValidIndex(atIndex)) {
      return false;
    }
    const exists = !!this._all.find((p) => p.id === page.id);
    if (exists) {
      return false;
    }
    this._all.splice(atIndex, 0, page);
    return true;
  }

  addSumScoreVariable(sumScoreVariable: SumScoreVariable, pageId: PageID, weight: number) {
    const maybePage = this.getPageById(pageId);
    if (!maybePage) return false;
    maybePage.sumScoreVariableSet(sumScoreVariable, weight);

    // maybePage.addSumScoreVariable(maybeVariable, weight);
    return true;
  }

  updateAllData(context: { sumScoreVariables: ReadonlyArray<SumScoreVariable> }) {
    this._all.forEach((p) => {
      p.sumScoreVariableUpdateData(context.sumScoreVariables);
    });
  }

  sumScoreVariableDelete(sumScoreVariableID: SumScoreVariableID) {
    this._all.forEach((p) => {
      p.sumScoreVariableDelete(sumScoreVariableID);
    });
  }
}
