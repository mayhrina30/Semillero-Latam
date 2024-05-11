import { createContext, useState } from "react";

export const UserToken = createContext();

export function TokenProvider({ children }) {
  const [token, setToken] = useState();
  return (
    <UserToken.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </UserToken.Provider>
  );
}
