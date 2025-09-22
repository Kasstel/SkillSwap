import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  onlyUnAuth?: boolean;
  children?: React.ReactElement;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  onlyUnAuth = false,
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    if (!onlyUnAuth && !isAuthenticated) {
      navigate("/login", { state: { from: location }, replace: true });
    } else if (onlyUnAuth && isAuthenticated) {
      const from = location.state?.from || "/";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, location, onlyUnAuth]);

  if (isLoading) {
    return <div>Загрузка данных...</div>;
  }

  if ((onlyUnAuth && !isAuthenticated) || (!onlyUnAuth && isAuthenticated)) {
    return children;
  }

  return null;
};
