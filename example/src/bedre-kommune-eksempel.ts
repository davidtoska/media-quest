import * as B from "../../packages/builder/src/public-api";
import { detHandlerOmMeg } from "./det-handler-om-meg";
import { IExampleSchema } from "./schema/IExample-schema";

const schema = B.BuilderSchema.fromJson(detHandlerOmMeg);
const compiled = schema.compile({
  blockAutoplayQuestion: false,
  blockAutoplayVideo: false,
  mediaAssets: {
    fileNameStrategy: "id",
    audioFilesBaseUrl: "http://localhost:8000/assets/ispe-audio",
    videoFilesBaseUrl: "http://localhost:8000/assets/ispe-video",
    imageFilesBaseUrl: "http://localhost:8000/assets/ispe-image",
  },
});

export const bedreKommuneSchema: IExampleSchema = {
  menuLabel: "Bedre kommune",
  schema: compiled.schema,
};
