import { ITokenBody } from "../../domain/Entities";

const getTokenDecode = (token: string): ITokenBody => {
  const decodedToken: ITokenBody = JSON.parse(atob(token.split(".")[1]));
  return decodedToken;
};

const getActualTimestamp = (): number => {
  return Math.trunc(new Date().getTime() / 1000);
};

export { getTokenDecode, getActualTimestamp };
