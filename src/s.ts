import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import PngMetaDataScripts from "./png_metadata_scripts";

const write = () => {
  const container = readFileSync(resolve("data1.png"));
  const png = readFileSync(resolve("sample.png")).toString("hex");

  const rowChunks = PngMetaDataScripts.getChunks(container);
  const addChunks = PngMetaDataScripts.addCustomChunk(rowChunks, "data", png);
  const buffer = PngMetaDataScripts.extractPng(addChunks);

  writeFileSync(resolve("result.png"), buffer);
};

const read = () => {
  const png = readFileSync(resolve("classSamplePng.png"));
  const rowChunks = PngMetaDataScripts.getChunks(png);
  const customChunks = PngMetaDataScripts.getCustomChunks(rowChunks);
  console.log(customChunks);
};

const write2 = () => {
  const png = readFileSync(resolve("result.png"));
  const chunks = PngMetaDataScripts.getChunks(png);
  const innerPng = PngMetaDataScripts.getCustomChunks(chunks);

  const buffer = Buffer.from(innerPng[0].text, "hex");
  let i = 0;

  setInterval(() => {
    console.log(i++, "extract");
    writeFileSync(resolve("reader", "data.png"), i % 2 === 0 ? png : buffer);
  }, 5000);
};

write2();
