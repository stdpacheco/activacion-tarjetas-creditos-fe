import CryptoJS from "crypto-js";

export class SecureWebStorage implements Storage {
  private readonly _storage: Storage;
  private readonly _key: string = "";

  constructor(storage: Storage = sessionStorage) {
    this._storage = storage;
    this._key = import.meta.env.VITE_CRYPTO_KEY ?? "";
  }

  get length(): number {
    return this._storage.length;
  }

  setItem(key: string, value: string | object): void {
    const keyCrypt = this.encryptKey(key);

    const valueStr = typeof value === "object" ? JSON.stringify(value) : value;

    const valueCrypt = String(
      CryptoJS.AES.encrypt(valueStr, this._key + keyCrypt + String(keyCrypt.length))
    );

    this._storage.setItem(keyCrypt, valueCrypt);
  }

  getItem(key: string): string | null {
    const keyCrypt = this.encryptKey(key);
    const valueEncrypt = this._storage.getItem(keyCrypt);

    if (!valueEncrypt) return valueEncrypt;

    const data = CryptoJS.AES.decrypt(
      valueEncrypt,
      this._key + keyCrypt + String(keyCrypt.length)
    );

    return data.toString(CryptoJS.enc.Utf8);
  }

  key(index: number): string | null {
    return this._storage.key(index);
  }

  removeItem(key: string): void {
    const keyCrypt = this.encryptKey(key);
    this._storage.removeItem(keyCrypt);
  }

  clear(): void {
    this._storage.clear();
  }

  private encryptKey(key: string): string {
    const encrypted = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(key));

    return encrypted;
  }
}
