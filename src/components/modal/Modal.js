import React from "react";
import styled from "styled-components";

//
import Card from "../card/Card";

export default function Modal({ title, children, onClose }) {
  return (
    <StyledModal>
      <main>
        <Card>
          <div className="card__title">
            <h1>{title}</h1>
            <button
              type="button"
              className="btn btn-outline-info"
              onClick={onClose}
            >
              X
            </button>
          </div>
          <div>{children}</div>
        </Card>
      </main>
    </StyledModal>
  );
}
const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00000040;
  backdrop-filter: blur(4px);
  .card__title {
    display: flex;
    align-items: center;
    gap: 20px;
  }
`;
