import fs from 'node:fs';
import assert from 'node:assert/strict';
import { KaitaiStream } from 'kaitai-struct';

describe('OpaqueExternalType02Parent', () => {
	it('parses test properly', async () => {
		const { OpaqueExternalType02Parent } = await import('../compiled/OpaqueExternalType02Parent.js');
		const io = new KaitaiStream(fs.readFileSync('src/term_strz.bin'));
		const r = new OpaqueExternalType02Parent(io);
		assert.strictEqual(r.parent.child.s1, "foo");
		assert.strictEqual(r.parent.child.s2, "bar");
		assert.strictEqual(r.parent.child.s3.s3, "|baz@");
	});
});
