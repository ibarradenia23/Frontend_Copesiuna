import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { routes } from "./common/routes";
import useAuth from "./modules/auth/hooks/useAuth";
//import AuthMiddleware from "./common/middleware/auth";
import ProtectedRoute from "./common/middleware/protectedRoute";
import { useRecoilValue } from "recoil";
import { authTokenState } from "./modules/auth/state/authAtom";
import { isTokenExpired } from "./modules/auth/utils/tokenUtils";

export const AppRouter: React.FC = () => {
  const { initializeToken, initializeUser } = useAuth();
  const token = useRecoilValue(authTokenState);


  useEffect(() => {
    // Inicializar el token al montar el componente
    initializeToken();
    initializeUser();
  }, []);
  

  return (
    <Router>
      <Routes>
        {
            <Route
            path="/"
            element={
              token && !isTokenExpired(token) ? (
                <Navigate to="/home" replace />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        }
        {routes.map((route, index) => {
          const LazyComponent = React.lazy(route.element);
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <React.Suspense>
                 {route.protected ? (
                    <ProtectedRoute element={<LazyComponent />} />
                  ) : (
                    <LazyComponent />
                  )}
                </React.Suspense>
              }
              
            />
            
          );
        })}
        
      </Routes>
    </Router>
  );
};
