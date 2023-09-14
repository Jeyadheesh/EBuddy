import { FC, useEffect, useState } from "react";
import profile from "../src/assets/profile.png";
import { NavLink, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import DarkBtn from "../components/DarkBtn";
import { BsFillCartFill } from "react-icons/bs";
import { RiEditBoxLine } from "react-icons/ri";
import useUser from "../store/useUser";
import useLogin from "../store/useLogin";
import { handleCookieType } from "../types";
import { FaUserEdit } from "react-icons/fa";
import checkCookie from "../utils/cookieData";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
// import { imagefrombuffer } from "imagefrombuffer";
import { Buffer } from "buffer";
import Loader from "../components/Loader";
import { HiOutlineLogout } from "react-icons/hi";
import { userDetails1 } from "../utils/jsonData";

const UserProfile: FC = () => {
  const { isLogin, setIsLogin } = useLogin();
  const { userData, setUserData } = useUser();
  console.log("useLogin :", isLogin);
  // console.log("useUser :", userData);
  const navigate = useNavigate();
  // const [isError, setError] = useState<boolean>(true);
  const [prfImg, setPrfImg] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checker = async () => {
    setIsLoading(true);
    // console.log("vabta");
    const { isLogin1, coData }: handleCookieType | any = await checkCookie();
    console.log(isLogin1, coData);
    if (coData.email == undefined) navigate("/");
    // console.log(isLogin1, coData.profileImgId.profileImg);
    if (coData.profileImgId) setPrfImg(coData.profileImgId.profileImg);
    setIsLogin(isLogin1);
    setUserData(coData);
    setIsLoading(false);
  };

  useEffect(() => {
    checker();
  }, []);

  useEffect(() => {
    console.log(prfImg);
  }, [prfImg]);

  const notify1 = (msg: string) =>
    toast.success(msg, {
      position: "top-center",
      autoClose: 3000,
      // theme: "dark",
    });

  const notify2 = (msg: string) =>
    toast.error(msg, {
      position: "top-center",
      autoClose: 3000,
    });

  const handleProfileImg = async (e: any) => {
    let img = e.target.files[0];
    console.log(img);
    // setPrfImg(e.target.files[0]);
    const formData = new FormData();
    formData.append("email", userData?.email as string);
    formData.append("prfImg", img);

    let config = {
      headers: { "content-type": "multipart/form-data" },
    };

    if (img != undefined && img.size < 2097152) {
      // 2MB
      console.log("in");
      const resData = await axios.post(
        `https://ebuddy-server.onrender.com/auth/editprofileimg`,
        formData,
        config
      );
      const resdata = resData.data;
      console.log(resdata);
      notify1(resdata.msg);
      checker();
    } else {
      notify2("Choose a valid image within 2MB");
    }
  };

  const handleLogout = async () => {
    try {
      const resData = await axios.get(
        `https://ebuddy-server.onrender.com/auth/logout`,
        {
          withCredentials: true,
        }
      );
      const data = resData.data;
      console.log(data);

      setIsLogin(false);
      setUserData(null);

      notify1(data.msg);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(Object.keys(userDetails1[0]));

  return (
    <section className="borde-2 md:borde-4 flex min-h-screen items-center  justify-center border-priClr dark:bg-darkClr">
      <ToastContainer newestOnTop={true} />

      <NavLink
        to="/"
        className="absolute left-3 top-3 z-10 rounded-full border-2  border-actClr bg-actClr  p-3 text-xl font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow hover:shadow-black hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200  dark:shadow dark:hover:shadow-actClr md:left-10 md:top-6 "
      >
        <AiFillHome />
      </NavLink>
      {/* </button> */}

      <div className="absolute right-3 top-3 z-10 md:right-10 md:top-6">
        <DarkBtn />
      </div>

      <motion.div
        initial={{ x: -300 }}
        whileInView={{ x: 0 }}
        className=" w-11/12   rounded-lg border-priClr p-3 py-4  md:border-2 md:py-5"
      >
        <h1 className="text-shadow  mb-5 flex justify-center gap-2  text-center text-3xl font-bold text-priClr md:mb-10">
          Your Profile
        </h1>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1  md:grid-cols-2">
            <div className="  borde-2 flex flex-col items-center justify-center gap-2 border-black text-lg font-semibold text-priClr">
              <div
                // onClick={() => setPrfEdit(true)}
                className="borde-2 group relative cursor-pointer border-red-400"
              >
                {prfImg ? (
                  <img
                    src={`data:${prfImg.contentText};base64,${Buffer.from(
                      prfImg.data
                    ).toString("base64")}`}
                    alt=""
                    className=" mb-3 h-20  w-20 rounded-full  border-priClr bg-slate-300 shadow-md shadow-black ring-4 ring-secClr dark:shadow-actClr dark:ring-actClr md:mb-0 md:h-[15rem] md:w-[15rem]"
                  />
                ) : (
                  <img
                    src={profile}
                    alt=""
                    className=" mb-3 h-20  w-20 rounded-full  border-priClr bg-slate-300 shadow-md shadow-black ring-4 ring-secClr dark:shadow-actClr dark:ring-actClr md:mb-0 md:h-[15rem] md:w-[15rem]"
                  />
                )}

                <div className="absolute bottom-1 right-0  rounded-full bg-actClr p-1 px-1.5 text-xl text-priClr  md:right-2 md:px-2 md:text-3xl">
                  <FaUserEdit />
                </div>

                <div className="cgnameinfo absolute bottom-5 left-[25%] z-[10] hidden w-[6rem] scale-0 rounded-xl bg-secClr p-1 py-1.5 text-center font-semibold text-white transition-all duration-150 group-hover:scale-100 md:block">
                  <p className="rounded-md text-sm font-semibold">
                    Change Photo
                  </p>
                </div>
                <div className="absolute right-0 top-0 flex h-full justify-center">
                  <input
                    onChange={handleProfileImg}
                    className="borde z-10 mb-3 h-full  w-full cursor-pointer border-red-600  text-center text-sm font-semibold opacity-0 file:mx-auto file:mr-3 file:w-fit file:cursor-pointer file:rounded-lg file:border-2 file:border-priClr file:bg-secClr file:text-sm file:text-slate-50 dark:text-slate-100 md:mb-0 md:text-sm md:file:p-1 md:file:px-2"
                    type="file"
                    name="profileImg"
                    accept="image/*"
                    id=""
                    title=""
                  />
                </div>
              </div>

              <h1 className="mt-2 hidden text-xl md:block md:text-2xl ">
                {userData?.name}
              </h1>
            </div>

            <div className="borde-2 mt-2 flex flex-col border-black  odd:bg-slate-500 md:mt-0">
              {userDetails1.map((li, i) => {
                return (
                  <div
                    key={i}
                    className={`${
                      i == 5 && "border-b"
                    } flex   border-t border-slate-500 py-1.5   md:py-2.5`}
                  >
                    <h1 className="tex-secClr w-1/3  font-semibold capitalize dark:text-slate-400">
                      {Object.keys(li)[0]}
                    </h1>
                    <h1
                      className={`${
                        i == 1 || i == 2
                          ? "text-sm md:text-base"
                          : "text-[1.1rem]"
                      } mx-auto w-2/3 font-semibold   text-priClr dark:text-slate-200 `}
                    >
                      {userData[Object.values(li)[0]]}
                    </h1>
                  </div>
                );
              })}

              <div className="mt-4 flex flex-wrap justify-center gap-5">
                <NavLink
                  to={"/usercart"}
                  className="flex  gap-2 rounded-xl bg-secClr px-3 py-1
       font-semibold text-white shadow-sm shadow-black transition-all duration-200 hover:scale-110 hover:shadow hover:shadow-black hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200 dark:shadow-actClr dark:hover:shadow-actClr "
                >
                  <span className="my-auto text-lg">
                    <BsFillCartFill />
                  </span>
                  <span className="my-auto">Your Cart</span>
                </NavLink>

                <NavLink
                  to={"/signup"}
                  className="flex gap-2 rounded-xl bg-actClr p-2 px-4  font-semibold
           text-white shadow-sm shadow-black transition-all duration-200 hover:scale-110 hover:shadow hover:shadow-black hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200 dark:shadow-actClr dark:hover:shadow-actClr "
                >
                  <span className="my-auto text-lg ">
                    <RiEditBoxLine />
                  </span>
                  <span>Edit Profile</span>
                </NavLink>

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
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default UserProfile;
