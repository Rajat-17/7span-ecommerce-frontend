import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AuthGuard({ children }: any) {
  const { isAuthenticated, isInitialized } = useAuth();

  if (!isInitialized) {
    return <>Loading...</>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}