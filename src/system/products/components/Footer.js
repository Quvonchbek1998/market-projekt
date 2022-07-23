import React from "react";
import styled from "styled-components";
import cl from "classnames";

export default function Footer({
  changeLimitParams,
  changePageParams,
  params,
  count,
}) {
  function calcPageArr() {
    let pageCount = Math.ceil(count / params.limit);

    return new Array(pageCount).fill("").map((i, idx) => idx + 1);
  }

  return (
    <StyledFooter>
      <section>
        <select
          value={params.limit}
          className="form-select"
          onChange={(e) => changeLimitParams(e.target.value)}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </section>
      <section>
        <ul className="pagination">
          {/* <li>
            <button type="button" className="btn btn-primary btn-sm ">
              Prew
            </button>
          </li> */}
          <li className="pages__number">
            {calcPageArr().map((i) => (
              <li key={i}>
                <p
                  onClick={() => changePageParams(i - 1)}
                  className={cl("", {
                    active: i - 1 === params.page,
                  })}
                >
                  {i}
                </p>
              </li>
            ))}
          </li>
          <li>
            {/* <button type="button" className="btn btn-primary btn-sm ">
              Next
            </button> */}
          </li>
        </ul>
      </section>
    </StyledFooter>
  );
}

const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;

  ul.pagination {
    display: flex;
    gap: 10px;
    align-items: center;

    .pages__number {
      display: flex;
      gap: 10px;
    }

    li p {
      margin: 0;
      border: 1px solid #000;
      padding: 2px 12px;
      border-radius: 6px;
      cursor: pointer;

      &.active {
        background-color: blue;
        color: white;
      }
    }
  }
`;
