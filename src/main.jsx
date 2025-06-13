import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import AuthProvider from './provider/AuthProvider.jsx'
import { Router } from './Routes/Router.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
    <ToastContainer />
   <RouterProvider router={Router} ></RouterProvider>
   </AuthProvider>
  </StrictMode>,
)