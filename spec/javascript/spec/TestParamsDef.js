import fs from 'node:fs';
import assert from 'node:assert';
import { KaitaiStream } from 'kaitai-struct';

describe('ParamsDef', () => {
	it('parses test properly', async () => {
		const { ParamsDef } = await import('../compiled/testformats/ParamsDef.js');
		const io = new KaitaiStream(fs.readFileSync('src/term_strz.bin'));
		const r = new ParamsDef(io, undefined, undefined, 5, true);
		assert.strictEqual(r.buf, 'foo|b');
		assert.strictEqual(r.trailer, 0x61);
	});
});
