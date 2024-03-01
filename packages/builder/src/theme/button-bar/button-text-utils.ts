const SPLITTER = " ";

const maxWordLength = (text: string) => {
  const splitt = text.split(" ");
  return Math.max(...splitt.map((w) => w.length));
};

type Splitted = {
  index: number;
  first: string;
  second: string;
  longest: number;
  lineDiff: number;
};

const allSplits = (text: string): ReadonlyArray<Splitted> => {
  const lines = text.split(SPLITTER);
  const slices: Array<Splitted> = [];
  lines.forEach((line, index, array) => {
    const first = array.slice(0, index).join(SPLITTER);
    const last = array.slice(index).join(SPLITTER);
    const longest = Math.max(first.length, last.length);
    const lineDiff = Math.abs(first.length - last.length);
    const slice: Splitted = {
      first,
      second: last,
      index,
      longest,
      lineDiff,
    };

    slices.push(slice);
  });

  return slices;
};

const splitInTwo = (buttonText: string) => {
  const all = allSplits(buttonText);
  let result = { first: "", last: "", longest: 0 };
  all.forEach((slice, index) => {
    if (index === 0) {
      result.first = slice.first;
      result.last = slice.second;
      result.longest = slice.longest;
    } else if (result.longest > slice.longest) {
      result.first = slice.first;
      result.last = slice.second;
      result.longest = slice.longest;
    }
  });

  return result;
};

type ButtonTextLength = {
  readonly text: string;
  /**
   * Text is on one line.
   */
  readonly max: number;
  /**
   * Text is on two lines.
   */
  readonly min: number;
};
const checkLength = (buttonText: string): ButtonTextLength => {
  const max = buttonText.length;
  const onTwo = splitInTwo(buttonText);
  const min = onTwo.longest;
  return {
    text: buttonText,
    min,
    max,
  };
};

type ButtonTextSanitized = string & { __sanitized: true };
export class ButtonTextState {
  private readonly text: string;
  private _isSplit: boolean;
  private readonly twoLineWidth: number;
  private readonly oneLineWidth: number;

  get width() {
    return this._isSplit ? this.twoLineWidth : this.oneLineWidth;
  }

  get isSplit() {
    return this._isSplit;
  }

  get canSplit() {
    return this.oneLineWidth > this.twoLineWidth;
  }

  get splitDiff() {
    return this.oneLineWidth - this.twoLineWidth;
  }
  // get si
  constructor(text: string) {
    this.text = text;
    this.oneLineWidth = text.length;
    this._isSplit = false;
    this.twoLineWidth = splitInTwo(text).longest;
  }
  tryToSplit() {
    this._isSplit = true;
  }
  unSplit() {
    this._isSplit = false;
  }
  getState() {
    const sanitizedText = this.text as ButtonTextSanitized;
    return { raw: this.text, sanitizedText, isSplit: this._isSplit, width: this.width };
  }
}

type FittedButton = {
  width: number;
  isSingleLine: boolean;
};

type FitAllOptions = {
  oneLine: { min: number; max: number };
  twoLine: { min: number; max: number };
};

type FittedResult = {
  success: boolean;
  isSingleLine: boolean;
  requiredSpace: number;
  twoLineCount: number;
  result: ReadonlyArray<FittedButton>;
};

const sumReducer = (acc: number, number: number) => acc + number;

/**
 * Calculates the sum of an array of numbers.
 *
 * @param {number[]} numbers - An array of numbers to calculate the sum for.
 * @returns {number} - The sum of the numbers in the array.
 */
const sum = (numbers: number[]): number => {
  return numbers.reduce(sumReducer, 0);
};

export class ButtonBarState {
  private readonly buttons: ReadonlyArray<ButtonTextState>;
  private readonly oneLineMax: number;
  constructor(buttons: ReadonlyArray<string>, options: { oneLineMax: number; twoLineMax: number }) {
    this.buttons = buttons.map((text) => new ButtonTextState(text));
    // this.fitAllOptions = fitAllOptions;
    this.oneLineMax = options.oneLineMax;
  }

  fitAll() {
    // const result = fitAll(this.buttons, this.fitAllOptions);
    // return result;
  }
  isFitting(): boolean {
    return this.getWidth() <= this.oneLineMax;
  }
  getWidth() {
    return this.buttons.reduce((acc, b) => acc + b.width, 0);
  }
  isOneLine() {
    return this.buttons.every((b) => !b.isSplit);
  }

  compressOneButton(): boolean {
    let btn: ButtonTextState | false = false;
    let didCompress = false;
    this.buttons.forEach((b) => {
      if (!didCompress && b.canSplit) {
        b.tryToSplit();
        didCompress = true;
      }
    });

    return didCompress;
  }
  canCompress() {
    return true;
    // return this.buttons.some((b) => b.canSplit);
  }
}
const fitAll = (buttons: string[], options: FitAllOptions): FittedResult => {
  const bar = new ButtonBarState(buttons, {
    oneLineMax: options.oneLine.max,
    twoLineMax: options.twoLine.max,
  });

  let isSingleLine = true;

  // isSingleLine = state.every((b) => !b.isSplit);
  // const requiredSpace = state.reduce((acc, b) => acc + b.width, 0);

  let requiredSpace = 0;
  let twoLineCount = 0;
  if (!isSingleLine) {
    twoLineCount = 1;
  }

  // const result = textWithLengths.map((text) => {
  //   if (text.max <= options.oneLine.max) {
  //     requiredSpace+= text.max;
  //     return { width: text.max, isSingleLine: true };
  //   } else if (text.min <= options.twoLine.max) {
  //     twoLineCount++;
  //     return { width: text.min, isSingleLine: false };
  //   } else {
  //     requiredSpace += text.min;
  //     return { width: text.min, isSingleLine: false };
  //   }
  // });
  return {
    success: true,
    isSingleLine,
    requiredSpace,
    twoLineCount,
    result: [],
  };
};

export const buttonTextUtils = {
  checkLength,
  fitAll,
  splitInTwo,
  allSplits,
  maxWordLength,
} as const;
