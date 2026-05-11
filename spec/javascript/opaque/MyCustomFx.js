export class MyCustomFx {
  constructor(key, flag, someBytes) {
    this.key = flag ? key : -key;
  }

  decode(src) {
    const len = src.length;
    const dest = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      dest[i] = src[i] + this.key;
    }
    return dest;
  }
}
