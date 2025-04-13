import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginForm from "./LoginForm";
import PageNotFound from "../pages/PageNotFound";
import RegisterForm from "./RegisterForm";
import AdminForm from "./AdminForm";
import HomePage from "../pages/HomePage";
import AdminPage from "../pages/AdminPage";
import TableUsers from "./TableUsers";
import CoursesList from "./CoursesList";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CourseManager from "./CourseManager";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/login" element={<LoginForm title={"Авторизируйтесь"}/>}/>
                <Route path="/register" element={<RegisterForm title={"Регистрация"} />}/>
                <Route path="/admin-login" element={<AdminForm title={"Панель администрирования"}/>}/>
                <Route path="/admin" element={<AdminPage />}>
                    <Route path="users" element={<TableUsers />}/>
                    <Route path="courses" element={<CourseManager />}/>
                    <Route path="statics" element={<TableUsers />}/>
                </Route>
                <Route path="*" element={<PageNotFound />}/>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
// import React from 'react';
// import { Route, Routes, BrowserRouter } from "react-router-dom";
// import { routes } from "../router";
//
// const AppRouter = () => {
//     return (
//         <BrowserRouter>
//             <Routes>
//                 {routes.map((route, index) => (
//                     <Route
//                         key={index}
//                         path={route.path}
//                         element={route.element}
//                     />
//                 ))}
//             </Routes>
//         </BrowserRouter>
//     );
// };
//
// export default AppRouter;