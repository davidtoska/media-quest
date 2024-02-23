import { createMenu } from "./createMenu";
import { autoplayWorks } from "./schema/autoplay-works";
import { excludeByPageIdRuleWorks, excludeByTagWorks, jumpToRuleWorks } from "./schema/rules-work";
import { IExampleSchema } from "./schema/IExample-schema";
import { infopageWorks } from "./schema/infopage-works";
import { gifModeWorks } from "./schema/gif-mode-works";
import { Page2Works } from "./schema/page2-works";
import * as E from "../../packages/engine/src/public-api";
import * as B from "../../packages/builder/src/public-api";
import { autoplayOverrideWorks } from "./schema/autoplay-override-works";
import { redesignWorks } from "./schema/redesign-info-page";

console.log("DEV APP");

// console.log(E);
const a = B.DefaultTheme;

if (a.name === "refresh when libs change. ") {
  console.log(E);
  console.log(B);
  console.log(a);
}
// const initialSchema: IExampleSchema = Page2Works;
const initialSchema: IExampleSchema = autoplayWorks;
// console.log(initialSchema);

new EventSource("/esbuild").addEventListener("change", () => location.reload());
const engineRoot = document.createElement("div");
const nameElement = document.createElement("h1");
nameElement.innerText = initialSchema.menuLabel;
// nameElement.style.backgroundColor = "red";
nameElement.style.textAlign = "center";
engineRoot.style.margin = "60px auto";

const createEngine = (schema: E.SchemaDto) => {
  const engine = new E.SchemaEngine(engineRoot, 600, 1024, schema);
  engine.onProgress((result) => {
    // console.log(result);
    // console.log("EVENTS: " + result.eventLog.length);
    // console.log("Answers: " + result.answers.length);
  });
  return engine;
};

// Client api
let engine = createEngine(initialSchema.schema);
// engine.onProgress((result) => {
//   console.log(result);
//   console.log("EVENTS: " + result.eventLog.length);
//   console.log("Answers: " + result.answers.length);
// });
const toMenuItem = (example: IExampleSchema): { label: string; onclick: () => void } => {
  const label = example.menuLabel;
  return {
    label,
    onclick: () => {
      nameElement.innerText = label;
      engine.destroy();
      engineRoot.innerHTML = "";
      engine = createEngine(example.schema);
    },
  };
};

// console.log(autoplayWorks.schema.pages);
// console.log(gifModeWorks.schema.pages[0].initialTasks);
// console.log(gifModeWorks.schema.pages[1].initialTasks);
// console.log(gifModeWorks.schema.pages[2]?.initialTasks);
const menu = createMenu([
  toMenuItem(Page2Works),
  toMenuItem(gifModeWorks),
  toMenuItem(autoplayWorks),
  toMenuItem(redesignWorks),
  toMenuItem(autoplayOverrideWorks),
  toMenuItem(infopageWorks),
  toMenuItem(excludeByPageIdRuleWorks),
  toMenuItem(jumpToRuleWorks),
  toMenuItem(excludeByTagWorks),
]);
document.body.prepend(menu);
menu.after(engineRoot);
menu.after(nameElement);
