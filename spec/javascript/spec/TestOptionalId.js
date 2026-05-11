import fs from 'node:fs';
import assert from 'node:assert';
import { KaitaiStream } from 'kaitai-struct';

describe('OptionalId', () => {
  it('parses test properly', async () => {
    const { OptionalId } = await import('../compiled/testformats/OptionalId.js');
    const io = new KaitaiStream(fs.readFileSync('src/fixed_struct.bin'));
    const r = new OptionalId(io);
    assert.strictEqual(r._unnamed0, 80);
    assert.strictEqual(r._unnamed1, 65);
    assert.deepStrictEqual(r._unnamed2, new Uint8Array([67, 75, 45, 49, 255]));
  });
});
