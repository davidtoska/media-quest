import * as B from "@media-quest/builder";
import { IExampleSchema } from "./IExample-schema";
import { addPage } from "./helpers";

const s = B.BuilderSchema.create(
  B.SchemaID.create(),
  "Gif-mode-works",
  B.SchemaPrefix.fromValueOrThrow("spxx").value,
);

s.backgroundColor = "white";

addPage(s, "p1", "info-page").withMainText("Gif mode in next page");
addPage(s, "p2", "info-page").withMainText("Gifmode").addVideo("gif-mode");
addPage(s, "p3", "info-page").withMainText("Gifmode,  2 sec delay.").addVideo("gif-mode", 2000);
addPage(s, "p4", "question")
  .withMainText("Gifmode with 2 sec delay, and autoplayAudio with 2 sec delay.")
  .addVideo("gif-mode", 2000)
  .addAudio(true, 2000);

// s.pages.forEach(page)
const compiled = s.compile().schema;
compiled.pages.forEach((page, index) => {
  console.log("PageNr: " + index + ", autoplay-tasks: " + page.initialTasks.length);
});

// console.log(compiled.pages[1].initialTasks);
export const gifModeWorks: IExampleSchema = {
  menuLabel: "Gif mode",
  schema: s.compile().schema,
};
