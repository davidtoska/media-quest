import { SchemaDto } from "@media-quest/engine";
import { Codebook } from "./codebook";
import { SchemaConfig } from "./schema-config";

export interface CompilerOutput {
  schema: SchemaDto;
  codebook: Codebook;
  schemaConfig: SchemaConfig;
}

export interface CompilerOption {
  blockAutoplayQuestion: boolean;
  blockAutoplayVideo: boolean;
}
