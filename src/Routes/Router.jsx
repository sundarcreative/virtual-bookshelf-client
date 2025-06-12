import { createBrowserRouter } from "react-router";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import Home from "../pages/Home.jsx";
import PrivateRoute from "../provider/PrivateRoute.jsx";
import ForgetPass from "../pages/ForgetPass.jsx";
import MainLayout from "../layout/MainLayout.jsx";


export const Router = createBrowserRouter([
    {
        path:'/',
        Component:MainLayout,
        children:[
            {
            index:true,
            path:'/',
            Component:Home
            },
            {
                path:'/login',
                Component:Login
            },
            {
                path:'/register',
                Component:Register
            },
            {
                path:'/forgetpass',
                Component: ForgetPass
            }
    
    
    ]
    },
    {
        path:'/*',
        element:<ErrorPage></ErrorPage>
    }
])