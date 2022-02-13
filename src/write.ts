import text from "png-chunk-text";
import extract from "png-chunks-extract";
import encode from "png-chunks-encode";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const buffer = readFileSync(resolve("sample.png"));
const cssBuffer = readFileSync(resolve("src", "sample.css"));
const chunks = extract(buffer);
chunks.splice(-1, 0, text.encode("css", cssBuffer.toString()));

writeFileSync(resolve("resolve.png"), new Buffer(encode(chunks)));
