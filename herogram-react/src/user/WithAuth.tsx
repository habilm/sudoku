import React, { useContext } from "react";
import { CurrentUser } from "../context";
import { Navigate } from "react-router";

type Props = {
  element: React.ReactElement;
};

export function WithAuth({ element }: Props) {
  const { currentUser } = useContext(CurrentUser);
  if (!currentUser.token) {
    return <Navigate to="/login?invalid"></Navigate>;
  } else {
    return element;
  }
}

export function WithOutAuth({ element }: Props) {
  const { currentUser } = useContext(CurrentUser);

  if (currentUser.token) {
    return <Navigate to="/play"></Navigate>;
  } else {
    return element;
  }
}
