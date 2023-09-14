import { useEffect, useRef, useState } from "react";
import profile from "../src/assets/profile.png";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import { handleCookieType, userCartType, userSchema } from "../types";
import checkCookie from "../utils/cookieData";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import useLogin from "../store/useLogin";
import useUser from "../store/useUser";
import Loader from "../components/Loader";
import { Buffer } from "buffer";

const AdminShipped = () => {
  // const [isOpen, setIsOpen] = useState<boolean>(true);
  const [userList, setUserList] = useState<userSchema[] | []>([]);
  // const [userList1, setUserList1] = useState([]);
  const [productList, setProductList] = useState<userCartType[] | []>([]);
  // const [productList1, setProductList1] = useState([]);
  const [isLists, setIsLists] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean | any>(true);
  const { setIsLogin } = useLogin();
  const { setUserData } = useUser();
  const navigate = useNavigate();
  const refs: any = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const checker = async () => {
      const { isLogin1, coData }: handleCookieType | any = await checkCookie();
      console.log(isLogin1, coData);
      setIsLogin(isLogin1);
      setUserData(coData);
      // console.log(coData.email);

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

  const testt = (userli: userSchema[], productli: userCartType[]) => {
    let arr: Array<userSchema> | [] = [];
    console.log(userli);
    userli.forEach((e) => {
      let count = 0;
      productli.forEach((ee) => {
        if (e.email == ee.userEmail) {
          // console.log(e.email);
          count += 1;
        }
      });
      if (count > 0) {
        console.log(e);
        arr = [...arr, e];
      }
    });
    console.log(arr.length);
    if (arr.length == 0) setIsLists(false);
    else setUserList(arr);
  };

  const renderData = async () => {
    // console.log("second");
    setIsLoading(true);
    try {
      const resData = await axios.get(
        `https://ebuddy-server.onrender.com/admin/updetails`
      );
      const resdata = resData.data;
      console.log(resdata);
      if (resdata.length == 0) {
        setIsLoading(false);
      } else {
        // setUserList(resdata.usersData);
        // setUserList1(resdata.usersData);
        setProductList(resdata.productsData);
        // setLists(resdata.userDatas);
        // setIsLists(true);
        testt(resdata.usersData, resdata.productsData);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOneSell = async (
    email: string,
    productId: string,
    type: string
  ) => {
    setIsLoading(true);
    try {
      const isOk = confirm(`Are you sure to ${type} the Product 😀 ?`);
      if (isOk) {
        const resData = await axios.post(
          `https://ebuddy-server.onrender.com/admin/selloneproduct`,
          {
            userEmail: email,
            productId: productId,
            type: type,
          }
        );
        const resdata = resData.data;
        console.log(resdata);

        if (resdata.status == "noerr") {
          notify1(resdata.msg);
          renderData();
        } else {
          notify2(resdata.msg);
          setIsLoading(false);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAllSell = async (email: string, type: string) => {
    setIsLoading(true);
    try {
      const isOk = confirm(`Are you sure to  ${type} All Products 😀 ?`);
      if (isOk) {
        const resData = await axios.post(
          `https://ebuddy-server.onrender.com/admin/sellallproduct`,
          {
            userEmail: email,
            type: type,
          }
        );
        const resdata = resData.data;
        console.log(resdata);

        if (resdata.status == "noerr") {
          notify1(resdata.msg);
          renderData();
        } else {
          notify2(resdata.msg);
          setIsLoading(false);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDown = (i: number) => {
    // console.log(e);
    refs.current[i].classList.toggle("hidden");
  };

  return isLoading ? (
    <Loader />
  ) : (
    <section className="mt-5 md:mt-8">
      <ToastContainer newestOnTop={true} />
      {isLists ? (
        <ul className="mx-auto  mb-8  flex w-11/12 flex-col gap-y-5 overflow-hidden md:w-11/12 md:gap-y-10 ">
          {userList.map((ulist: userSchema, i: number) => {
            return (
              <li
                key={i}
                className="w-full overflow-hidden rounded-lg border-2 border-secClr bg-slate-200 py-3 shadow-md shadow-gray-600 dark:bg-gray-600 dark:shadow-slate-600  md:p-3  md:py-3 md:pb-6"
              >
                <div className="flex flex-col  px-3 md:flex-row  md:justify-between md:px-6">
                  <div className="flex  gap-3 md:gap-4">
                    {ulist.profileImgId?.profileImg ? (
                      <img
                        src={`data:${
                          ulist.profileImgId?.profileImg.contentType
                        };base64,${Buffer.from(
                          ulist.profileImgId?.profileImg.data
                        ).toString("base64")}`}
                        alt=""
                        className="h-12 w-12 rounded-full bg-slate-300 shadow shadow-black ring-2 ring-priClr dark:shadow-actClr dark:ring-actClr md:mb-1 md:h-14 md:w-14"
                      />
                    ) : (
                      <img
                        src={profile}
                        alt=""
                        className="h-12 w-12 rounded-full bg-slate-300 shadow shadow-black ring-2 ring-priClr dark:shadow-actClr dark:ring-actClr md:mb-1 md:h-14 md:w-14"
                      />
                    )}

                    <h1 className="flex items-center text-base font-bold  text-priClr dark:text-slate-300 md:text-lg">
                      {ulist.name}
                    </h1>
                  </div>

                  <div className="mt-2 flex justify-end gap-x-4 md:gap-x-8">
                    <button
                      type="button"
                      onClick={() => handleAllSell(ulist.email, "unsell")}
                      className="my-auto flex h-fit w-fit  gap-1 rounded-xl bg-red-500 p-2 
  font-semibold text-white shadow-sm shadow-black transition-all duration-200 hover:shadow hover:shadow-black hover:transition-all hover:duration-200 active:transition-all active:duration-200 dark:shadow-actClr dark:hover:shadow-actClr md:hover:scale-110 md:active:scale-100 "
                    >
                      <span>Reject All 🙃</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAllSell(ulist.email, "sell")}
                      className="my-auto flex h-fit w-fit  gap-1 rounded-xl bg-green-500 p-2 
  font-semibold text-white shadow-sm shadow-black transition-all duration-200 hover:shadow hover:shadow-black hover:transition-all hover:duration-200 active:transition-all active:duration-200 dark:shadow-actClr dark:hover:shadow-actClr md:hover:scale-110 md:active:scale-100 "
                    >
                      <span>Sell All 💥</span>
                    </button>

                    <button
                      // key={"df"}
                      onClick={() => handleDown(i)}
                      className="hover:scale-110hover:transition-all my-auto text-3xl font-semibold text-actClr  transition-all duration-200 hover:scale-110 hover:duration-200 active:scale-100 active:transition-all active:duration-200"
                    >
                      <BsFillArrowDownCircleFill />
                    </button>
                  </div>
                </div>

                {/* SubLists */}

                <motion.div
                  ref={(el) => (refs.current[i] = el)}
                  className={`${"hidden"} transition-all duration-200 `}
                >
                  {/* SubList */}

                  {productList.map((plist, i) => {
                    return (
                      ulist.email === plist.userEmail && (
                        <div
                          key={i}
                          className="boxShadow relative mx-auto mt-4 flex h-[12.5rem] w-11/12 items-center  justify-evenly gap-3  rounded-lg border border-black bg-purple-300 p-2 shadow shadow-black transition-all duration-200 dark:bg-gray-800 md:h-[12rem] md:w-10/12 md:gap-2  "
                        >
                          <div
                            // to={`/productdetails/${data?.productId}`}
                            className=" flex w-1/3 items-center justify-center"
                          >
                            <img
                              className="borde-2  h-[10rem]   border-black object-contain "
                              src={plist.image}
                            />
                          </div>

                          <div className="borde-2 ml-2 flex h-full w-2/3 flex-col gap-1 border-black  md:gap-3">
                            <div>
                              <h1 className="text-lg font-bold leading-tight text-blue-700 dark:text-sky-500 md:text-xl">
                                {plist?.title.length > 30
                                  ? plist?.title.substring(0, 30) + "..."
                                  : plist?.title}
                              </h1>
                            </div>

                            <div className="flex gap-x-3 md:gap-x-8">
                              <h1 className="text-lg font-bold text-green-600 md:text-2xl">
                                $ {plist?.price}
                                <sub className="text-xs">/p</sub>
                              </h1>

                              <div className="my-auto flex text-sm font-semibold  text-blue-600 dark:text-secClr md:text-lg">
                                <span>Qunantity : </span>
                                <span>{plist?.quantity}</span>
                              </div>
                            </div>

                            <div className="font-semibold text-purple-700 dark:text-priClr md:text-lg">
                              <span>Payment : </span>
                              <span className="">Paid 😀</span>
                            </div>

                            <div className="flex justify-between gap-2   font-semibold text-secClr md:text-lg">
                              <button
                                type="button"
                                onClick={() =>
                                  handleOneSell(
                                    plist.userEmail,
                                    plist?._id,
                                    "unsell"
                                  )
                                }
                                className=" my-auto flex w-fit gap-x-1 rounded-xl bg-red-500 p-2 px-2 font-semibold text-white 
shadow-sm shadow-black transition-all duration-200 hover:shadow hover:shadow-black hover:transition-all hover:duration-200 active:transition-all active:duration-200 dark:shadow-actClr dark:hover:shadow-actClr md:mr-3 md:gap-1 md:p-2 md:hover:scale-110 md:active:scale-100 "
                              >
                                <span className="my-auto md:text-lg">
                                  <MdDelete />
                                </span>
                                <span>Reject</span>
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleOneSell(
                                    plist.userEmail,
                                    plist?._id,
                                    "sell"
                                  )
                                }
                                className=" flex w-fit gap-1 rounded-xl bg-actClr p-2 px-2.5 font-semibold text-white 
shadow-sm shadow-black transition-all duration-200 hover:shadow hover:shadow-black hover:transition-all hover:duration-200 active:transition-all active:duration-200 dark:shadow-actClr dark:hover:shadow-actClr md:mr-3 md:px-4 md:hover:scale-110 md:active:scale-100 "
                              >
                                <span>Sell 🤑</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    );
                  })}
                </motion.div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex h-[70vh] flex-col items-center justify-center gap-4">
          <div className="text-shadow text-center text-2xl font-bold text-green-600 md:text-4xl">
            Product List is Empty 😶
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminShipped;
