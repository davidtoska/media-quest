import { createRandomPrefix, PagePrefixValue } from "./page-prefix";

export type SchemaPrefixValue = string & { __SCHEMA_PREFIX__: true };
export type VarID = `${SchemaPrefixValue}_${PagePrefixValue}`;
export const VarID = {
  create: (schemaPrefix: SchemaPrefixValue, pagePrefix: PagePrefixValue): VarID => {
    const varId = schemaPrefix + "_" + pagePrefix;
    return varId as VarID;
  },
};

export class SchemaPrefix {
  public static readonly MIN_LENGTH = 1;
  private static randomLen = 5;
  public static readonly MAX_LENGTH = 16;

  public static fromValue = (value: SchemaPrefixValue): SchemaPrefix => {
    return new SchemaPrefix(value);
  };

  public static fromValueOrThrow = (value: string): SchemaPrefix => {
    if (!SchemaPrefix.isValid(value)) throw new Error("Invalid prefix");
    return new SchemaPrefix(value);
  };
  public static fromString = (value: string): SchemaPrefix | false => {
    if (!SchemaPrefix.isValid(value)) return false;
    return new SchemaPrefix(value);
  };
  public static castOrCreateRandom = (value: string): SchemaPrefix => {
    const v = SchemaPrefix.isValid(value) ? value : createRandomPrefix<SchemaPrefixValue>(SchemaPrefix.randomLen);
    return new SchemaPrefix(v);
  };

  public static isValid = (prefix: string | 999): prefix is SchemaPrefixValue => {
    if (typeof prefix !== "string") return false;
    if (prefix.length < SchemaPrefix.MIN_LENGTH) return false;
    if (prefix.length > SchemaPrefix.MAX_LENGTH) return false;
    return true;
  };

  get value(): SchemaPrefixValue {
    return this._value;
  }
  get isValid() {
    return SchemaPrefix.isValid(this._value);
  }

  set value(value: string) {
    const casted = value as unknown;
    if (typeof casted === "string") {
      this._value = casted as SchemaPrefixValue;
    }
  }

  private constructor(private _value: SchemaPrefixValue) {}
}
