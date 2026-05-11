import fs from 'node:fs';
import assert from 'node:assert';
import { KaitaiStream } from 'kaitai-struct';

describe('DebugArrayUserEofException', () => {
  it('parses test properly', async () => {
    const { DebugArrayUserEofException } = await import('../compiled/testformats/DebugArrayUserEofException.js');
    const io = new KaitaiStream(fs.readFileSync('src/nav_parent_codes.bin'));
    const r = new DebugArrayUserEofException(io);

    // --debug implies --no-auto-read
    assert.throws(() => r._read(), KaitaiStream.EOFError);

    assert.strictEqual(r.oneCat.meow, 3);
    assert.strictEqual(r.oneCat.chirp, 73);
    assert.strictEqual(r.arrayOfCats.length, 3);
    assert.strictEqual(r.arrayOfCats[0].meow, 49);
    assert.strictEqual(r.arrayOfCats[0].chirp, 50);
    assert.strictEqual(r.arrayOfCats[1].meow, 51);
    assert.strictEqual(r.arrayOfCats[1].chirp, 66);
    assert.strictEqual(r.arrayOfCats[2].meow, 98);
  });
});
