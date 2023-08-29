import { createMenu } from "./createMenu";
import * as A from "@media-quest/engine";
import { autoplayWorks } from "./schema/autoplay-works";
import { rulesWork } from "./schema/rules-work";
import { IExampleSchema } from "./schema/IExample-schema";
import { SchemaDto } from "@media-quest/engine";
console.log("DEV APP");

const initialSchema = rulesWork.schema;

new EventSource("/esbuild").addEventListener("change", () => location.reload());
const engineRoot = document.createElement("div");
const nameElement = document.createElement("h1");
nameElement.innerText = "Dev app";
// nameElement.style.backgroundColor = "red";
nameElement.style.textAlign = "center";
engineRoot.style.margin = "60px auto";

const createEngine = (schema: SchemaDto) => new A.SchemaEngine(engineRoot, 600, 1024, schema);
// Client api
let engine = createEngine(initialSchema);
// console.log(JSON.stringify(devSchema), null, 2);
engine.onCommandOrEvent = (_event_or_command) => {
  // console.log(_event_or_command);
};
console.log(rulesWork.schema);
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

const menu = createMenu([toMenuItem(autoplayWorks), toMenuItem(rulesWork)]);
document.body.prepend(menu);
menu.after(engineRoot);
menu.after(nameElement);
// console.log(engine);
