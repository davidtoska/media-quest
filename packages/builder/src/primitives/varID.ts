import { PagePrefixValue } from "./page-prefix";

import { SchemaPrefixValue } from "./schema-prefix";

export type VarID = `${SchemaPrefixValue}_${PagePrefixValue}`;

export const VarID = {
  create: (schemaPrefix: SchemaPrefixValue, pagePrefix: PagePrefixValue): VarID => {
    const varId = schemaPrefix + "_" + pagePrefix;
    return varId as VarID;
  },
};
