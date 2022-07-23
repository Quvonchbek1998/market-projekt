import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

//
import Modal from "../../components/modal/Modal";
import Input from "../../components/input/Input";
import { MyContext } from "../../context/GlobalContext";

export default function Categories() {
  //consts
  const {
    state: {
      category: { loading, list, count },
    },
    fn: { getAllCategories, addCategory, deleteCt, editCt },
  } = useContext(MyContext);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [curCat, setCurCat] = useState(null);

  //useEffect
  useEffect(() => {
    getAllCategories();
  }, []);

  //fuctions
  function toggleModal() {
    setModal((p) => !p);
  }

  function cb() {
    setModal(false);
    setName("");
  }

  function onAddCategory(e) {
    e.preventDefault();
    addCategory(name, cb);
  }

  function deleteCategory(id) {
    deleteCt(id);
  }

  function changeCurCat(item) {
    setCurCat(item);
    setModal(true);
    setName(item.name);
  }

  function closeChangeModal() {
    setCurCat(null);
    setModal(false);
    setName("");
  }

  function onEditCategory(e) {
    e.preventDefault();
    editCt(curCat._id, name, closeChangeModal);
  }

  if (loading) return <h1>Loading...</h1>;

  return (
    <StyledCategories className="container">
      <h1 className="text-center">Kategoriyalar - {count}</h1>
      <div className="text-end my-3 ">
        <button type="button" className="btn btn-primary" onClick={toggleModal}>
          Kategoriya qoshish
        </button>
      </div>
      <div className="row">
        {list.map((i, idx) => (
          <div className="col-12 category__card mt-3 " key={i._id}>
            <div className="category__card__left">
              <p>{idx + 1}</p>
              <p>{i.name}</p>
            </div>
            <div className="category__card__right">
              <i className="icon icon-edit" onClick={() => changeCurCat(i)} />
              <i
                className="icon icon-delete"
                onClick={() => deleteCategory(i._id)}
              />
            </div>
          </div>
        ))}
      </div>
      {modal && (
        <Modal
          title={curCat ? "Kategoriyani o'zgartirish" : "Kategoriya qoshish"}
          onClose={closeChangeModal}
        >
          <form
            noValidate
            autoComplete="off"
            onSubmit={curCat ? onEditCategory : onAddCategory}
          >
            <Input
              label={"Name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" className="btn btn-success mt-3">
              {curCat ? "O'zgartirishni saqlash" : "Qo'shish"}
            </button>
          </form>
        </Modal>
      )}
    </StyledCategories>
  );
}

const StyledCategories = styled.div`
  padding: 20px;

  .category__card {
    background-color: grey;
    border-radius: 8px;
    padding: 10px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__left {
      display: flex;
      align-items: center;
      gap: 32px;
      p {
        margin: 0;
        font-size: 24px;
        color: #fff;
      }
    }
    &__right {
      display: flex;
      align-items: center;
      gap: 10px;

      i {
        background-color: #fff;
      }
    }
  }
`;
