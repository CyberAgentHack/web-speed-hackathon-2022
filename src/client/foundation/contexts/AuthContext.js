import axios from "axios";
import { setupCache } from "axios-cache-adapter";
import React, { useCallback, useContext, useMemo, useState } from "react";

/**
 * @typedef AuthContextValues
 * @property {object | null} user
 * @property {(user: object) => void} setUser
 */

/** @type {React.Context<AuthContextValues>} */
const AuthContext = React.createContext({
  setUser: () => {
    throw new Error("AuthContext value is not set");
  },
  user: null,
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        setUser,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const { user } = useContext(AuthContext);

  const res = useMemo(
    () => ({
      loggedIn: user != null,
      user,
    }),
    [user],
  );

  return res;
};
const cache = setupCache({
  maxAge: 5 * 1000,
});

export const useRegister = () => {
  const { setUser, user } = useContext(AuthContext);
  const register = useCallback(async () => {
    const res = await axios.get("/api/users/me", { adapter: cache.adapter });
    setUser(res.data);
  }, [setUser]);

  const update = useCallback(async () => {
    const { data } = await axios.get("/api/users/me", {
      adapter: cache.adapter,
      headers: { "x-app-userid": user.id },
      responseType: "json",
    });
    setUser(data);
  }, [setUser, user]);

  return { register, update };
};
