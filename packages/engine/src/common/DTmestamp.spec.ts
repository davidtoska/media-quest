import { DTimestamp } from "./DTimestamp";

describe("DTimestamp works", () => {
    test("Can add milliseconds to timestamp", () => {
        const t0 = DTimestamp.now();
        const plus1000 = DTimestamp.addMills(t0, 1000);
        const diff = DTimestamp.diff(t0, plus1000);
        // const pageDto: PageDto = {id}
        expect(diff).toBe(1000);
    });
});
