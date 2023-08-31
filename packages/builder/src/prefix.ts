export type SchemaPrefixValue = string & { __SCHEMA_PREFIX__: true };
export type PagePrefixValue = string & { __PAGE_PREFIX__: true };
// export type QuestionPrefixValue = string & { __QUESTION_PREFIX__: true };
export type VarID = `${SchemaPrefixValue}_${PagePrefixValue}`;
export const VarID = {
  create: (schemaPrefix: SchemaPrefixValue, pagePrefix: PagePrefixValue): VarID => {
    const varId = schemaPrefix + "_" + pagePrefix;
    return varId as VarID;
  },
};
const createRandomPrefix = <const P extends string>(length: number): P => {
  const letters = "abcdefghijklmnopqrstuvyz";
  const all = letters + letters.toUpperCase();
  let result = "";
  for (let i = 0; i < length; i++) {
    const char = all.charAt(Math.floor(Math.random() * all.length));
    result += char;
  }
  return result as P;
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

  set value(value: string) {
    if (!SchemaPrefix.isValid(value)) {
      console.log("INVALID PREFIX", value);
    } else {
      this._value = value;
    }
  }
  private constructor(private _value: SchemaPrefixValue) {}
}
export class PagePrefix {
  public static readonly MIN_LENGTH = 1;
  private static randomLen = 5;
  public static readonly MAX_LENGTH = 16;
  public static fromValue = (value: PagePrefixValue): PagePrefix => {
    return new PagePrefix(value);
  };

  public static create = (): PagePrefix => {
    const v = createRandomPrefix<PagePrefixValue>(PagePrefix.randomLen);
    return new PagePrefix(v);
  };
  public static fromString = (value: string): PagePrefix | false => {
    if (!PagePrefix.isValid(value)) return false;
    return new PagePrefix(value);
  };

  public static fromStringOrThrow = (value: string): PagePrefixValue => {
    if (!PagePrefix.isValid(value)) throw new Error("Invalid prefix");
    return value;
  };
  public static castOrCreateRandom = (value: string): PagePrefix => {
    const v = PagePrefix.isValid(value) ? value : createRandomPrefix<PagePrefixValue>(PagePrefix.randomLen);
    return new PagePrefix(v);
  };

  public static isValid = (prefix: string | 999): prefix is PagePrefixValue => {
    if (typeof prefix !== "string") return false;
    if (prefix.length < SchemaPrefix.MIN_LENGTH) return false;
    if (prefix.length > SchemaPrefix.MAX_LENGTH) return false;
    return true;
  };

  get value(): PagePrefixValue {
    return this._value;
  }

  set value(value: string) {
    if (!PagePrefix.isValid(value)) {
      console.log("INVALID PREFIX", value);
    } else {
      this._value = value;
    }
  }
  private constructor(private _value: PagePrefixValue) {}
}
