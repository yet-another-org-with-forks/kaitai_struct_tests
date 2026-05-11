import fs from 'node:fs';
import assert from 'node:assert/strict';
import { KaitaiStream } from 'kaitai-struct';

describe('SwitchCast', () => {
	it('parses test properly', async () => {
		const { SwitchCast } = await import('#testformats/SwitchCast.js');
		const io = new KaitaiStream(fs.readFileSync('src/switch_opcodes.bin'));
		const r = new SwitchCast(io);
		assert.strictEqual(r.firstObj.value, 'foobar');
		assert.strictEqual(r.secondVal, 0x42);
		// unable to test "err_cast" here
	});
});
