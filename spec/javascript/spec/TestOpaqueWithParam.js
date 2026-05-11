import fs from 'node:fs';
import assert from 'node:assert/strict';
import { KaitaiStream } from 'kaitai-struct';

describe('OpaqueWithParam', () => {
  it('parses test properly', async () => {
    const { OpaqueWithParam } = await import('../compiled/OpaqueWithParam.js');
    const io = new KaitaiStream(fs.readFileSync('src/term_strz.bin'));
    const r = new OpaqueWithParam(io);
    assert.strictEqual(r.one.buf, 'foo|b');
    assert.strictEqual(r.one.trailer, 0x61);
  });
});
