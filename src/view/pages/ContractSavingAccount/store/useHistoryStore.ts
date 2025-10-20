import { create } from "zustand";
import { IContractHistory, ListaCampo } from "../types/HistoryTypes";


const findField = (
  history: IContractHistory[],
  estadoSolicitud: string,
  nombreCampo: string
): string | false => {
  const contractStep = history.find((c) => c.estadoSolicitud === estadoSolicitud);
  if (!contractStep) return false;

  const searchField = (listaCampos: ListaCampo[]): string | false => {
    for (const campo of listaCampos) {
      if (campo.nombreCampo === nombreCampo) {
        return campo.valorCampo || false;
      }
      if (campo.informacionAdicional) {
        const result = searchField(campo.informacionAdicional);
        if (result) return result;
      }
    }
    return false;
  };

  return searchField(contractStep.listaCampos);
};

const findCatalogId = (
  history: IContractHistory[],
  estadoSolicitud: string,
  nombreCampo: string
): number | false => {
  const contractStep = history.find((c) => c.estadoSolicitud === estadoSolicitud);
  if (!contractStep) return false;

  const campo = contractStep.listaCampos.find((c) => c.nombreCampo === nombreCampo);
  if (campo?.catalogo?.idCatalogo) {
    return parseInt(campo.catalogo.idCatalogo, 10);
  }
  return false;
};

const checkHistoryStatus = (
  history: IContractHistory[],
  historyStatus1: string,
  historyStatus2?: string
): boolean => {
  const hasStatus1 = history.some((c) => c.estadoSolicitud === historyStatus1);
  const hasStatus2 = historyStatus2
    ? history.some((c) => c.estadoSolicitud === historyStatus2)
    : false;
  return historyStatus2 ? hasStatus1 || hasStatus2 : hasStatus1;
};

interface HistoryState {
  history: IContractHistory[];
  loadingHistory: boolean;
  setHistory: (newHistory: IContractHistory[]) => void;
  getHistoryValue: (estadoSolicitud: string, nombreCampo: string) => string | false;
  setLoadingHistory: (loading: boolean) => void;
  getCatalogId: (estadoSolicitud: string, nombreCampo: string) => number | false;
  hasHistory: () => boolean;
  hasHistoryStatus: (
    historyStatus1: string,
    stopHistoryLoading?: boolean,
    historyStatus2?: string
  ) => boolean;
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
  history: [],
  loadingHistory: false,
  setHistory: (newHistory) => {
    set({ history: newHistory });
  },
  getHistoryValue: (estadoSolicitud, nombreCampo) =>
    findField(get().history, estadoSolicitud, nombreCampo),
  getCatalogId: (estadoSolicitud, nombreCampo) =>
    findCatalogId(get().history, estadoSolicitud, nombreCampo),
  hasHistory: () => get().history.length > 0,
  setLoadingHistory: (loading) => {
    set({ loadingHistory: loading });
    if (loading) {
      setTimeout(() => set({ loadingHistory: false }), 20000);
    }
  },
  hasHistoryStatus: (historyStatus1, stopLoading = true, historyStatus2) => {
    const history = get().history;
    const hasStatus = checkHistoryStatus(history, historyStatus1, historyStatus2);

    if (!hasStatus && stopLoading && get().loadingHistory) {
      set({ loadingHistory: false, history: [] });

    
    }

    return hasStatus;
  },
}));
