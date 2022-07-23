import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import myAxios from "../servise/api";

import MyAxios from "../servise/api";

export const MyContext = createContext();

export default function GlobalContext({ children }) {
  const navigate = useNavigate;

  // auth
  const [auth, setAuth] = useState({
    isAuth: false,
    loading: false,
    user: null,
    token: null,
  });
  //category
  const [category, setCategory] = useState({
    list: [],
    loading: false,
  });
  //product
  const [product, setProduct] = useState({
    list: [],
    count: 0,
    loading: false,
    params: {
      limit: 5,
      page: 0,
      name: "",
      count: "",
      countType: "gt",
      category: "",
    },
  });

  function changeNameParams(v) {
    setProduct((p) => ({
      ...p,
      params: { ...p.params, name: v },
    }));
  }

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.params.page, product.params.limit]);

  function changeLimitParams(v) {
    setProduct((p) => ({
      ...p,
      params: { ...p.params, limit: v },
    }));
  }
  function changePageParams(v) {
    setProduct((p) => ({
      ...p,
      params: { ...p.params, page: v },
    }));
  }
  function changeCountParams(v) {
    setProduct((p) => ({
      ...p,
      params: { ...p.params, count: v },
    }));
  }
  function changeCountTypeParams(v) {
    setProduct((p) => ({
      ...p,
      params: { ...p.params, countType: v },
    }));
  }
  function changeCategoryParams(v) {
    setProduct((p) => ({
      ...p,
      params: { ...p.params, category: v },
    }));
  }

  // settings
  const [settings, setSettings] = useState({
    percent: [],
    loading: false,
  });

  // for auth
  async function register(data) {
    setAuth((p) => ({
      ...p,
      loading: true,
    }));
    try {
      await MyAxios.post("/auth/register", data);
      toast.success("Muvaffaqiyatli ro'yhatdan o'tdingiz !!!");
      navigate("/auth/login");
    } catch (error) {
      console.error(error);
    } finally {
      setAuth((p) => ({
        ...p,
        loading: false,
      }));
    }
  }
  async function login(data) {
    setAuth((p) => ({
      ...p,
      loading: true,
    }));
    try {
      const {
        data: { token, user },
      } = await MyAxios.post("/auth/login", data);
      setAuth((p) => ({
        ...p,
        token,
        user,
        isAuth: true,
      }));
      localStorage.setItem("TOKEN", token);
    } catch (error) {
      console.error(error);
    } finally {
      setAuth((p) => ({
        ...p,
        loading: false,
      }));
    }
  }
  async function userme() {
    setAuth((p) => ({
      ...p,
      loading: true,
    }));
    try {
      const res = await MyAxios("/auth/userme");
      setAuth((p) => ({
        ...p,
        isAuth: true,
        user: res.data.user,
        token: localStorage.getItem("TOKEN"),
      }));
    } catch (error) {
      console.error(error);
      localStorage.removeItem("TOKEN");
    } finally {
      setAuth((p) => ({
        ...p,
        loading: false,
      }));
    }
  }

  function logOut() {
    localStorage.removeItem("TOKEN");
    setAuth({
      isAuth: false,
      loading: false,
      user: null,
      token: null,
    });
  }

  // for categori
  async function getAllCategories() {
    setCategory((p) => ({
      ...p,
      loading: true,
      count: 0,
    }));
    try {
      const res = await MyAxios("/category");
      setCategory((p) => ({
        ...p,
        list: res.data.data,
        count: res.data.count,
      }));
    } catch (error) {
      console.error(error);
      setCategory((p) => ({
        ...p,
        list: [],
      }));
    } finally {
      setCategory((p) => ({
        ...p,
        loading: false,
      }));
    }
  }
  async function addCategory(name, cb) {
    setCategory((p) => ({
      ...p,
      loading: true,
    }));
    try {
      const res = await MyAxios.post("/category", { name });
      toast.success(res.data.msg);
      cb();
      getAllCategories();
    } catch (error) {
      console.error(error);
    } finally {
      setCategory((p) => ({
        ...p,
        loading: false,
      }));
    }
  }
  async function deleteCt(id) {
    setCategory((p) => ({
      ...p,
      loading: true,
    }));
    try {
      const res = await MyAxios.delete("/category/" + id);
      toast.success(res.data.msg);
      getAllCategories();
    } catch (error) {
      console.error(error);
      setCategory((p) => ({
        ...p,
        loading: false,
      }));
    }
  }
  async function editCt(id, name, cb) {
    setCategory((p) => ({
      ...p,
      loading: true,
    }));
    try {
      const res = await MyAxios.put("/category", { id, name });
      toast.success(res.data.msg);
      cb();
      getAllCategories();
    } catch (error) {
      console.error(error);
      setCategory((p) => ({
        ...p,
        loading: false,
      }));
    }
  }

  // for settings
  async function getSettings() {
    setSettings((p) => ({
      ...p,
      loading: true,
    }));

    try {
      const res = await myAxios("/config/" + auth.user.id);
      setSettings((p) => ({
        ...p,
        percent: res.data.data.percent,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setSettings((p) => ({
        ...p,
        loading: false,
      }));
    }
  }

  async function updateSettings(percent, cb) {
    setSettings((p) => ({
      ...p,
      loading: true,
    }));
    try {
      const res = await myAxios.post("/config", {
        user_id: auth.user.id,
        percent,
      });
      toast.success(res.data.msg);
      getSettings();
      cb();
    } catch (error) {
      console.error(error);
      setSettings((p) => ({
        ...p,
        loading: false,
      }));
    }
  }

  // for Products
  async function getProducts() {
    setProduct((p) => ({
      ...p,
      loading: true,
    }));

    try {
      const res = await myAxios("/product", { params: product.params });
      setProduct((p) => ({
        ...p,
        list: res.data.data,
        count: res.data.count,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setProduct((p) => ({
        ...p,
        loading: false,
      }));
    }
  }
  async function addProduct(body, cb) {
    setProduct((p) => ({
      ...p,
      loading: true,
    }));

    try {
      const res = await myAxios.post("/product", body);
      setProduct((p) => ({
        ...p,
        list: res.data.data,
        count: res.data.count,
      }));
      toast.success(res.data.msg);
      cb();
      getProducts();
    } catch (error) {
      console.error(error);
      setProduct((p) => ({
        ...p,
        loading: false,
      }));
    }
  }
  async function deleteProduct(id) {
    setProduct((p) => ({
      ...p,
      loading: true,
    }));
    try {
      const res = await myAxios.delete("/product/" + id);
      toast.success(res.data.msg);
      getProducts();
    } catch (error) {
      console.error(error);
    } finally {
      setProduct((p) => ({
        ...p,
        loading: false,
      }));
    }
  }
  async function editProduct(body, cb) {
    setProduct((p) => ({
      ...p,
      loading: true,
    }));
    try {
      const res = await myAxios.put("/product/", body);
      toast.success(res.data.msg);
      cb();
      getProducts();
    } catch (error) {
      console.error(error);
    } finally {
      setProduct((p) => ({
        ...p,
        loading: false,
      }));
    }
  }
  return (
    <MyContext.Provider
      value={{
        state: { auth, category, settings, product },
        fn: {
          register,
          login,
          userme,
          getAllCategories,
          addCategory,
          deleteCt,
          editCt,
          getSettings,
          updateSettings,
          logOut,
          getProducts,
          addProduct,
          deleteProduct,
          editProduct,
          changeCategoryParams,
          changeCountParams,
          changeCountTypeParams,
          changeLimitParams,
          changeNameParams,
          changePageParams,
        },
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
