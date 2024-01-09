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
    expect(SchemaID.ensure(id)).toBe(id);
    expect(SchemaID.ensure("")).not.toBe("");
    expect(SchemaID.ensure("")).not.toBe("a");
    expect(SchemaID.ensure("a".repeat(10))).toBe("a".repeat(10));
    expect(SchemaID.ensure("a".repeat(9))).not.toBe("a".repeat(9));
    expect(SchemaID.ensure("ABcdefghigKLML")).toBe("ABcdefghigKLML");
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
    expect(PageID.ensure(id)).toBe(id);
    expect(PageID.ensure("")).not.toBe("");
    expect(PageID.ensure("")).not.toBe("a");
    expect(PageID.ensure("a".repeat(10))).toBe("a".repeat(10));
    expect(PageID.ensure("a".repeat(9))).not.toBe("a".repeat(9));
    expect(PageID.ensure("ABcdefghigKLML")).toBe("ABcdefghigKLML");
  });
});
