import fs from 'node:fs';
import assert from 'node:assert';
import { KaitaiStream } from 'kaitai-struct';

describe('TypeTernary2ndFalsy', () => {
  it('parses test properly', async () => {
    const { TypeTernary2ndFalsy } = await import('../compiled/testformats/TypeTernary2ndFalsy.js');
    const io = new KaitaiStream(fs.readFileSync('src/switch_integers.bin'));
    const r = new TypeTernary2ndFalsy(io);
    assert.strictEqual(r.vFalse, false);
    assert.strictEqual(r.vIntZero, 0);
    assert.strictEqual(r.vIntNegZero, 0);
    assert.strictEqual(r.vFloatZero, 0.0);
    assert.strictEqual(r.vFloatNegZero, -0.0);
    assert.strictEqual(r.vStrWZero, "0");
    assert.strictEqual(r.vStrWZero.length, 1);
    assert.strictEqual(r.ut.m, 7);
    assert.strictEqual(r.vNullUt, undefined);
    assert.strictEqual(r.vStrEmpty, "");
    assert.strictEqual(r.vStrEmpty.length, 0);
    assert.strictEqual(r.intArray.length, 2);
    assert.strictEqual(r.vIntArrayEmpty.length, 0);
  });
});
