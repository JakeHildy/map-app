import { Buffer } from "buffer";

export const getAuthorization = () => {
  const authorizationString = `${process.env.REACT_APP_TENANT_ID}:${process.env.REACT_APP_SECRET_KEY}`;
  const authKey = Buffer.from(authorizationString, "base64");
  return authKey;
};
