import { PageDto } from "../dto/SchemaDto";
import { VideoContainer } from "../Delement/VideoContainer";
import { AudioContainer } from "../Delement/AudioContainer";
import { AutoPlayElement, DAutoPlaySequence } from "../Delement/DAuto-play";
import { DCommandBus } from "../commands/DCommandBus";
import { DCommand } from "../commands/DCommand";
import { DTimestamp } from "../common/DTimestamp";
import { EventBus } from "../events/event-bus";
import { ScaleService } from "../engine/scale";
import { ResourceProvider } from "./resource-provider";
import { AutoplayTask, SequenceManager } from "./sequence-manager";

export interface IMediaManager {
  setPage(page: PageDto): void;
  destroy(): void;
}

export class DMediaManager implements IMediaManager {
  private static INSTANCE_COUNT = 0;
  private readonly instanceNumber: number;
  private readonly TAG = "[ MEDIA_MANAGER ] : ";
  private readonly videoContainer: VideoContainer;
  private readonly audioContainer: AudioContainer;
  private pageEnter: DTimestamp;
  private sincePageEnter: DTimestamp.Diff;
  private currentPage: PageDto | null = null;
  private readonly unsubscribeCommands: () => void;
  private readonly tickerRef: number;
  private readonly sequenceManager: SequenceManager | false = false;
  constructor(
    private hostEl: HTMLDivElement,
    private readonly commandBus: DCommandBus,
    private readonly eventBus: EventBus,
    private readonly resourceProvider: ResourceProvider,
    private readonly scale: ScaleService,
  ) {
    DMediaManager.INSTANCE_COUNT = DMediaManager.INSTANCE_COUNT + 1;
    this.instanceNumber = DMediaManager.INSTANCE_COUNT;
    const videoEl = document.createElement("video");
    this.hostEl.append(videoEl);
    this.videoContainer = new VideoContainer(videoEl, eventBus, this.scale);
    this.audioContainer = new AudioContainer(this.eventBus);
    this.tick = this.tick.bind(this);
    this.videoContainer.setStyle({ visibility: "hidden" });
    const now = DTimestamp.now();
    this.pageEnter = now;
    this.sincePageEnter = DTimestamp.diff(now, now);
    this.unsubscribeCommands = this.commandBus.subscribe((action) => {
      this.commandHandler(action);
    }, this.TAG);

    this.tickerRef = window.setInterval(() => {}, 1000);
  }

  /**
   * Stop all media that is playing
   */
  clearAllMedia() {
    this.videoContainer.pause();
    this.audioContainer.pause();
  }
  destroy() {
    console.log("TODO DESTROY ALL MEDIA");
    this.unsubscribeCommands();
    // console.log(this.tickerRef);
    window.clearInterval(this.tickerRef);
    this.audioContainer.destroy();
    this.videoContainer.destroy();
  }

  setPage(page: PageDto) {
    // TODO STOP VIDEO/AUDIO THAT MIGHT BE PLAYING IN THE DOM??
    this.currentPage = page;
    this.videoContainer.pause();
    this.pageEnter = DTimestamp.now();
    // TODO THis might be a bug if someone

    const seq = page.autoPlaySequence;
    // this.sequence = seq ? [...seq.items] : [];
    const { mainVideoId, audio } = page;
    const audioElements = page.audio;

    if (mainVideoId) {
      const dto = this.resourceProvider.getVideoById(mainVideoId);
      if (dto) {
        this.videoContainer.setDto(dto);
        this.videoContainer.setStyle({ ...dto.style, visibility: "visible" });
      }
      // this.videoContainer.playToEnd();
    } else {
      this.videoContainer.setStyle({ visibility: "hidden" });
      // HIDE?
    }
    if (audioElements) {
      const first = audioElements[0];
      if (first) {
        this.audioContainer.setAudio(first);
      }
    }
    if (seq) {
      this.playSequence(seq);
    }
    // const hasVideo =
  }

  private commandHandler(command: DCommand) {
    if (command.kind === "VIDEO_PLAY_COMMAND") {
      const video = command.targetId;
      const dto = this.videoContainer.getCurrentDto();

      if (dto && dto.id === command.targetId) {
        // console.log(video);
        this.videoContainer.play(dto);
      }
    }
    if (command.kind === "VIDEO_PAUSE_COMMAND") {
      this.videoContainer.pause();
    }
    if (command.kind === "AUDIO_PLAY_COMMAND") {
      this.audioContainer
        .playToEnd()
        .then(() => {})
        .catch()
        .finally(() => {});
    }

    if (command.kind === "AUDIO_PAUSE_COMMAND") {
      // this.audioContainer.
    }
  }

  private async playSequence(seq: DAutoPlaySequence) {
    // console.log(this.TAG + "SEQUENCE STARTED -- TODO EVENT FOR THIS??");

    const elements = seq.items;
    const testClone = [...elements];
    const first = testClone.pop();

    if (!first) {
      return false;
    }
    const now = DTimestamp.now();
    seq.startCommands.forEach((c) => {
      console.log(c);
      this.commandBus.emit(c);
    });
    // this.commandBus.emit(DStateProps.mediaBlockedBySequence.setTrueCommand);
    // if (seq.blockUserInput) {
    //     this.commandBus.emit(DStateProps.inputBlockingBySequence.getSetTrueCommand());
    // }
    for (let i = 0; i < elements.length; i++) {
      const item = elements[i];
      if (item.kind === "autoplay-video") {
        const dto = this.resourceProvider.getVideoById(item.videoId);
        if (dto) this.videoContainer.setDto(dto);
        await this.videoContainer.playToEnd();
      }
      if (item.kind === "autoplay-audio") {
        console.log(item);
        const dto = this.resourceProvider.getAudioById(item.audioId);
        if (dto) this.audioContainer.setAudio(dto);
        await this.audioContainer.playToEnd();
      }
    }
    seq.endCommands.forEach((c) => {
      this.commandBus.emit(c);
    });
    // this.actionService.emit(DStateProps.mediaBlockedBySequence.setFalseCommand);
    // this.actionService.emit(DStateProps.inputBlockingBySequence.setFalseCommand);
    console.log(this.TAG + "SEQUENCE ENDED");
    return true;
  }

  // setPage()

  private tick() {
    // console.log(this.video1.getStats());
  }
}
