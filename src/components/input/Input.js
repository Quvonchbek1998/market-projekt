import React, { useState } from "react";
import styled from "styled-components";
import { v4 } from "uuid";

export default function Input({ type = "text", label, ...props }) {
  const uuid = v4();
  const [hide, setHide] = useState(true);

  function toggleHide() {
    setHide((p) => !p);
  }

  return (
    <StyledInput>
      {label && (
        <label className="form-label" htmlFor={uuid}>
          {label}
        </label>
      )}
      <div className="input__wrapper">
        <input
          className="form-control"
          type={hide ? type : "text"}
          id={uuid}
          {...props}
        />
        {type === "password" && (
          <i
            className={"icon icon-password-" + (hide ? "close" : "open")}
            onClick={toggleHide}
          />
        )}
      </div>
    </StyledInput>
  );
}

const StyledInput = styled.div`
  & > .input__wrapper {
    position: relative;

    input {
      padding: 8px 15px;
      font-size: 18px;
      letter-spacing: 0.5px;
    }

    i {
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
    }
  }
`;
