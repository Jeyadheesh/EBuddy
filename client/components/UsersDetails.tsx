import React, { FC, useEffect, useState } from "react";
import profile from "../src/assets/profile.png";
import { NavLink, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import useLogin from "../store/useLogin";
import useUser from "../store/useUser";
import { handleCookieType, userSchema } from "../types";
import checkCookie from "../utils/cookieData";
import axios from "axios";
import Loader from "../components/Loader";
import { Buffer } from "buffer";
import { userDetails1 } from "../utils/jsonData";

const UsersDetails: FC = () => {
  const [lists, setLists] = useState<userSchema[] | null>(null);
  const [isLists, setIsLists] = useState<boolean>(true);
  const { isLogin, setIsLogin } = useLogin();
  const [isLoading, setIsLoading] = useState<boolean | any>(true);
  const { userData, setUserData } = useUser();
  const navigate = useNavigate();


  useEffect(() => {
    const checker = async () => {
      const { isLogin1, coData }: handleCookieType | any = await checkCookie();
      console.log(isLogin1, coData);
      setIsLogin(isLogin1);
      setUserData(coData);
      console.log(coData.email);

      if (coData.role == "admin") await renderData();
      else navigate("/");
    };
    checker();
  }, []);

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

  const renderData = async () => {
    setIsLoading(true);
    try {
      const resData = await axios.get(
        "http://localhost:9000/admin/userdetails"
      );
      const resdata = resData.data;
      console.log(resdata);
      if (resdata.length == 0) {
        // setIsLoading(false);
        setIsLists(false);
      } else {
        setLists(resdata.userDatas);
        setIsLists(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (email: string) => {
    const isOk = confirm(`Are you sure to delete user : ${email}`);
    if (isOk) {
      const resData = await axios.post(
        "http://localhost:9000/admin/deleteuser",
        {
          email: email,
        }
      );
      const resdata = resData.data;
      console.log(resdata);

      if (resdata.status == "noerr") {
        notify1(resdata.msg);
        renderData();
      } else {
        notify2(resdata.msg);
      }
    }
  };

  // console.log(typeof lists?[0].profileImgId);

  return (
    <section className="mt-5 md:mt-8">
      <ToastContainer newestOnTop={true} />
      {isLoading ? (
        <Loader />
      ) : (
        <ul className="mx-auto  mb-8 grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-y-10">
          {lists?.map((list, i) => {
            return (
              <li
                key={i}
                className="mx-auto w-11/12 overflow-hidden rounded-lg border-2 border-secClr bg-slate-200 p-3 shadow-md  shadow-actClr dark:bg-gray-600 dark:shadow-slate-600 md:w-10/12"
              >
                <div className="flex justify-center">
                  {list.profileImgId?.profileImg ? (
                    <img
                      src={`data:${
                        list.profileImgId?.profileImg?.contentType
                      };base64,${Buffer.from(
                        list.profileImgId?.profileImg?.data
                      ).toString("base64")}`}
                      alt=""
                      className="mb-1 h-14 w-14 rounded-full bg-slate-300 shadow shadow-black ring-2 ring-priClr dark:shadow-actClr dark:ring-actClr"
                    />
                  ) : (
                    <img
                      src={profile}
                      alt=""
                      className="mb-1 h-14 w-14 rounded-full bg-slate-300 shadow shadow-black ring-2 ring-priClr dark:shadow-actClr dark:ring-actClr"
                    />
                  )}
                </div>

                {/*  */}
                <div className="borde-2 mt-2 flex flex-col border-black px-3">
                  {userDetails1.map((li, ii) => {
                    return (
                      <div
                        key={ii}
                        className={`${
                          ii == 5 && "border-b"
                        } flex   border-t border-slate-500 py-1.5   md:py-2.5`}
                      >
                        <h1 className="tex-secClr w-1/3   font-semibold capitalize dark:text-slate-400">
                          {Object.keys(li)[0]}
                        </h1>
                        <h1
                          className={`${
                            ii == 1 || ii == 2 ? "text-sm" : "text-[1rem]"
                          } mx-auto w-2/3 font-semibold   text-priClr dark:text-slate-200 `}
                        >
                          {list[Object.values(li)[0]]}
                        </h1>
                      </div>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => handleDelete(list.email)}
                    className="mx-auto mt-2 flex w-fit gap-1 rounded-xl bg-red-500 p-2 px-2 
    font-semibold text-white shadow-sm shadow-black transition-all duration-200 hover:scale-110 hover:shadow hover:shadow-black hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200 dark:shadow-actClr dark:hover:shadow-actClr "
                  >
                    <span className="my-auto text-lg">
                      <MdDelete />
                    </span>
                    <span>Delete</span>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default UsersDetails;
