import React, { FC, useContext, useEffect, useState } from "react";
import logo from "../src/assets/logo1.png";
import profile from "../src/assets/profile.png";
import { FiSearch, FiMenu } from "react-icons/fi";
import { HiOutlineLogout } from "react-icons/hi";
import { GrClose } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import DarkBtn from "../components/DarkBtn";
import useLogin from "../store/useLogin";
import useUser from "../store/useUser";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { CategoryContext } from "../pages/Home";
import { Buffer } from "buffer";
import checkCookie from "../utils/cookieData";
import { contextType, handleCookieType, profileImg } from "../types";
import Loader from "./Loader";
import { BsFillCartFill, BsFillChatLeftTextFill } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";

const Navbar: FC = () => {
  // const [isLogin, setIsLogin] = useState<boolean>(false);
  const { isLogin, setIsLogin } = useLogin();
  const { userData, setUserData } = useUser();
  const [closeMenu, setcloseMenu] = useState<boolean>(true);
  const [navLoad, setNavLoad] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [prfImg, setPrfImg] = useState<profileImg | null>(null);

  const checker = async () => {
    setNavLoad(true);
    // console.log("vabta");
    const { isLogin1, coData }: handleCookieType | any = await checkCookie();
    console.log(isLogin1, coData);
    if (coData?.profileImgId) setPrfImg(coData.profileImgId?.profileImg);
    if (coData?.role == "admin") setIsAdmin(true);
    else setIsAdmin(false);
    setIsLogin(isLogin1);
    setUserData(coData);
    setNavLoad(false);
  };

  useEffect(() => {
    checker();
  }, []);

  useEffect(() => {
    console.log(prfImg);
  }, [prfImg]);

  const navigate = useNavigate();
  const {
    setIsSearch,
    setSearchVal,
    getAllData,
    searchVal,
    handleSearchClick,
  } = useContext<contextType | any>(CategoryContext);

  const notify1 = () =>
    toast.success("Logout Successful", {
      position: "top-center",
      autoClose: 3000,
      // theme: "dark",
    });
  // console.log(searchVal);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
    console.log(searchVal);
    if (e.target.value == "") {
      console.log("done bai");
      // setCategories("all");
      getAllData();
      setIsSearch(false);
    } else {
      // setIsSearch(true);
    }
  };

  // console.log("useLogin :", isLogin);
  // console.log("useUser :", userData);

  const handleLogout = async () => {
    try {
      const resData = await axios.get(`http://localhost:9000/auth/logout`, {
        withCredentials: true,
      });
      const data = resData.data;
      console.log(data);

      setIsLogin(false);
      setUserData(null);

      notify1();
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(closeMenu);

  return (
    <section
      className={` relative flex h-24 items-center justify-evenly p-3 shadow-md shadow-black dark:bg-darkClr dark:shadow-actClr md:justify-around`}
    >
      <ToastContainer newestOnTop={true} />

      {isLogin && !isAdmin && (
        <div>
          <NavLink
            to={"/chat"}
            className="group fixed bottom-3 right-3 z-10 flex w-fit gap-1 rounded-full bg-yellow-400 p-5 text-white shadow  shadow-priClr transition-all duration-200 hover:scale-110 hover:shadow-md hover:shadow-priClr active:scale-100 md:bottom-6 md:right-6"
          >
            <span className="my-auto text-2xl">
              <BsFillChatLeftTextFill />
            </span>

            <div className="cgnameinfo1 absolute -left-[9.2rem] top-[30%] w-[8.5rem] scale-0 rounded-xl bg-green-500 p-1 py-1.5 text-center font-semibold text-white transition-all duration-150 group-hover:scale-100">
              <p className="rounded-md text-sm font-semibold">
                Chat with Admin
              </p>
            </div>
          </NavLink>
        </div>
      )}

      {isLogin && isAdmin && (
        <div>
          <NavLink
            to={"/admin"}
            className="group fixed bottom-3 right-3 z-10 flex w-fit gap-1 rounded-full bg-yellow-400 p-5 text-white shadow  shadow-priClr transition-all duration-200 hover:scale-110 hover:shadow-md hover:shadow-priClr active:scale-100 md:bottom-6 md:right-6"
          >
            <span className="my-auto text-2xl">
              <RiAdminFill />
            </span>

            <div className="cgnameinfo1 absolute -left-[9.2rem] top-[30%] w-[8.5rem] scale-0 rounded-xl bg-green-500 p-1 py-1.5 text-center font-semibold text-white transition-all duration-150 group-hover:scale-100">
              <p className="rounded-md text-sm font-semibold">
                Go To Admin Page
              </p>
            </div>
          </NavLink>
        </div>
      )}

      <div className="borde-2 w-2/6  justify-center gap-1.5 border-black md:flex md:w-1/3 md:gap-3">
        <img
          src={logo}
          alt=""
          className=" h-12 w-12  rounded-full shadow-md shadow-black dark:shadow-actClr md:h-[4.5rem] md:w-[4.5rem] "
        />
        <div className="my-auto">
          <h1 className="text-shadow mt-1 text-xl font-bold text-priClr md:mt-0 md:text-3xl">
            E - Buddy
          </h1>
        </div>
      </div>

      {navLoad ? (
        <div className="mx-auto">
          <Loader />
        </div>
      ) : (
        <div className="borde-2 flex w-4/6 justify-end gap-2 border-black md:w-2/3 md:gap-5 md:pr-5 lg:gap-6">
          <div className="relative my-auto flex rounded-full border-[3px]  border-secClr p-1 outline-none  focus-within:shadow focus-within:shadow-black hover:shadow hover:shadow-black dark:focus-within:shadow-actClr dark:hover:shadow-actClr md:px-[0.2rem] md:py-[0.1rem]">
            <input
              value={searchVal}
              onKeyUp={(e) => {
                if (e.key == "Enter") handleSearchClick();
              }}
              onChange={handleSearch}
              type="text"
              placeholder="Search..."
              className="h-full w-4/5 rounded-full bg-transparent p-1.5 font-semibold outline-none dark:text-actClr md:px-2.5 md:py-2"
            />
            <div className="borde flex w-1/5 justify-end border-black">
              <button
                onClick={handleSearchClick}
                className="w-fit rounded-full border-2 border-actClr bg-actClr p-1.5 px-2 text-white transition duration-200 hover:scale-[1.02] hover:shadow hover:shadow-black active:scale-90 active:transition-all active:duration-200 dark:hover:shadow-actClr md:my-0.5 md:mr-0 md:p-1 md:px-2"
              >
                <FiSearch />
              </button>
            </div>
          </div>

          <div className="my-auto">
            <DarkBtn />
          </div>

          <button
            onClick={() => setcloseMenu(false)}
            className="text-[1.6rem] dark:text-actClr md:hidden"
          >
            <FiMenu />
          </button>

          {isLogin ? (
            <div className="flex gap-3 lg:gap-6">
              <div className="relative hidden md:block">
                <button
                  onClick={() => navigate("/userprofile")}
                  className="group relative flex w-fit flex-col items-center  gap-2 text-sm font-semibold text-priClr"
                >
                  {prfImg ? (
                    <img
                      src={`data:${prfImg.contentType};base64,${Buffer.from(
                        prfImg.data
                      ).toString("base64")}`}
                      alt=""
                      className="h-10 w-10 rounded-full bg-slate-300 shadow shadow-black ring-2 ring-priClr dark:shadow-actClr dark:ring-actClr"
                    />
                  ) : (
                    <img
                      src={profile}
                      alt=""
                      className="h-10 w-10 rounded-full bg-slate-300 shadow shadow-black ring-2 ring-priClr dark:shadow-actClr dark:ring-actClr"
                    />
                  )}
                  <h1>{userData?.name}</h1>

                  <div className="cgnameinfo absolute bottom-[-2.5rem] z-[10] w-[5rem] scale-0 rounded-xl bg-secClr p-1 py-1.5 text-center font-semibold text-white transition-all duration-150 group-hover:scale-100">
                    <p className="rounded-md text-sm font-semibold">Profile</p>
                  </div>
                </button>
              </div>

              <button
                onClick={handleLogout}
                className="fon group relative my-auto hidden text-[1.6rem] dark:text-white md:block"
              >
                <HiOutlineLogout />
                <div className="cgnameinfo absolute -left-7 bottom-[-3rem] z-[10] w-[5rem] scale-0 rounded-xl bg-secClr p-1 py-1.5 text-center font-semibold text-white transition-all duration-150 group-hover:scale-100">
                  <p className="rounded-md text-sm font-semibold">Logout</p>
                </div>
              </button>
            </div>
          ) : (
            <NavLink
              to={"/login"}
              className="my-auto hidden rounded-xl bg-secClr px-3.5 py-2.5 font-semibold 
       text-white shadow-sm shadow-black transition-all duration-200 hover:scale-110 hover:shadow hover:shadow-black hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200 dark:shadow-actClr dark:hover:shadow-actClr md:block "
            >
              Login
            </NavLink>
          )}

          {!isLogin && (
            <NavLink
              to={"/signup"}
              className="my-auto hidden rounded-xl bg-actClr p-2 py-2.5  font-semibold
           text-white shadow-sm shadow-black transition-all duration-200 hover:scale-110 hover:shadow hover:shadow-black hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200 dark:shadow-actClr dark:hover:shadow-actClr md:block"
            >
              Sign up
            </NavLink>
          )}
        </div>
      )}

      {/* Menu */}

      <motion.div
        // initial={{ x: "0" }}
        // animate={{ x: `${closeMenu ? "" : 0}` }}
        className={`${
          closeMenu ? "translate-x-[100vw]" : "translate-x-[0vw]"
        }  fixed left-0 top-0 z-10 min-h-screen min-w-full transition-all duration-300 md:hidden`}
      >
        <div className="ml-auto flex min-h-screen w-2/3 flex-col items-center justify-center gap-5 bg-slate-200 px-2 opacity-100">
          {isLogin ? (
            <div className="borde flex w-full flex-col items-center justify-center gap-3 border-black">
              <button
                onClick={() => navigate("/userprofile")}
                className="group relative flex flex-col items-center gap-2 text-lg font-semibold text-priClr"
              >
                {prfImg ? (
                  <img
                    src={`data:${prfImg.contentType};base64,${Buffer.from(
                      prfImg.data
                    ).toString("base64")}`}
                    alt=""
                    className="h-20 w-20 rounded-full bg-slate-300 ring-2 ring-priClr"
                  />
                ) : (
                  <img
                    src={profile}
                    alt=""
                    className="h-20 w-20 rounded-full bg-slate-300 ring-2 ring-priClr"
                  />
                )}
                <h1 className="text-xl font-bold ">{userData?.name} </h1>
                <div className="cgnameinfo absolute bottom-[-2.5rem] left-1 z-[10] w-[5rem] scale-0 rounded-xl bg-secClr p-1 py-1.5 text-center font-semibold text-white transition-all duration-150 group-hover:scale-100">
                  <p className="rounded-md text-sm font-semibold">Profile</p>
                </div>
              </button>

              <button
                onClick={() => navigate("/userprofile")}
                className="flex w-fit  gap-2 rounded-xl bg-secClr p-2 px-3.5 
       font-semibold text-white shadow-sm shadow-black transition-all duration-200 hover:scale-105 hover:shadow hover:shadow-black hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200 dark:shadow-actClr dark:hover:shadow-actClr "
              >
                <span className="my-auto text-lg">
                  <CgProfile />
                </span>
                <span>Your Profile</span>
              </button>

              <button
                onClick={() => navigate("/usercart")}
                className="flex w-fit  gap-2 rounded-xl bg-actClr p-2 px-3.5 
       font-semibold text-white shadow-sm shadow-black transition-all duration-200 hover:scale-105 hover:shadow hover:shadow-black hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200 dark:shadow-actClr dark:hover:shadow-actClr "
              >
                <span className="my-auto text-lg">
                  <BsFillCartFill />
                </span>
                <span>Your Cart</span>
              </button>

              <button
                onClick={() => handleLogout()}
                className="flex gap-1 rounded-xl bg-secClr  p-2
           px-6 font-semibold text-white shadow-sm shadow-black transition-all duration-200 hover:scale-110 hover:shadow hover:shadow-black hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200 dark:shadow-actClr dark:hover:shadow-actClr"
              >
                <span className="my-auto text-xl">
                  <HiOutlineLogout />
                </span>
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("login")}
              className=" h-fit w-fit rounded-xl bg-secClr  px-3 py-2 font-semibold 
       text-white shadow-sm shadow-black transition-all duration-200 hover:scale-110 hover:shadow hover:shadow-black hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200 dark:shadow-actClr dark:hover:shadow-actClr "
            >
              Login
            </button>
          )}

          {!isLogin && (
            <button
              onClick={() => navigate("signup")}
              className="h-fit w-fit rounded-xl bg-actClr px-2   py-2 font-semibold
           text-white shadow-sm shadow-black transition-all duration-200 hover:scale-110 hover:shadow hover:shadow-black hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200 dark:shadow-actClr dark:hover:shadow-actClr "
            >
              Sign up
            </button>
          )}

          <button
            onClick={() => setcloseMenu(true)}
            className="fixed right-5 top-5 rounded-full border-2 border-actClr bg-actClr p-2  text-white transition duration-200 hover:scale-[1.02] hover:shadow hover:shadow-black active:scale-90 active:transition-all active:duration-200 dark:hover:shadow-actClr"
          >
            <GrClose />
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Navbar;
