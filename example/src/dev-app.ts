import { createMenu } from "./createMenu";
import * as A from "@media-quest/engine";
import { autoplayWorks } from "./schema/autoplay-works";
import { excludeByPageIdRuleWorks, excludeByTagWorks, jumpToRuleWorks } from "./schema/rules-work";
import { IExampleSchema } from "./schema/IExample-schema";
import { SchemaDto } from "@media-quest/engine";
import { infopageWorks } from "./schema/infopage-works";
import { gifModeWorks } from "./schema/gif-mode-works";
import { Page2Works } from "./schema/page2-works";
console.log("DEV APP");

const initialSchema: IExampleSchema = autoplayWorks;
console.log(initialSchema);

new EventSource("/esbuild").addEventListener("change", () => location.reload());
const engineRoot = document.createElement("div");
const nameElement = document.createElement("h1");
nameElement.innerText = initialSchema.menuLabel;
// nameElement.style.backgroundColor = "red";
nameElement.style.textAlign = "center";
engineRoot.style.margin = "60px auto";

const createEngine = (schema: SchemaDto) => new A.SchemaEngine(engineRoot, 600, 1024, schema);
// Client api
let engine = createEngine(initialSchema.schema);
// console.log(JSON.stringify(devSchema), null, 2);
engine.onCommandOrEvent = (_event_or_command) => {
  // console.log(_event_or_command);
};
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
  toMenuItem(infopageWorks),
  toMenuItem(excludeByPageIdRuleWorks),
  toMenuItem(jumpToRuleWorks),
  toMenuItem(excludeByTagWorks),
]);
document.body.prepend(menu);
menu.after(engineRoot);
menu.after(nameElement);
// console.log(engine);
