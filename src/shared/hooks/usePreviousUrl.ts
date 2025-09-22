import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const usePreviousUrl = () => {
  const location = useLocation();

  useEffect(() => {
    // Сохраняем текущий URL как предыдущий при каждом изменении маршрута
    const currentPath = location.pathname;

    // Не сохраняем URL страниц логина и регистрации как предыдущий
    if (!currentPath.includes("/login") && !currentPath.includes("/reg")) {
      sessionStorage.setItem("previousUrl", currentPath);
    }
  }, [location]);

  const getPreviousUrl = (): string => {
    return sessionStorage.getItem("previousUrl") || "/";
  };

  const clearPreviousUrl = (): void => {
    sessionStorage.removeItem("previousUrl");
  };

  return { getPreviousUrl, clearPreviousUrl };
};
