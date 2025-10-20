type KEY = 'PUBLIC' | 'PRIVATE';

const XOR_SALT = 13;

const ENV_NAMES_PRIVATE = [
  import.meta.env.VITE_KPV_fa12b3 as string | undefined,
  import.meta.env.VITE_KPV_a9b8c7 as string | undefined,
  import.meta.env.VITE_KPV_zx11aa as string | undefined,
  import.meta.env.VITE_KPV_12ab34 as string | undefined,
  import.meta.env.VITE_KPV_99ff00 as string | undefined,
  import.meta.env.VITE_KPV_77cc55 as string | undefined,
];

const ENV_NAMES_PUBLIC = [
  import.meta.env.VITE_KPB_fa12b3 as string | undefined,
  import.meta.env.VITE_KPB_a9b8c7 as string | undefined,
  import.meta.env.VITE_KPB_zx11aa as string | undefined,
  import.meta.env.VITE_KPB_12ab34 as string | undefined,
  import.meta.env.VITE_KPB_99ff00 as string | undefined,
  import.meta.env.VITE_KPB_77cc55 as string | undefined,
];

const PRIVATE_PERMUTATION = import.meta.env.VITE_PERMUTATION
  ? import.meta.env.VITE_PERMUTATION.split(',').map(Number)
  : [];

function base64ToUint8Array(b64: string): Uint8Array {
  try {
    if (typeof atob === 'function') {
      const binary = atob(b64);
      const arr = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) arr[i] = binary.charCodeAt(i);
      return arr;
    }
  } catch (e) {}
  return new Uint8Array(Buffer.from(b64, 'base64'));
}

function deobfuscateFromBase64(b64: string, salt = XOR_SALT): string {
  const arr = base64ToUint8Array(b64);
  const decoded = new Uint8Array(arr.length);
  for (let i = 0; i < arr.length; i++) decoded[i] = arr[i] ^ salt;
  if (typeof TextDecoder !== 'undefined') {
    return new TextDecoder().decode(decoded);
  } else {
    return Buffer.from(decoded).toString('utf8');
  }
}

export function getSecretKey(type: KEY): string {
  const ENV_VARS = type === 'PRIVATE' ? ENV_NAMES_PRIVATE : ENV_NAMES_PUBLIC;

  if (ENV_VARS.some((v) => !v || v.length === 0)) {
    console.warn(`Faltan partes de la clave ${type.toLowerCase()} en import.meta.env`, ENV_VARS);
    return '';
  }

  if (PRIVATE_PERMUTATION.length !== ENV_VARS.length) {
    console.warn(
      `VITE_PERMUTATION inválida o faltante para clave ${type.toLowerCase()}`,
      PRIVATE_PERMUTATION
    );
    return '';
  }
  const partsDeobf = ENV_VARS.map((v) => deobfuscateFromBase64(v!));
  const recomposedArray: string[] = PRIVATE_PERMUTATION.map((permIdx) => partsDeobf[permIdx]);
  return recomposedArray.join('');
}
