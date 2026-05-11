import fs from 'node:fs';
import assert from 'node:assert';
import { KaitaiStream } from 'kaitai-struct';

describe('DebugArrayUser', () => {
  it('parses test properly', async () => {
    const { DebugArrayUser } = await import('../compiled/testformats/DebugArrayUser.js');
    const io = new KaitaiStream(fs.readFileSync('src/fixed_struct.bin'));
    const r = new DebugArrayUser(io);

    // --debug implies --no-auto-read
    r._read();

    assert.strictEqual(r.oneCat.meow, 80);
    assert.strictEqual(r.arrayOfCats.length, 3);
    assert.strictEqual(r.arrayOfCats[0].meow, 65);
    assert.strictEqual(r.arrayOfCats[1].meow, 67);
    assert.strictEqual(r.arrayOfCats[2].meow, 75);
  });
});
