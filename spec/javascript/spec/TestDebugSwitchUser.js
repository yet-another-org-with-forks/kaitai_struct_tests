import fs from 'node:fs';
import assert from 'node:assert';
import { KaitaiStream } from 'kaitai-struct';

describe('DebugSwitchUser', () => {
  it('parses test properly', async () => {
    const { DebugSwitchUser } = await import('../compiled/testformats/DebugSwitchUser.js');
    const io = new KaitaiStream(fs.readFileSync('src/nav_parent_switch.bin'));
    const r = new DebugSwitchUser(io);

    // --debug implies --no-auto-read
    r._read();

    assert.strictEqual(r.code, 1);
    assert.strictEqual(r.data.val, -190);
  });
});
