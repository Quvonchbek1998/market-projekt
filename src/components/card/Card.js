import React from "react";
import styled from "styled-components";

export default function Card({ children }) {
  return <StyledCard>{children}</StyledCard>;
}

const StyledCard = styled.div`
  background-color: #fff;
  box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
  padding: 20px 32px;
  border-radius: 10px;
`;
