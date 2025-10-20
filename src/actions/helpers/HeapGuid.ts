import { getTokenDecode } from "@/actions/helpers/TokenDecode";
import { SecureWebStorage, storageConstants } from "@/view/utils";

export const getUserGuid = () => {
  const storage = new SecureWebStorage();
  const token = storage.getItem(storageConstants.ACCESS_TOKEN);

  if (!token) return;

  const decodedToken = getTokenDecode(token);
  return decodedToken.Guid;
};
