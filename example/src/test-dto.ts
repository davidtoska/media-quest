import * as A from "../src";
export const testDto: A.SchemaDto = {
    backgroundColor: "lightgray",
    baseHeight: 1300,
    baseWidth: 1024,
    id: "hello",
    pages: [
        {
            backgroundColor: "green",
            id: "p0",
            elements: [
                {
                    _tag: "div",
                    id: "test-div2",
                    style: { h: 20, w: 30, y: 50, x: 50, backgroundColor: "red" },
                    children: [],
                    eventHandlers: [],
                    onClick: [
                        {
                            kind: "ELEMENT_STYLE_COMMAND",
                            targetId: "test-div2",
                            target: "ELEMENT",
                            payload: { changes: { backgroundColor: "green" } },
                        },
                        {
                            kind: "ELEMENT_DISABLE_CLICK_COMMAND",
                            targetId: "test-div2",
                            target: "ELEMENT",
                            payload: {},
                        },
                    ],
                },
                {
                    _tag: "div",
                    id: "test-div3",
                    style: { h: 50, w: 50, y: 0, x: 0, backgroundColor: "yellow" },
                    children: [],
                    eventHandlers: [],
                    onClick: [
                        {
                            kind: "ELEMENT_ENABLE_CLICK_COMMAND",
                            targetId: "test-div2",
                            target: "ELEMENT",
                            payload: {},
                        },
                        {
                            kind: "ELEMENT_STYLE_COMMAND",
                            targetId: "test-div2",
                            target: "ELEMENT",
                            payload: { changes: { backgroundColor: "red" } },
                        },
                        // {
                        //     kind: "ENGINE_LEAVE_PAGE_COMMAND",
                        //     target: "ENGINE",
                        //     targetId: "ENGINE",
                        //     payload: { factsCollected: [], pageId: "p0" },
                        // },
                    ],
                },
            ],
            tags: [],
        },
        {
            backgroundColor: "white",
            id: "p1",
            elements: [
                {
                    _tag: "div",
                    id: "div1",
                    style: {
                        h: 20,
                        w: 100,
                        x: 0,
                        y: 10,
                        borderRadius: { _unit: "px", value: 50 },
                        backgroundColor: "gray",
                    },
                    eventHandlers: [
                        {
                            onEvent: "USER_CLICKED_EVENT",
                            thenExecute: [
                                {
                                    target: "ELEMENT",
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    targetId: "div1",
                                    payload: { changes: { backgroundColor: "blue", y: 20 } },
                                },
                            ],
                        },
                    ],
                    onClick: [],
                    children: [
                        {
                            _tag: "p",
                            style: { fontSize: { _unit: "px", value: 32 }, y: 50, x: 50 },
                            text: "hello",
                            id: "p1",
                        },
                    ],
                },
            ],
            tags: [],
        },
    ],
    prefix: "Test DTO",
    rules: [],
    stateFromEvent: [],
};
