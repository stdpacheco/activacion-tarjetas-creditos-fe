export const getSafeNumber = (value: string | null, defaultValue = 0): number => {
  const castedValue = Number(value);

  if (!value || isNaN(castedValue)) {
    return defaultValue;
  }

  return castedValue;
};

export const isPositiveNumber = (num?: string): boolean => {
  if (!num) return false;

  const castedValue = Number(num.toReplaceAll(",", ""));

  return !isNaN(castedValue) && castedValue > 0;
};
