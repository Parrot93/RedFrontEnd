import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Provider from "./routes/providers.jsx";


import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import App from './App.jsx'
import Root from './routes/root.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children :[{
    path: "provider/:contactId",
    element: <Provider />,
  }]
  },
  
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>,
)
