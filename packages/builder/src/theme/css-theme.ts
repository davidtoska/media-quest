import { DStyle } from "@media-quest/engine";

export interface CssTheme<S extends Partial<DStyle> = Partial<DStyle>> {
  css: S;
  cssEnabled: Partial<DStyle>;
  cssDisabled: Partial<DStyle>;
}
