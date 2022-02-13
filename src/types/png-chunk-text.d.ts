declare module "png-chunk-text" {
  interface PngMetaData {
    keyword: string;
    text: string;
  }

  interface PngChunkData {
    name: string;
    data: Uint8Array;
  }

  export function encode(keyword: string, content: string): PngChunkData;
  export function decode(data: PngChunkData): PngMetaData;
}
