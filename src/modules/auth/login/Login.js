import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

//
import Card from "../../../components/card/Card";
import Input from "../../../components/input/Input";
import { MyContext } from "../../../context/GlobalContext";

export default function Login() {
  const {
    fn: { login },
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
    login(data);
  }

  return (
    <StyledLogin>
      <Card>
        <form
          noValidate
          autoComplete="off"
          className="Login_form"
          onSubmit={submit}
        >
          <h2 className="text-center">Tizimga kirish !</h2>
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
            Kirish
          </button>
          <p className="mt-3">
            Tizimda mavjutemasmisiz?{" "}
            <Link to="/auth/register">Ro'yhattan o'tish</Link>
          </p>
        </form>
      </Card>
    </StyledLogin>
  );
}

const StyledLogin = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  .Login_form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 420px;
  }
`;
