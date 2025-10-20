import { ExternalFiscalResidence, IContractSACatalog } from "@/domain/Entities";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface IJobInformationState {
  selectedEmploymentStatus: IContractSACatalog;
  setSelectedEmploymentStatus: (catalog: IContractSACatalog) => void;
  enterpriseName: string;
  setEnterpriseName: (name: string) => void;
  jobTitle: string;
  setJobTitle: (title: string) => void;
  incomingRange: IContractSACatalog;
  setIncomingRange: (range: IContractSACatalog) => void;
  inconmingOrigin: IContractSACatalog;
  setIncomingOrigin: (value: IContractSACatalog) => void;
  economicActivity: IContractSACatalog;
  setEconomicActivity: (activity: IContractSACatalog) => void;
  ruc: string;
  setRuc: (ruc: string) => void;
  birthPlace: IContractSACatalog;
  setBirthPlace: (birthPlace: IContractSACatalog) => void;
  addresses?: ExternalFiscalResidence[];
  setAddresses: (other?: ExternalFiscalResidence[]) => void;
  residenceCountry: IContractSACatalog;
  setResidenceCountry: (residenceCountry: IContractSACatalog) => void;
  hasExternalResidence: boolean;
  setHasExternalResidence: (hasExternalResidence: boolean) => void;
}

const INITIAL_STATE: IJobInformationState = {
  selectedEmploymentStatus: {} as IContractSACatalog,
  setSelectedEmploymentStatus: (_catalog) => {},
  enterpriseName: "",
  setEnterpriseName: (_name) => {},
  jobTitle: "",
  setJobTitle: (_title) => {},
  incomingRange: {} as IContractSACatalog,
  setIncomingRange: (_range: IContractSACatalog) => {},
  inconmingOrigin: {} as IContractSACatalog,
  setIncomingOrigin: (_catalog) => {},
  economicActivity: {} as IContractSACatalog,
  setEconomicActivity: (_activity) => {},
  ruc: "",
  setRuc: (_ruc) => {},
  setBirthPlace: (_birthPlace) => {},
  birthPlace: {} as IContractSACatalog,
  addresses: [],
  setAddresses: (_other) => {},
  residenceCountry: {} as IContractSACatalog,
  setResidenceCountry: (_residenceCountry) => {},
  hasExternalResidence: false,
  setHasExternalResidence: (_hasExternalResidence) => {},
};

export const useJobInformationStore = create<IJobInformationState>()(
  subscribeWithSelector((set, _get) => ({
    ...INITIAL_STATE,
    setSelectedEmploymentStatus: (catalog) =>
      set((state) => ({ ...state, selectedEmploymentStatus: catalog })),
    setEnterpriseName: (name) => set({ enterpriseName: name }),
    setJobTitle: (title) => set({ jobTitle: title }),
    setIncomingRange: (range) => set({ incomingRange: range }),
    setIncomingOrigin: (catalog) => set({ inconmingOrigin: catalog }),
    setEconomicActivity: (activity) => set({ economicActivity: activity }),
    setRuc: (ruc) => set({ ruc: ruc }),
    setBirthPlace: (birthPlace) => set({ birthPlace: birthPlace }),
    setAddresses: (other) => set((state) => ({ ...state, addresses: other })),
    setResidenceCountry: (residenceCountry) =>
      set((state) => ({ ...state, residenceCountry })),
    setHasExternalResidence: (hasExternalResidence) => set({ hasExternalResidence }),
  }))
);
