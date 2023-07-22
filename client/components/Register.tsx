import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink, useNavigate } from "react-router-dom";
import DarkBtn from "./DarkBtn";
import axios from "axios";
import { AiFillHome } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { handleCookieType } from "../types";
import checkCookie from "../utils/cookieData";
import useLogin from "../store/useLogin";
import useUser from "../store/useUser";
import { GrClose } from "react-icons/gr";

const Register: FC = () => {
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useLogin();
  const { userData, setUserData } = useUser();
  const [isPass, setIsPass] = useState<boolean>(false);
  const [passVal, setPassVal] = useState<string>("");
  console.log("useLogin :", isLogin);
  console.log("useUser :", userData);

  useEffect(() => {
    const checker = async () => {
      const { isLogin1, coData }: handleCookieType | any = await checkCookie();
      console.log(isLogin1, coData);
      setIsLogin(isLogin1);
      isLogin1 &&
        reset({
          email: coData.email,
          address: coData.address,
          city: coData.city,
          phno: coData.phno,
          cardno: coData.cardno,
          name: coData.name,
          cvcno: coData.cvcno,
        });
      setUserData(coData);
    };
    checker();
  }, []);

  const handleCheckPass = async () => {
    console.log(passVal);
    const resData = await axios.post("http://localhost:9000/auth/passcheck", {
      email: userData?.email,
      password: passVal,
    });
    const resdata = resData.data;
    console.log(resdata);
    if (resdata.status == "noerr") {
      notify1(resdata.msg);
      reset();
      setIsPass(true);
    } else {
      notify2(resdata.msg);
    }
  };

  // let setDefaultValues = {};

  // if (!isLogin || (isLogin && isPass)) {
  //   console.log("In :", isLogin, isPass);
  //   setDefaultValues = ;
  // }

  const formSchema = z
    .object({
      email: z.string().email({
        message: "Must be a valid Email",
      }),
      password: z
        .string()
        .min(3, { message: "Password must be atleast 3 characters" }),
      conPassword: z
        .string()
        .nonempty({ message: "Confirm Password is required" }),
      address: z.string().nonempty({ message: "Address is required" }),
      city: z.string().nonempty({ message: "City is required" }),
      phno: z.number().min(1, { message: "Phone no is required" }),
      cardno: z.number().min(16, { message: "Card no must be 16 numbers" }),
      name: z.string().nonempty({ message: "Name is required" }),
      cvcno: z.number().min(3, { message: "CVC must be 3 numbers" }),
    })
    .refine((data) => data.password === data.conPassword, {
      path: ["conPassword"],
      message: "Password must be same",
    });

  type FormSchema = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    // defaultValues: {
    //   email: userData?.email,
    //   address: userData?.address,
    //   city: userData?.city,
    //   phno: userData?.phno,
    //   cardno: userData?.cardno,
    //   name: userData?.name,
    //   cvcno: userData?.cvcno,
    // },
  });

  // reset();

  const notify1 = (msg: string) =>
    toast.success(msg, {
      position: "top-center",
      autoClose: 2000,
      // theme: "dark",
    });

  const notify2 = (msg: string) =>
    toast.error(msg, {
      position: "top-center",
      autoClose: 2000,
    });

  const onSubmitHandler: SubmitHandler<FormSchema> = async (data) => {
    console.log(data);
    if (!isLogin) {
      const resData = await axios.post("http://localhost:9000/auth/register", {
        data: data,
      });
      const resdata = resData.data;
      console.log(resdata);
      if (resdata.status == "noerr") {
        notify1(resdata.msg);
        reset();

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        notify2(resdata.msg);
      }
    } else {
      const resData = await axios.put("http://localhost:9000/auth/edituser", {
        data: data,
      });
      const resdata = resData.data;
      console.log(resdata);
      if (resdata.status == "noerr") {
        notify1(resdata.msg);
        reset();

        const resData1 = await axios.post(
          "http://localhost:9000/auth/login",
          {
            data: data,
          },
          {
            withCredentials: true,
          }
        );
        const resdata1 = resData1.data;
        console.log(resdata1);

        setTimeout(() => {
          navigate("/userprofile");
        }, 1000);
      } else {
        notify2(resdata.msg);
      }
    }
  };

  const [curSlide, setCurSlide] = useState<number>(0);

  // const { scrollXProgress } = useScroll();

  // const handleSlider = () => {};
  // console.log(errors?.confirmPassword);
  return (
    <div className=" flex min-h-screen min-w-full  overflow-hidden dark:bg-darkClr dark:shadow-inner dark:shadow-actClr">
      <NavLink
        to="/"
        className="absolute left-3 top-3 z-10 rounded-full border-2  border-actClr bg-actClr  p-3 text-xl font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow hover:shadow-black hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200  dark:shadow dark:hover:shadow-actClr md:left-10 md:top-6 "
      >
        <AiFillHome />
      </NavLink>
      {/* </button> */}

      <div className="absolute right-5 top-5 z-10 md:right-10 md:top-6">
        <DarkBtn />
      </div>

      <ToastContainer newestOnTop={true} />

      {isLogin && !isPass && (
        <div className="fixed left-0 top-0 z-10 flex h-screen w-[100vw] items-center justify-center bg-slate-300 opacity-[.98] dark:bg-darkClr">
          <div className=" relative flex h-[15rem] w-10/12 items-center justify-center rounded-lg bg-secClr p-3 shadow-md shadow-actClr  dark:shadow-actClr  md:w-7/12 lg:w-4/12">
            <div className="mb-6 flex flex-col items-center justify-center gap-3">
              <label
                htmlFor="password"
                className="mb-2 block text-lg  font-semibold text-gray-900 dark:text-white"
              >
                Enter Your Password
              </label>
              <input
                type="password"
                onChange={(e) => setPassVal(e.target.value)}
                id="password"
                className={` block w-full rounded-lg border-2  border-gray-300 bg-gray-50 p-2.5 text-base font-medium text-gray-900 outline-none hover:shadow hover:shadow-black focus:border-secClr focus:shadow focus:shadow-black focus:ring-secClr dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:hover:shadow-actClr dark:focus:border-secClr dark:focus:shadow-actClr dark:focus:ring-secClr`}
                placeholder="Password"
                required
              />

              <button
                onClick={handleCheckPass}
                className=" mt-3 h-fit w-fit rounded-xl bg-priClr  px-3 py-2 font-semibold 
       text-white shadow-sm shadow-black transition-all duration-200 hover:scale-110 hover:shadow hover:shadow-black hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200 dark:shadow-actClr dark:hover:shadow-actClr "
              >
                Enter
              </button>

              <NavLink
                to={"/userprofile"}
                className="absolute right-5 top-5 rounded-full border-2 border-actClr bg-actClr p-2  text-white shadow-md shadow-black transition  duration-200 hover:scale-[1.05]    active:scale-90 active:transition-all active:duration-200 "
              >
                <GrClose />
              </NavLink>
            </div>
          </div>
        </div>
      )}

      <motion.form
        initial={{ x: 100 }}
        animate={{ x: `-${curSlide * 100}vw` }}
        className={`flex`}
      >
        {/* Buttons */}
        {/* <motion.div
          className=" fixed left-0 flex justify-between"
          initial={{ x: 100 }}
          animate={{ x: `-${curSlide * 100}vw` }}
        >
          <NavLink
            to="/"
            className="rounded-full border-2  border-actClr bg-actClr p-2 font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow hover:shadow-black hover:transition-all hover:duration-200 active:scale-100  active:transition-all active:duration-200 dark:shadow dark:hover:shadow-actClr "
          >
            hai
          </NavLink>

          <div className="">
            <DarkBtn />
          </div>
        </motion.div> */}

        {/* 1 */}
        <div className="relative flex w-[100vw] items-center justify-center ">
          <div className=" flex w-11/12 flex-col rounded-xl border-2 border-priClr p-5 shadow-md  shadow-black dark:shadow-actClr md:w-8/12 lg:w-4/12">
            <h1 className="text-shadow mb-2 text-center  text-3xl font-bold text-priClr ">
              {isLogin ? "Edit Profile" : "Register"}
            </h1>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="mb-2 block text-base  font-semibold text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                disabled={isLogin}
                type="email"
                id="email"
                className={`${
                  errors.email && "border-red-500"
                } block w-full rounded-lg border-2 border-gray-300 bg-gray-50 p-2.5 text-base font-medium text-gray-900 outline-none hover:shadow hover:shadow-black focus:border-secClr focus:shadow focus:shadow-black focus:ring-secClr disabled:cursor-not-allowed disabled:bg-slate-200 disabled:opacity-75 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:hover:shadow-actClr dark:focus:border-secClr dark:focus:shadow-actClr dark:focus:ring-secClr dark:disabled:bg-slate-500`}
                placeholder="..@..com"
                required
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 text-sm font-semibold  text-red-500">
                  {errors.email?.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="mb-2 block text-base  font-semibold text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`${
                  errors.password && "border-red-500"
                } block w-full rounded-lg border-2  border-gray-300 bg-gray-50 p-2.5 text-base font-medium text-gray-900 outline-none hover:shadow hover:shadow-black focus:border-secClr focus:shadow focus:shadow-black focus:ring-secClr dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:hover:shadow-actClr dark:focus:border-secClr dark:focus:shadow-actClr dark:focus:ring-secClr`}
                placeholder=""
                required
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-1 text-sm font-semibold  text-red-500">
                  {errors.password?.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="conPassword"
                className="mb-2 block text-base  font-semibold text-gray-900 dark:text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="conPassword"
                className={`${
                  errors.conPassword && "border-red-500"
                } block w-full rounded-lg border-2  border-gray-300 bg-gray-50 p-2.5 text-base font-medium text-gray-900 outline-none hover:shadow hover:shadow-black focus:border-secClr focus:shadow focus:shadow-black focus:ring-secClr dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:hover:shadow-actClr dark:focus:border-secClr dark:focus:shadow-actClr dark:focus:ring-secClr`}
                placeholder=""
                required
                {...register("conPassword")}
              />

              {errors?.conPassword && (
                <p className="mt-1 text-sm font-semibold  text-red-500">
                  {errors?.conPassword?.message}
                </p>
              )}
            </div>

            <div className="flex justify-center ">
              {/* <button className="   flex w-fit gap-1 rounded-lg border-2  border-secClr bg-secClr p-2 font-semibold text-white shadow-md shadow-black transition-all duration-200 hover:scale-105 hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200">
            skip
          </button> */}
              <button
                onClick={() => setCurSlide(curSlide + 1)}
                type="button"
                className="   flex w-fit gap-1 rounded-lg border-2  border-actClr bg-actClr p-2 font-semibold text-white shadow-md shadow-black transition-all duration-200 hover:scale-105 hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* 2 */}

        <div className="relative flex w-[100vw] items-center justify-center">
          {/* <div className="absolute right-10 top-10">
            <DarkBtn />
          </div> */}

          <div className=" flex w-11/12 flex-col rounded-xl border-2 border-priClr p-5 shadow-md  shadow-black dark:shadow-actClr md:w-8/12 lg:w-4/12">
            <h1 className="text-shadow mb-2 text-center  text-3xl font-bold text-priClr ">
              Address Details
            </h1>

            <div className="mb-6">
              <label
                htmlFor="address"
                className="mb-2 block text-base  font-semibold text-gray-900 dark:text-white"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                className={`${
                  errors.address && "border-red-500"
                } block w-full rounded-lg border-2  border-gray-300 bg-gray-50 p-2.5 text-base font-medium text-gray-900 outline-none hover:shadow hover:shadow-black focus:border-secClr focus:shadow focus:shadow-black focus:ring-secClr dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:hover:shadow-actClr dark:focus:border-secClr dark:focus:shadow-actClr dark:focus:ring-secClr`}
                placeholder=""
                required
                {...register("address")}
              />
              {errors.address && (
                <p className="mt-1 text-sm font-semibold  text-red-500">
                  {errors.address?.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="city"
                className="mb-2 block text-base  font-semibold text-gray-900 dark:text-white"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                className={`${
                  errors.city && "border-red-500"
                } block w-full rounded-lg border-2  border-gray-300 bg-gray-50 p-2.5 text-base font-medium text-gray-900 outline-none hover:shadow hover:shadow-black focus:border-secClr focus:shadow focus:shadow-black focus:ring-secClr dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:hover:shadow-actClr dark:focus:border-secClr dark:focus:shadow-actClr dark:focus:ring-secClr`}
                placeholder=""
                required
                {...register("city")}
              />
              {errors.city && (
                <p className="mt-1 text-sm font-semibold  text-red-500">
                  {errors.city?.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="phno"
                className="mb-2 block text-base  font-semibold text-gray-900 dark:text-white"
              >
                Phone no
              </label>
              <input
                type="number"
                id="phno"
                className={`${
                  errors.phno && "border-red-500"
                } block w-full rounded-lg border-2  border-gray-300 bg-gray-50 p-2.5 text-base font-medium text-gray-900 outline-none hover:shadow hover:shadow-black focus:border-secClr focus:shadow focus:shadow-black focus:ring-secClr dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:hover:shadow-actClr dark:focus:border-secClr dark:focus:shadow-actClr dark:focus:ring-secClr`}
                placeholder=""
                required
                {...register("phno", { valueAsNumber: true })}
              />
              {errors.phno && (
                <p className="mt-1 text-sm font-semibold  text-red-500">
                  {errors.phno?.message}
                </p>
              )}
            </div>

            <div className="flex justify-between ">
              <button
                onClick={() => setCurSlide(curSlide - 1)}
                type="button"
                className="flex w-fit gap-1 rounded-lg border-2  border-secClr bg-secClr p-2 font-semibold text-white shadow-md shadow-black transition-all duration-200 hover:scale-105 hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200"
              >
                Prev
              </button>

              <button
                onClick={() => setCurSlide(curSlide + 1)}
                type="button"
                className="flex w-fit gap-1 rounded-lg border-2  border-actClr bg-actClr p-2 font-semibold text-white shadow-md shadow-black transition-all duration-200 hover:scale-105 hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* 3 */}
        <div className="relative flex w-[100vw] items-center justify-center">
          {/* <div className="fixed right-10 top-10">
            <DarkBtn />
          </div> */}

          <div className=" flex w-11/12 flex-col rounded-xl border-2 border-priClr p-5 shadow-md  shadow-black dark:shadow-actClr md:w-8/12 lg:w-4/12">
            <h1 className="text-shadow mb-2 text-center  text-3xl font-bold text-priClr ">
              Payment Details
            </h1>

            <div className="mb-6">
              <label
                htmlFor="cardno"
                className="mb-2 block text-base  font-semibold text-gray-900 dark:text-white"
              >
                Card no
              </label>
              <input
                type="number"
                id="cardno"
                className={`${
                  errors.cardno && "border-red-500"
                } block w-full rounded-lg border-2  border-gray-300 bg-gray-50 p-2.5 text-base font-medium text-gray-900 outline-none hover:shadow hover:shadow-black focus:border-secClr focus:shadow focus:shadow-black focus:ring-secClr dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:hover:shadow-actClr dark:focus:border-secClr dark:focus:shadow-actClr dark:focus:ring-secClr`}
                placeholder=""
                required
                {...register("cardno", { valueAsNumber: true })}
              />
              {errors.cardno && (
                <p className="mt-1 text-sm font-semibold  text-red-500">
                  {errors.cardno?.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="name"
                className="mb-2 block text-base  font-semibold text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className={`${
                  errors.name && "border-red-500"
                } block w-full rounded-lg border-2  border-gray-300 bg-gray-50 p-2.5 text-base font-medium text-gray-900 outline-none hover:shadow hover:shadow-black focus:border-secClr focus:shadow focus:shadow-black focus:ring-secClr dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:hover:shadow-actClr dark:focus:border-secClr dark:focus:shadow-actClr dark:focus:ring-secClr`}
                placeholder=""
                required
                {...register("name")}
              />
              {errors.name && (
                <p className="mt-1 text-sm font-semibold  text-red-500">
                  {errors.name?.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="cvcno"
                className="mb-2 block text-base  font-semibold text-gray-900 dark:text-white"
              >
                CVC
              </label>
              <input
                type="number"
                id="cvcno"
                className={`${
                  errors.cvcno && "border-red-500"
                } block w-full rounded-lg border-2  border-gray-300 bg-gray-50 p-2.5 text-base font-medium text-gray-900 outline-none hover:shadow hover:shadow-black focus:border-secClr focus:shadow focus:shadow-black focus:ring-secClr dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:hover:shadow-actClr dark:focus:border-secClr dark:focus:shadow-actClr dark:focus:ring-secClr`}
                placeholder=""
                required
                {...register("cvcno", { valueAsNumber: true })}
              />
              {errors.cvcno && (
                <p className="mt-1 text-sm font-semibold  text-red-500">
                  {errors.cvcno?.message}
                </p>
              )}
            </div>

            <div className="flex justify-between ">
              <button
                onClick={() => setCurSlide(curSlide - 1)}
                type="button"
                className="flex w-fit gap-1 rounded-lg border-2  border-secClr bg-secClr p-2 font-semibold text-white shadow-md shadow-black transition-all duration-200 hover:scale-105 hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200"
              >
                Prev
              </button>
              <button
                onClick={handleSubmit(onSubmitHandler)}
                className="flex w-fit gap-1 rounded-lg border-2  border-actClr bg-actClr p-2 font-semibold text-white shadow-md shadow-black transition-all duration-200 hover:scale-105 hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200"
              >
                {isLogin ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </motion.form>
    </div>
  );
};

export default Register;
