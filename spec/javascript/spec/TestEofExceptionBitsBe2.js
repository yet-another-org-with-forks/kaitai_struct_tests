import fs from 'node:fs';
import assert from 'node:assert';
import { KaitaiStream } from 'kaitai-struct';

describe('EofExceptionBitsBe2', () => {
  it('parses test properly', async () => {
    const { EofExceptionBitsBe2 } = await import('../compiled/testformats/EofExceptionBitsBe2.js');
    const io = new KaitaiStream(fs.readFileSync('src/nav_parent_switch.bin'));
    assert.ok(KaitaiStream.EOFError);
    assert.throws(() => new EofExceptionBitsBe2(io)._read(), KaitaiStream.EOFError);
  });
});
