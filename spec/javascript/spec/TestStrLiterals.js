import fs from 'node:fs';
import assert from 'node:assert/strict';
import { KaitaiStream } from 'kaitai-struct';

describe('StrLiterals', () => {
  it('parses test properly', async () => {
    const { StrLiterals } = await import('../compiled/StrLiterals.js');
    const io = new KaitaiStream(fs.readFileSync('src/fixed_struct.bin'));
    const r = new StrLiterals(io);

    const strToArr = (s) => {
      const r = [];
      for (let i = 0; i < s.length; i++)
        r.push(s.charCodeAt(i));
      return r;
    };

    assert.deepStrictEqual(strToArr(r.complexStr), [0, 1, 2, 7, 8, 10, 13, 9, 11, 12, 27, 61, 7, 10, 36, 9787]);
    assert.deepStrictEqual(strToArr(r.doubleQuotes), [34, 34, 34]);
    assert.deepStrictEqual(strToArr(r.backslashes), [92, 92, 92]);
    assert.deepStrictEqual(strToArr(r.octalEatup), [0, 50, 50]);
    assert.deepStrictEqual(strToArr(r.octalEatup2), [2, 50]);
  });
});
