import type { BuilderSchemaDto } from "./Builder-schema";
import { BuilderSchema } from "./Builder-schema";
import { BuilderPage } from "./Builder-page";
import type { BuilderTagDto } from "./BuilderTag";
import { BuilderTag } from "./BuilderTag";
import type { BuilderObjectId } from "./BuilderObject";
import { PageID, SchemaID } from "@media-quest/engine";
import { PagePrefix, SchemaPrefix } from "./prefix";

const tag1: BuilderTagDto = BuilderTag.create("tag1", "This tag is defined in schemaDto1").toJson();

const tag2: BuilderTagDto = BuilderTag.create("tag2", "This tag is defined in schemaDto1").toJson();
const tag3: BuilderTagDto = BuilderTag.create("tag3", "This tag is defined in schemaDto1").toJson();

const schemaDto1: BuilderSchemaDto = {
  backgroundColor: "gray",
  baseHeight: 1200,
  baseWidth: 1022,
  mainImage: false,
  id: SchemaID.create(),
  name: "dto1-name",
  tags: [tag1, tag2, tag3],
  pages: [
    {
      id: PageID.ensure("a".repeat(24)),
      _type: "info-page",
      prefix: PagePrefix.fromStringOrThrow("p1"),
      mainText: {
        text: "hello from test",
        autoplay: false,
        autoplayDelay: 0,
        audioFile: false,
      },

      nextButton: {
        id: "next-button-text-id" as BuilderObjectId.QuestionOptionID,
        label: "Neste",
        value: -1,
      },
      defaultQuestion: {
        id: "q1" as BuilderObjectId.QuestionID,
        prefix: "one-prefix",
        _type: "select-one",
        text: "q1-text",
        options: [
          {
            id: "opt-nei" as BuilderObjectId.QuestionOptionID,
            value: 0,
            label: "Nei",
          },
          {
            id: "opt-ja" as BuilderObjectId.QuestionOptionID,
            value: 1,
            label: "Ja",
          },
          {
            id: "opt-vet-ikke" as BuilderObjectId.QuestionOptionID,
            value: 9,
            label: "Vet ikke",
          },
        ],
      },
      tags: [
        tag1.tag,
        tag2.tag,
        // { tag: 'can_read', description: 'The patient can read' },
        // { tag: 'is grown up', description: 'Is grownUp.' }
      ],
      questions: [],
      autoplaySequence: [],
    },
    {
      id: PageID.ensure("b".repeat(24)),
      _type: "multi-select",
      prefix: PagePrefix.fromStringOrThrow("page2-prefix"),
      tags: [tag3.tag],
      mainText: {
        text: "hello from test",
        autoplay: false,
        autoplayDelay: 0,
        audioFile: false,
      },
      nextButton: {
        id: "next-button-id-page2" as BuilderObjectId.QuestionOptionID,
        label: "Neste",
        value: -1,
      },
      defaultQuestion: {
        id: "default-q" as BuilderObjectId.QuestionID,
        prefix: "one-prefix",
        _type: "select-one",
        text: "q1",
        options: [],
      },
      questions: [
        {
          id: "q1" as BuilderObjectId.QuestionID,
          prefix: "one-prefix",
          _type: "select-one",
          text: "q1-text",
          options: [
            {
              id: "opt-nei" as BuilderObjectId.QuestionOptionID,
              value: 0,
              label: "Nei",
            },
            {
              id: "opt-ja" as BuilderObjectId.QuestionOptionID,
              value: 1,
              label: "Ja",
            },
            {
              id: "opt-vet-ikke" as BuilderObjectId.QuestionOptionID,
              value: 9,
              label: "Vet ikke",
            },
          ],
        },
      ],
      autoplaySequence: [],
    },
  ],
  rules: [],
  prefix: SchemaPrefix.fromValueOrThrow("d1").value,
};

const SCHEMA_ID = SchemaID.create();
const schemaPrefixA = SchemaPrefix.castOrCreateRandom("a").value;
let builderSchema = BuilderSchema.create(SCHEMA_ID, "test", schemaPrefixA);

beforeEach(() => {
  builderSchema = BuilderSchema.create(SCHEMA_ID, "test-name", schemaPrefixA);
});

describe("Builder schema", () => {
  test("Can add pages.", () => {
    builderSchema.addPage("question");
    builderSchema.addPage("info-page");
    expect(builderSchema.pages.length).toBe(2);
    const dto = builderSchema.compile().schema;
    expect(dto.pages.length).toBe(2);
    expect(dto.id).toBe(builderSchema.id);
    expect(dto.baseHeight).toBe(builderSchema.baseHeight);
    expect(dto.baseWidth).toBe(builderSchema.baseWidth);
    expect(dto.backgroundColor).toBe(builderSchema.backgroundColor);
  });

  test("Can delete page by passing reference", () => {
    const p1 = builderSchema.addPage("question");
    const p2 = builderSchema.addPage("question");
    const p3 = builderSchema.addPage("info-page");
    expect(builderSchema.pages.length).toBe(3);
    const result = builderSchema.deletePage(p1);
    expect(builderSchema.pages.length).toBe(2);
    expect(result).toBe(true);
    const result2 = builderSchema.deletePage(p2);
    expect(result2).toBe(true);
    expect(builderSchema.pages.length).toBe(1);
    expect(builderSchema.pages[0]).toBe(p3);
    const result3 = builderSchema.deletePage(p2);
    expect(result3).toBe(false);
    const result4 = builderSchema.deletePage(p3);
    expect(result4).toBe(true);
  });

  test("Can create Schema from dto", () => {
    const s = BuilderSchema.fromJson(schemaDto1);
    expect(s.id).toBe(schemaDto1.id);
    expect(s.prefix).toBe(schemaDto1.prefix);
    expect(s.baseHeight).toBe(schemaDto1.baseHeight);
    expect(s.baseWidth).toBe(schemaDto1.baseWidth);
    expect(s.backgroundColor).toBe(schemaDto1.backgroundColor);
    expect(s.pages.length).toBe(schemaDto1.pages.length);
    const p1Dto = schemaDto1.pages[0];
    expect(s.pages[0].id).toBe(p1Dto.id);
    const defaultQuestion = s.pages[0].defaultQuestion;
    expect(defaultQuestion).toBeDefined();
    expect(defaultQuestion.id).toBe(p1Dto.defaultQuestion.id);
    expect(defaultQuestion.options.length).toBe(p1Dto.defaultQuestion.options.length);
    const options = defaultQuestion.options;
    const nei = options[0];
    const ja = options[1];
    const vetIkke = options[2];
    expect(nei.label).toBe("Nei");
    expect(ja.label).toBe("Ja");
    expect(vetIkke.label).toBe("Vet ikke");
    expect(vetIkke.id).toBe(p1Dto.defaultQuestion.options[2].id);
  });

  test("fromJson === toJson", () => {
    const s = BuilderSchema.fromJson(schemaDto1);
    const json = s.toJson();
    expect(schemaDto1).toStrictEqual(json);
  });
  test("Can add page at concrete index", () => {
    const p1 = builderSchema.addPage("form");
    expect(p1.pageType).toBe("form");
    const p2 = builderSchema.addPage("multi-select", 0);
    expect(p2.pageType).toBe("multi-select");
    const pages = builderSchema.pages;
    expect(pages[0].id).toBe(p2.id);
    builderSchema.addPage("form");
    builderSchema.addPage("form");
    const last = builderSchema.addPage("form");
    expect(builderSchema.pages[builderSchema.pages.length - 1]).toBe(last);
    const p3 = builderSchema.addPage("info-page", 4);
    expect(pages[4].id).toBe(p3.id);
  });
  test("Can move page up and down", () => {
    const p1 = builderSchema.addPage("form");
    const p2 = builderSchema.addPage("form");
    const p3 = builderSchema.addPage("form");
    const p4 = builderSchema.addPage("multi-select");
    const last = builderSchema.addPage("form");
    const pages = builderSchema.pages;
    builderSchema.movePage(p2, 0);
    expect(pages[0]).toBe(p2);
    expect(pages[1]).toBe(p1);
    expect(builderSchema.movePage(p4, 4)).toBeTruthy();
    expect(builderSchema.movePage(p4, 5)).toBeFalsy();
    expect(builderSchema.movePage(p4, 10)).toBeFalsy();

    // expect(pages[0].id).toBe(p4.id);
  });
  test("Can clone a page and insert at index", () => {
    const p1 = builderSchema.addPage("form");
    const p2 = builderSchema.addPage("form");
    const p3 = builderSchema.addPage("form");
    const mainTextContent = "Hello from test";
    const p4 = builderSchema.addPage("multi-select");
    p3.mainText.text = mainTextContent;
    const p1Clone = BuilderPage.fromJson(p1.clone());
    const beforeLen = builderSchema.pages.length;
    builderSchema.insertPage(p1Clone, 2);
    const pages = builderSchema.pages;
    expect(beforeLen + 1).toBe(pages.length);
    expect(pages[2]).toBe(p1Clone);
  });
  test("Will not insert a page that is already in array.", () => {
    const p1 = builderSchema.addPage("form");
    const p2 = builderSchema.addPage("form");
    const p3 = builderSchema.addPage("form");
    const beforeLen = builderSchema.pages.length;
    const result = builderSchema.insertPage(p1, 0);
    const pages = builderSchema.pages;
    expect(beforeLen).toBe(pages.length);
    expect(result).toBe(false);
  });

  test("Can generate a info-page", () => {
    const p1 = builderSchema.addPage("info-page");
    const p2 = builderSchema.addPage("question");
    p2.defaultQuestion.addOption("Ja", 1, 0);
    p2.defaultQuestion.addOption("Nei", 0);
    p1.nextButton.label = "Neste";
    builderSchema.backgroundColor = "red";
    builderSchema.baseHeight = 600;
    builderSchema.baseWidth = 500;
    // builderSchema.prefix = "as";
    builderSchema.name = "depressed";
    const schema = builderSchema.compile().schema;
    expect(schema.backgroundColor).toBe("red");
    expect(schema.baseHeight).toBe(600);
    expect(schema.baseWidth).toBe(500);
    expect(schema.pages.length).toBe(2);
    const schemaP1 = schema.pages[0];
    const schemaP2 = schema.pages[1];
    expect(schemaP1.id).toBe(p1.id);
    expect(schemaP2.id).toBe(p2.id);
    expect(schemaP1.elements.length).toBe(2);

    // Has Buttons
    const options = p2.defaultQuestion.options;
    expect(schemaP2.elements.length).toBe(options.length + 1);
  });
  test("Can get ruleInput!", () => {
    const p0 = builderSchema.addPage("info-page");
    // p0.prefix = "info_page_prefix_";
    const p1 = builderSchema.addPage("question");
    // p1.prefix = "p1_prefix_";
    const p2 = builderSchema.addPage("question");
    // p2.prefix = "p2_prefix_";
    p1.defaultQuestion.addOption("Ja", 1, 0);
    p1.defaultQuestion.addOption("Nei", 0, 0);
    p2.defaultQuestion.addOption("Ja", 1, 0);
    p2.defaultQuestion.addOption("Nei", 0);
    const ruleInput = builderSchema.getRuleInput();
    expect(ruleInput.questionVars.length).toBe(2);
    expect(ruleInput.jumpToPageActions.length).toBe(3);
    // TODO add TAGS!!
    expect(ruleInput.excludeByTagActions.length).toBe(0);
    expect(ruleInput.excludeByPageIdActions.length).toBe(3);
    const allPageIds = new Set(ruleInput.jumpToPageActions.map((a) => a.pageId));
    expect(allPageIds.has(p0.id)).toBe(true);
    expect(allPageIds.has(p1.id)).toBe(true);
    expect(allPageIds.has(p2.id)).toBe(true);
    // ruleInput.questionVars.forEach((v) => {
    //   expect(allPageIds.has(v.varId)).toBe(true);
    // });
    ruleInput.jumpToPageActions.forEach((v) => {
      expect(allPageIds.has(v.pageId)).toBe(true);
    });
  });
});
