import { createMenu } from "./createMenu";
import { autoplayWorks } from "./schema/autoplay-works";
import { excludeByPageIdRuleWorks, excludeByTagWorks, jumpToRuleWorks } from "./schema/rules-work";
import { IExampleSchema } from "./schema/IExample-schema";
import { infopageWorks } from "./schema/infopage-works";
import { gifModeWorks } from "./schema/gif-mode-works";
import { Page2Works } from "./schema/page2-works";
import { SchemaDto, SchemaEngine } from "../../packages/engine";
import { autoplayOverrideWorks } from "./schema/autoplay-override-works";
console.log("DEV APP");

const initialSchema: IExampleSchema = excludeByTagWorks;
// console.log(initialSchema);

new EventSource("/esbuild").addEventListener("change", () => location.reload());
const engineRoot = document.createElement("div");
const nameElement = document.createElement("h1");
nameElement.innerText = initialSchema.menuLabel;
// nameElement.style.backgroundColor = "red";
nameElement.style.textAlign = "center";
engineRoot.style.margin = "60px auto";

const createEngine = (schema: SchemaDto) => {
  const engine = new SchemaEngine(engineRoot, 600, 1024, schema);
  engine.onProgress((result) => {
    console.log(result);
    console.log("EVENTS: " + result.eventLog.length);
    console.log("Answers: " + result.answers.length);
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

console.log(gifModeWorks.schema.pages[1].components);
console.log(gifModeWorks.schema.pages[0].initialTasks);
console.log(gifModeWorks.schema.pages[1].initialTasks);
console.log(gifModeWorks.schema.pages[2]?.initialTasks);
const menu = createMenu([
  toMenuItem(Page2Works),
  toMenuItem(gifModeWorks),
  toMenuItem(autoplayWorks),
  toMenuItem(autoplayOverrideWorks),
  toMenuItem(infopageWorks),
  toMenuItem(excludeByPageIdRuleWorks),
  toMenuItem(jumpToRuleWorks),
  toMenuItem(excludeByTagWorks),
]);
document.body.prepend(menu);
menu.after(engineRoot);
menu.after(nameElement);
// console.log(engine);
