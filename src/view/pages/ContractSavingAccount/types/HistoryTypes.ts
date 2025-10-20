export interface Catalogo {
  idCatalogo: string;
  nombreCampoTabla: string;
  nombreValorAdicional: string;
  valorAdicional: string;
}

export interface ListaCampo {
  nombreCampo: string;
  valorCampo: string;
  cantidadCampo: string;
  origenCampo: string;
  editarCampo: string;
  tipoEstructura: string;
  catalogo: Catalogo;
  informacionAdicional: ListaCampo[];
}

export interface IContractHistory {
  pasoSolicitud: string;
  estadoSolicitud: string;
  algunDatoVacio: boolean;
  listaCampos: ListaCampo[];
}
