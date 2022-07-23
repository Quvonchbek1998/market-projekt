import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

//
import GlobalStyle from "./assets/styles/Global";
import Router from "./router/Router";
import GlobalContext from "./context/GlobalContext";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <ToastContainer />
      <GlobalContext>
        <Router />
      </GlobalContext>
    </BrowserRouter>
  );
}

export default App;
