import fs from 'node:fs';
import assert from 'node:assert/strict';
import { KaitaiStream } from 'kaitai-struct';

// FIXME: fix duplication of `test_str_encodings_escaping_to_s.js` (this is a
// copy of the `validateErr` function from there without comments)
function validateErr(expectedEncoding, err) {
  if (err instanceof RangeError) {
    assert.strictEqual(err.code, 'ERR_ENCODING_NOT_SUPPORTED');
    assert.strictEqual(err.message, 'The "' + expectedEncoding + '" encoding is not supported');
  } else if (Object.getPrototypeOf(err) === Error.prototype) {
    var regex = /^Encoding not recognized: '(.*)' \(searched as: '.*'\)$/;
    var match = err.message.match(regex);
    assert.ok(match !== null, "message [" + err.message + "] does not match regex " + regex);
    assert.strictEqual(match[1], expectedEncoding);
  } else {
    assert.fail("expected " + RangeError.name + " or " + Error.name + ", but got " + err);
  }
  return true;
}

function assertUnknownEncoding(expectedEncoding, fn) {
  assert.throws(fn, validateErr.bind(null, expectedEncoding));
}

describe('StrEncodingsEscapingEnc', () => {
  it('parses test properly', async () => {
    const { StrEncodingsEscapingEnc } = await import('#testformats/StrEncodingsEscapingEnc.js');
    const io = new KaitaiStream(fs.readFileSync('src/str_encodings.bin'));
    const r = new StrEncodingsEscapingEnc(io);
    assertUnknownEncoding(
      "ASCII\\\\x",
      function() {
        r.str1.v;
      }
    );
    assertUnknownEncoding(
      "UTF-8\\'x",
      function() {
        r.str2.v;
      }
    );
    assertUnknownEncoding(
      "SJIS\\\"x",
      function() {
        r.str3.v;
      }
    );
    assertUnknownEncoding(
      "IBM437\\nx",
      function() {
        r.str4.v;
      }
    );
  });
});
