import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import DarkBtn from "../components/DarkBtn";
import AdminShipped from "../components/AdminShipped";
import { adminPageType } from "../types";
import UsersDetails from "../components/UsersDetails";
import AdminChat from "../components/AdminChat";

const Admin = () => {
  const [page, setPage] = useState<adminPageType>("users");

  // setPage("users");
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setPage(e.target.value as adminPageType);
    // setIsLoading(true);
    // renderData(userData.email, e.target.value);
  };

  return (
    <section className="min-h-screen overflow-hidden border-priClr dark:bg-darkClr md:border-4">
      <ToastContainer newestOnTop={true} />

      <NavLink
        to="/"
        className="absolute left-3 top-3 z-10 rounded-full border-2  border-actClr bg-actClr  p-3 text-xl font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow hover:shadow-black hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200  dark:shadow dark:hover:shadow-actClr md:left-8 md:top-3 "
      >
        <AiFillHome />
      </NavLink>
      {/* </button> */}

      <div className="absolute right-4 top-4 z-10 md:right-10 md:top-6">
        <DarkBtn />
      </div>

      <h1 className="text-shadow my-3 flex justify-center  gap-2 text-center text-3xl font-bold text-priClr">
        <span>Admin</span>
      </h1>

      <div className="h-full">
        <div>
          <div className="mt-5 flex justify-center">
            <select
              onChange={(e) => handleChange(e)}
              name="searchOption"
              id="searchOption"
              className="cursor-pointer rounded-lg border-2 border-priClr bg-secClr px-2 py-1 text-center text-base font-semibold  text-slate-100 outline-none md:px-4 md:text-lg"
            >
              <option value="users">User Details</option>
              <option value="products">Product Details</option>
              <option value="chat">Admin Chat</option>
            </select>
          </div>
          {/* {isLoading && <Loader />} */}
        </div>

        {/*  */}
      </div>

      <div className="h-[90%]">
        {page == "users" && <UsersDetails />}
        {page == "products" && <AdminShipped />}
        {page == "chat" && <AdminChat />}
      </div>
    </section>
  );
};

export default Admin;
