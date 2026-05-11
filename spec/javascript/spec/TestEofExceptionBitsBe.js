import fs from 'node:fs';
import assert from 'node:assert/strict';
import { KaitaiStream } from 'kaitai-struct';

describe('EofExceptionBitsBe', () => {
  it('parses test properly', async () => {
    const { EofExceptionBitsBe } = await import('../compiled/EofExceptionBitsBe.js');
    const io = new KaitaiStream(fs.readFileSync('src/nav_parent_switch.bin'));
    assert.ok(KaitaiStream.EOFError);
    assert.throws(() => new EofExceptionBitsBe(io)._read(), KaitaiStream.EOFError);
  });
});
