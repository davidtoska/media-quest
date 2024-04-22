import { DCss } from "./css";
import { DUtil } from "../utils/DUtil";

export type PStyle = Partial<DStyle>;
export interface DStyle {
  opacity: number;
  backgroundColor: string;
  visibility: "visible" | "hidden";
  cursor:
    | "pointer"
    | "help"
    | "copy"
    | "wait"
    | "not-allowed"
    | "context-menu"
    | "move"
    | "grabbing"
    | "grab"
    | "zoom-in"
    | "zoom-out"
    | "none"
    | "auto"
    | "default";

  zIndex: number;
  // POSITION
  h: number;
  w: number;
  x: number;
  y: number;
  height: DCss.LengthUnit;
  maxHeight: DCss.LengthUnit;
  minHeight: DCss.LengthUnit;
  width: DCss.LengthUnit;
  maxWidth: DCss.LengthUnit;
  minWidth: DCss.LengthUnit;
  bottom: DCss.LengthUnit;
  top: DCss.LengthUnit;
  left: DCss.LengthUnit;
  right: DCss.LengthUnit;
  boxShadow: string;

  // BORDERS
  borderStyle: "solid" | "none" | "dotted" | "dashed";
  borderRadius: DCss.Px | DCss.Percent;
  borderWidth: DCss.Px;
  borderColor: string;

  margin: DCss.Px | DCss.Percent;
  padding: DCss.Px | DCss.Percent;
  paddingLeft: DCss.Px | DCss.Percent;
  paddingRight: DCss.Px | DCss.Percent;
  paddingTop: DCss.Px | DCss.Percent;
  paddingBottom: DCss.Px | DCss.Percent;

  // Translate
  transform: string;
  translate: string;

  // TEXT
  fontSize: DCss.Px;
  textColor: string;
  fontWeight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  textAlign: "right" | "left" | "center";
  letterSpacing: DCss.Px;
  lineHeight: number;

  // LAYOUT & POSITIONING OVERRIDE
  position: "absolute" | "relative";
  flex: string;
  display: "flex" | "block";
  flexDirection: "row" | "colum";
  flexWrap: "nowrap" | "wrap";
  justifyContent:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-around"
    | "space-evenly"
    | "space-between";
  alignItems: "stretch" | "baseline" | "center" | "flex-start" | "flex-end";
  gap: DCss.Px;
  alignContent:
    | "stretch"
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-around"
    | "space-evenly"
    | "space-between";
}

export namespace DStyle {
  // import isNumber = DUtil.isNumber;
  import isLengthUnit = DCss.isLengthUnit;
  export const normalize = <T extends HTMLElement>(el: T): T => {
    const s = el.style;
    s.position = "absolute";
    s.boxSizing = "border-box";
    s.padding = "0px";
    s.margin = "0px";

    s.height = "";
    s.width = "fit-content";

    s.bottom = "";
    s.top = "";
    s.left = "";
    s.right = "";
    s.flex = "none";

    s.boxShadow = "";
    s.fontSize = "12px";
    s.lineHeight = "1";
    s.textAlign = "center";
    s.textDecoration = "none";
    s.boxShadow = "";
    s.boxSizing = "border-box";
    s.fontWeight = "500";
    s.borderStyle = "";
    s.borderRadius = "";
    s.borderWidth = "";
    s.borderWidth = "0px";
    s.borderColor = "black";
    s.backgroundColor = "";
    s.border = "";
    s.borderStyle = "none";
    s.outline = "";
    s.wordSpacing = "";
    s.userSelect = "none";
    s.textShadow = "";
    return el;
  };

  export const applyStyles = <T extends HTMLElement>(
    el: T,
    style: Partial<DStyle>,
    scale: number,
  ): T => {
    const { isNumber, isString } = DUtil;
    // const scalePx = DCss.toStringCre(this.scale);
    const {
      x,
      y,
      left,
      right,
      top,
      bottom,
      backgroundColor,
      borderColor,
      borderWidth,
      borderRadius,
      borderStyle,
      w,
      opacity,
      cursor,
      fontSize,
      fontWeight,
      lineHeight,
      textColor,
      textAlign,
      translate,
      flex,
      margin,
      padding,
      letterSpacing,
      h,
      height,
      width,

      transform,

      visibility,
      justifyContent,
      alignContent,
      flexWrap,
      display,
      flexDirection,

      alignItems,
      position,
      paddingLeft,
      paddingTop,
      paddingRight,
      paddingBottom,
      gap,

      zIndex,
      //
      boxShadow,
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
    } = style;

    if (isNumber(zIndex)) {
      el.style.zIndex = "" + zIndex;
    }

    if (isString(translate)) {
      el.style.transform = translate;
    }

    if (isString(flex)) {
      el.style.flex = flex;
    }

    if (DCss.isLengthUnit(minWidth)) {
      el.style.minWidth = DCss.toString(minWidth, scale);
    }

    if (DCss.isLengthUnit(maxWidth)) {
      el.style.maxWidth = DCss.toString(maxWidth, scale);
    }

    if (typeof lineHeight === "number") {
      el.style.lineHeight = "" + lineHeight;
    }

    if (DCss.isLengthUnit(minHeight)) {
      el.style.minHeight = DCss.toString(minHeight, scale);
    }

    if (DCss.isLengthUnit(maxHeight)) {
      el.style.maxHeight = DCss.toString(maxHeight, scale);
    }

    if (boxShadow) {
      el.style.boxShadow = boxShadow;
    }

    if (gap) {
      el.style.gap = DCss.toString(gap, scale);
    }

    if (paddingLeft) {
      el.style.paddingLeft = DCss.toString(paddingLeft, scale);
    }

    if (paddingRight) {
      el.style.paddingRight = DCss.toString(paddingRight, scale);
    }

    if (paddingTop) {
      el.style.paddingTop = DCss.toString(paddingTop, scale);
    }

    if (paddingBottom) {
      el.style.paddingBottom = DCss.toString(paddingBottom, scale);
    }

    if (position) {
      el.style.position = position;
    }

    if (justifyContent) {
      el.style.justifyContent = justifyContent;
    }

    if (alignContent) {
      el.style.alignContent = alignContent;
    }

    if (flexWrap) {
      el.style.flexWrap = flexWrap;
    }

    if (display) {
      el.style.display = display;
    }

    if (flexDirection) {
      el.style.flexDirection = flexDirection;
    }

    if (alignItems) {
      el.style.alignItems = alignItems;
    }

    // this.el.style.fontWeight = '900';
    if (backgroundColor) {
      el.style.backgroundColor = backgroundColor;
    }

    if (cursor) {
      el.style.cursor = cursor;
    }

    if (transform) {
      el.style.transform = transform;
    }

    if (textColor) {
      el.style.color = textColor;
    }

    if (textAlign) {
      el.style.textAlign = textAlign;
    }

    if (borderColor) {
      el.style.borderColor = borderColor;
    }

    if (borderWidth) {
      el.style.borderWidth = DCss.toString(borderWidth, scale);
    }

    if (fontWeight) {
      el.style.fontWeight = fontWeight + "";
    }

    if (borderStyle) {
      el.style.borderStyle = borderStyle;
    }

    if (fontSize) {
      el.style.fontSize = DCss.toString(fontSize, scale);
    }

    if (DUtil.isNumber(x)) {
      el.style.left = x + "%";
    }

    if (DUtil.isNumber(y)) {
      el.style.bottom = y + "%";
    }

    if (DCss.isLengthUnit(height)) {
      el.style.height = DCss.toString(height, scale);
    }

    if (DCss.isLengthUnit(width)) {
      el.style.width = DCss.toString(width, scale);
    }

    if (DCss.isLengthUnit(left)) {
      el.style.left = DCss.toString(left, scale);
    }

    if (DCss.isLengthUnit(right)) {
      el.style.right = DCss.toString(right, scale);
    }

    if (DCss.isLengthUnit(bottom)) {
      el.style.bottom = DCss.toString(bottom, scale);
    }

    if (DCss.isLengthUnit(top)) {
      el.style.top = DCss.toString(top, scale);
    }

    if (DUtil.isNumber(h)) {
      el.style.height = DCss.toString(h, scale);
    }

    if (isNumber(w)) {
      el.style.width = DCss.toString(w, scale);
    }

    if (DCss.isLengthUnit(borderRadius)) {
      el.style.borderRadius = DCss.toString(borderRadius, scale);
    }

    if (letterSpacing) {
      el.style.letterSpacing = DCss.toString(letterSpacing, scale);
    }

    if (margin) {
      el.style.margin = DCss.toString(margin, scale);
    }

    if (padding) {
      el.style.padding = DCss.toString(padding, scale);
    }

    if (isNumber(opacity)) {
      el.style.opacity = opacity + "";
    }

    if (visibility) {
      el.style.visibility = visibility;
    }

    return el;
  };

  // const propNames = new Set(...ElementKeyNames);
  // export const validKey = (keyName: string) => propNames.has(keyName);
}
