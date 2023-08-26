import * as A from "../src";
import { devSchema } from "./dummy-data/dev-schema";
import { createMenu } from "./createMenu";
import { SchemaDto } from "../src";
import { testDto } from "./test-dto";

console.log("DEV APP");

const initialSchema = devSchema;

new EventSource("/esbuild").addEventListener("change", () => location.reload());
export const a = testDto;
const engineRoot = document.createElement("div");
const nameElement = document.createElement("h1");
nameElement.innerText = "Dev app";
// nameElement.style.backgroundColor = "red";
nameElement.style.textAlign = "center";
engineRoot.style.margin = "60px auto";

// Client api
let engine = new A.SchemaEngine(engineRoot, 500, 1024, initialSchema.compile().schema);
// console.log(JSON.stringify(devSchema), null, 2);
engine.onCommandOrEvent = (_event_or_command) => {
    // console.log(_event_or_command);
};
const menu = createMenu([
    {
        label: "Test-Dto",
        onclick: () => {
            nameElement.innerText = "Test-Dto";
            engine.destroy();
            engineRoot.innerHTML = "";
            // engine.
            engine = new A.SchemaEngine(engineRoot, 600, 1024, testDto);
        },
    },
    {
        label: "Dev app",
        onclick: () => {
            nameElement.innerText = "Dev app";
            engine.destroy();
            engineRoot.innerHTML = "";
            engine = new A.SchemaEngine(engineRoot, 600, 1024, initialSchema.compile().schema);
        },
    },
]);
document.body.prepend(menu);
menu.after(engineRoot);
menu.after(nameElement);
// console.log(engine);
