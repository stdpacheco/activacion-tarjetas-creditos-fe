export interface ISecurityCodeReq {
  accion: SecurityCodeAction;
}

export const enum SecurityCodeAction {
  REGISTER_CARD = "REGISTRO_TARJETA",
  REGISTER_CONTACT = "REGISTRO_BENEFICIARIO",
}
