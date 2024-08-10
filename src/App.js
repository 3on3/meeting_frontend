import React from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./config/route-config";
import { ModalProvider } from "./context/ModalContext";

function App() {
  return (
    <ModalProvider>
      <RouterProvider router={router} />
    </ModalProvider>
  );
}

export default App;
