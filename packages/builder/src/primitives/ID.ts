// The default length of an ID
const ID_LENGTH = 32;

// The minimum length of an ID
const MIN_LENGTH = 10;

export type ID<B extends string> = string & { __ID__: B };

const isID = <const B extends string>(idName: B, id?: string): id is ID<B> => {
  if (typeof id !== "string") return false;
  return id.length >= MIN_LENGTH;
};

const createIDByName = <const B extends string>(idName: B): ID<B> => {
  const letters = "abcdefghijklmnopqrstuvyz";
  const all = letters + letters.toUpperCase();
  let result = "";

  for (let i = 0; i < ID_LENGTH; i++) {
    const char = all.charAt(Math.floor(Math.random() * all.length));
    result += char;
  }

  return result as ID<B>;
};
const createDummyID = <const B extends string>(idName: B, letter: string): ID<B> => {
  return letter.repeat(ID_LENGTH) as ID<B>;
};
interface Id<T extends string> {
  name: T;
  is: (id: string) => id is ID<T>;
  validateOrCreate: (id: string) => ID<T>;
  validateOrThrow: (id: string) => ID<T>;
  create: () => ID<T>;
  dummy: {
    a: ID<T>;
    b: ID<T>;
    c: ID<T>;
    d: ID<T>;
    e: ID<T>;
    f: ID<T>;
    g: ID<T>;
    h: ID<T>;
    i: ID<T>;
    j: ID<T>;
  };
}

/**
 * Creates a object with helper functions for a specific ID type
 * @param idName
 */
export const createTypedIdSingleton = <const B extends string>(idName: B): Id<B> => {
  /**
   * Creates a new ID of the correct type
   */
  const create = (): ID<B> => createIDByName(idName);

  /**
   * Checks if the id is of the correct type
   * @param id
   */
  const is = (id: string): id is ID<B> => isID(idName, id);

  /**
   * Checks if the id is of the correct type, if not it throws an error
   * @param id
   */
  const validateOrThrow = (id: string): ID<B> => {
    if (!is(id)) {
      throw new Error(`Invalid id: ${id}`);
    }
    return id;
  };

  /**
   * The lowercase name of the id (SCHEMA, PAGE, etc)
   */
  const name: B = idName;

  /**
   * Ensures that the id is of the correct type, if not it creates a new one
   * @param id
   */
  const validateOrCreate = (id: string): ID<B> => {
    return is(id) ? id : create();
  };

  const a = createDummyID(idName, "a");
  const b = createDummyID(idName, "b");
  const c = createDummyID(idName, "c");
  const d = createDummyID(idName, "d");
  const e = createDummyID(idName, "e");
  const f = createDummyID(idName, "f");
  const g = createDummyID(idName, "g");
  const h = createDummyID(idName, "h");
  const i = createDummyID(idName, "i");
  const j = createDummyID(idName, "j");
  const list = [a, b, c, d, e, f, g, h, i, j];

  const dummy = {
    a,
    b,
    c,
    d,
    e,
    f,
    g,
    h,
    i,
    j,
    list,
  };

  return Object.freeze({ create, is, validateOrCreate, validateOrThrow, name, dummy });
};

export type SchemaID = ID<"SCHEMA">;
export const SchemaID = createTypedIdSingleton("SCHEMA");

export type PageID = ID<"PAGE">;
export const PageID = createTypedIdSingleton("PAGE");

export type TagID = ID<"TAG">;
export const TagID = createTypedIdSingleton("TAG");
export type OptionID = ID<"OPTION">;
export const OptionID = createTypedIdSingleton("OPTION");

export type TextID = ID<"TEXT">;
export const TextID = createTypedIdSingleton("TEXT");
export type QuestionID = ID<"QUESTION">;
export const QuestionID = createTypedIdSingleton("QUESTION");

export type SumScoreVariableID = ID<"SUM_SCORE_VARIABLE">;
export const SumScoreVariableID = createTypedIdSingleton("SUM_SCORE_VARIABLE");
