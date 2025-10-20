import { useCallback, useState } from "react";

function useStableBlast<T>(initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  const blast = useCallback((newValue: T | Partial<T>) => {
    setValue((prevValue) => {

      if (Object.is(prevValue, newValue)) {
        return prevValue;
      }

      if (
        typeof prevValue === "object" &&
        typeof newValue === "object" &&
        !Array.isArray(prevValue) &&
        !Array.isArray(newValue)
      ) {
        return {
          ...prevValue,
          ...newValue,
        } as any;
      }

      return newValue as any;
    });
  }, []);

  return [value, blast] as const;
}

export default useStableBlast;
