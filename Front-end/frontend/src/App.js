import React from "react";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Inventory from "./Pages/Inventory";
import NoPageFound from "./Pages/NoPageFound";
import AuthContext from "./AuthContext";
import ProtectedWrapper from "./ProtectedWrapper";
import { useEffect, useState } from "react";
import Store from "./Pages/Store";
import Sales from "./Pages/Sales";
import PurchaseDetails from "./Pages/PurchaseDetails";

const App = () => {
  const [user, setUser] = useState("");
  const [loader, setLoader] = useState(true);
  let myLoginUser = JSON.parse(localStorage.getItem("user"));
  // console.log("USER: ",user)

  useEffect(() => {
    if (myLoginUser) {
      setUser(myLoginUser._id);
      setLoader(false);
      // console.log("inside effect", myLoginUser)
    } else {
      setUser("");
      setLoader(false);
    }
  }, [myLoginUser]);

  const signin = (newUser, callback) => {
    setUser(newUser);
    callback();
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  let value = { user, signin, signout };

  if (loader)
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>LOADING...</h1>
      </div>
    );

  return (
    <AuthContext.Provider value={value}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedWrapper>
                <Layout />
              </ProtectedWrapper>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/purchase-details" element={<PurchaseDetails />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/manage-store" element={<Store />} />
          </Route>
          <Route path="*" element={<NoPageFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;