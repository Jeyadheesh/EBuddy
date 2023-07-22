import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { handleCookieType, productType } from "../types";
import { motion } from "framer-motion";
import {
  AiFillStar,
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiFillHome,
} from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { FaMoneyBillWave } from "react-icons/fa";
import DarkBtn from "../components/DarkBtn";
import Loader from "../components/Loader";
import useLogin from "../store/useLogin";
import useUser from "../store/useUser";
import { ToastContainer, toast } from "react-toastify";
import checkCookie from "../utils/cookieData";

const ProductDetails = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState<productType | null>();
  const [itemCount, setItemCount] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const { isLogin, setIsLogin } = useLogin();
  const { userData, setUserData } = useUser();

  useEffect(() => {
    const checker = async () => {
      const { isLogin1, coData }: handleCookieType | any = await checkCookie();
      console.log(isLogin1, coData);
      setIsLogin(isLogin1);
      setUserData(coData);

      const resData = await axios.get(`http://localhost:9000/products/${id}`);
      const resdata = resData.data;
      setProductData(resdata);
      setIsLoading(false);
      console.log(resdata);
    };
    checker();
  }, []);

  const handleClick = () => {
    itemCount <= 1 ? setItemCount(1) : setItemCount(itemCount - 1);
  };

  const notify1 = (msg: string) =>
    toast.success(msg, {
      position: "top-center",
      autoClose: 3000,
      // theme: "dark",
    });

  const buyProductHandle = async () => {
    if (isLogin) {
      const val = confirm(
        `Total Price : ${
          Number(productData?.price) * itemCount
        } \nAre you sure to buy product ? `
      );
      if (val) {
        const resData = await axios.post(
          "http://localhost:9000/usercart/buyOneProduct",
          {
            userEmail: userData?.email,
            userName: userData?.name,
            productId: productData?.id,
            title: productData?.title,
            price: productData?.price,
            description: productData?.description,
            image: productData?.image,
            quantity: itemCount,
          }
        );
        const resdata = resData.data;
        console.log(resdata);

        if (resdata.status == "noerr") {
          navigate("/orderproduct");
        }
      }
    } else {
      navigate("/signup");
    }
  };

  const addToCart = async () => {
    if (isLogin) {
      const resData = await axios.post("http://localhost:9000/usercart/", {
        userEmail: userData?.email,
        userName: userData?.name,
        productId: productData?.id,
        title: productData?.title,
        price: productData?.price,
        description: productData?.description,
        image: productData?.image,
        quantity: itemCount,
      });
      const resdata = resData.data;
      console.log(resdata);

      if (resdata.status == "noerr") {
        notify1(resdata.msg);
      }
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden border-priClr dark:bg-darkClr md:border-4	">
      <h1 className="text-shadow my-3 text-center text-3xl font-bold text-priClr ">
        Product Details
      </h1>

      <NavLink
        to={"/usercart"}
        className="ml-auto mr-3 mt-2 flex w-fit  gap-2 rounded-xl bg-actClr p-2 px-3.5 
       font-semibold text-white shadow-sm shadow-black transition-all duration-200 hover:scale-105 hover:shadow hover:shadow-black hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200 dark:shadow-actClr dark:hover:shadow-actClr "
      >
        <span className="my-auto text-lg">
          <BsFillCartFill />
        </span>
        <span>Your Cart</span>
      </NavLink>

      <ToastContainer newestOnTop={true} />

      <NavLink
        to="/"
        className="absolute left-3 top-2 z-10 rounded-full border-2  border-actClr bg-actClr  p-3 text-xl font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow hover:shadow-black hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200  dark:shadow dark:hover:shadow-actClr md:left-10 md:top-6 "
      >
        <AiFillHome />
      </NavLink>

      <div className="absolute right-3 top-3 md:right-10 md:top-6">
        <DarkBtn />
      </div>

      {isLoading && <Loader />}

      {!isLoading && (
        <div>
          <div className="mx-auto  mt-3 grid w-11/12  grid-cols-1 justify-center  rounded-lg border-2  border-priClr  bg-gray-100 p-3 py-4 shadow-md shadow-black dark:bg-gray-300 dark:shadow-actClr md:h-3/4 md:w-9/12 md:grid-cols-2">
            <div className="flex items-center justify-center overflow-hidden">
              <img
                src={productData?.image}
                className=" borde-2  h-4/5 w-2/3 border-black object-contain "
                alt=""
              />
            </div>

            {/*  */}
            <div className="flex flex-col md:gap-2">
              <div className="mt-2 text-xl font-semibold text-priClr md:text-2xl ">
                {productData?.title}
              </div>
              <div className="text-sm md:text-[0.9rem]  ">
                {productData?.description}
              </div>
              {/* <div>{productData?.}</div> */}
              <h1 className="mt-2 text-2xl font-bold text-actClr md:text-3xl">
                ${productData?.price}
              </h1>
              <div className=" mt-2 flex items-center">
                <span className="text-2xl">
                  <AiFillStar fill="gold" />
                </span>
                <p className="ml-1 text-lg font-bold text-gray-900 ">
                  {productData?.rating.rate}
                </p>
                <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400"></span>
                <span className="text-sm  font-semibold text-gray-900">
                  {productData?.rating.count} reviews
                </span>
              </div>

              {/*  */}
              <div className="inline-flex gap-3">
                <button
                  onClick={handleClick}
                  className="  mt-2 rounded-full border-2 border-actClr text-2xl text-white transition duration-200 hover:scale-[1.02] hover:shadow hover:shadow-black active:scale-90 active:transition-all active:duration-200"
                >
                  <AiFillMinusCircle fill="#5EBAB0" />
                </button>
                <h1 className="my-auto text-lg font-semibold">{itemCount}</h1>
                <button
                  onClick={() => setItemCount(itemCount + 1)}
                  className="  mt-2 rounded-full border-2 border-actClr text-2xl text-white transition duration-100 hover:scale-[1.02] hover:shadow hover:shadow-black active:scale-90 active:transition-all active:duration-100"
                >
                  <AiFillPlusCircle fill="#5EBAB0" />
                </button>
              </div>

              {/*  */}
              <div className="mt-4 flex gap-5">
                <button
                  onClick={addToCart}
                  className="flex  gap-2 rounded-xl bg-secClr p-2 px-3.5 
       font-semibold text-white shadow-sm shadow-black transition-all duration-200 hover:scale-110 hover:shadow hover:shadow-black hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200 dark:shadow-actClr dark:hover:shadow-actClr "
                >
                  <span className="my-auto text-lg">
                    <BsFillCartFill />
                  </span>
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={buyProductHandle}
                  className="flex gap-2 rounded-xl bg-actClr p-2 px-4  font-semibold
           text-white shadow-sm shadow-black transition-all duration-200 hover:scale-110 hover:shadow hover:shadow-black hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200  dark:shadow-actClr dark:hover:shadow-actClr "
                >
                  <span className="my-auto text-lg">
                    <FaMoneyBillWave />
                  </span>
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mb-10 mt-5">
            <h1 className="text-shadow my-5 text-center text-3xl font-bold text-priClr ">
              Customers Review
            </h1>

            <div className="borde-2 mx-auto grid grid-cols-1 gap-y-5 border-black md:w-10/12  md:grid-cols-2 md:gap-y-8">
              {productData?.review.length != 0 ? (
                productData?.review.map((lii, ii) => {
                  return (
                    <motion.div
                      key={ii}
                      initial={{ x: -100 }}
                      whileInView={{ x: 0 }}
                      className="md:10/12 mx-auto flex w-11/12 flex-col gap-1 rounded-lg  border-2 border-secClr bg-slate-100 p-3 shadow shadow-black dark:bg-slate-300 dark:shadow-actClr lg:w-3/4"
                    >
                      <h1 className="text-center text-xl font-semibold text-priClr">
                        {lii.title}
                      </h1>
                      <div className="flex ">
                        <span className="my-auto text-2xl">
                          <AiFillStar fill="gold" />
                        </span>
                        <p className="ml-1 text-lg font-bold text-gray-900 ">
                          {" "}
                          {lii.rating}
                        </p>
                      </div>
                      <p className="text-sm font-medium">{lii.message}</p>
                      <h1 className="text-right text-sm font-semibold">
                        - {lii.userId == userData?._id ? "You😄" : lii.userName}
                      </h1>
                    </motion.div>
                  );
                })
              ) : (
                <div className="mt-2 grid px-5 text-center text-xl font-semibold text-red-500 md:col-start-1 md:col-end-3 md:text-2xl ">
                  Recent Customer Review Not Found 😶{" "}
                  {/* {productData.review.length} */}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
