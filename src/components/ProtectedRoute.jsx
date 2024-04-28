import { auth } from "../app/firebase";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = auth.currentUser; // Hämta nuvarande användare från Firebase

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
