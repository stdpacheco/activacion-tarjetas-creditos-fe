export const getCatalogos = (
  innfechaCorteSinFormato: string,
  actualValue = "A",
  start = 1
): { mes: string; anio: string; value: string }[] => {
  const fechaCorteSinFormato =
    innfechaCorteSinFormato.length === 5
      ? "0" + innfechaCorteSinFormato
      : innfechaCorteSinFormato;
  const mes = fechaCorteSinFormato.slice(0, 2);
  const anio_resumen = fechaCorteSinFormato.slice(4, 6);
  const catalogo: { mes: string; anio: string; value: string }[] = [
    {
      anio: anio_resumen,
      mes: "Periodo actual",
      value: actualValue,
    },
  ];

  for (let i = start; i <= 12; i++) {
    let mes_acumulado = Number(mes) - i;
    let anio_resumen_acumulado = Number(anio_resumen);
    if (mes_acumulado <= 0) {
      mes_acumulado = mes_acumulado + 12;
      anio_resumen_acumulado = anio_resumen_acumulado - 1;
    }
    catalogo.push({
      anio:
        anio_resumen_acumulado <= 9
          ? "0" + String(anio_resumen_acumulado)
          : String(anio_resumen_acumulado),
      mes: getMonthName(mes_acumulado),
      value: `${
        mes_acumulado <= 9 ? "0" + String(mes_acumulado) : String(mes_acumulado)
      }|${
        anio_resumen_acumulado <= 9
          ? "0" + String(anio_resumen_acumulado)
          : String(anio_resumen_acumulado)
      }`,
    });
  }
  return catalogo;
};

const getMonthName = (month: number): string => {
  switch (month) {
    case 1:
      return "Enero";
    case 2:
      return "Febrero";
    case 3:
      return "Marzo";
    case 4:
      return "Abril";
    case 5:
      return "Mayo";
    case 6:
      return "Junio";
    case 7:
      return "Julio";
    case 8:
      return "Agosto";
    case 9:
      return "Septiembre";
    case 10:
      return "Octubre";
    case 11:
      return "Noviembre";
    case 12:
      return "Diciembre";
    default:
      return "Diciembre";
  }
};
