import { IContractHistory } from "@/view/pages/ContractSavingAccount/types/HistoryTypes";

export const ID_CONTRY_ECUADOR = "2241";

export interface IContractInfoPerson {
  nombres: string;
  nombre1: string;
  nombre2: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  genero: string;
  esCliente: string;
  descGenero: string;
  fechaNacimiento: string;
  descEstadoCivil: string;
  descNacionalidad: string;
  identificacionConyuge: string;
  celular: string;
  correo: string;
  idGenero: string;
}

export interface IContractInfoPersonSpouse extends IContractInfoPerson {
  identificacionConyuge: string;
}
export enum ContractBiometricSecurityType {
  preValidation,
  fingerprintCode,
  biometric,
}

export interface ActivarTarjetaRequest {
  identificacion: string;
  digito: string;
  canal: string;
}

export interface getInfoPersonaRequest {
  identificacion: string;
}

export interface PendienteActivacionResponse {
  [x: string]: any;
  traceid: string;
  success: boolean;
  collection: boolean;
  count: number;
  data: CardData;
  error: any;
}

export interface CardData {
  empresa: string;
  mensajeError: string;
  nombres: string;
  clte: string;
  estado: string | null;
  fechaAperturaToLower: string | null;
  identificacion: string;
  adicional1: string;
  adicional2: string;
  adicional3: string;
  tarjetaToLower: string | null;
  tipoIdentificacion: string;
  tipoTarjetaToLower: string | null;
  afinidad: string;
  alias: string;
  celular: string | null;
  correoElectronico: string | null;
  cuentaAhorro: string;
  cuentaCorriente: string;
  estadoPlastico: string;
  expira: string;
  fechaAperturaToUpper: string;
  fechaImpresion: string;
  numeroExpediente: string;
  razonGenera: string;
  solicitudPreAprobada: string;
  tarjetaToUpper: string;
  tipoBin: string;
  tipoPlastico: string;
  tipoTarjetaToUpper: string;
  ubicacion: string;
  campaniaSolicitud: string;
  canalSolicitud: string;
  estadoSolicitud: string;
  fechaEmision: string;
  fechaSolicitud: string;
  marca: string;
  numeroSolicitud: string;
  offSet: string;
}

export interface ContractSAAPIResponse<T = any> {
  code: string | number;
  message: string;
  status?: number;
  data?: T;
  errors?: [{ code: number; message: string }];
}

export interface ContractSABiometricSecurityRequest {
  type: ContractBiometricSecurityType;
  identification: string;
  fingerprintCode?: string;
  tokenizedPhoto?: string;
}

export interface IContractSABiometrciSecurityResponse {
  traceid?: string;
  guidPersona?: string;
  idExpediente: string;
  idSolicitud: string;
  token: string;
  datosPersona: IContractInfoPerson;
  datosConyugue: IContractInfoPersonSpouse;
  detailPerson?: {
    isRequestDataSpouse: boolean;
    detailsPerson: { name: string; value: string }[];
  };
  historialContratacion?: IContractHistory[];
  tieneProductoContratado?: boolean;
}

export interface ContractSavingAccountGenericRequest<T = any> {
  origen: {
    canal: string;
    identificacion: string;
    direccionIp?: string;
  };
  data: T;
  idSolicitud?: string;
}

export enum ContractSAPreValidationType {
  EnterBiometric = 25,
  EnterFingerprintCode = 23,
}

export interface IContractSACatalog {
  idCodigo: number;
  strValor: string;
  strCodigoHost: string;
  strValor2: string;
  strValor3: string;
  strValor4: string;
  strValor5: string;
  strValorHost: string;
}

export interface IContractSAInfoEmplymentCatalogs {
  situacionDetalle: IContractSACatalog[];
  origenIngreso: IContractSACatalog[];
  fuenteIngreso: IContractSACatalog[];
  rangoIngreso: IContractSACatalog[];
}

export interface ICSAManagePersonInfo {
  identification: string;
  idRequest: string;
  spouse?: {
    identification: string;
    firstName: string;
    middleName: string;
    firstLastName: string;
    middleLastName: string;
  };
}

export interface IContractAHOManageInfoNormativeReq {
  identification: string;
  idRecord: string;
  idBirthPlace: string;
  otherContry?: ExternalFiscalResidence[];
  ruc?: string;
  actives: string;
  pasives: string;
  patromony: string;
}

export interface ExternalFiscalResidence {
  codigoR?: number;
  codigoPaisR?: string;
  nifR?: string;
  estado: string;
  paisR?: string;
  direccionR?: string;
}

export interface FiscalResidenceData {
  listadoResidenciaFiscal: ExternalFiscalResidence[];
}

interface DatosDireccionPersona {
  idCatPais: string;
  idCatProvincia: string;
  provinciaDomicilioDesc: string;
  idCatCiudad: string;
  ciudadDomicilioDesc: string;
  idParroquia: string;
  callePrincipal: string;
  calleInterseccion: string;
  villaSolar: string;
  referencia: string;
  telefono: string;
  idTipoVivienda: string;
  tipoVivienda: string;
}

interface DatosDireccionTrabajo {
  idCatPais: string;
  idCatProvincia: string;
  provinciaTrabajoDesc: string;
  idCatCiudad: string;
  ciudadTrabajoDesc: string;
  idParroquia: string;
  callePrincipal: string;
  calleInterseccion: string;
  villaSolar: string;
  referencia: string;
  telefono: string;
}
export interface InformationContactData {
  celular: string;
  correoElectronico: string;
  desbloqueaDireccionPersona: boolean;
  desbloqueaDatosContacto: boolean;
  datosDireccionPersona: DatosDireccionPersona;
  desbloqueoDireccionTrabajo: boolean;
  datosDireccionTrabajo: DatosDireccionTrabajo;
}

export enum ContractAHOEmploymentStatusType {
  PrivateEmploye = "V",
  HouseWife = "A",
  PublicEmploye = "B",
  Independent = "I",
  Retired = "H",
  Student = "E",
}

export enum CatalogType {
  EconomicActivity,
  Contries,
  CitiesWithAgencies,
  CitiesForProvincie,
  AgenciesForCity,
  AgenciesAvantiAndEvolution,
  Provincies,
  Cities,
  OtherIncominOrigin,
  ResidenceCountries,
}

export interface IContractEmploymentInfoParams {
  identification: string;
  idCatalogOriginOfIncome: number;
  idRequest: string;
  idRecord: string;
  externalAccount: string;
  idCountryResidence?: string;
  sourceOfIncome?: string;
  idCatalogSourceOfIncome: number;
  employmentSituationType: ContractAHOEmploymentStatusType;
}

export interface IndependentType extends IContractEmploymentInfoParams {
  idCatalogEconomicActivity: number;
  amountSalePrice: string;
  ruc?: string;
}

export interface EmploymentType extends IContractEmploymentInfoParams {
  monthlySalary: string;
  positionHeld: string;
  enterpriseName: string;
}

export interface OtherIncomeType extends IContractEmploymentInfoParams {
  othersIncome: string;
}

export interface NegocioPropio {
  tiempoLabora: string;
  idActividadCiiu: number | string;
  ventaMensual: number | string;
  costoDeVenta: string;
  preguntaTienesRucActivo: string;
  numeroRUC: string;
}

export interface TrabajoParaEmpresa {
  idActividadEconomica: string;
  tiempoLabora: string;
  sueldoMensual: number | string;
  cargoOcupa: string;
  nombreEmpresa: string;
  profesion: string;
  otrosIngresos: string;
}

export interface ContractInsuranceData {
  presentarAvisoSeguro: boolean;
  presentarPlanSeguro: boolean;
  valorAvisoSeguro: string;
  valorPlanSeguro: string;
  numPlanSeguro: string;
  planesSeguro: ContractInsuarancePlan[];
}
export interface ContractInsuranceResponse {
  cuentaSeguraPlus: {
    isPresent: boolean;
    plan: ContractInsuarancePlan;
  };
  avisoSeguro: {
    isPresent: boolean;
    amount: string;
  };
}

export interface ContractInsuarancePlan {
  valorPlanSeguro: string;
  numPlanSeguro: string;
  identificadorProducto: string;
  nombreComercial: string;
  coberturas: Cobertura[];
}

export interface DebitCardInformation {
  idSegmentacionEstrategico: string;
  presentaLugarEntregaTarjeta: boolean;
  generaTarjetaDebito: boolean;
  listadoNombresTarjeta: ListNameCard[];
  listadoLugarDeEntrega: ListEntryPlaces[];
  numTarjetaEnmascarada: string | null;
  costoTarjetaDebito: string;
  costoServicio: string;
}

export interface ListNameCard {
  nombreEnTarjeta: string;
}

export interface ListEntryPlaces {
  idCodigo: string;
  descripcion: string;
}

export interface Cobertura {
  idCodigo: string;
  detalle: string;
}

export enum ContractInsuranceProductID {
  CuentaSeguraPlus = "CtaSeguraPlus",
  CuentaSegura = "CtaSegura",
  AvisoSeguro = "AvisoSeguro",
}

export enum CoverageCuentaSeguraPlusType {
  RoboATM = "robo-atm",
  RoboAPP = "robo-app",
  CompraIternet = "compra-internet",
  TransRobo = "transaccion-robo",
  TransClonacion = "transaccion-clonacion",
}

export enum ContractInfoContactActionType {
  Work = "trabajo",
  Email = "correo",
  CellPhone = "celular",
  ExteriorPhone = "celular-exterior",
  Home = "domicilio",
}

export interface ContractInfoContactRequest {
  identification: string;
  actionType: ContractInfoContactActionType;
  idRequest: string;
  emailAddress?: string;
  cellPhone?: string;
  idCatalogContry?: string;
  idCatalogProvince?: string;
  idCatalogCity?: string;
  idCountryResidence?: string;
  phoneCountryCode?: string;
  phoneInExterior?: string;
  mainStreet?: string;
  reference?: string;
  actDireccDomicilio?: string;
  actDireccTrabajo?: string;
}

export enum ContractInfoContactErrorType {
  WrongEmail = 2,
}

export enum ContractDebitCardSpecialSegmentType {
  Avanti = "2108",
  Evolution = "2109",
}

export enum ContactProductPasiveType {
  DebitCard = "TD",
  SecureAccount = "SEG",
}

export interface ContractSavePasiveProductRequest {
  identification: string;
  nameOnCard?: string;
  idPlaceOfDelivery?: string;
  idRecord: string;
  actionType: ContactProductPasiveType;
  isRequiredAvisoBG?: boolean;
  isRequireCuentaSeguraPlus?: boolean;
  costSecurePlan?: string;
  numSecurePlan?: string;
}

export interface ContractUpdateAgencyRequest {
  identification: string;
  idRecord: string;
  idAgency: string;
}

export enum CSAPreValidationValiationType {
  IdentificationNotValid = 10,
  EnterBiometric = 25,
  MaxAttemptsBiometrics = 6,
  EnterFingerprintCode = 23,
  ClientWait = 5,
}
export enum CSAFingerprintValidationType {
  IdentityDocumentNotExist = 30,
  EnterBiometric = 25,
}

export enum CSAManageInfoPerson {
  InternalPolicies = 8,
}

export enum CSABiometricValidationType {
  MaxAttemptsBiometrics = 4,
  CardToWithDraw = 13,
  LimitOfAccount = 31,
  MinYearsOld = 14,
  PhotoNotObtained = 7,
  PendingRequest = 10,
  ClientWait = 5,
  Exit = 0,
}

export enum ContractBiometricOtherValidation {
  LastAttemptsBiometris = "6",
}

export enum CSAManagePersonInfoValidationType {
  InternalPolicies = 8,
}

export interface ContractSavingAccountRequest {
  identification: string;
  otp: string;
  idRecord: string;
  idRequest: string;
}

export enum ContractsAccountCodeType {
  GluedAccount = "21",
  CreateAccountNextDay = "38",
  Online = "0",
}

export enum ContractsOTPTypeError {
  TimeExpired = "5",
  LimitIntends = "11",
  IncorrectInputCode = "6",
  NumLimitIncorrectInputCode = "7",
}

export interface ContractResponse {
  numeroCuenta: string;
  horaActivacion: string;
}

export interface SetContractStepStatusRequest {
  identification: string;
  requestId: string;
  recordId: string;
  screenStatus: string;
}

export interface SetContractStepStatusGenericRequest {
  origen: {
    canal: string;
    identificacion: string;
  };
  data: {
    canalOrigen: string;
    producto: string;
    identificacion: string;
    idSolicitud: string;
    idExpediente: string;
    estadoPantalla: string;
    observacionesEstadoPantalla: string;
  };
}

export enum ContractStepStatus {
  PersonalData = "datos-personales",
  EmploymentData = "datos-laborales",
  RegulatoryData = "datos-normativos",
  DebitCardData = "datos-tarjeta-debito",
  WorkTDData = "datos-td-trabajo",
  DeliveryPlaceTDData = "datos-td-lugar-entrega",
  EmailData = "datos-correo",
  HireInsurance = "contratar-seguros",
  HireAccount = "contratar-cuenta",
}

export enum HistoryFields {
  HomeProvince = "Provincia domiciliaria",
  HomeCity = "Ciudad domiciliaria",
  HomeAddress = "Direccion domiciliaria",
  HomeReference = "Referencia domiciliaria",
  Agency = "agencia",
  DebitCardName = "Nombre tarjeta debito",
  Email = "Correo",
  SelectInsuranceNotice = "Selecciona Aviso Seguro",
  SelectInsurance = "Selecciona Seguro",
  TaxDeclaration = "Declaración de impuestos",
  EmploymentStatus = "Situacion Laboral",
  CompanyName = "Nombre Empresa",
  IncomeSource = "Fuente de ingresos",
  IncomeRange = "Rango de ingresos",
  JobTitle = "Cargo",
  NetWorth = "Patrimonio",
  Assets = "Activo",
  Liabilities = "Pasivo",
  WorkProvince = "Provincia trabajo",
  WorkCity = "Ciudad trabajo",
  WorkAddress = "Direccion trabajo",
  WorkReference = "Referencia trabajo",
  TaxIdNumber = "Número de identificación fiscal",
  Address = "Dirección",
  TaxDeclarationCountry = "pais Declaración de impuestos",
  TaxDeclarationItem = "declaracionImpuesto",
  EconomicActivity = "actividadEconomica",
  DeliveryPlace = "Lugar entrega tarjeta debito",
  SpouseIdentification = "Cédula de cónyuge",
  SpouseFirstName = "Primer nombre de cónyuge",
  SpouseSecondName = "Segundo nombre de cónyuge",
  SpouseLastName = "Primer apellido de cónyuge",
  SpouseSecondLastName = "Segundo apellido de cónyuge",
  Phone = "Celular",
}

export enum CivilStatus {
  Single = 1,
  Married = 2,
}

export interface PersonaResponse {
  success: boolean;
  errors: string[];
  collection: boolean;
  count: number;
  data: PersonaData | null;
}

export interface ApiErrorDetail {
  code: number;
  message: string;
}

export interface ApiErrorResponse {
  code: number;
  traceid: string;
  message: string;
  errors: ApiErrorDetail[];
}

export interface PersonaData {
  id: number;
  identificacion: string;
  nombres: string;
  genero: string;
  tipo: string;
  fechaNacimiento: string;
  lugarNacimiento: string;
  codigoDactilar: string;
  lugarExpedicion: string | null;
  fechaExpedicion: string;
  fechaExpiracion: string;
  nacionalidad: string;
  estadoCivil: string;
  nivelEducacion: string;
  profesion: string;
  fechaDefuncion: string | null;
  lugarDefuncion: string | null;
  lugarDomicilio: string;
  direccionDomicilio: string;
  identificacionConyuge: string | null;
  discapacitado: boolean;
  fallecido: boolean;
}



export interface ContractSavingGeneraOTPRequestV1 {
  llaveOTP: string,
  ivOTP: string,
  aplicacion: string,
  servicio: string,
  canal: string,
  opidOTP: string,
  terminal: string,
  identificacion: string,
  tipoIdentificacion: string,
  notificacion: string,
  smsOpid: string,
  smsOrigen: string,
  emailOrigen: string,
  emailAsunto: string,
  template: string
}

export interface ContractSavingGeneraOTPRequest<T = any> {
  origen: {
    llaveOTP: string,
    ivOTP: string,
    aplicacion: string,
    servicio: string,
    canal: string,
    opidOTP: string,
    terminal: string,
    identificacion: string,
    tipoIdentificacion: string,
    notificacion: string,
    smsOpid: string,
    smsOrigen: string,
    emailOrigen: string,
    emailAsunto: string,
    template: string
  };
  data: T;
}


export interface ContractSAAPAPIGOTPResponse {
  traceid: string;
  success: boolean;
  collection: boolean;
  count: number;
  data: DataContainer;
  error: any;
}

export interface DataContainer {
  traceid: string;
  status: string | null;
  data: OTPData;
}

export interface OTPData {
  codigoRetorno: number;
  mensaje: string;
  otp: string;
}


export interface ContractSavingValidaOtpRequestV1 {
  llaveOTP: string;
  ivOTP: string;
  aplicacion: string;
  servicio: string;
  canal: string;
  opidOTP: string;
  terminal: string;
  identificacion: string;
  tipoIdentificacion: string;
  otp: string;
}


export interface ActivarTarjetaOTPRequest {
  identificacion: string;
  digito: string;
  canal: string;
  otp: string;
}

export interface VariablesTarjetaRequest {
  identificacion: string;
  digito: string;
  canal: string;
}

export interface ResponseDatosPersonales {
  traceid: string;
  success: boolean;
  collection: boolean;
  count: number;
  data: DatosPersonalesData;
  error: any;
}

export interface DatosPersonalesData {
  success: boolean;
  errors: ErrorPersonas[];
  count: number;

}

export interface ErrorPersonas {
  code: number;
  message: string;
}