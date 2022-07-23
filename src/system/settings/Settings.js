import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

//
import Input from "../../components/input/Input";
import { MyContext } from "../../context/GlobalContext";

export default function Settings() {
  const {
    state: { settings },
    fn: { getSettings, updateSettings },
  } = useContext(MyContext);

  const [n, setN] = useState("");

  useEffect(() => {
    getSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function cb() {
    setN("");
  }

  function updatePercent(e) {
    e.preventDefault();
    if (n < 1 || n > 100) {
      toast.warning("1 va 100 sonlar o'ralig'idagi sonlar kirinint !!!");
      return;
    }
    if (settings.percent.includes(+n)) {
      toast.warning("Mavjut foizlarni qo'sha olmaysiz !!!");
    }
    let bodyArr = [...settings.percent, +n];
    updateSettings(bodyArr, cb);
  }

  function deletePercent(p) {
    let tempList = settings.percent.filter((i) => i !== p);
    updateSettings(tempList, cb);
  }

  if (settings.loading) return <h1>Loading...</h1>;

  return (
    <StyledSettings className="container">
      <h1 className="text-center">Foizlar</h1>
      <form noValidate autoComplete="off" onSubmit={updatePercent}>
        <div className="row">
          <div className="col-9">
            <Input value={n} onChange={(e) => setN(e.target.value)} />
          </div>
          <div className="col-3">
            <button type="submit" className="btn btn-primary w-100 ">
              Qo'shish
            </button>
          </div>
        </div>
      </form>
      <ul>
        {settings.percent.map((i) => (
          <li key={i}>
            <p>{i}</p>
            <i className="icon icon-delete" onClick={() => deletePercent(i)} />
          </li>
        ))}
      </ul>
    </StyledSettings>
  );
}

const StyledSettings = styled.div`
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 20px;

  ul {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;

    li {
      background-color: #fff;
      box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;
      display: flex;
      align-items: center;
      gap: 18px;
      padding: 8px 12px;
      border-radius: 6px;

      p {
        margin: 0;
        padding: 0;
        font-size: 24px;
      }
    }
  }
`;
