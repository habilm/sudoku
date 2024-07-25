import { createContext } from "react";

export type TypeCurrentUser = {
  full_name?: string;
  token?: string;
};
export type TypeCurrentUserContext = {
  currentUser: TypeCurrentUser;
  setCurrentUser: (u: TypeCurrentUser) => void;
  logOut: () => void;
};
const userD: TypeCurrentUser = JSON.parse(
  window.localStorage.getItem("_u") || "[]"
);

export const CurrentUser = await createContext<TypeCurrentUserContext>({
  currentUser: userD,
  setCurrentUser: (u) => {
    u;
  },
  logOut: () => {},
});
