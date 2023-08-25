import {logBuilder} from "../../packages/builder";
import {createEngine} from "../../packages/engine";
const e = createEngine();
const root = document.getElementById("root") as HTMLDivElement;
root.appendChild(e)
console.log("Update??")
logBuilder();
