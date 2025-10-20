import * as forge from 'node-forge';
import { getSecretKey } from './getSecretKey';

const RSA_PUBLIC_KEY_PEM = getSecretKey('PUBLIC');
const RSA_PRIV_KEY_PEM = getSecretKey('PRIVATE');

export class ForgeUtils {
  static encrypt(data: string): any {
    try {
      const publicKey = forge.pki.publicKeyFromPem(RSA_PUBLIC_KEY_PEM);
      return publicKey.encrypt(data, 'RSA-OAEP');
    } catch (error) {}
  }

  static decrypt(data: string): any {
    try {
      const privKey = forge.pki.privateKeyFromPem(RSA_PRIV_KEY_PEM);
      return privKey.decrypt(data, 'RSA-OAEP');
    } catch (error) {}
  }

  static decryptJWE(jwe: string) {
    const [, encodedKey, encodedIV, encodedPayload, encodedAuthTag] = jwe.split('.');

    const keyBytes = this.decrypt(this.base64urlDecode(encodedKey));
    const ivBytes = this.base64urlDecode(encodedIV);
    const payloadBytes = this.base64urlDecode(encodedPayload);
    const authTagBytes = this.base64urlDecode(encodedAuthTag);

    const payload = this.symetricDecrypt(keyBytes, ivBytes, payloadBytes, authTagBytes);

    return payload;
  }

  static symetricDecrypt(key, iv, payload, authTag) {
    const aesGcm = forge.cipher.createDecipher('AES-GCM', key);
    aesGcm.start({ iv, tag: authTag });
    aesGcm.update(forge.util.createBuffer(payload));
    aesGcm.finish();

    return aesGcm.output.toString();
  }

  static generateJWE(payload): string {
    const encodedHeader = this.base64urlEncode(
      JSON.stringify({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
    );

    const bytes = forge.random.getBytesSync(32);
    const hexString = forge.util.bytesToHex(bytes);

    const key = this.encrypt(hexString);
    const encryptedKey = this.base64urlEncode(key);
    const iv = forge.random.getBytesSync(12);
    const hexIvString = forge.util.bytesToHex(iv);
    const cipher = forge.cipher.createCipher('AES-GCM', bytes);
    cipher.start({ iv });
    cipher.update(forge.util.createBuffer(payload, 'utf8'));
    cipher.finish();
    const encryptedPayload = this.base64urlEncode(cipher.output.getBytes());

    const authTag = this.base64urlEncode(cipher.mode.tag.getBytes());
    const encodeVector = this.base64urlEncode(hexIvString);
    const jwe = `${encodedHeader}.${encryptedKey}.${encodeVector}.${encryptedPayload}.${authTag}`;
    return jwe;
  }

  static base64urlEncode(input) {
    let base64 = forge.util.encode64(input);
    base64 = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    return base64;
  }

  static base64urlDecode(input) {
    input = input.replace(/-/g, '+').replace(/_/g, '/');
    while (input.length % 4 !== 0) {
      input += '=';
    }
    return forge.util.decode64(input);
  }

  static xmlRsaKeyValueToPem(xml: string): string {
    function getXmlValue(tag: string): string | null {
      const match = xml.match(new RegExp(`<${tag}>([^<]+)</${tag}>`));
      return match ? match[1] : null;
    }

    function decodeB64ToBigInteger(b64: string): forge.jsbn.BigInteger {
      const bytes = forge.util.decode64(b64);
      const hex = forge.util.bytesToHex(bytes);
      return new forge.jsbn.BigInteger(hex, 16);
    }

    const hasPrivateComponents = getXmlValue('P') !== null;

    const modulusB64 = getXmlValue('Modulus');
    const exponentB64 = getXmlValue('Exponent');

    if (!modulusB64 || !exponentB64) {
      throw new Error('Modulus or Exponent not found in the XML.');
    }

    const n = decodeB64ToBigInteger(modulusB64);
    const e = decodeB64ToBigInteger(exponentB64);

    if (!hasPrivateComponents) {
      const publicKey = forge.pki.setRsaPublicKey(n, e);
      return forge.pki.publicKeyToPem(publicKey).replace(/\r?\n/g, '');
    } else {
      const pB64 = getXmlValue('P');
      const qB64 = getXmlValue('Q');
      const dpB64 = getXmlValue('DP');
      const dqB64 = getXmlValue('DQ');
      const inverseQB64 = getXmlValue('InverseQ');
      const dB64 = getXmlValue('D');

      if (!pB64 || !qB64 || !dpB64 || !dqB64 || !inverseQB64 || !dB64) {
        throw new Error('Private key components are missing in the XML.');
      }

      const p = decodeB64ToBigInteger(pB64);
      const q = decodeB64ToBigInteger(qB64);
      const dp = decodeB64ToBigInteger(dpB64);
      const dq = decodeB64ToBigInteger(dqB64);
      const qi = decodeB64ToBigInteger(inverseQB64);
      const d = decodeB64ToBigInteger(dB64);

      const privateKey = forge.pki.setRsaPrivateKey(n, e, d, p, q, dp, dq, qi);
      return forge.pki.privateKeyToPem(privateKey).replace(/\r?\n/g, '');
    }
  }
}
