export interface AudioFile {
  readonly kind: "audio-file";
  readonly id: string;
  downloadUrl: string;
  readonly duration: number;
  readonly originalFileName: string;
  readonly name: string;
  readonly size: number;
  readonly relativePath?: string;
}

export interface VideoFile {
  readonly kind: "video-file";
  readonly id: string;
  downloadUrl: string;
  readonly duration: number;
  readonly name: string;
  readonly size: number;
  readonly type: string;
  readonly originalFileName: string;
  readonly relativePath?: string;
}
export interface ImageFile {
  readonly kind: "image-file";
  readonly id: string;
  downloadUrl: string;
  readonly name: string;
  readonly size: number;
  readonly type: string;
  readonly originalFileName?: string;
  readonly relativePath?: string;
}
