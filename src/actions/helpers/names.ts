export const DEFAULT_GREETING = 'Hola';

export function safeCapitalize(input: unknown, fallback = ''): string {
  const s = String(input ?? '')
    .replace(/\s+/g, ' ')
    .trim();
  return s ? s[0].toUpperCase() + s.slice(1).toLowerCase() : fallback;
}

export function getSafeFirstName(fullName: unknown, fallback = DEFAULT_GREETING): string {
  const parts = String(fullName ?? '')
    .replace(/[\u00A0\t\r\n]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean);
  const pick = parts[2] ?? parts[1] ?? parts[0];
  return pick ? safeCapitalize(pick, fallback) : fallback;
}
