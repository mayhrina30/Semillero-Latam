import { jwtDecode } from "jwt-decode";

export function decodeJWT({ token }) {
  const decodedToken = jwtDecode(token);
  return decodedToken;
}
