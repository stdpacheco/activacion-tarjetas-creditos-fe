import { ICoordinates } from "@/domain/Entities";

export const formatToCamelCase = (inputText: string): string => {
  const words: string[] = inputText?.split(" ");

  const formattedWords: string[] = words?.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  return formattedWords?.join(" ");
};

export const maskNumber = (inputNumber: string): string => {
  const prefix = "XXX";
  const lastThreeDigits = inputNumber.slice(-3);
  const maskedNumber = prefix + lastThreeDigits;
  return maskedNumber;
};

export const parseCoords = (coords: string): ICoordinates | undefined => {
  const coordsArr = coords.split("").filter((w) => w.trim());

  if (coordsArr.length !== 4) return;

  return {
    coordinateOne: coordsArr.slice(0, 2).join(""),
    coordinateTwo: coordsArr.slice(2).join(""),
  };
};

export const obfuscate = (
  input: string | number,
  maskChar: string = "*",
  notOfuscateStart: number = 2,
  notOfuscateEnd: number = 2
): string => {
  const str = input.toString();
  const totalLength = str.length;

  if (totalLength <= notOfuscateStart + notOfuscateEnd) {
    return str;
  }

  const visibleStart = str.slice(0, notOfuscateStart);
  const visibleEnd = str.slice(-notOfuscateEnd);
  const masked = maskChar.repeat(totalLength - notOfuscateStart - notOfuscateEnd);

  return `${visibleStart}${masked}${visibleEnd}`;
};
