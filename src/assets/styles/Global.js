import { createGlobalStyle } from "styled-components";

import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "./font.css";
import "./icon.css";

const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
 }
 .container{
     max-width: 1366px;
     width: 100%;
     margin: 0 auto;
 }
 ul{
     list-style: none;
 }

`;

export default GlobalStyle;
