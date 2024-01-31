import { PageID, SchemaID } from "./ID";

describe("ID Functions work", () => {
  //Generate test for schema prefix
  test("SCHEMA_ID isFunction works", () => {
    const id = SchemaID.create();
    expect(SchemaID.is(id)).toBe(true);
    expect(SchemaID.is("")).toBe(false);
    expect(SchemaID.is("a")).toBe(false);
    expect(SchemaID.is("a".repeat(10))).toBe(true);
    expect(SchemaID.is("a".repeat(9))).toBe(false);
  });
  test("SCHEMA_ID ensure works", () => {
    const id = SchemaID.create();
    expect(SchemaID.validateOrCreate(id)).toBe(id);
    expect(SchemaID.validateOrCreate("")).not.toBe("");
    expect(SchemaID.validateOrCreate("")).not.toBe("a");
    expect(SchemaID.validateOrCreate("a".repeat(10))).toBe("a".repeat(10));
    expect(SchemaID.validateOrCreate("a".repeat(9))).not.toBe("a".repeat(9));
    expect(SchemaID.validateOrCreate("ABcdefghigKLML")).toBe("ABcdefghigKLML");
  });
  test("PageID isFunction works", () => {
    const id = PageID.create();
    expect(PageID.is(id)).toBe(true);
    expect(PageID.is("")).toBe(false);
    expect(PageID.is("a")).toBe(false);
    expect(PageID.is("a".repeat(10))).toBe(true);
    expect(PageID.is("a".repeat(9))).toBe(false);
  });
  test("PageID ensure works", () => {
    const id = PageID.create();
    expect(PageID.validateOrCreate(id)).toBe(id);
    expect(PageID.validateOrCreate("")).not.toBe("");
    expect(PageID.validateOrCreate("")).not.toBe("a");
    expect(PageID.validateOrCreate("a".repeat(10))).toBe("a".repeat(10));
    expect(PageID.validateOrCreate("a".repeat(9))).not.toBe("a".repeat(9));
    expect(PageID.validateOrCreate("ABcdefghigKLML")).toBe("ABcdefghigKLML");
  });
});
