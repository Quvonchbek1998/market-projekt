import React from "react";
import styled from "styled-components";
import cl from "classnames";

//
import Input from "../../../components/input/Input";

export default function Filter({
  changeCategoryParams,
  changeCountParams,
  changeNameParams,
  changeCountTypeParams,
  params,
  categori__list,
  getProducts,
}) {
  return (
    <StyledFilter>
      <div className="row">
        <div className="col-4">
          <Input
            label="Nom"
            value={params.name}
            onChange={(e) => changeNameParams(e.target.value)}
          />
        </div>
        <div className="col-4">
          <label className="mb-2">Kategoriya</label>
          <select
            className="form-select"
            value={params.category}
            onChange={(e) => changeCategoryParams(e.target.value)}
          >
            <option value="">Tanlang</option>
            {categori__list.map((i) => (
              <option key={i._id} value={i._id}>
                {i.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-4">
          <div className="count__input__wrapper ">
            <Input
              label="Son"
              value={params.count}
              onChange={(e) => changeCountParams(e.target.value)}
            />
            <div className="gte__lte__icons">
              <button
                type="button"
                className={cl("btn btn-sm", {
                  "btn-secondary": params.countType !== "gt",
                  "btn-dark": params.countType === "gt",
                })}
                onClick={() => changeCountTypeParams("gt")}
              >
                <i className="icon icon-up" />
              </button>
              <button
                type="button"
                className={cl("btn btn-sm", {
                  "btn-secondary": params.countType !== "lt",
                  "btn-dark": params.countType === "lt",
                })}
                onClick={() => changeCountTypeParams("lt")}
              >
                <i className="icon icon-down" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end my-3 ">
        <button type="button" className="btn btn-primary" onClick={getProducts}>
          Search
        </button>
      </div>
    </StyledFilter>
  );
}

const StyledFilter = styled.section`
  .count__input__wrapper {
    position: relative;

    .gte__lte__icons {
      position: absolute;
      display: flex;
      top: 54%;
      right: 10px;
      /* transform: translateY(-50%); */
      gap: 10px;

      i{
        width: 18px;
        height: 18px;
        text-align: center;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
      }
    }
  }
`;
