declare module "png-chunks-encode" {
  type Chunks = {
    name: string;
    data: Uint8Array;
  }[];
  export default function encodeChunks(chunks: Chunks): Uint8Array;
}
