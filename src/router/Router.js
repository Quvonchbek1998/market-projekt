import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import SysLayout from "../layouts/SysLayout";

// pages
import Register from "../modules/auth/register/Register";
import Login from "../modules/auth/login/Login";
import { MyContext } from "../context/GlobalContext";
import Categories from "../system/categories/Categories";
import Settings from "../system/settings/Settings";
import Products from "../system/products/Products";

export default function Router() {
  const {
    state: {
      auth: { isAuth, loading },
    },
    fn: { userme },
  } = useContext(MyContext);

  useEffect(() => {
    userme();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  if (isAuth)
    return (
      <Routes>
        <Route path="system" element={<SysLayout />}>
          <Route path="categories" element={<Categories />} />
          <Route path="settings" element={<Settings />} />
          <Route path="product" element={<Products />} />
        </Route>
        <Route path="*" element={<Navigate to={"/system/product"} />} />
      </Routes>
    );

  return (
    <Routes>
      <Route path="auth">
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="*" element={<Navigate to={"/auth/login"} />} />
    </Routes>
  );
}
