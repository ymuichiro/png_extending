declare module "png-chunks-extract" {
  export default function extractChunks(data: Buffer): {
    name: string;
    data: Uint8Array;
  }[];
}
