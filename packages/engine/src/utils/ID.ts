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

/**
 * Creates a object with helper functions for a specific ID type
 * @param idName
 */
export const createTypedIdSingleton = <const B extends string>(idName: B) => {
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
  const ensure = (id: string): ID<B> => {
    return is(id) ? id : create();
  };

  return Object.freeze({ create, is, ensure, validateOrThrow, name });
};

export type SchemaID = ID<"SCHEMA">;
export const SchemaID = createTypedIdSingleton("SCHEMA");
export type PageID = ID<"PAGE">;
export const PageID = createTypedIdSingleton("PAGE");
