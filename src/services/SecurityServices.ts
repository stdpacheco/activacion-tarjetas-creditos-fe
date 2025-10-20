import Http from "./http/Http";
import { ISecurityCodeReq } from "@/domain/Entities";

export const getSecurityCodeService = async (data: ISecurityCodeReq) => {
  const url = "/security/v1/solicitar-otp";

  const response = await Http.post(url, data);
  return response.data.data;
};
