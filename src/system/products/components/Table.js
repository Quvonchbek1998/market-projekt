import React from "react";
import styled from "styled-components";

export default function Table({
  list,
  deleteProduct,
  changeCurProd,
  onOpen,
  percent,
  count,
  params,
}) {
  function onDelete(id) {
    deleteProduct(id);
  }

  function calcPercentValue(price, percent) {
    return Math.floor(price * (1 + percent / 100));
  }

  return (
    <Styledtable>
      <table className="table  ">
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nom</th>
            <th scope="col">Kategoriya</th>
            <th scope="col">Son</th>
            <th scope="col">Narx</th>
            {percent.map((i) => (
              <th key={i}>{i} %</th>
            ))}
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((i, idx) => (
            <tr key={i._id}>
              <th scope="row">{idx + 1 + params.limit * params.page}</th>
              <td>{i.name}</td>
              <td>{i.category?.name ?? "-"}</td>
              <td>{i.count}</td>
              <td>{i.price}</td>
              {percent.map((j) => (
                <td key={j}>{calcPercentValue(i.price, j)}</td>
              ))}
              <td>
                <div className="d-flex  gap-3 ">
                  <i
                    className="icon icon-edit"
                    onClick={() => {
                      changeCurProd(i);
                      onOpen();
                    }}
                  />
                  <i
                    className="icon icon-delete"
                    onClick={() => onDelete(i._id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Styledtable>
  );
}

const Styledtable = styled.div`
  table {
    th,
    td {
      border: 0.5px solid #212529;
    }
  }
`;
