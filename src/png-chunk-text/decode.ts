interface ExtractChunks {
  name: string;
  data: Uint8Array;
}

export interface DecodeResult {
  keyword: string;
  text: string;
}

export function decode(chunks: ExtractChunks): DecodeResult {
  let naming = true;
  let text = "";
  let name = "";

  for (let i = 0; i < chunks.data.length; i++) {
    const code = chunks.data[i];

    if (naming) {
      if (code) {
        name += String.fromCharCode(code);
      } else {
        naming = false;
      }
    } else {
      if (code) {
        text += String.fromCharCode(code);
      } else {
        throw new Error("Invalid NULL character found. 0x00 character is not permitted in tEXt content");
      }
    }
  }

  return { keyword: name, text };
}
