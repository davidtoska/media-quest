import { AudioTask, DelayTask, NoopTask, SequenceManager, VideoTask } from "./sequence-manager";
import { DTimestamp } from "../common/DTimestamp";

const delayTask = (duration: number): DelayTask => {
    return { kind: "delay-task", duration };
};
const createTimestamps = () => {
    const t0 = DTimestamp.now();
    const add = (ms: number) => DTimestamp.addMills(t0, ms);
    return {
        t0,
        t100: add(100),
        t500: add(500),
        t600: add(600),
        t900: add(900),
        t1000: add(1000),
        t1020: add(1020),
        t1100: add(1100),
        t1200: add(1200),
        t1500: add(1500),
        t2000: add(2000),
        t2100: add(2100),
        t2500: add(2500),
        t3000: add(3000),
        t3001: add(3001),
        t5000: add(5000),
        t6000: add(6000),
        t7000: add(7000),
        t8000: add(8000),
        t8500: add(8500),
        t9000: add(9000),
        t9500: add(9500),
    };
};
const audioTask = (url: string): AudioTask => {
    return { kind: "autoplay-audio-task", url, audioId: "id_" + url };
};
const videoTask = (url: string): VideoTask => {
    return { kind: "autoplay-video-task", url, videoId: "id_" + url };
};

const noopTask: NoopTask = { kind: "noop-task" };
const delay1000 = delayTask(1000);
const delay2000 = delayTask(2000);
const video1 = videoTask("video_1_url");
const audio1 = audioTask("audio_1_url");
const sequence1 = [delay1000, video1, delay2000, audio1];
const manager = (tasks: Array<DelayTask | AudioTask | VideoTask>) => new SequenceManager(tasks);
describe("Media manager state", () => {
    test("Empty task array is completed at once:", () => {
        const m = manager([]);
        expect(m.isCompleted).toBeTruthy();
    });

    test("Non empty task-array will be running at creation-time", () => {
        const m = manager([delayTask(1000), audioTask("url1")]);
        expect(m.isRunning).toBeTruthy();
    });

    test("After abort the task", () => {
        const sm = manager(sequence1);
        expect(sm.isRunning).toBeTruthy();
        sm.abort();
        const nextTask = sm.nextTask(DTimestamp.now());
        expect(sm.isRunning).toBeFalsy();
        expect(nextTask).toStrictEqual(noopTask);
    });
    test("Fist task will be returned after construction", () => {
        const sm = manager([video1]);
        const firstTask = sm.nextTask(DTimestamp.now());
        expect(firstTask).toStrictEqual(video1);
        // expect(firstTask).toStrictEqual(noopTask);
    });
    test("A task will only be returned once!", () => {
        const sm = manager([video1, audio1]);
        const firstTask = sm.nextTask(DTimestamp.now());

        expect(sm.isRunning);
        expect(firstTask).toStrictEqual(video1);
        const secondTask = sm.nextTask(DTimestamp.now());
        expect(secondTask).toStrictEqual(noopTask);
        expect(sm.isRunning);
    });
    test("A delayTask will block other tasks from running.", () => {
        const t = createTimestamps();
        const sm = manager([delayTask(1000), video1, audio1]);
        expect(sm.isRunning);
        const task0 = sm.nextTask(DTimestamp.now());
        expect(task0).toStrictEqual(noopTask);

        expect(sm.nextTask(t.t500)).toStrictEqual(noopTask);
        expect(sm.nextTask(t.t600)).toStrictEqual(noopTask);
        expect(sm.nextTask(t.t900)).toStrictEqual(noopTask);

        // AFTER DELAY
        expect(sm.nextTask(t.t1020)).toStrictEqual(video1);
        expect(sm.nextTask(t.t5000)).toStrictEqual(noopTask);
    });
    test("A video-task can ble completed.", () => {
        const t = createTimestamps();
        const sm = manager([video1, audio1]);
        expect(sm.isRunning);
        expect(sm.nextTask(t.t100)).toStrictEqual(video1);
        expect(sm.nextTask(t.t500)).toStrictEqual(noopTask);
        expect(sm.nextTask(t.t2100)).toStrictEqual(noopTask);
        sm.videoCompleted({ videoId: video1.videoId, url: video1.url });
        const after = sm.nextTask(t.t3001);
        expect(after).toStrictEqual(audio1);
    });
    test("Many delays can be placed and block on every step.", () => {
        const t = createTimestamps();
        const sm = manager([delayTask(1000), video1, delay2000, audio1]);
        expect(sm.isRunning);

        // FIRST DELAY.
        expect(sm.nextTask(t.t100)).toStrictEqual(noopTask);
        expect(sm.nextTask(t.t600)).toStrictEqual(noopTask);
        expect(sm.nextTask(t.t900)).toStrictEqual(noopTask);
        expect(sm.nextTask(t.t1020)).toStrictEqual(video1);
        expect(sm.nextTask(t.t1100)).toStrictEqual(noopTask);
        expect(sm.nextTask(t.t1500)).toStrictEqual(noopTask);

        // DELAY 2 -> start at approximately 1500
        sm.videoCompleted({ videoId: video1.videoId, url: video1.url });
        expect(sm.nextTask(t.t2100)).toStrictEqual(noopTask);
        expect(sm.nextTask(t.t3000)).toStrictEqual(noopTask);
        expect(sm.nextTask(t.t5000)).toStrictEqual(audio1);
        expect(sm.nextTask(t.t6000)).toStrictEqual(noopTask);
        expect(sm.nextTask(t.t7000)).toStrictEqual(noopTask);
        expect(sm.isCompleted).toStrictEqual(false);
        sm.audioCompleted({ audioId: audio1.audioId, url: audio1.url });
        expect(sm.isCompleted).toStrictEqual(true);
    });
    test("Can complete audio", () => {
        const t = createTimestamps();
        const sm = manager([audio1]);
        expect(sm.isRunning);
        // FIRST DELAY.
        expect(sm.nextTask(t.t100)).toStrictEqual(audio1);
        expect(sm.nextTask(t.t500)).toStrictEqual(noopTask);
        expect(sm.nextTask(t.t600)).toStrictEqual(noopTask);
        expect(sm.isCompleted).toStrictEqual(false);
        sm.audioCompleted({ audioId: audio1.audioId, url: audio1.url });
        expect(sm.isCompleted).toStrictEqual(true);
    });
    test("Can only complete audio with correct url.", () => {
        const t = createTimestamps();
        const sm = manager([audio1]);
        expect(sm.isRunning);
        // FIRST DELAY.
        const first = sm.nextTask(t.t100);
        expect(first).toStrictEqual(audio1);
        expect(sm.isCompleted).toStrictEqual(false);
        sm.audioCompleted({ audioId: "bullshit", url: "bullshit" });
        expect(sm.isCompleted).toStrictEqual(false);
    });
    test("Can only complete video with correct url.", () => {
        const t = createTimestamps();
        const sm = manager([video1]);
        expect(sm.isRunning);
        // FIRST DELAY.
        const first = sm.nextTask(t.t100);
        expect(first).toStrictEqual(video1);
        expect(sm.isCompleted).toStrictEqual(false);
        sm.videoCompleted({ videoId: "bullshit", url: "bullshit" });
        expect(sm.isCompleted).toStrictEqual(false);
    });
});
