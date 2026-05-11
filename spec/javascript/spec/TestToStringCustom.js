import fs from 'node:fs';
import assert from 'node:assert/strict';
import { KaitaiStream } from 'kaitai-struct';

describe('ToStringCustom', () => {
  it('parses test properly', async () => {
    const { ToStringCustom } = await import('#testformats/ToStringCustom.js');
    const io = new KaitaiStream(fs.readFileSync('src/term_strz.bin'));
    const r = new ToStringCustom(io);
    assert.strictEqual(r.toString(), "s1 = foo, s2 = bar");
  });
});
