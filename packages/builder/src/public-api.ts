import {createEngine} from "@media-quest/engine";
export const logBuilder = () =>  {
  const engine = createEngine();
  console.log(engine.innerText);;
  console.log("HELLO FROM BUILDER!! I Have imported engine with innerText: " + engine.innerText)
}
