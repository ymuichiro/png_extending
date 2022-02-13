import text from "png-chunk-text";
import extract from "png-chunks-extract";
import encode from "png-chunks-encode";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

// 対象ファイルの取得
const buffer = readFileSync(resolve("sample.png"));
const cssBuffer = readFileSync(resolve("src", "sample.css"));

// IENDの1つ手前に追加データを挿入
const chunks = extract(buffer);
chunks.splice(-1, 0, text.encode("css", cssBuffer.toString()));

// new Bufferはあらゆる値を受けられる為、意図しない値から不正な利用がされる可能性がある
writeFileSync(resolve("resolve.png"), Buffer.from(encode(chunks)));
