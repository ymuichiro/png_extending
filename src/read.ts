import text from "png-chunk-text";
import extract from "png-chunks-extract";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const buffer = readFileSync(resolve("resolve.png"));
const chunks = extract(buffer).filter(e => e.name === "tEXt");
const values = chunks.map(e => text.decode(e));
console.log(values);
