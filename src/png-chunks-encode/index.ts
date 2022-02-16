const sliced = require("sliced");
var crc32 = require("../crc-32/crc32.js");

interface Chunks {
  name: string;
  data: Uint8Array;
}

// Used for fast-ish conversion between uint8s and uint32s/int32s.
// Also required in order to remain agnostic for both Node Buffers and
// Uint8Arrays.
let uint8 = new Uint8Array(4);
let int32 = new Int32Array(uint8.buffer);
let uint32 = new Uint32Array(uint8.buffer);

export function encodeChunks(chunks: Chunks[]): Uint8Array {
  let totalSize = 8;
  let idx = totalSize;
  let i;

  for (i = 0; i < chunks.length; i++) {
    totalSize += chunks[i].data.length;
    totalSize += 12;
  }

  let output = new Uint8Array(totalSize);

  output[0] = 0x89;
  output[1] = 0x50;
  output[2] = 0x4e;
  output[3] = 0x47;
  output[4] = 0x0d;
  output[5] = 0x0a;
  output[6] = 0x1a;
  output[7] = 0x0a;

  for (i = 0; i < chunks.length; i++) {
    let chunk = chunks[i];
    let name = chunk.name;
    let data = chunk.data;
    let size = data.length;
    let nameChars = [name.charCodeAt(0), name.charCodeAt(1), name.charCodeAt(2), name.charCodeAt(3)];

    uint32[0] = size;
    output[idx++] = uint8[3];
    output[idx++] = uint8[2];
    output[idx++] = uint8[1];
    output[idx++] = uint8[0];

    output[idx++] = nameChars[0];
    output[idx++] = nameChars[1];
    output[idx++] = nameChars[2];
    output[idx++] = nameChars[3];

    for (let j = 0; j < size; ) {
      output[idx++] = data[j++];
    }

    let crcCheck = nameChars.concat(sliced(data));
    let crc = crc32.buf(crcCheck);

    int32[0] = crc;
    output[idx++] = uint8[3];
    output[idx++] = uint8[2];
    output[idx++] = uint8[1];
    output[idx++] = uint8[0];
  }

  return output;
}
