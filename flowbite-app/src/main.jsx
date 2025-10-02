import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Provider from "./routes/providers.jsx";
import EditableTable from "./routes/consents.jsx"
import ProviderTable from './routes/providerTable.jsx';
import PolicyTable from './routes/policyTable.jsx';
import ConsentTable from './routes/consentTable.jsx';
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
    element: <ProviderTable/>,
  },{path: "policy/:contactId",
    element: <PolicyTable />,},
    {path: "consents/:contactId",
    element: <ConsentTable />,}
  ]
  },
  
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>,
)
