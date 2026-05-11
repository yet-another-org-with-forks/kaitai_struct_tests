import fs from 'node:fs';
import assert from 'node:assert/strict';
import { KaitaiStream } from 'kaitai-struct';

describe('EofExceptionBitsLe', () => {
  it('parses test properly', async () => {
    const { EofExceptionBitsLe } = await import('../compiled/EofExceptionBitsLe.js');
    const io = new KaitaiStream(fs.readFileSync('src/nav_parent_switch.bin'));
    assert.ok(KaitaiStream.EOFError);
    assert.throws(() => new EofExceptionBitsLe(io)._read(), KaitaiStream.EOFError);
  });
});
