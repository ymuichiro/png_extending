import text from "png-chunk-text";
import extract from "png-chunks-extract";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const buffer = readFileSync(resolve("resolve.png"));
const chunks = extract(buffer).filter(e => e.name === "tEXt");
const values = chunks.map(e => text.decode(e));
console.log(values);

/*
 PNGヘッダー	8byte	PNGファイルであることを示す
 IHDRチャンク	25byte	PNGイメージの基本情報
 IDATチャンク	Nbyte	画像の実データ
 tEXtチャンク Nbyte 適当な文字列(ここに文字列化したCSSを格納)
 IENDチャンク	12byte	PNGファイルの終端を表す
*/
