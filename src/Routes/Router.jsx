import { createBrowserRouter } from "react-router";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import Home from "../pages/Home.jsx";
import PrivateRoute from "../provider/PrivateRoute.jsx";
import ForgetPass from "../pages/ForgetPass.jsx";
import MainLayout from "../layout/MainLayout.jsx";
import BookDetails from '../pages/BookDetails';
import AddBook from '../pages/AddBook';
import MyBooks from '../pages/MyBooks';
import UpdateBook from '../pages/UpdateBook';
import Profile from '../pages/Profile';
import Bookshelf from "../pages/Bookshelf.jsx";

export const Router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                index: true,
                path: '/',
                Component: Home
            },
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register
            },
            {
                path: '/forgetpass',
                Component: ForgetPass
            },
            {
                path: '/bookshelf',
                Component:Bookshelf,
            },
            {
                path: '/books/:id',
                element: <BookDetails />
            },
            {
                path: '/add-book',
                element: <PrivateRoute><AddBook /></PrivateRoute>
            },
            {
                path: '/my-books',
                element: <PrivateRoute><MyBooks /></PrivateRoute>
            },
            {
                path: '/update-book/:id',
                element: <PrivateRoute><UpdateBook /></PrivateRoute>
            },
            {
                path: '/profile',
                element: <PrivateRoute><Profile /></PrivateRoute>
            },


        ]
    },
    {
        path: '/*',
        element: <ErrorPage></ErrorPage>
    }
])