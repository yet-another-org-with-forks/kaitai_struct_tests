import fs from 'node:fs';
import assert from 'node:assert/strict';
import { KaitaiStream } from 'kaitai-struct';

describe('DebugEnumName', () => {
  it('parses test properly', async () => {
    const { DebugEnumName } = await import('../compiled/DebugEnumName.js');
    const io = new KaitaiStream(fs.readFileSync('src/fixed_struct.bin'));
    const r = new DebugEnumName(io);

    // --debug implies --no-auto-read
    r._read();

    assert.strictEqual(r._debug.one.enumName, "DebugEnumName.TestEnum1");
    assert.strictEqual(r._debug.arrayOfInts.arr[0].enumName, "DebugEnumName.TestEnum2");
    assert.strictEqual(r.testType._debug.field1.enumName, "DebugEnumName.TestSubtype.InnerEnum1");
    assert.strictEqual(r.testType._debug._m_instanceField, undefined);
    r.testType.instanceField;
    assert.strictEqual(r.testType._debug._m_instanceField.enumName, "DebugEnumName.TestSubtype.InnerEnum2");
  });
});
