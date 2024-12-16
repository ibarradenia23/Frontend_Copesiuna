import React, { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from "./common/routes";
import useAuth from "./modules/auth/hooks/useAuth";
//import AuthMiddleware from "./common/middleware/auth";

export const AppRouter:React.FC = () => {
    const { initializeToken } = useAuth();

    useEffect(() => {
        // Inicializar el token al montar el componente
        initializeToken();
    }, [initializeToken]);
    return(
        <Router>
            
            <Routes>
                {
                    routes.map((route,index)=>(
                        <Route key={index} path={route.path} element={
                          <React.Suspense >
                             {React.createElement(React.lazy(route.element))}
                          </React.Suspense>
                        }/>
                      ))
                }
            </Routes>
        </Router>
    )
}