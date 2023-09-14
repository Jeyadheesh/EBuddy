import { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import DarkBtn from "../components/DarkBtn";
import { FaMoneyBillWave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import useLogin from "../store/useLogin";
import useUser from "../store/useUser";
import axios from "axios";
import { cartPageType, handleCookieType, userCartType } from "../types";
import { ToastContainer, toast } from "react-toastify";
import checkCookie from "../utils/cookieData";
import Loader from "../components/Loader";
import Review from "../components/Review";

const UserCart = () => {
  const [lists, setLists] = useState<Array<userCartType>>([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRevOpen, setIsRevOpen] = useState<boolean>(false);

  const { setIsLogin } = useLogin();
  const { userData, setUserData } = useUser();
  const [total, setTotal] = useState<number>(0);
  const [isLists, setIsLists] = useState<boolean>(true);
  const [page, setPage] = useState<cartPageType>("cart");
  const [revData, setRevData] = useState<userCartType | any>({});

  useEffect(() => {
    const checker = async () => {
      const { isLogin1, coData }: handleCookieType | any = await checkCookie();
      console.log(isLogin1, coData);
      setIsLogin(isLogin1);
      setUserData(coData);
      console.log(coData.email);

      if (coData.email != undefined) await renderData(coData.email, page);
      else navigate("/");
    };
    checker();
  }, []);

  const handleTotal = (newNo: number) => {
    // let num: number = 0;
    // num = num + newNo;
    setTotal((n) => Number((n + newNo).toFixed(2)));
  };

  const renderData = async (email: string | any, pa: string) => {
    // console.log("second");
    //
    const resData = await axios.post(
      `https://ebuddy-server.onrender.com/usercart/getByEmail`,
      {
        email: email,
        page: pa,
      }
    );
    const resdata = resData.data.data;
    console.log(resdata.length);
    if (resdata.length == 0) {
      setIsLoading(false);
      setIsLists(false);
    } else {
      setLists(resdata);
      setIsLoading(false);
      setIsLists(true);
    }
  };

  // deleteproductbyid

  const handleDeleteShipped = async (id: string) => {
    const isConfirm = confirm(`Are you sure to delete product ?`);
    if (isConfirm) {
      const resData = await axios.post(
        `https://ebuddy-server.onrender.com/usercart/deleteproductbyid`,
        {
          id: id,
        }
      );

      const resdata = resData.data;
      console.log(resdata);
      if (resdata.status == "noerr") notify1(resdata.msg);

      renderData(userData?.email, page);
    } else {
      console.log("reject");
    }
  };

  const notify1 = (msg: string) =>
    toast.success(msg, {
      position: "top-center",
      autoClose: 3000,
      // theme: "dark",
    });

  const buyCartProducts = async () => {
    const isConfirm = confirm(
      `Total Price : ${total}  \nAre you sure to buy all cart products ?`
    );
    if (isConfirm) {
      const resData = await axios.post(
        `https://ebuddy-server.onrender.com/usercart/buycartproducts`,
        {
          userEmail: userData?.email,
        }
      );
      const resdata = resData.data;
      console.log(resdata);

      if (resdata.status == "noerr") {
        navigate("/orderproduct");
      }

      renderData(userData?.email, page);
    }
  };

  const handleDelete = async (id: number) => {
    const isConfirm = confirm(`Are you sure to delete product ?`);
    if (isConfirm) {
      const resData = await axios.post(
        `https://ebuddy-server.onrender.com/usercart/deleteCartProduct`,
        {
          userEmail: userData?.email,
          productId: id,
          page: page,
        }
      );

      const resdata = resData.data;
      console.log(resdata);
      if (resdata.status == "noerr") notify1(resdata.msg);

      renderData(userData?.email, page);
    } else {
      console.log("reject");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setPage(e.target.value as cartPageType);
    // setIsLoading(true);
    renderData(userData?.email, e.target.value);
  };

  const handleReview = (data: any) => {
    // console.log(data);
    setIsRevOpen(true);
    setRevData(data);
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
        <span> Cart Products</span>
      </h1>

      {isLoading && <Loader />}

      {!isLoading && (
        <div className="mt-3 flex  flex-col md:flex-row md:justify-around md:gap-3">
          <div className="ml-5 mt-3 md:mt-0">
            <select
              onChange={handleChange}
              name="searchOption"
              id="searchOption"
              className="rounded-lg border-2 border-priClr bg-secClr px-2 py-1 text-center text-base font-semibold  text-slate-100 outline-none md:px-4 md:text-lg"
            >
              <option value="cart">Your Cart</option>
              <option value="buyed">Ordered</option>
              <option value="shipped">Shipped</option>
            </select>
          </div>

          {isLists && !isLoading && page === "cart" && (
            <div className="flex justify-end gap-2 md:gap-3">
              <div
                className="  flex gap-2 text-base font-semibold  text-secClr
           dark:text-slate-200 md:text-xl "
              >
                <span className="my-auto">Total : </span>
                <span className="my-auto">$ {total}</span>
              </div>

              <button
                onClick={buyCartProducts}
                className=" mr-5 flex gap-2 rounded-xl bg-actClr p-1 px-1.5 text-lg font-semibold  text-white
           shadow shadow-black transition-all duration-200 hover:shadow-md hover:shadow-black hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200 dark:shadow-actClr dark:hover:shadow-actClr md:p-2 md:px-4 md:text-xl md:hover:scale-105 "
              >
                <span className="my-auto">
                  <FaMoneyBillWave />
                </span>
                <span>Buy Now</span>
              </button>
            </div>
          )}

          {page !== "cart" && (
            <div className="mr-5 flex justify-end">
              <div
                className="  flex gap-2 text-base font-semibold  text-secClr
           dark:text-slate-200 md:text-xl "
              >
                <span className="my-auto">Products : </span>
                <span className="my-auto">{isLists ? lists.length : 0}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Products */}

      {isLists && !isLoading ? (
        <ul className="my-5 grid grid-cols-1 gap-5 first:rounded-t-lg last:rounded-b-lg dark:bg-darkClr  md:my-8">
          {lists.map((data, i) => {
            return (
              <li
                key={i}
                onLoad={() => {
                  if (data?.isCart) handleTotal(data?.price * data?.quantity);
                }}
                className="boxShadow relative mx-auto flex h-[12.5rem] w-11/12 items-center  justify-evenly rounded-lg  border border-black bg-gray-100 p-2 shadow shadow-black transition-all  duration-200 md:h-[12rem] md:w-10/12 md:gap-2  "
              >
                <NavLink
                  to={`/productdetails/${data?.productId}`}
                  className=" flex w-1/3 items-center justify-center"
                >
                  <img
                    className="borde-2 h-[10rem]   border-black object-contain "
                    src={data?.image}
                    alt=""
                  />
                </NavLink>

                <div className="borde-2 ml-2 flex h-full w-2/3 flex-col gap-2 border-black  md:gap-3">
                  <NavLink to={`/productdetails/${data?.productId}`}>
                    <h1 className="text-lg font-bold text-blue-600 md:text-xl">
                      {data?.title?.length > 30
                        ? data?.title.substring(0, 28) + "..."
                        : data?.title}
                    </h1>
                    {page == "cart" && (
                      <p className=" text-xs leading-tight md:text-sm">
                        {data?.description.length > 60
                          ? data?.description.substring(0, 59) + "....."
                          : data?.description}
                      </p>
                    )}
                  </NavLink>

                  <div className="flex justify-between">
                    <h1 className="text-2xl font-bold text-actClr">
                      ${data?.price}
                      <sub className="text-sm">/p</sub>
                    </h1>

                    {page == "shipped" && (
                      <button
                        title="Delete"
                        onClick={() => handleDeleteShipped(data?._id)}
                        className="borde-2 mr-2 rounded-lg border-red-600 bg-red-500 p-2 text-xl text-white transition-all duration-200 hover:scale-110 active:scale-100"
                      >
                        <MdDelete />
                      </button>
                    )}
                  </div>

                  {page == "buyed" && (
                    <div className="text-lg font-semibold text-priClr">
                      <span>Status : </span>
                      <span className="">InProcess 😀</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[.93rem]  font-semibold text-secClr md:text-lg">
                    <NavLink to={`/productdetails/${data?.productId}`}>
                      <span>Quantity : </span>
                      <span>{data?.quantity}</span>
                    </NavLink>

                    {page === "shipped" && !data?.reject ? (
                      !data?.isReviewed ? (
                        <button
                          type="button"
                          onClick={() => handleReview(data)}
                          className=" flex w-fit rounded-xl bg-actClr p-2 px-2 
      font-semibold text-white shadow-sm shadow-black transition-all duration-200 hover:shadow hover:shadow-black hover:transition-all hover:duration-200 active:transition-all active:duration-200 dark:shadow-actClr dark:hover:shadow-actClr md:hover:scale-110 md:active:scale-100 "
                        >
                          <span>Give Review</span>
                        </button>
                      ) : (
                        <div
                          className="flex w-fit rounded-xl bg-green-600 p-2 px-2 
                        font-semibold text-white shadow-sm shadow-black"
                        >
                          <span className="my-auto text-xl">
                            <TiTick />
                          </span>
                          <span>Reviewed</span>
                        </div>
                      )
                    ) : (
                      ""
                    )}

                    {page !== "shipped" && (
                      <button
                        type="button"
                        onClick={() => handleDelete(data?.productId)}
                        className=" mr-3 flex w-fit gap-1 rounded-xl bg-red-500 p-2 px-2 
      font-semibold text-white shadow-sm shadow-black transition-all duration-200 hover:scale-110 hover:shadow hover:shadow-black hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200 dark:shadow-actClr dark:hover:shadow-actClr "
                      >
                        <span className="my-auto text-lg">
                          <MdDelete />
                        </span>
                        <span>{page == "cart" ? "Delete" : "UnOrder"}</span>
                      </button>
                    )}
                  </div>

                  {page === "shipped" && (
                    <div className={"text-[0.9rem] font-semibold md:text-base"}>
                      <span className=" text-priClr ">Status : </span>
                      <span
                        className={`${
                          data?.reject ? "text-red-500" : "text-green-600"
                        }`}
                      >
                        {data?.reject ? "Product Rejected😶" : "Shipped Done😄"}
                      </span>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
          {isRevOpen && (
            <Review
              isRevOpen={isRevOpen}
              setIsRevOpen={setIsRevOpen}
              revData={revData}
              renderData={renderData}
            />
          )}
        </ul>
      ) : (
        !isLoading && (
          <div className="flex h-[80vh] flex-col items-center justify-center gap-4">
            <div className="text-shadow text-center text-2xl font-bold text-green-600 md:text-4xl">
              Your cart is Empty 😶
            </div>
            <NavLink
              to={"/"}
              className=" rounded-xl bg-actClr p-2  font-semibold
         text-white shadow-sm shadow-black transition-all duration-200 hover:scale-110 hover:shadow hover:shadow-black hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200 dark:shadow-actClr dark:hover:shadow-actClr "
            >
              Shop Now 😊
            </NavLink>
          </div>
        )
      )}
    </section>
  );
};

export default UserCart;
