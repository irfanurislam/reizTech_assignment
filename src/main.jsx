import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import CountryList from './components/CountryList.jsx';

const router = createBrowserRouter([

  {
    path: "/",
    element: <CountryList></CountryList>,
  },
]);








ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
