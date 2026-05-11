import fs from 'node:fs';
import assert from 'node:assert/strict';
import { KaitaiStream } from 'kaitai-struct';

describe('Debug0', () => {
  it('parses test properly', async () => {
    const { Debug0 } = await import('../compiled/Debug0.js');
    const io = new KaitaiStream(fs.readFileSync('src/fixed_struct.bin'));
    const r = new Debug0(io);

    // --debug implies --no-auto-read
    r._read();

    assert.strictEqual(r.one, 80);
    assert.deepStrictEqual(r.arrayOfInts, [65, 67, 75]);
    assert.strictEqual(r._unnamed2, 45);

    assert.deepStrictEqual(r._debug, {
      "one": {
        "start": 0,
        "ioOffset": io.byteOffset,
        "end": 1
      },
      "arrayOfInts": {
        "start": 1,
        "ioOffset": io.byteOffset,
        "arr": [
          {
            "start": 1,
            "ioOffset": io.byteOffset,
            "end": 2
          },
          {
            "start": 2,
            "ioOffset": io.byteOffset,
            "end": 3
          },
          {
            "start": 3,
            "ioOffset": io.byteOffset,
            "end": 4
          }
        ],
        "end": 4
      },
      "_unnamed2": {
        "start": 4,
        "ioOffset": io.byteOffset,
        "end": 5
      }
    });
  });
});
