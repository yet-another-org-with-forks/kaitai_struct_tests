import fs from 'node:fs';
import assert from 'node:assert/strict';
import { KaitaiStream } from 'kaitai-struct';

describe('ExprIoEofBits', () => {
  it('parses test properly', async () => {
    const { ExprIoEofBits } = await import('../compiled/ExprIoEofBits.js');
    const io = new KaitaiStream(fs.readFileSync('src/nav_parent_switch.bin'));
    const r = new ExprIoEofBits(io);

    // --debug implies --no-auto-read
    r._read();

    assert.strictEqual(r.foo, 5167);
    assert.strictEqual(r.bar, 15);
    assert.strictEqual(r.baz, undefined);
    assert.deepStrictEqual(r.align, new Uint8Array([]));
    assert.strictEqual(r.qux, undefined);
  });
});
