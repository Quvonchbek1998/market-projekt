import React, { useEffect, useState } from "react";
import styled from "styled-components";

//
import MyModal from "../../../components/modal/Modal";
import Input from "../../../components/input/Input";

export default function Modal({
  onClose,
  categori__list,
  curProd,
  addProduct,
  deleteProduct,
  editProduct,
  setCurProd,
}) {
  const [data, setData] = useState({
    name: "",
    count: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    if (!curProd) return;
    setData({
      name: curProd.name,
      count: curProd.count,
      price: curProd.price,
      category: curProd.category?._id || " ",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function changeData(e) {
    const { name, value } = e.target;
    setData((p) => ({
      ...p,
      [name]: value,
    }));
  }

  function onAddProduct(e) {
    e.preventDefault();
    addProduct(data, cb);
  }

  function cb() {
    setData({
      name: "",
      count: "",
      price: "",
      category: "",
    });
    onClose();
  }

  function onEditProd(e) {
    e.preventDefault();
    editProduct({ ...data, id: curProd._id }, editCb);
  }
  function editCb() {
    cb();
    setCurProd(null);
  }
  return (
    <MyModal
      title={curProd ? "Maxsulotni tahrirlash" : "Mahsolot qo'shish"}
      onClose={() => {
        onClose();
        setCurProd(null);
      }}
    >
      <StyledForm
        noValidate
        autoComplete="off"
        onSubmit={curProd ? onEditProd : onAddProduct}
      >
        <Input
          label={"Nom"}
          name="name"
          value={data.name}
          onChange={changeData}
        />
        <section>
          <label> Kategoriya </label>
          <select
            className="form-select"
            name="category"
            value={data.category}
            onChange={changeData}
          >
            <option value="">Tanlang</option>
            {categori__list.map((i) => (
              <option key={i._id} value={i._id}>
                {i.name}
              </option>
            ))}
          </select>
        </section>
        <Input
          label={"Son"}
          name="count"
          value={data.count}
          onChange={changeData}
        />
        <Input
          label={"Narx"}
          name="price"
          value={data.price}
          onChange={changeData}
        />
        <footer className="d-flex justify-content-end my-3 ">
          <button type="submit" className="btn btn-primary">
            {curProd ? "O'zgartirish" : "Qo'shish"}
          </button>
        </footer>
      </StyledForm>
    </MyModal>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  section {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;
