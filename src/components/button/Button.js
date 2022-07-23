import React from "react";
import styled from "styled-components";
import { css } from "styled-components";

export default function Button({ children, ...props }) {
  return (
    <StyledBtn type="button" {...props}>
      {children}
    </StyledBtn>
  );
}

const StyledBtn = styled.div`
  cursor: pointer;
  background: #18a0fb;
  border: 2px solid #ffffff;
  box-shadow: 0px 0px 10px rgba(24, 160, 251, 0.4);
  border-radius: 20px;
  color: #fff;
  padding: 8px 72px;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;

  ${({ chp }) =>
    chp &&
    css`
      box-shadow: none;
      background: #fcfcfc;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      border: 1px solid #2b2b2b;
      color: #2b2b2b;
    `}
  ${({ cancel }) =>
    cancel &&
    css`
      background: #fcdfde;
      box-shadow: 0px 0px 10px #fcdfde;
      color: #d14e4e;
    `}
     ${({ auth }) =>
    auth &&
    css`
      background: #ffffff;
      border: 1px solid #18a0fb;
      border-radius: 20px;
      font-weight: 500;
      font-size: 18px;
      line-height: 27px;
      color: #000000;
      padding: 17px;
    `}
`;
