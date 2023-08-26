export const testJSon = {
    backgroundColor: "white",
    baseHeight: 1300,
    baseWidth: 1024,
    id: "test",
    pageSequences: [],
    pages: [
        {
            audio: [
                {
                    _tag: "audio",
                    id: "0UBwDUDo2VzqJzJfLNK0",
                    url: "https://firebasestorage.googleapis.com/v0/b/ispe-backend-dev.appspot.com/o/user-data%2Fpol8uyHKikQdfFAyXdkuBfxIa0H3%2Faudio%2F0UBwDUDo2VzqJzJfLNK0?alt=media&token=ba1e784a-6ab3-4ea5-990e-c2d01b767cf6",
                },
            ],
            autoPlaySequence: {
                blockUserInput: true,
                id: "1",
                items: [],
                startCommands: [
                    {
                        kind: "STATE_MUTATE_COMMAND",
                        target: "STATE",
                        targetId: "STATE",
                        payload: {
                            mutation: {
                                propName: "media-blocked-by-autoplay-sequence",
                                kind: "set-number",
                                value: 1,
                            },
                        },
                    },
                    {
                        kind: "STATE_MUTATE_COMMAND",
                        target: "STATE",
                        targetId: "STATE",
                        payload: {
                            mutation: {
                                propName: "input-blocked-by-autoplay-sequence",
                                kind: "set-number",
                                value: 1,
                            },
                        },
                    },
                ],
                endCommands: [
                    {
                        kind: "STATE_MUTATE_COMMAND",
                        target: "STATE",
                        targetId: "STATE",
                        payload: {
                            mutation: {
                                propName: "media-blocked-by-autoplay-sequence",
                                kind: "set-number",
                                value: 0,
                            },
                        },
                    },
                    {
                        kind: "STATE_MUTATE_COMMAND",
                        target: "STATE",
                        targetId: "STATE",
                        payload: {
                            mutation: {
                                propName: "input-blocked-by-autoplay-sequence",
                                kind: "set-number",
                                value: 0,
                            },
                        },
                    },
                ],
            },
            backgroundColor: "red",
            elements: [
                {
                    _tag: "img",
                    id: "xrADlqUGOhsGAEPttQYIqhmhjvQexx",
                    url: "https://firebasestorage.googleapis.com/v0/b/ispe-backend-dev.appspot.com/o/public-assets%2Fvolume_up-24px.svg?alt=media&token=551bd0a6-a515-4f87-a245-da433f4833f9",
                    style: {
                        h: 6,
                        w: 6,
                        x: 4,
                        y: 32,
                        cursor: "pointer",
                        opacity: 0.8,
                        visibility: "visible",
                    },
                    onClick: [
                        {
                            kind: "AUDIO_PLAY_COMMAND",
                            target: "AUDIO",
                            targetId: "0UBwDUDo2VzqJzJfLNK0",
                            payload: {
                                volume: 1,
                            },
                        },
                    ],
                    onStateChange: [
                        {
                            queryName: "disableAudio",
                            whenTrue: [
                                {
                                    kind: "ELEMENT_ENABLE_CLICK_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "xrADlqUGOhsGAEPttQYIqhmhjvQexx",
                                    payload: {},
                                },
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "xrADlqUGOhsGAEPttQYIqhmhjvQexx",
                                    payload: {
                                        changes: {
                                            opacity: 0.3,
                                            cursor: "not-allowed",
                                        },
                                    },
                                },
                            ],
                            whenFalse: [
                                {
                                    kind: "ELEMENT_ENABLE_CLICK_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "xrADlqUGOhsGAEPttQYIqhmhjvQexx",
                                    payload: {},
                                },
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "xrADlqUGOhsGAEPttQYIqhmhjvQexx",
                                    payload: {
                                        changes: {
                                            opacity: 0.8,
                                            cursor: "pointer",
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                },
                {
                    id: "builder-question-option-YaMFETGjHHDAVPydVIAJVVos",
                    _tag: "div",
                    children: [
                        {
                            _tag: "p",
                            id: "QNsOSKbsQhtMEAmxbVNadXjThrUIgl",
                            text: "Ja",
                            style: {
                                y: 50,
                                transform: "translate(0%, 50%)",
                                textColor: "#ffffff",
                                fontSize: {
                                    _unit: "px",
                                    value: 35,
                                },
                                w: 84,
                                x: 8,
                                fontWeight: 600,
                                textAlign: "center",
                            },
                        },
                    ],
                    onStateChange: [
                        {
                            queryName: "disableUserInput",
                            whenFalse: [
                                {
                                    kind: "ELEMENT_ENABLE_CLICK_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-YaMFETGjHHDAVPydVIAJVVos",
                                    payload: {},
                                },
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-YaMFETGjHHDAVPydVIAJVVos",
                                    payload: {
                                        changes: {
                                            opacity: 1,
                                            cursor: "pointer",
                                        },
                                    },
                                },
                            ],
                            whenTrue: [
                                {
                                    kind: "ELEMENT_DISABLE_CLICK_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-YaMFETGjHHDAVPydVIAJVVos",
                                    payload: {},
                                },
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-YaMFETGjHHDAVPydVIAJVVos",
                                    payload: {
                                        changes: {
                                            opacity: 0.3,
                                            cursor: "not-allowed",
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                    style: {
                        backgroundColor: "#2F5597",
                        borderColor: "#2F5597",
                        textColor: "#ffffff",
                        fontSize: {
                            _unit: "px",
                            value: 35,
                        },
                        borderWidth: {
                            _unit: "px",
                            value: 3,
                        },
                        borderStyle: "solid",
                        borderRadius: {
                            value: 10,
                            _unit: "px",
                        },
                        padding: {
                            _unit: "px",
                            value: 40,
                        },
                        h: 9.2,
                        w: 18.5,
                        x: 5.2,
                        y: 8,
                        textAlign: "center",
                        opacity: 1,
                        cursor: "pointer",
                    },
                    onClick: [
                        {
                            kind: "ENGINE_LEAVE_PAGE_COMMAND",
                            target: "ENGINE",
                            targetId: "ENGINE",
                            payload: {
                                pageId: "builder-page-ICqluDYKBCHaFHcmizyXpkAi",
                                factsCollected: [
                                    {
                                        kind: "numeric-fact",
                                        label: "Ja",
                                        value: 1,
                                        referenceId: "",
                                        referenceLabel: "QuestionId: ",
                                    },
                                ],
                            },
                        },
                    ],
                },
                {
                    id: "builder-question-option-BXhltNpZlQUOIMjBHTHDspLu",
                    _tag: "div",
                    children: [
                        {
                            _tag: "p",
                            id: "gTSptZAeqLLgoZCekQLKruOplhYMCz",
                            text: "Nei",
                            style: {
                                y: 50,
                                transform: "translate(0%, 50%)",
                                textColor: "#ffffff",
                                fontSize: {
                                    _unit: "px",
                                    value: 35,
                                },
                                w: 84,
                                x: 8,
                                fontWeight: 600,
                                textAlign: "center",
                            },
                        },
                    ],
                    onStateChange: [
                        {
                            queryName: "disableUserInput",
                            whenFalse: [
                                {
                                    kind: "ELEMENT_ENABLE_CLICK_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-BXhltNpZlQUOIMjBHTHDspLu",
                                    payload: {},
                                },
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-BXhltNpZlQUOIMjBHTHDspLu",
                                    payload: {
                                        changes: {
                                            opacity: 1,
                                            cursor: "pointer",
                                        },
                                    },
                                },
                            ],
                            whenTrue: [
                                {
                                    kind: "ELEMENT_DISABLE_CLICK_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-BXhltNpZlQUOIMjBHTHDspLu",
                                    payload: {},
                                },
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-BXhltNpZlQUOIMjBHTHDspLu",
                                    payload: {
                                        changes: {
                                            opacity: 0.3,
                                            cursor: "not-allowed",
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                    style: {
                        backgroundColor: "#2F5597",
                        borderColor: "#2F5597",
                        textColor: "#ffffff",
                        fontSize: {
                            _unit: "px",
                            value: 35,
                        },
                        borderWidth: {
                            _unit: "px",
                            value: 3,
                        },
                        borderStyle: "solid",
                        borderRadius: {
                            value: 10,
                            _unit: "px",
                        },
                        padding: {
                            _unit: "px",
                            value: 40,
                        },
                        h: 9.2,
                        w: 18.5,
                        x: 28.9,
                        y: 8,
                        textAlign: "center",
                        opacity: 1,
                        cursor: "pointer",
                    },
                    onClick: [
                        {
                            kind: "ENGINE_LEAVE_PAGE_COMMAND",
                            target: "ENGINE",
                            targetId: "ENGINE",
                            payload: {
                                pageId: "builder-page-ICqluDYKBCHaFHcmizyXpkAi",
                                factsCollected: [
                                    {
                                        kind: "numeric-fact",
                                        label: "Nei",
                                        value: 0,
                                        referenceId: "",
                                        referenceLabel: "QuestionId: ",
                                    },
                                ],
                            },
                        },
                    ],
                },
                {
                    id: "builder-question-option-YJAkUHfuOoijKBSrblQeabuk",
                    _tag: "div",
                    children: [
                        {
                            _tag: "p",
                            id: "RDnIktvUAmadaApFVZyFBFMONvDifq",
                            text: "Kanckje",
                            style: {
                                y: 50,
                                transform: "translate(0%, 50%)",
                                textColor: "#ffffff",
                                fontSize: {
                                    _unit: "px",
                                    value: 35,
                                },
                                w: 84,
                                x: 8,
                                fontWeight: 600,
                                textAlign: "center",
                            },
                        },
                    ],
                    onStateChange: [
                        {
                            queryName: "disableUserInput",
                            whenFalse: [
                                {
                                    kind: "ELEMENT_ENABLE_CLICK_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-YJAkUHfuOoijKBSrblQeabuk",
                                    payload: {},
                                },
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-YJAkUHfuOoijKBSrblQeabuk",
                                    payload: {
                                        changes: {
                                            opacity: 1,
                                            cursor: "pointer",
                                        },
                                    },
                                },
                            ],
                            whenTrue: [
                                {
                                    kind: "ELEMENT_DISABLE_CLICK_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-YJAkUHfuOoijKBSrblQeabuk",
                                    payload: {},
                                },
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-YJAkUHfuOoijKBSrblQeabuk",
                                    payload: {
                                        changes: {
                                            opacity: 0.3,
                                            cursor: "not-allowed",
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                    style: {
                        backgroundColor: "#2F5597",
                        borderColor: "#2F5597",
                        textColor: "#ffffff",
                        fontSize: {
                            _unit: "px",
                            value: 35,
                        },
                        borderWidth: {
                            _unit: "px",
                            value: 3,
                        },
                        borderStyle: "solid",
                        borderRadius: {
                            value: 10,
                            _unit: "px",
                        },
                        padding: {
                            _unit: "px",
                            value: 40,
                        },
                        h: 9.2,
                        w: 18.5,
                        x: 52.6,
                        y: 8,
                        textAlign: "center",
                        opacity: 1,
                        cursor: "pointer",
                    },
                    onClick: [
                        {
                            kind: "ENGINE_LEAVE_PAGE_COMMAND",
                            target: "ENGINE",
                            targetId: "ENGINE",
                            payload: {
                                pageId: "builder-page-ICqluDYKBCHaFHcmizyXpkAi",
                                factsCollected: [
                                    {
                                        kind: "numeric-fact",
                                        label: "Kanckje",
                                        value: 2,
                                        referenceId: "",
                                        referenceLabel: "QuestionId: ",
                                    },
                                ],
                            },
                        },
                    ],
                },
                {
                    id: "builder-question-option-APzyyxquSXebiENzetyZvdzG",
                    _tag: "div",
                    children: [
                        {
                            _tag: "p",
                            id: "vPTYCTnkDRsOpRSAPNCqsbqVSLLaXK",
                            text: "Vet ikke",
                            style: {
                                y: 50,
                                transform: "translate(0%, 50%)",
                                textColor: "#ffffff",
                                fontSize: {
                                    _unit: "px",
                                    value: 35,
                                },
                                w: 84,
                                x: 8,
                                fontWeight: 600,
                                textAlign: "center",
                            },
                        },
                    ],
                    onStateChange: [
                        {
                            queryName: "disableUserInput",
                            whenFalse: [
                                {
                                    kind: "ELEMENT_ENABLE_CLICK_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-APzyyxquSXebiENzetyZvdzG",
                                    payload: {},
                                },
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-APzyyxquSXebiENzetyZvdzG",
                                    payload: {
                                        changes: {
                                            opacity: 1,
                                            cursor: "pointer",
                                        },
                                    },
                                },
                            ],
                            whenTrue: [
                                {
                                    kind: "ELEMENT_DISABLE_CLICK_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-APzyyxquSXebiENzetyZvdzG",
                                    payload: {},
                                },
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-APzyyxquSXebiENzetyZvdzG",
                                    payload: {
                                        changes: {
                                            opacity: 0.3,
                                            cursor: "not-allowed",
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                    style: {
                        backgroundColor: "#2F5597",
                        borderColor: "#2F5597",
                        textColor: "#ffffff",
                        fontSize: {
                            _unit: "px",
                            value: 35,
                        },
                        borderWidth: {
                            _unit: "px",
                            value: 3,
                        },
                        borderStyle: "solid",
                        borderRadius: {
                            value: 10,
                            _unit: "px",
                        },
                        padding: {
                            _unit: "px",
                            value: 40,
                        },
                        h: 9.2,
                        w: 18.5,
                        x: 76.3,
                        y: 8,
                        textAlign: "center",
                        opacity: 1,
                        cursor: "pointer",
                    },
                    onClick: [
                        {
                            kind: "ENGINE_LEAVE_PAGE_COMMAND",
                            target: "ENGINE",
                            targetId: "ENGINE",
                            payload: {
                                pageId: "builder-page-ICqluDYKBCHaFHcmizyXpkAi",
                                factsCollected: [
                                    {
                                        kind: "numeric-fact",
                                        label: "Vet ikke",
                                        value: 9,
                                        referenceId: "",
                                        referenceLabel: "QuestionId: ",
                                    },
                                ],
                            },
                        },
                    ],
                },
                {
                    _tag: "p",
                    text: "Sjekk at lyd-avspilling virker: (auto-play=false)",
                    eventHandlers: [],
                    id: "itjESHaVkmfpyMlEqeqbihTdYpTGjP",
                    onClick: [],
                    onStateChange: [],
                    style: {
                        w: 80,
                        y: 27,
                        x: 10,
                        textAlign: "center",
                        textColor: "black",
                        fontSize: {
                            _unit: "px",
                            value: 30,
                        },
                    },
                },
            ],
            id: "builder-page-ICqluDYKBCHaFHcmizyXpkAi",
            tags: [],
            video: [],
        },
        {
            audio: [],
            autoPlaySequence: {
                blockUserInput: true,
                id: "1",
                items: [],
                startCommands: [
                    {
                        kind: "STATE_MUTATE_COMMAND",
                        target: "STATE",
                        targetId: "STATE",
                        payload: {
                            mutation: {
                                propName: "media-blocked-by-autoplay-sequence",
                                kind: "set-number",
                                value: 1,
                            },
                        },
                    },
                    {
                        kind: "STATE_MUTATE_COMMAND",
                        target: "STATE",
                        targetId: "STATE",
                        payload: {
                            mutation: {
                                propName: "input-blocked-by-autoplay-sequence",
                                kind: "set-number",
                                value: 1,
                            },
                        },
                    },
                ],
                endCommands: [
                    {
                        kind: "STATE_MUTATE_COMMAND",
                        target: "STATE",
                        targetId: "STATE",
                        payload: {
                            mutation: {
                                propName: "media-blocked-by-autoplay-sequence",
                                kind: "set-number",
                                value: 0,
                            },
                        },
                    },
                    {
                        kind: "STATE_MUTATE_COMMAND",
                        target: "STATE",
                        targetId: "STATE",
                        payload: {
                            mutation: {
                                propName: "input-blocked-by-autoplay-sequence",
                                kind: "set-number",
                                value: 0,
                            },
                        },
                    },
                ],
            },
            backgroundColor: "red",
            elements: [
                {
                    id: "builder-question-option-yyAcdVClydrLJpPfeohyBZIi",
                    _tag: "div",
                    children: [
                        {
                            _tag: "p",
                            id: "hzGScoYvgIcKoXTStbmGuHtAjrLvEX",
                            text: "Ja",
                            style: {
                                y: 50,
                                transform: "translate(0%, 50%)",
                                textColor: "#ffffff",
                                fontSize: {
                                    _unit: "px",
                                    value: 35,
                                },
                                w: 84,
                                x: 8,
                                fontWeight: 600,
                                textAlign: "center",
                            },
                        },
                    ],
                    onStateChange: [
                        {
                            queryName: "disableUserInput",
                            whenFalse: [
                                {
                                    kind: "ELEMENT_ENABLE_CLICK_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-yyAcdVClydrLJpPfeohyBZIi",
                                    payload: {},
                                },
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-yyAcdVClydrLJpPfeohyBZIi",
                                    payload: {
                                        changes: {
                                            opacity: 1,
                                            cursor: "pointer",
                                        },
                                    },
                                },
                            ],
                            whenTrue: [
                                {
                                    kind: "ELEMENT_DISABLE_CLICK_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-yyAcdVClydrLJpPfeohyBZIi",
                                    payload: {},
                                },
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-yyAcdVClydrLJpPfeohyBZIi",
                                    payload: {
                                        changes: {
                                            opacity: 0.3,
                                            cursor: "not-allowed",
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                    style: {
                        backgroundColor: "#2F5597",
                        borderColor: "#2F5597",
                        textColor: "#ffffff",
                        fontSize: {
                            _unit: "px",
                            value: 35,
                        },
                        borderWidth: {
                            _unit: "px",
                            value: 3,
                        },
                        borderStyle: "solid",
                        borderRadius: {
                            value: 10,
                            _unit: "px",
                        },
                        padding: {
                            _unit: "px",
                            value: 40,
                        },
                        h: 9.2,
                        w: 18.5,
                        x: 21,
                        y: 8,
                        textAlign: "center",
                        opacity: 1,
                        cursor: "pointer",
                    },
                    onClick: [
                        {
                            kind: "ENGINE_LEAVE_PAGE_COMMAND",
                            target: "ENGINE",
                            targetId: "ENGINE",
                            payload: {
                                pageId: "builder-page-qqHGeGZXJgSuQXIvXkpJrJPG",
                                factsCollected: [
                                    {
                                        kind: "numeric-fact",
                                        label: "Ja",
                                        value: 1,
                                        referenceId: "",
                                        referenceLabel: "QuestionId: ",
                                    },
                                ],
                            },
                        },
                    ],
                },
                {
                    id: "builder-question-option-SMVzchGnOSTQZIZjGBNkbUyJ",
                    _tag: "div",
                    children: [
                        {
                            _tag: "p",
                            id: "mhjjoBHIRiIhXiZeOJdvpLYVuMvKBp",
                            text: "Nei",
                            style: {
                                y: 50,
                                transform: "translate(0%, 50%)",
                                textColor: "#ffffff",
                                fontSize: {
                                    _unit: "px",
                                    value: 35,
                                },
                                w: 84,
                                x: 8,
                                fontWeight: 600,
                                textAlign: "center",
                            },
                        },
                    ],
                    onStateChange: [
                        {
                            queryName: "disableUserInput",
                            whenFalse: [
                                {
                                    kind: "ELEMENT_ENABLE_CLICK_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-SMVzchGnOSTQZIZjGBNkbUyJ",
                                    payload: {},
                                },
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-SMVzchGnOSTQZIZjGBNkbUyJ",
                                    payload: {
                                        changes: {
                                            opacity: 1,
                                            cursor: "pointer",
                                        },
                                    },
                                },
                            ],
                            whenTrue: [
                                {
                                    kind: "ELEMENT_DISABLE_CLICK_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-SMVzchGnOSTQZIZjGBNkbUyJ",
                                    payload: {},
                                },
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-SMVzchGnOSTQZIZjGBNkbUyJ",
                                    payload: {
                                        changes: {
                                            opacity: 0.3,
                                            cursor: "not-allowed",
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                    style: {
                        backgroundColor: "#2F5597",
                        borderColor: "#2F5597",
                        textColor: "#ffffff",
                        fontSize: {
                            _unit: "px",
                            value: 35,
                        },
                        borderWidth: {
                            _unit: "px",
                            value: 3,
                        },
                        borderStyle: "solid",
                        borderRadius: {
                            value: 10,
                            _unit: "px",
                        },
                        padding: {
                            _unit: "px",
                            value: 40,
                        },
                        h: 9.2,
                        w: 18.5,
                        x: 60.5,
                        y: 8,
                        textAlign: "center",
                        opacity: 1,
                        cursor: "pointer",
                    },
                    onClick: [
                        {
                            kind: "ENGINE_LEAVE_PAGE_COMMAND",
                            target: "ENGINE",
                            targetId: "ENGINE",
                            payload: {
                                pageId: "builder-page-qqHGeGZXJgSuQXIvXkpJrJPG",
                                factsCollected: [
                                    {
                                        kind: "numeric-fact",
                                        label: "Nei",
                                        value: 0,
                                        referenceId: "",
                                        referenceLabel: "QuestionId: ",
                                    },
                                ],
                            },
                        },
                    ],
                },
                {
                    _tag: "p",
                    text: "Sjekk at lyd-avspilling virker: (auto-play=false)",
                    eventHandlers: [],
                    id: "fRdSBAoYkMVSRGsHpYMNtbBRQbbmFb",
                    onClick: [],
                    onStateChange: [],
                    style: {
                        w: 80,
                        y: 27,
                        x: 10,
                        textAlign: "center",
                        textColor: "black",
                        fontSize: {
                            _unit: "px",
                            value: 30,
                        },
                    },
                },
                {
                    id: "play-btn-for8F9lEfcQfN4zfAIfeN26",
                    _tag: "img",
                    url: "https://firebasestorage.googleapis.com/v0/b/ispe-backend-dev.appspot.com/o/public-assets%2Fplay-circle-regular.svg?alt=media&token=0867b690-d7fd-475c-8e91-b2d7aeca54d1",
                    style: {
                        w: 5,
                        h: 5,
                        y: 48,
                        x: 4,
                        opacity: 0.8,
                        cursor: "pointer",
                    },
                    onClick: [
                        {
                            kind: "VIDEO_PLAY_COMMAND",
                            target: "VIDEO",
                            targetId: "8F9lEfcQfN4zfAIfeN26",
                            payload: {},
                        },
                        {
                            kind: "STATE_MUTATE_COMMAND",
                            target: "STATE",
                            targetId: "STATE",
                            payload: {
                                mutation: {
                                    propName: "media-blocked-by-video",
                                    kind: "set-number",
                                    value: 1,
                                },
                            },
                        },
                        {
                            kind: "STATE_MUTATE_COMMAND",
                            target: "STATE",
                            targetId: "STATE",
                            payload: {
                                mutation: {
                                    propName: "user-paused-video",
                                    kind: "set-number",
                                    value: 0,
                                },
                            },
                        },
                    ],
                    onStateChange: [
                        {
                            queryName: "disableVideo",
                            whenTrue: [
                                {
                                    kind: "ELEMENT_DISABLE_CLICK_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "play-btn-for8F9lEfcQfN4zfAIfeN26",
                                    payload: {},
                                },
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "play-btn-for8F9lEfcQfN4zfAIfeN26",
                                    payload: {
                                        changes: {
                                            opacity: 0.3,
                                            cursor: "not-allowed",
                                        },
                                    },
                                },
                            ],
                            whenFalse: [
                                {
                                    kind: "ELEMENT_ENABLE_CLICK_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "play-btn-for8F9lEfcQfN4zfAIfeN26",
                                    payload: {},
                                },
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "play-btn-for8F9lEfcQfN4zfAIfeN26",
                                    payload: {
                                        changes: {
                                            opacity: 0.8,
                                            cursor: "pointer",
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            queryName: "hide video play button",
                            whenTrue: [
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "play-btn-for8F9lEfcQfN4zfAIfeN26",
                                    payload: {
                                        changes: {
                                            visibility: "hidden",
                                        },
                                    },
                                },
                            ],
                            whenFalse: [
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "play-btn-for8F9lEfcQfN4zfAIfeN26",
                                    payload: {
                                        changes: {
                                            visibility: "visible",
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                },
                {
                    id: "pause-btn-for8F9lEfcQfN4zfAIfeN26",
                    _tag: "img",
                    style: {
                        w: 5,
                        h: 5,
                        y: 48,
                        x: 4,
                        visibility: "hidden",
                        opacity: 0.8,
                        cursor: "pointer",
                    },
                    url: "https://firebasestorage.googleapis.com/v0/b/ispe-backend-dev.appspot.com/o/public-assets%2Fpause-24px.svg?alt=media&token=47337491-bb0d-4c56-9c89-a073ce19fad4",
                    onClick: [
                        {
                            kind: "VIDEO_PAUSE_COMMAND",
                            target: "VIDEO",
                            targetId: "8F9lEfcQfN4zfAIfeN26",
                            payload: {},
                        },
                        {
                            kind: "STATE_MUTATE_COMMAND",
                            target: "STATE",
                            targetId: "STATE",
                            payload: {
                                mutation: {
                                    propName: "media-blocked-by-video",
                                    kind: "set-number",
                                    value: 0,
                                },
                            },
                        },
                        {
                            kind: "STATE_MUTATE_COMMAND",
                            target: "STATE",
                            targetId: "STATE",
                            payload: {
                                mutation: {
                                    propName: "user-paused-video",
                                    kind: "set-number",
                                    value: 1,
                                },
                            },
                        },
                    ],
                    onStateChange: [
                        {
                            queryName: "hide video pause button",
                            whenTrue: [
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "pause-btn-for8F9lEfcQfN4zfAIfeN26",
                                    payload: {
                                        changes: {
                                            visibility: "hidden",
                                        },
                                    },
                                },
                            ],
                            whenFalse: [
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "pause-btn-for8F9lEfcQfN4zfAIfeN26",
                                    payload: {
                                        changes: {
                                            visibility: "visible",
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
            id: "builder-page-qqHGeGZXJgSuQXIvXkpJrJPG",
            mainVideoId: "8F9lEfcQfN4zfAIfeN26",
            tags: [],
            video: [
                {
                    _tag: "video",
                    id: "8F9lEfcQfN4zfAIfeN26",
                    style: {
                        w: 100,
                        h: 45,
                        y: 55,
                        x: 0,
                    },
                    url: "https://firebasestorage.googleapis.com/v0/b/ispe-backend-dev.appspot.com/o/user-data%2Fpol8uyHKikQdfFAyXdkuBfxIa0H3%2Fvideo%2F8F9lEfcQfN4zfAIfeN26?alt=media&token=c9de7abb-65d5-4329-a46b-6af2c341139c",
                },
            ],
        },
        {
            audio: [
                {
                    _tag: "audio",
                    id: "0UBwDUDo2VzqJzJfLNK0",
                    url: "https://firebasestorage.googleapis.com/v0/b/ispe-backend-dev.appspot.com/o/user-data%2Fpol8uyHKikQdfFAyXdkuBfxIa0H3%2Faudio%2F0UBwDUDo2VzqJzJfLNK0?alt=media&token=ba1e784a-6ab3-4ea5-990e-c2d01b767cf6",
                },
            ],
            autoPlaySequence: {
                blockUserInput: true,
                id: "1",
                items: [
                    {
                        kind: "autoplay-audio",
                        audioId: "0UBwDUDo2VzqJzJfLNK0",
                    },
                ],
                startCommands: [
                    {
                        kind: "STATE_MUTATE_COMMAND",
                        target: "STATE",
                        targetId: "STATE",
                        payload: {
                            mutation: {
                                propName: "media-blocked-by-autoplay-sequence",
                                kind: "set-number",
                                value: 1,
                            },
                        },
                    },
                    {
                        kind: "STATE_MUTATE_COMMAND",
                        target: "STATE",
                        targetId: "STATE",
                        payload: {
                            mutation: {
                                propName: "input-blocked-by-autoplay-sequence",
                                kind: "set-number",
                                value: 1,
                            },
                        },
                    },
                ],
                endCommands: [
                    {
                        kind: "STATE_MUTATE_COMMAND",
                        target: "STATE",
                        targetId: "STATE",
                        payload: {
                            mutation: {
                                propName: "media-blocked-by-autoplay-sequence",
                                kind: "set-number",
                                value: 0,
                            },
                        },
                    },
                    {
                        kind: "STATE_MUTATE_COMMAND",
                        target: "STATE",
                        targetId: "STATE",
                        payload: {
                            mutation: {
                                propName: "input-blocked-by-autoplay-sequence",
                                kind: "set-number",
                                value: 0,
                            },
                        },
                    },
                ],
            },
            backgroundColor: "red",
            elements: [
                {
                    _tag: "img",
                    id: "zolDzIljIxcUOHPPPTICUxUHBYxJTl",
                    url: "https://firebasestorage.googleapis.com/v0/b/ispe-backend-dev.appspot.com/o/public-assets%2Fvolume_up-24px.svg?alt=media&token=551bd0a6-a515-4f87-a245-da433f4833f9",
                    style: {
                        h: 6,
                        w: 6,
                        x: 4,
                        y: 32,
                        cursor: "pointer",
                        opacity: 0.8,
                        visibility: "visible",
                    },
                    onClick: [
                        {
                            kind: "AUDIO_PLAY_COMMAND",
                            target: "AUDIO",
                            targetId: "0UBwDUDo2VzqJzJfLNK0",
                            payload: {
                                volume: 1,
                            },
                        },
                    ],
                    onStateChange: [
                        {
                            queryName: "disableAudio",
                            whenTrue: [
                                {
                                    kind: "ELEMENT_ENABLE_CLICK_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "zolDzIljIxcUOHPPPTICUxUHBYxJTl",
                                    payload: {},
                                },
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "zolDzIljIxcUOHPPPTICUxUHBYxJTl",
                                    payload: {
                                        changes: {
                                            opacity: 0.3,
                                            cursor: "not-allowed",
                                        },
                                    },
                                },
                            ],
                            whenFalse: [
                                {
                                    kind: "ELEMENT_ENABLE_CLICK_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "zolDzIljIxcUOHPPPTICUxUHBYxJTl",
                                    payload: {},
                                },
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "zolDzIljIxcUOHPPPTICUxUHBYxJTl",
                                    payload: {
                                        changes: {
                                            opacity: 0.8,
                                            cursor: "pointer",
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                },
                {
                    id: "builder-question-option-oeMPuEXizXKpZKtgrOArPzlF",
                    _tag: "div",
                    children: [
                        {
                            _tag: "p",
                            id: "aFiQLPJBOqJVAGOaPISplnENUTjAqf",
                            text: "Ja",
                            style: {
                                y: 50,
                                transform: "translate(0%, 50%)",
                                textColor: "#ffffff",
                                fontSize: {
                                    _unit: "px",
                                    value: 35,
                                },
                                w: 84,
                                x: 8,
                                fontWeight: 600,
                                textAlign: "center",
                            },
                        },
                    ],
                    onStateChange: [
                        {
                            queryName: "disableUserInput",
                            whenFalse: [
                                {
                                    kind: "ELEMENT_ENABLE_CLICK_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-oeMPuEXizXKpZKtgrOArPzlF",
                                    payload: {},
                                },
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-oeMPuEXizXKpZKtgrOArPzlF",
                                    payload: {
                                        changes: {
                                            opacity: 1,
                                            cursor: "pointer",
                                        },
                                    },
                                },
                            ],
                            whenTrue: [
                                {
                                    kind: "ELEMENT_DISABLE_CLICK_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-oeMPuEXizXKpZKtgrOArPzlF",
                                    payload: {},
                                },
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-oeMPuEXizXKpZKtgrOArPzlF",
                                    payload: {
                                        changes: {
                                            opacity: 0.3,
                                            cursor: "not-allowed",
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                    style: {
                        backgroundColor: "#2F5597",
                        borderColor: "#2F5597",
                        textColor: "#ffffff",
                        fontSize: {
                            _unit: "px",
                            value: 35,
                        },
                        borderWidth: {
                            _unit: "px",
                            value: 3,
                        },
                        borderStyle: "solid",
                        borderRadius: {
                            value: 10,
                            _unit: "px",
                        },
                        padding: {
                            _unit: "px",
                            value: 40,
                        },
                        h: 9.2,
                        w: 18.5,
                        x: 21,
                        y: 8,
                        textAlign: "center",
                        opacity: 1,
                        cursor: "pointer",
                    },
                    onClick: [
                        {
                            kind: "ENGINE_LEAVE_PAGE_COMMAND",
                            target: "ENGINE",
                            targetId: "ENGINE",
                            payload: {
                                pageId: "builder-page-xqCpsirloieagcYyqxYjrrLc",
                                factsCollected: [
                                    {
                                        kind: "numeric-fact",
                                        label: "Ja",
                                        value: 1,
                                        referenceId: "",
                                        referenceLabel: "QuestionId: ",
                                    },
                                ],
                            },
                        },
                    ],
                },
                {
                    id: "builder-question-option-KUOTJrJBfGzyORrziMMVunLP",
                    _tag: "div",
                    children: [
                        {
                            _tag: "p",
                            id: "TuQyAirLyPSQtKmtSVPmXebPvzhegZ",
                            text: "Nei",
                            style: {
                                y: 50,
                                transform: "translate(0%, 50%)",
                                textColor: "#ffffff",
                                fontSize: {
                                    _unit: "px",
                                    value: 35,
                                },
                                w: 84,
                                x: 8,
                                fontWeight: 600,
                                textAlign: "center",
                            },
                        },
                    ],
                    onStateChange: [
                        {
                            queryName: "disableUserInput",
                            whenFalse: [
                                {
                                    kind: "ELEMENT_ENABLE_CLICK_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-KUOTJrJBfGzyORrziMMVunLP",
                                    payload: {},
                                },
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-KUOTJrJBfGzyORrziMMVunLP",
                                    payload: {
                                        changes: {
                                            opacity: 1,
                                            cursor: "pointer",
                                        },
                                    },
                                },
                            ],
                            whenTrue: [
                                {
                                    kind: "ELEMENT_DISABLE_CLICK_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-KUOTJrJBfGzyORrziMMVunLP",
                                    payload: {},
                                },
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-KUOTJrJBfGzyORrziMMVunLP",
                                    payload: {
                                        changes: {
                                            opacity: 0.3,
                                            cursor: "not-allowed",
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                    style: {
                        backgroundColor: "#2F5597",
                        borderColor: "#2F5597",
                        textColor: "#ffffff",
                        fontSize: {
                            _unit: "px",
                            value: 35,
                        },
                        borderWidth: {
                            _unit: "px",
                            value: 3,
                        },
                        borderStyle: "solid",
                        borderRadius: {
                            value: 10,
                            _unit: "px",
                        },
                        padding: {
                            _unit: "px",
                            value: 40,
                        },
                        h: 9.2,
                        w: 18.5,
                        x: 60.5,
                        y: 8,
                        textAlign: "center",
                        opacity: 1,
                        cursor: "pointer",
                    },
                    onClick: [
                        {
                            kind: "ENGINE_LEAVE_PAGE_COMMAND",
                            target: "ENGINE",
                            targetId: "ENGINE",
                            payload: {
                                pageId: "builder-page-xqCpsirloieagcYyqxYjrrLc",
                                factsCollected: [
                                    {
                                        kind: "numeric-fact",
                                        label: "Nei",
                                        value: 0,
                                        referenceId: "",
                                        referenceLabel: "QuestionId: ",
                                    },
                                ],
                            },
                        },
                    ],
                },
                {
                    _tag: "p",
                    text: "Autoplay av spørsmål virker.",
                    eventHandlers: [],
                    id: "hhSGAxbiVDZqkHVOOqNxtlsqVOvzQP",
                    onClick: [],
                    onStateChange: [],
                    style: {
                        w: 80,
                        y: 27,
                        x: 10,
                        textAlign: "center",
                        textColor: "black",
                        fontSize: {
                            _unit: "px",
                            value: 30,
                        },
                    },
                },
            ],
            id: "builder-page-xqCpsirloieagcYyqxYjrrLc",
            tags: [],
            video: [],
        },
        {
            audio: [
                {
                    _tag: "audio",
                    id: "0UBwDUDo2VzqJzJfLNK0",
                    url: "https://firebasestorage.googleapis.com/v0/b/ispe-backend-dev.appspot.com/o/user-data%2Fpol8uyHKikQdfFAyXdkuBfxIa0H3%2Faudio%2F0UBwDUDo2VzqJzJfLNK0?alt=media&token=ba1e784a-6ab3-4ea5-990e-c2d01b767cf6",
                },
            ],
            autoPlaySequence: {
                blockUserInput: true,
                id: "1",
                items: [
                    {
                        kind: "autoplay-video",
                        videoId: "8F9lEfcQfN4zfAIfeN26",
                    },
                    {
                        kind: "autoplay-audio",
                        audioId: "0UBwDUDo2VzqJzJfLNK0",
                    },
                ],
                startCommands: [
                    {
                        kind: "STATE_MUTATE_COMMAND",
                        target: "STATE",
                        targetId: "STATE",
                        payload: {
                            mutation: {
                                propName: "media-blocked-by-autoplay-sequence",
                                kind: "set-number",
                                value: 1,
                            },
                        },
                    },
                    {
                        kind: "STATE_MUTATE_COMMAND",
                        target: "STATE",
                        targetId: "STATE",
                        payload: {
                            mutation: {
                                propName: "input-blocked-by-autoplay-sequence",
                                kind: "set-number",
                                value: 1,
                            },
                        },
                    },
                ],
                endCommands: [
                    {
                        kind: "STATE_MUTATE_COMMAND",
                        target: "STATE",
                        targetId: "STATE",
                        payload: {
                            mutation: {
                                propName: "media-blocked-by-autoplay-sequence",
                                kind: "set-number",
                                value: 0,
                            },
                        },
                    },
                    {
                        kind: "STATE_MUTATE_COMMAND",
                        target: "STATE",
                        targetId: "STATE",
                        payload: {
                            mutation: {
                                propName: "input-blocked-by-autoplay-sequence",
                                kind: "set-number",
                                value: 0,
                            },
                        },
                    },
                ],
            },
            backgroundColor: "red",
            elements: [
                {
                    _tag: "img",
                    id: "EafOnaloMYOYuFjAXQqZxLzgmguagK",
                    url: "https://firebasestorage.googleapis.com/v0/b/ispe-backend-dev.appspot.com/o/public-assets%2Fvolume_up-24px.svg?alt=media&token=551bd0a6-a515-4f87-a245-da433f4833f9",
                    style: {
                        h: 6,
                        w: 6,
                        x: 4,
                        y: 32,
                        cursor: "pointer",
                        opacity: 0.8,
                        visibility: "visible",
                    },
                    onClick: [
                        {
                            kind: "AUDIO_PLAY_COMMAND",
                            target: "AUDIO",
                            targetId: "0UBwDUDo2VzqJzJfLNK0",
                            payload: {
                                volume: 1,
                            },
                        },
                    ],
                    onStateChange: [
                        {
                            queryName: "disableAudio",
                            whenTrue: [
                                {
                                    kind: "ELEMENT_ENABLE_CLICK_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "EafOnaloMYOYuFjAXQqZxLzgmguagK",
                                    payload: {},
                                },
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "EafOnaloMYOYuFjAXQqZxLzgmguagK",
                                    payload: {
                                        changes: {
                                            opacity: 0.3,
                                            cursor: "not-allowed",
                                        },
                                    },
                                },
                            ],
                            whenFalse: [
                                {
                                    kind: "ELEMENT_ENABLE_CLICK_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "EafOnaloMYOYuFjAXQqZxLzgmguagK",
                                    payload: {},
                                },
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "EafOnaloMYOYuFjAXQqZxLzgmguagK",
                                    payload: {
                                        changes: {
                                            opacity: 0.8,
                                            cursor: "pointer",
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                },
                {
                    id: "builder-question-option-ppmRNYiXzyVaCayvlyMKxBUr",
                    _tag: "div",
                    children: [
                        {
                            _tag: "p",
                            id: "KQkHVLSbdAcYBURMqPIeqyCMyOpLyN",
                            text: "Ja",
                            style: {
                                y: 50,
                                transform: "translate(0%, 50%)",
                                textColor: "#ffffff",
                                fontSize: {
                                    _unit: "px",
                                    value: 35,
                                },
                                w: 84,
                                x: 8,
                                fontWeight: 600,
                                textAlign: "center",
                            },
                        },
                    ],
                    onStateChange: [
                        {
                            queryName: "disableUserInput",
                            whenFalse: [
                                {
                                    kind: "ELEMENT_ENABLE_CLICK_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-ppmRNYiXzyVaCayvlyMKxBUr",
                                    payload: {},
                                },
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-ppmRNYiXzyVaCayvlyMKxBUr",
                                    payload: {
                                        changes: {
                                            opacity: 1,
                                            cursor: "pointer",
                                        },
                                    },
                                },
                            ],
                            whenTrue: [
                                {
                                    kind: "ELEMENT_DISABLE_CLICK_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-ppmRNYiXzyVaCayvlyMKxBUr",
                                    payload: {},
                                },
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-ppmRNYiXzyVaCayvlyMKxBUr",
                                    payload: {
                                        changes: {
                                            opacity: 0.3,
                                            cursor: "not-allowed",
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                    style: {
                        backgroundColor: "#2F5597",
                        borderColor: "#2F5597",
                        textColor: "#ffffff",
                        fontSize: {
                            _unit: "px",
                            value: 35,
                        },
                        borderWidth: {
                            _unit: "px",
                            value: 3,
                        },
                        borderStyle: "solid",
                        borderRadius: {
                            value: 10,
                            _unit: "px",
                        },
                        padding: {
                            _unit: "px",
                            value: 40,
                        },
                        h: 9.2,
                        w: 18.5,
                        x: 11.125,
                        y: 8,
                        textAlign: "center",
                        opacity: 1,
                        cursor: "pointer",
                    },
                    onClick: [
                        {
                            kind: "ENGINE_LEAVE_PAGE_COMMAND",
                            target: "ENGINE",
                            targetId: "ENGINE",
                            payload: {
                                pageId: "builder-page-mlHSHcqnmtAaPvsEVoNLJsuc",
                                factsCollected: [
                                    {
                                        kind: "numeric-fact",
                                        label: "Ja",
                                        value: 1,
                                        referenceId: "",
                                        referenceLabel: "QuestionId: ",
                                    },
                                ],
                            },
                        },
                    ],
                },
                {
                    id: "builder-question-option-OTOUaQCdzaprgllbSMdfxTBr",
                    _tag: "div",
                    children: [
                        {
                            _tag: "p",
                            id: "lBjGFUKmlYHKteSiLngDRkYhTpHDuL",
                            text: "Nei",
                            style: {
                                y: 50,
                                transform: "translate(0%, 50%)",
                                textColor: "#ffffff",
                                fontSize: {
                                    _unit: "px",
                                    value: 35,
                                },
                                w: 84,
                                x: 8,
                                fontWeight: 600,
                                textAlign: "center",
                            },
                        },
                    ],
                    onStateChange: [
                        {
                            queryName: "disableUserInput",
                            whenFalse: [
                                {
                                    kind: "ELEMENT_ENABLE_CLICK_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-OTOUaQCdzaprgllbSMdfxTBr",
                                    payload: {},
                                },
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-OTOUaQCdzaprgllbSMdfxTBr",
                                    payload: {
                                        changes: {
                                            opacity: 1,
                                            cursor: "pointer",
                                        },
                                    },
                                },
                            ],
                            whenTrue: [
                                {
                                    kind: "ELEMENT_DISABLE_CLICK_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-OTOUaQCdzaprgllbSMdfxTBr",
                                    payload: {},
                                },
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-OTOUaQCdzaprgllbSMdfxTBr",
                                    payload: {
                                        changes: {
                                            opacity: 0.3,
                                            cursor: "not-allowed",
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                    style: {
                        backgroundColor: "#2F5597",
                        borderColor: "#2F5597",
                        textColor: "#ffffff",
                        fontSize: {
                            _unit: "px",
                            value: 35,
                        },
                        borderWidth: {
                            _unit: "px",
                            value: 3,
                        },
                        borderStyle: "solid",
                        borderRadius: {
                            value: 10,
                            _unit: "px",
                        },
                        padding: {
                            _unit: "px",
                            value: 40,
                        },
                        h: 9.2,
                        w: 18.5,
                        x: 40.75,
                        y: 8,
                        textAlign: "center",
                        opacity: 1,
                        cursor: "pointer",
                    },
                    onClick: [
                        {
                            kind: "ENGINE_LEAVE_PAGE_COMMAND",
                            target: "ENGINE",
                            targetId: "ENGINE",
                            payload: {
                                pageId: "builder-page-mlHSHcqnmtAaPvsEVoNLJsuc",
                                factsCollected: [
                                    {
                                        kind: "numeric-fact",
                                        label: "Nei",
                                        value: 0,
                                        referenceId: "",
                                        referenceLabel: "QuestionId: ",
                                    },
                                ],
                            },
                        },
                    ],
                },
                {
                    id: "builder-question-option-OTSgTozhzcoKGeeMNuUYyvFk",
                    _tag: "div",
                    children: [
                        {
                            _tag: "p",
                            id: "VtXJIxzmMcArKJYavuojcQQJGViktQ",
                            text: "Vet ikke",
                            style: {
                                y: 50,
                                transform: "translate(0%, 50%)",
                                textColor: "#ffffff",
                                fontSize: {
                                    _unit: "px",
                                    value: 35,
                                },
                                w: 84,
                                x: 8,
                                fontWeight: 600,
                                textAlign: "center",
                            },
                        },
                    ],
                    onStateChange: [
                        {
                            queryName: "disableUserInput",
                            whenFalse: [
                                {
                                    kind: "ELEMENT_ENABLE_CLICK_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-OTSgTozhzcoKGeeMNuUYyvFk",
                                    payload: {},
                                },
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-OTSgTozhzcoKGeeMNuUYyvFk",
                                    payload: {
                                        changes: {
                                            opacity: 1,
                                            cursor: "pointer",
                                        },
                                    },
                                },
                            ],
                            whenTrue: [
                                {
                                    kind: "ELEMENT_DISABLE_CLICK_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-OTSgTozhzcoKGeeMNuUYyvFk",
                                    payload: {},
                                },
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "builder-question-option-OTSgTozhzcoKGeeMNuUYyvFk",
                                    payload: {
                                        changes: {
                                            opacity: 0.3,
                                            cursor: "not-allowed",
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                    style: {
                        backgroundColor: "#2F5597",
                        borderColor: "#2F5597",
                        textColor: "#ffffff",
                        fontSize: {
                            _unit: "px",
                            value: 35,
                        },
                        borderWidth: {
                            _unit: "px",
                            value: 3,
                        },
                        borderStyle: "solid",
                        borderRadius: {
                            value: 10,
                            _unit: "px",
                        },
                        padding: {
                            _unit: "px",
                            value: 40,
                        },
                        h: 9.2,
                        w: 18.5,
                        x: 70.375,
                        y: 8,
                        textAlign: "center",
                        opacity: 1,
                        cursor: "pointer",
                    },
                    onClick: [
                        {
                            kind: "ENGINE_LEAVE_PAGE_COMMAND",
                            target: "ENGINE",
                            targetId: "ENGINE",
                            payload: {
                                pageId: "builder-page-mlHSHcqnmtAaPvsEVoNLJsuc",
                                factsCollected: [
                                    {
                                        kind: "numeric-fact",
                                        label: "Vet ikke",
                                        value: 9,
                                        referenceId: "",
                                        referenceLabel: "QuestionId: ",
                                    },
                                ],
                            },
                        },
                    ],
                },
                {
                    _tag: "p",
                    text: "Autoplay Video og Audio virker.",
                    eventHandlers: [],
                    id: "DOuGFoxhhMrSjouDEGlNYBxYSySVdv",
                    onClick: [],
                    onStateChange: [],
                    style: {
                        w: 80,
                        y: 27,
                        x: 10,
                        textAlign: "center",
                        textColor: "black",
                        fontSize: {
                            _unit: "px",
                            value: 30,
                        },
                    },
                },
                {
                    id: "play-btn-for8F9lEfcQfN4zfAIfeN26",
                    _tag: "img",
                    url: "https://firebasestorage.googleapis.com/v0/b/ispe-backend-dev.appspot.com/o/public-assets%2Fplay-circle-regular.svg?alt=media&token=0867b690-d7fd-475c-8e91-b2d7aeca54d1",
                    style: {
                        w: 5,
                        h: 5,
                        y: 48,
                        x: 4,
                        opacity: 0.8,
                        cursor: "pointer",
                    },
                    onClick: [
                        {
                            kind: "VIDEO_PLAY_COMMAND",
                            target: "VIDEO",
                            targetId: "8F9lEfcQfN4zfAIfeN26",
                            payload: {},
                        },
                        {
                            kind: "STATE_MUTATE_COMMAND",
                            target: "STATE",
                            targetId: "STATE",
                            payload: {
                                mutation: {
                                    propName: "media-blocked-by-video",
                                    kind: "set-number",
                                    value: 1,
                                },
                            },
                        },
                        {
                            kind: "STATE_MUTATE_COMMAND",
                            target: "STATE",
                            targetId: "STATE",
                            payload: {
                                mutation: {
                                    propName: "user-paused-video",
                                    kind: "set-number",
                                    value: 0,
                                },
                            },
                        },
                    ],
                    onStateChange: [
                        {
                            queryName: "disableVideo",
                            whenTrue: [
                                {
                                    kind: "ELEMENT_DISABLE_CLICK_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "play-btn-for8F9lEfcQfN4zfAIfeN26",
                                    payload: {},
                                },
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "play-btn-for8F9lEfcQfN4zfAIfeN26",
                                    payload: {
                                        changes: {
                                            opacity: 0.3,
                                            cursor: "not-allowed",
                                        },
                                    },
                                },
                            ],
                            whenFalse: [
                                {
                                    kind: "ELEMENT_ENABLE_CLICK_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "play-btn-for8F9lEfcQfN4zfAIfeN26",
                                    payload: {},
                                },
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "play-btn-for8F9lEfcQfN4zfAIfeN26",
                                    payload: {
                                        changes: {
                                            opacity: 0.8,
                                            cursor: "pointer",
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            queryName: "hide video play button",
                            whenTrue: [
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "play-btn-for8F9lEfcQfN4zfAIfeN26",
                                    payload: {
                                        changes: {
                                            visibility: "hidden",
                                        },
                                    },
                                },
                            ],
                            whenFalse: [
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "play-btn-for8F9lEfcQfN4zfAIfeN26",
                                    payload: {
                                        changes: {
                                            visibility: "visible",
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                },
                {
                    id: "pause-btn-for8F9lEfcQfN4zfAIfeN26",
                    _tag: "img",
                    style: {
                        w: 5,
                        h: 5,
                        y: 48,
                        x: 4,
                        visibility: "hidden",
                        opacity: 0.8,
                        cursor: "pointer",
                    },
                    url: "https://firebasestorage.googleapis.com/v0/b/ispe-backend-dev.appspot.com/o/public-assets%2Fpause-24px.svg?alt=media&token=47337491-bb0d-4c56-9c89-a073ce19fad4",
                    onClick: [
                        {
                            kind: "VIDEO_PAUSE_COMMAND",
                            target: "VIDEO",
                            targetId: "8F9lEfcQfN4zfAIfeN26",
                            payload: {},
                        },
                        {
                            kind: "STATE_MUTATE_COMMAND",
                            target: "STATE",
                            targetId: "STATE",
                            payload: {
                                mutation: {
                                    propName: "media-blocked-by-video",
                                    kind: "set-number",
                                    value: 0,
                                },
                            },
                        },
                        {
                            kind: "STATE_MUTATE_COMMAND",
                            target: "STATE",
                            targetId: "STATE",
                            payload: {
                                mutation: {
                                    propName: "user-paused-video",
                                    kind: "set-number",
                                    value: 1,
                                },
                            },
                        },
                    ],
                    onStateChange: [
                        {
                            queryName: "hide video pause button",
                            whenTrue: [
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "pause-btn-for8F9lEfcQfN4zfAIfeN26",
                                    payload: {
                                        changes: {
                                            visibility: "hidden",
                                        },
                                    },
                                },
                            ],
                            whenFalse: [
                                {
                                    kind: "ELEMENT_STYLE_COMMAND",
                                    target: "ELEMENT",
                                    targetId: "pause-btn-for8F9lEfcQfN4zfAIfeN26",
                                    payload: {
                                        changes: {
                                            visibility: "visible",
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
            id: "builder-page-mlHSHcqnmtAaPvsEVoNLJsuc",
            mainVideoId: "8F9lEfcQfN4zfAIfeN26",
            tags: [],
            video: [
                {
                    _tag: "video",
                    id: "8F9lEfcQfN4zfAIfeN26",
                    style: {
                        w: 100,
                        h: 45,
                        y: 55,
                        x: 0,
                    },
                    url: "https://firebasestorage.googleapis.com/v0/b/ispe-backend-dev.appspot.com/o/user-data%2Fpol8uyHKikQdfFAyXdkuBfxIa0H3%2Fvideo%2F8F9lEfcQfN4zfAIfeN26?alt=media&token=c9de7abb-65d5-4329-a46b-6af2c341139c",
                },
            ],
        },
    ],
    predefinedFacts: [],
    prefix: "xy",
    rules: [],
    stateFromEvent: [
        {
            onEvent: "VIDEO_ENDED_EVENT",
            thenExecute: [
                {
                    kind: "STATE_MUTATE_COMMAND",
                    target: "STATE",
                    targetId: "STATE",
                    payload: {
                        mutation: {
                            propName: "user-paused-video",
                            kind: "set-number",
                            value: 0,
                        },
                    },
                },
                {
                    kind: "STATE_MUTATE_COMMAND",
                    target: "STATE",
                    targetId: "STATE",
                    payload: {
                        mutation: {
                            propName: "media-blocked-by-video",
                            kind: "set-number",
                            value: 0,
                        },
                    },
                },
                {
                    kind: "STATE_MUTATE_COMMAND",
                    target: "STATE",
                    targetId: "STATE",
                    payload: {
                        mutation: {
                            propName: "video-is-playing",
                            kind: "set-number",
                            value: 0,
                        },
                    },
                },
            ],
        },
        {
            onEvent: "VIDEO_PAUSED_EVENT",
            thenExecute: [
                {
                    kind: "STATE_MUTATE_COMMAND",
                    target: "STATE",
                    targetId: "STATE",
                    payload: {
                        mutation: {
                            propName: "video-is-playing",
                            kind: "set-number",
                            value: 0,
                        },
                    },
                },
                {
                    kind: "STATE_MUTATE_COMMAND",
                    target: "STATE",
                    targetId: "STATE",
                    payload: {
                        mutation: {
                            propName: "media-blocked-by-video",
                            kind: "set-number",
                            value: 0,
                        },
                    },
                },
            ],
        },
        {
            onEvent: "VIDEO_PLAY_EVENT",
            thenExecute: [
                {
                    kind: "STATE_MUTATE_COMMAND",
                    target: "STATE",
                    targetId: "STATE",
                    payload: {
                        mutation: {
                            propName: "video-is-playing",
                            kind: "set-number",
                            value: 1,
                        },
                    },
                },
                {
                    kind: "STATE_MUTATE_COMMAND",
                    target: "STATE",
                    targetId: "STATE",
                    payload: {
                        mutation: {
                            propName: "user-paused-video",
                            kind: "set-number",
                            value: 0,
                        },
                    },
                },
            ],
        },
        {
            onEvent: "AUDIO_PLAY_EVENT",
            thenExecute: [
                {
                    kind: "STATE_MUTATE_COMMAND",
                    target: "STATE",
                    targetId: "STATE",
                    payload: {
                        mutation: {
                            propName: "audio-is-playing",
                            kind: "set-number",
                            value: 1,
                        },
                    },
                },
                {
                    kind: "STATE_MUTATE_COMMAND",
                    target: "STATE",
                    targetId: "STATE",
                    payload: {
                        mutation: {
                            propName: "media-blocked-by-audio",
                            kind: "set-number",
                            value: 1,
                        },
                    },
                },
            ],
        },
        {
            onEvent: "AUDIO_ENDED_EVENT",
            thenExecute: [
                {
                    kind: "STATE_MUTATE_COMMAND",
                    target: "STATE",
                    targetId: "STATE",
                    payload: {
                        mutation: {
                            propName: "audio-is-playing",
                            kind: "set-number",
                            value: 0,
                        },
                    },
                },
                {
                    kind: "STATE_MUTATE_COMMAND",
                    target: "STATE",
                    targetId: "STATE",
                    payload: {
                        mutation: {
                            propName: "media-blocked-by-audio",
                            kind: "set-number",
                            value: 0,
                        },
                    },
                },
            ],
        },
        {
            onEvent: "AUDIO_PAUSED_EVENT",
            thenExecute: [
                {
                    kind: "STATE_MUTATE_COMMAND",
                    target: "STATE",
                    targetId: "STATE",
                    payload: {
                        mutation: {
                            propName: "audio-is-playing",
                            kind: "set-number",
                            value: 0,
                        },
                    },
                },
                {
                    kind: "STATE_MUTATE_COMMAND",
                    target: "STATE",
                    targetId: "STATE",
                    payload: {
                        mutation: {
                            propName: "media-blocked-by-audio",
                            kind: "set-number",
                            value: 0,
                        },
                    },
                },
            ],
        },
    ],
    stateProps: [
        {
            propDescription: "No description given",
            propName: "input-blocked-by-audio",
            initialValue: 0,
            options: [
                {
                    value: 0,
                    valueLabel: "FALSE",
                },
                {
                    value: 1,
                    valueLabel: "TRUE",
                },
            ],
            _type: "number",
        },
        {
            propDescription: "No description given",
            propName: "media-blocked-by-audio",
            initialValue: 0,
            options: [
                {
                    value: 0,
                    valueLabel: "FALSE",
                },
                {
                    value: 1,
                    valueLabel: "TRUE",
                },
            ],
            _type: "number",
        },
        {
            propDescription: "No description given",
            propName: "input-blocked-by-autoplay-sequence",
            initialValue: 0,
            options: [
                {
                    value: 0,
                    valueLabel: "FALSE",
                },
                {
                    value: 1,
                    valueLabel: "TRUE",
                },
            ],
            _type: "number",
        },
        {
            propDescription:
                "Should be true if the page is in a autoplay-sequence. The autoplay-sequence will always block other media.",
            propName: "media-blocked-by-autoplay-sequence",
            initialValue: 0,
            options: [
                {
                    value: 0,
                    valueLabel: "FALSE",
                },
                {
                    value: 1,
                    valueLabel: "TRUE",
                },
            ],
            _type: "number",
        },
        {
            propDescription: "Should be true if a video is playing, and this video is suppose to block user-input.",
            propName: "input-blocked-by-video",
            initialValue: 0,
            options: [
                {
                    value: 0,
                    valueLabel: "FALSE",
                },
                {
                    value: 1,
                    valueLabel: "TRUE",
                },
            ],
            _type: "number",
        },
        {
            propDescription: "No description given",
            propName: "media-blocked-by-video",
            initialValue: 0,
            options: [
                {
                    value: 0,
                    valueLabel: "FALSE",
                },
                {
                    value: 1,
                    valueLabel: "TRUE",
                },
            ],
            _type: "number",
        },
        {
            propDescription: "Should be true if user paused the video by pressing the pause-button.",
            propName: "user-paused-video",
            initialValue: 0,
            options: [
                {
                    value: 0,
                    valueLabel: "FALSE",
                },
                {
                    value: 1,
                    valueLabel: "TRUE",
                },
            ],
            _type: "number",
        },
        {
            propDescription: "Should be true if any video is playing on the page.",
            propName: "video-is-playing",
            initialValue: 0,
            options: [
                {
                    value: 0,
                    valueLabel: "FALSE",
                },
                {
                    value: 1,
                    valueLabel: "TRUE",
                },
            ],
            _type: "number",
        },
    ],
    stateQueries: [
        {
            name: "disableAudio",
            condition: {
                kind: "complex-condition",
                name: "audio-controls-are-blocked",
                some: [
                    {
                        kind: "numeric-condition",
                        referenceId: "media-blocked-by-autoplay-sequence",
                        referenceLabel: "media-blocked-by-autoplay-sequence[ BOOLEAN ]",
                        valueLabel: "TRUE",
                        value: 1,
                        operator: "eq",
                    },
                    {
                        kind: "numeric-condition",
                        referenceId: "media-blocked-by-audio",
                        referenceLabel: "media-blocked-by-audio[ BOOLEAN ]",
                        valueLabel: "TRUE",
                        value: 1,
                        operator: "eq",
                    },
                    {
                        kind: "numeric-condition",
                        referenceId: "media-blocked-by-video",
                        referenceLabel: "media-blocked-by-video[ BOOLEAN ]",
                        valueLabel: "TRUE",
                        value: 1,
                        operator: "eq",
                    },
                ],
                all: [],
            },
        },
        {
            name: "disableVideo",
            condition: {
                kind: "complex-condition",
                name: "video-play shall be disabled",
                all: [
                    {
                        kind: "numeric-condition",
                        referenceId: "user-paused-video",
                        referenceLabel: "user-paused-video[ BOOLEAN ]",
                        valueLabel: "FALSE",
                        value: 0,
                        operator: "eq",
                    },
                ],
                some: [
                    {
                        kind: "numeric-condition",
                        referenceId: "media-blocked-by-autoplay-sequence",
                        referenceLabel: "media-blocked-by-autoplay-sequence[ BOOLEAN ]",
                        valueLabel: "TRUE",
                        value: 1,
                        operator: "eq",
                    },
                    {
                        kind: "numeric-condition",
                        referenceId: "media-blocked-by-audio",
                        referenceLabel: "media-blocked-by-audio[ BOOLEAN ]",
                        valueLabel: "TRUE",
                        value: 1,
                        operator: "eq",
                    },
                    {
                        kind: "numeric-condition",
                        referenceId: "media-blocked-by-video",
                        referenceLabel: "media-blocked-by-video[ BOOLEAN ]",
                        valueLabel: "TRUE",
                        value: 1,
                        operator: "eq",
                    },
                    {
                        kind: "numeric-condition",
                        referenceId: "audio-is-playing",
                        referenceLabel: "audio-is-playing[ BOOLEAN ]",
                        valueLabel: "TRUE",
                        value: 1,
                        operator: "eq",
                    },
                ],
            },
        },
        {
            name: "disableUserInput",
            condition: {
                kind: "complex-condition",
                name: "User input shall be disabled (Response-buttons, FormControls...)",
                all: [],
                some: [
                    {
                        kind: "numeric-condition",
                        referenceId: "input-blocked-by-audio",
                        referenceLabel: "input-blocked-by-audio[ BOOLEAN ]",
                        valueLabel: "TRUE",
                        value: 1,
                        operator: "eq",
                    },
                    {
                        kind: "numeric-condition",
                        referenceId: "input-blocked-by-video",
                        referenceLabel: "input-blocked-by-video[ BOOLEAN ]",
                        valueLabel: "TRUE",
                        value: 1,
                        operator: "eq",
                    },
                    {
                        kind: "numeric-condition",
                        referenceId: "input-blocked-by-autoplay-sequence",
                        referenceLabel: "input-blocked-by-autoplay-sequence[ BOOLEAN ]",
                        valueLabel: "TRUE",
                        value: 1,
                        operator: "eq",
                    },
                ],
            },
        },
        {
            name: "hide video pause button",
            condition: {
                kind: "complex-condition",
                name: "video-is-not-playing-condition",
                all: [
                    {
                        kind: "numeric-condition",
                        referenceId: "video-is-playing",
                        referenceLabel: "video-is-playing[ BOOLEAN ]",
                        valueLabel: "FALSE",
                        value: 0,
                        operator: "eq",
                    },
                ],
                some: [],
            },
        },
        {
            name: "hide video play button",
            condition: {
                kind: "complex-condition",
                name: "video-is-playing-condition",
                all: [
                    {
                        kind: "numeric-condition",
                        referenceId: "video-is-playing",
                        referenceLabel: "video-is-playing[ BOOLEAN ]",
                        valueLabel: "TRUE",
                        value: 1,
                        operator: "eq",
                    },
                ],
                some: [],
            },
        },
    ],
};
