import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from "./common/routes";

export const AppRouter:React.FC = () => {
    return(
        <Router>
            <Routes>
                {
                    routes.map((route,index)=>(
                        <Route key={index} path={route.path} element={
                          <React.Suspense fallback={<div>Loading...</div>}>
                             {React.createElement(React.lazy(route.element))}
                          </React.Suspense>
                        }/>
                      ))
                }
            </Routes>
        </Router>
    )
}