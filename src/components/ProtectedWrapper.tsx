import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

interface ProtectedWrapperProps {
  children: React.ReactNode;
}

const ProtectedWrapper: React.FC<ProtectedWrapperProps> = ({ children }) => {
  const authContext = useContext(AuthContext);

  if (authContext === null) {
    // AuthContext is not available
    return null;
  }

  return authContext.currentUser ? (
    <>{children}</>
  ) : (
    <Navigate to="/signin" replace />
  );
};

export default ProtectedWrapper;
