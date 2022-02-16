import { ExtractChunks, extractChunks } from "./png-chunks-extract/index";
import { decode, DecodeResult } from "./png-chunk-text/decode";
import { encode as textEncode } from "./png-chunk-text/encode";
import { encodeChunks } from "./png-chunks-encode/index";

class PngMetaDataScripts {
  /** PNGをChunkに分解する */
  static getChunks(buffer: Buffer): ExtractChunks[] {
    return extractChunks(buffer);
  }
  /** PNGのChunkのうち、カスタム領域を取得する */
  static getCustomChunks(chunks: ExtractChunks[]): DecodeResult[] {
    const customChunks = chunks.filter(e => e.name === "tEXt");
    return customChunks.map(e => decode(e));
  }
  /** PNGのChunkへカスタム領域を追加する */
  static addCustomChunk(chunks: ExtractChunks[], key: string, value: string): ExtractChunks[] {
    chunks.splice(-1, 0, textEncode(key, value));
    return [...chunks];
  }
  /** PNGのChunkよりカスタム領域を削除する */
  static removeCustomChunks(chunks: ExtractChunks[]): ExtractChunks[] {
    return chunks.filter(e => e.name !== "tEXt");
  }
  /** PNG出力 */
  static extractPng(chunks: ExtractChunks[]): Buffer {
    return Buffer.from(encodeChunks(chunks));
  }
}

export default PngMetaDataScripts;
