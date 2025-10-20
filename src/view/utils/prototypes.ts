/* eslint-disable @typescript-eslint/no-this-alias */
export {};

const exceptionsUppercase = ['IESS', 'SRI', 'RISE'];
const replaceWords = {
  Seguros: 'IESS y Seguros',
};

declare global {
  interface String {
    toTruncateText(numberLetters: number): string;
    toCapitalizeWithoutLetter(lettersExclude?: string[]): string;
    toCurrency(): string;
    toReplaceAll(find: string, replace: string): string;
    toName(): string;
    toAccount(): string;
    toMask(): string;
    toMaskDots(): string;
    toMaskPhone(): string;
    toMaskEmail(): string;
    toTitleCase(): string;
    toConcatWords(): string;
    toClearSpaces(): string;
    toCapitalize(): string;
    toPhone(): string;
    toCellPhoneNumber(): string;
    toCard(): string;
    toHashCode(): string;
    toSanitizeNumber(): string;
    toSanitizeAmount(): string;
    toSanitizeSentece(): string;
    toSanitizeText(): string;
    toSanitizeEmail(): boolean;
    toSanitizeOnlyText(): string;
    toIsNullOrEmpty(): boolean;
    toTruncateNameAccount(numberLetters: number): string;
    toDayMonthDate(): string;
    toDateHour(): string;
    toInitials(): string;
    containtEnum<T>(enumType: T): boolean;
  }
  interface Number {
    containtEnum<T>(enumType: T): boolean;
  }
}

String.prototype.toHashCode = function () {
  let hash = 0,
    i,
    chr;
  if (this.length === 0) return hash.toString();
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash.toString();
};

String.prototype.toCurrency = function (this: string) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'USD',
    useGrouping: true,
  }).format(parseFloat(this.toReplaceAll(',', '')));
};

String.prototype.toReplaceAll = function (this: string, find: string, replace: string) {
  return this.replace(new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replace);
};

String.prototype.toName = function (this: string) {
  const parts = String(this ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0];
  if (parts.length === 2) return parts[1] + ' ' + parts[0];
  return `${parts[2]} ${parts[0]}`;
};

String.prototype.toAccount = function (this: string) {
  return this.slice(this.length - 4);
};

String.prototype.toMask = function (this: string) {
  try {
    return 'X'.repeat(4) + this.slice(this.length - 3);
  } catch (error) {
    return this;
  }
};

String.prototype.toMaskDots = function (this: string) {
  try {
    return '•'.repeat(3) + this.slice(this.length - 3);
  } catch (error) {
    return this;
  }
};

String.prototype.toIsNullOrEmpty = function (this: string | undefined) {
  if (this === '') {
    return true;
  }
  if (this === undefined) {
    return true;
  }
  return false;
};

String.prototype.toMaskEmail = function (this: string) {
  try {
    let EmailEnmascarado = '';
    const mascara = 2;
    const variableReemplazar = this.indexOf('@');
    let EmailEnmascaradoTemp = this;
    for (let j = 1; j <= mascara; j++) {
      if (this[variableReemplazar - j] != '.')
        EmailEnmascarado = EmailEnmascaradoTemp.split(this[variableReemplazar - j]).join('x');
      if (this[variableReemplazar + j] != '.')
        EmailEnmascarado = EmailEnmascarado.split(this[variableReemplazar + j]).join('x');
      EmailEnmascaradoTemp = EmailEnmascarado;
    }
    return EmailEnmascarado.toLowerCase();
  } catch (error) {
    return this;
  }
};

String.prototype.toMaskPhone = function (this: string) {
  try {
    return this.slice(0, 3) + 'X'.repeat(this.length - 6) + this.slice(this.length - 3);
  } catch (error) {
    return this;
  }
};

String.prototype.toConcatWords = function (this: string) {
  let content = this;
  for (const [key, value] of Object.entries(replaceWords)) {
    content = content.toReplaceAll(key, value);
  }
  return content;
};

String.prototype.toTitleCase = function (this: string) {
  let tmp = this.toLowerCase();
  exceptionsUppercase.map((word) => {
    tmp = tmp.toReplaceAll(word.toLowerCase(), word);
  });
  const fLetter = this.slice(0, 1);

  return fLetter + tmp.slice(1);
};
String.prototype.toCapitalize = function (this: string) {
  const split = this.split(' ');
  const cap = split.map((word) => {
    return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
  });

  return cap.join(' ');
};

String.prototype.toClearSpaces = function (this: string) {
  return this.replace(/s+/g, ' ');
};

String.prototype.toPhone = function (this: string) {
  return this.slice(0, 2) + '******' + this.slice(this.length - 2);
};

String.prototype.toCard = function (this: string) {
  return '****' + this.slice(this.length - 3);
};

String.prototype.toCapitalizeWithoutLetter = function (
  this: string,
  lettersExclude: string[] = ['el', 'la', 'los', 'las', 'de']
) {
  const words = this.split(' ');
  let result = '';
  const lettersExcludeLowercase = lettersExclude.map((letter) => {
    return letter.toLowerCase();
  });
  words.map((word, index) => {
    if (!lettersExcludeLowercase.includes(word.toLowerCase()) || index === 0) {
      result = result + ' ' + word.toCapitalize();
    } else {
      result = result + ' ' + word.toLowerCase();
    }
  });
  return result.trim();
};

String.prototype.toTruncateText = function (this: string, numberLetters: number) {
  if (this.length > numberLetters) {
    return this.slice(0, numberLetters) + '...';
  }
  return this;
};

String.prototype.toTruncateNameAccount = function (this: string, numberLetters: number) {
  if (this.length > numberLetters) {
    return this.slice(0, numberLetters).toUpperCase();
  }
  return this.toUpperCase();
};

String.prototype.toSanitizeNumber = function (this: string) {
  const pattern = /^[0-9]/;
  const reg = new RegExp(pattern);
  let code = '';
  String(this || '')
    .split('')
    .map((letra) => {
      if (reg.test(letra)) {
        code = code + letra;
      }
    });
  return code.trim();
};

String.prototype.toSanitizeAmount = function (this: string) {
  const replaceComma = this.toReplaceAll(',', '.');
  const ammoutArray = replaceComma.split('.');
  if (ammoutArray.length > 2) ammoutArray.splice(2);

  const newAmmout = ammoutArray.map((val) => {
    return val.toSanitizeNumber();
  });
  if (newAmmout.length == 2) {
    const wholeNumber = newAmmout[0].trim();
    let decimalNumber = newAmmout[1].trim();
    if (wholeNumber.length == 0 && decimalNumber.length == 0) return '';

    decimalNumber.length > 2 && (decimalNumber = decimalNumber.substring(0, 2));
    return `${wholeNumber}.${decimalNumber}`;
  } else return newAmmout[0];
};

String.prototype.toSanitizeText = function (this: string) {
  const pattern = /^[A-Za-z0-9 ]/;
  const reg = new RegExp(pattern);
  let code = '';
  String(this || '')
    .split('')
    .map((letra) => {
      if (reg.test(letra)) {
        code = code + letra;
      }
    });
  return code.trim();
};

String.prototype.toSanitizeSentece = function (this: string) {
  const pattern = /^[A-Za-z ]/;
  const reg = new RegExp(pattern);
  let code = '';
  String(this || '')
    .split('')
    .map((letra) => {
      if (reg.test(letra)) {
        code = code + letra;
      }
    });
  return code;
};

String.prototype.toSanitizeOnlyText = function (this: string) {
  const pattern = /^[A-Za-z]/;
  const reg = new RegExp(pattern);
  let code = '';
  String(this || '')
    .split('')
    .map((letra) => {
      if (reg.test(letra)) {
        code = code + letra;
      }
    });
  return code.toUpperCase().trim();
};

String.prototype.toSanitizeEmail = function (this: string) {
  const pattern =
    /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const reg = new RegExp(pattern);
  return reg.test(this);
};

String.prototype.toCellPhoneNumber = function (this: string) {
  const cleaned = this.replace(/\D/g, '');
  const standardPhone = /^(\d{3})(\d{3})(\d{4})$/;
  const shortPhone = /^(\d{2})(\d{3})(\d{4})$/;
  const otherNumbers = /^(\d{2})(\d{2})(\d{2})(\d{1,4})$/;

  if (cleaned.length == 10) {
    const match = cleaned.match(standardPhone);
    if (match) return [match[1], ' ', match[2], ' ', match[3]].join('');
  }

  if (cleaned.length == 9) {
    if (cleaned[0] === '9') {
      const match = cleaned.match(shortPhone);
      return ['0', match![1], ' ', match![2], ' ', match![3]].join('');
    } else {
      const match = cleaned.match(otherNumbers);
      return ['(', match![1], ') ', match![2], ' ', match![3], ' ', match![4]].join('');
    }
  }
  return cleaned;
};

String.prototype.toDayMonthDate = function (this: string) {
  const months: string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  const date = new Date(this);
  const day = date.getDate();
  const month = months[date.getMonth()];
  return `${day} de ${month}`;
};

export const datesToMonths = (days: string) => {
  const years = Math.floor(+days / 365);
  const months = Math.floor((+days % 365) / 30);
  const day = Math.floor((+days % 365) % 30);
  return `${years > 0 ? (years == 1 ? `${years} año` : `${years} años`) : ''} ${
    months > 0 ? (months == 1 ? `${months} mes` : `${months} meses`) : ''
  }  ${day > 0 ? (day == 1 ? `${day} dia` : `${day} dias`) : ''} `;
};

String.prototype.toDateHour = function (this: string) {
  const date = new Date(this);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

String.prototype.toInitials = function (this: string) {
  const words = String(this ?? '')
    .split(' ')
    .filter(Boolean);
  if (words.length === 0) return '';
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
};

String.prototype.containtEnum = function <T>(enumType: T): boolean {
  for (const key in enumType) {
    if (enumType[key as keyof T] == this) return true;
  }
  return false;
};

Number.prototype.containtEnum = function <T>(enumType: T): boolean {
  if (!(typeof enumType == 'object')) return false;

  return Object.values(enumType as any).includes(this);
};
