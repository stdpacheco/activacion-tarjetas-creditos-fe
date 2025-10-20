export const sortByDate = <T>(
  array: T[],
  dateKey: keyof T,
  order: "asc" | "desc" = "desc"
): T[] => {
  return array.sort((a, b) => {
    const date1 = new Date(a[dateKey] as any).getTime();
    const date2 = new Date(b[dateKey] as any).getTime();

    return order === "desc" ? date2 - date1 : date1 - date2;
  });
};
