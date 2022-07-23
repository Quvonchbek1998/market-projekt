import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { MyContext } from "../../context/GlobalContext";

//
import Table from "./components/Table";
import ProductModal from "./components/Modal";
import Filter from "./components/Filter";
import Footer from "./components/Footer";

export default function Products() {
  const {
    state: {
      product: { list, loading, count, params },
      category: { list: categori__list },
      settings: { percent },
    },
    fn: {
      getProducts,
      getAllCategories,
      addProduct,
      deleteProduct,
      editProduct,
      getSettings,
      changeCategoryParams,
      changeCountParams,
      changeCountTypeParams,
      changeNameParams,
      changeLimitParams,
      changePageParams,
    },
  } = useContext(MyContext);
  const [modal, setModal] = useState(false);
  const [curProd, setCurProd] = useState(null);

  useEffect(() => {
    getProducts();
    getAllCategories();
    getSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function changeCurProd(obj) {
    setCurProd(obj);
  }

  if (loading) return <h1>Loading...</h1>;
  return (
    <StyledProduct className="container">
      <h1 className="text-center"> Maxsulotlar - {count}</h1>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-primary my-3"
          onClick={() => setModal(true)}
        >
          Maxsulotlar qo'shish
        </button>
      </div>

      <Filter
        changeNameParams={changeNameParams}
        changeCountTypeParams={changeCountTypeParams}
        changeCountParams={changeCountParams}
        changeCategoryParams={changeCategoryParams}
        params={params}
        categori__list={categori__list}
        getProducts={getProducts}
      />

      <Table
        list={list}
        deleteProduct={deleteProduct}
        changeCurProd={changeCurProd}
        onOpen={() => setModal(true)}
        percent={percent}
        count={count}
        params={params}
      />

      <Footer
        changeLimitParams={changeLimitParams}
        changePageParams={changePageParams}
        params={params}
        count={count}
      />

      {modal && (
        <ProductModal
          onClose={() => setModal(false)}
          categori__list={categori__list}
          addProduct={addProduct}
          curProd={curProd}
          editProduct={editProduct}
          setCurProd={setCurProd}
        />
      )}
    </StyledProduct>
  );
}

const StyledProduct = styled.div`
  padding: 2rem;
`;
