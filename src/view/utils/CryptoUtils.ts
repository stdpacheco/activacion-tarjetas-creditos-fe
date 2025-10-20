import CryptoJS from "crypto-js";

export class CryptoUtils {
  constructor() {}

  static encrypt(key: string, value: string): string {
    return String(CryptoJS.AES.encrypt(value, key));
  }

  static decrypt(key: string, value: string) {
    const data = CryptoJS.AES.decrypt(value, key);
    return data.toString(CryptoJS.enc.Utf8);
  }
  static encrypt64(value: string): string {
    const data = CryptoJS.enc.Utf8.parse(value);
    return CryptoJS.enc.Base64.stringify(data);
  }

  static decrypt64(value: string) {
    const data = CryptoJS.enc.Base64.parse(value);
    return CryptoJS.enc.Utf8.stringify(data);
  }

  static decryptIV(_key: string, _value: string) {
    const key = CryptoJS.enc.Utf8.parse(_key);
    const iv = CryptoJS.lib.WordArray.create([0x00, 0x00, 0x00, 0x00]);
    const decrypted = CryptoJS.AES.decrypt(_value, key, { iv: iv });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
