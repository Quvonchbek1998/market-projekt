import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

//
import { MyContext } from "../../context/GlobalContext";

export default function SystemNavbar() {
  const {
    fn: { logOut },
  } = useContext(MyContext);

  return (
    <StyledSysNavbar className="navbar navbar-expand-lg navbar-light bg-danger container ">
      <ul>
        <li>
          <NavLink to={"/system/product"}>Product</NavLink>
        </li>
        <li>
          <NavLink to={"/system/categories"}>Categories</NavLink>
        </li>
        <li>
          <NavLink to={"/system/settings"}>Settings</NavLink>
        </li>
        <li>
          <a href="# " onClick={logOut}>
            Chiqish
          </a>
        </li>
      </ul>
    </StyledSysNavbar>
  );
}

const StyledSysNavbar = styled.nav`
  padding: 20px;
  margin-bottom: 2rem;
  ul {
    list-style: none;
    display: flex;
    gap: 20px;
    align-items: center;
    margin: 0;
    li {
      a {
        color: black;
        text-decoration: none;
        font-size: 24px;
        font-weight: 500;
      }
    }
  }
`;
