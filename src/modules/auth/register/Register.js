import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MyContext } from "../../../context/GlobalContext";
//
import Card from "../../../components/card/Card";
import Input from "../../../components/input/Input";

export default function Register() {
  const {
    fn: { register },
  } = useContext(MyContext);

  const [data, setData] = useState({
    name: "",
    password: "",
  });

  function changeData(e) {
    const { name, value } = e.target;
    setData((p) => ({
      ...p,
      [name]: value,
    }));
  }

  function submit(e) {
    e.preventDefault();
    register(data);
  }

  return (
    <StyledRegister>
      <Card>
        <form
          noValidate
          autoComplete="off"
          className="register_form"
          onSubmit={submit}
        >
          <h2 className="text-center">Tizimda ro'yhatan o'tish !</h2>
          <Input
            label={"Login"}
            value={data.name}
            name="name"
            onChange={changeData}
          />
          <Input
            type="password"
            label={"Parol"}
            value={data.password}
            name="password"
            onChange={changeData}
          />
          <button type="submit" className="btn btn-primary mt-3 ">
            Ro'yhattan o'tish
          </button>
          <p className="mt-3">
            Tizimda mavjutmisiz? <Link to="/auth/login">Kirish</Link>
          </p>
        </form>
      </Card>
    </StyledRegister>
  );
}

const StyledRegister = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  .register_form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 420px;
  }
`;
