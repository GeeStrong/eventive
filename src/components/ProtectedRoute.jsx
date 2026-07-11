import { Navigate } from "react-router";
import { useApp } from "../context/AppContext";

/* Redirects to /login if no user is signed in. */
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useApp();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
