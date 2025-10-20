export interface IGeneralApiResponse<T> {
  traceid: string;
  data: T;
}

export interface IDobleFactor {
  factorVerificar: string;
}
