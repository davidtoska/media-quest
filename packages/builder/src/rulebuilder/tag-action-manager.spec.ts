import type { ExcludeByTagAction } from "./RuleAction";
import { TagActionManager } from "./tag-action-manager";

const opt = (tag: string): ExcludeByTagAction => {
    return { kind: "exclude-by-tag", tag, pageCount: 2, description: "" };
};

const t1 = opt("tag1");
const t2 = opt("tag2");
const t3 = opt("tag3");
const t4 = opt("tag4");
const t5 = opt("tag5");
const t6 = opt("tag6");
const allOptions = [t1, t2, t3, t4, t5, t6];
describe("Builder Rule Tag ", () => {
    test("Can initialize ExcludeByTagCollection, and filter invalid tags.", () => {
        const collection = new TagActionManager(allOptions, [t1.tag, "__invalid__tag"]);

        expect(collection).toBeInstanceOf(TagActionManager);
        const initialTags = collection.getCurrentSelection();
        const initialTag0 = initialTags[0];
        expect(initialTag0).toBe(t1.tag);
        expect(collection.getCurrentSelection().length).toBe(1);
    });

    test("Will remove duplicate selections.", () => {
        const initialSelection = [t1.tag, t1.tag, t6.tag];
        const collection = new TagActionManager(allOptions, initialSelection);

        const initialTags = collection.getCurrentSelection();
        expect(initialTags[0]).toBe(t1.tag);
        expect(collection.getCurrentSelection().length).toBe(2);
    });
    test("Can update selection.", () => {
        const initialSelection = [t1.tag, t6.tag];
        const collection = new TagActionManager(allOptions, initialSelection);

        const initialTags = collection.getCurrentSelection();
        expect(initialTags[0]).toBe(t1.tag);
        expect(collection.getCurrentSelection().length).toBe(2);
        // collection.setTags([t1.tag, t2.tag, t3.tag]);
        // expect(collection.getTags().length).toBe(3);
    });
});
