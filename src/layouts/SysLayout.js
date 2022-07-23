import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

//
import StyledSysNavbar from "../components/system-navmar/SystemNavbar";

export default function SysLayout() {
  return (
    <StyledSysLayout>
      <StyledSysNavbar />
      <Outlet />
    </StyledSysLayout>
  );
}

const StyledSysLayout = styled.div``;
