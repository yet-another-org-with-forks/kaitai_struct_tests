import fs from 'node:fs';
import assert from 'node:assert';
import { KaitaiStream } from 'kaitai-struct';

describe('EofExceptionBitsLe2', () => {
  it('parses test properly', async () => {
    const { EofExceptionBitsLe2 } = await import('../compiled/testformats/EofExceptionBitsLe2.js');
    const io = new KaitaiStream(fs.readFileSync('src/nav_parent_switch.bin'));
    assert.ok(KaitaiStream.EOFError);
    assert.throws(() => new EofExceptionBitsLe2(io)._read(), KaitaiStream.EOFError);
  });
});
