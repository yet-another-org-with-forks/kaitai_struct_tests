import fs from 'node:fs';
import assert from 'node:assert';
import { KaitaiStream } from 'kaitai-struct';

describe('DebugArrayUserCurrentExcluded', () => {
  it('parses test properly', async () => {
    const { DebugArrayUserCurrentExcluded } = await import('../compiled/testformats/DebugArrayUserCurrentExcluded.js');
    const io = new KaitaiStream(fs.readFileSync('src/term_strz.bin'));
    const r = new DebugArrayUserCurrentExcluded(io);

    // --debug implies --no-auto-read
    r._read();

    assert.deepStrictEqual(r.arrayOfCats[0].meow, new Uint8Array([102, 111, 111]));
    assert.deepStrictEqual(r.arrayOfCats[1].meow, new Uint8Array([124, 98]));
    assert.deepStrictEqual(r.arrayOfCats[2].meow, new Uint8Array([97]));
  });
});
