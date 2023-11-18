import React from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "./Router/router";
import { ToastContainer } from 'react-toastify';

import './App.css';

function App() {

  return (
    <div className="App">
      <ToastContainer 
      position="top-right"
      autoClose={2000}
      hideProgressBar={true}
      closeOnClick
      rtl={false}
      theme="colored"
      />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
