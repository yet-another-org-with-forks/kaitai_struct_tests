export class CustomFxNoArgs {
  decode(src) {
    const len = src.length;
    const dest = new Uint8Array(len + 2);
    for (let i = 0; i < len; i++) {
      dest[i + 1] = src[i];
    }
    dest[0] = 95;
    dest[len + 1] = 95;
    return dest;
  }
}
