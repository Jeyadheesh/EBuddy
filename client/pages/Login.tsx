import { FC, useEffect } from "react";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import DarkBtn from "../components/DarkBtn";
import { AiFillHome } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import useLogin from "../store/useLogin";
import checkCookie from "../utils/cookieData";
import { handleCookieType } from "../types";

const formShcema1 = z.object({
  email: z.string().email({ message: "Must be valid Email" }),
  password: z.string().min(3, { message: "Password is required" }),
});

type FormSchema1 = z.infer<typeof formShcema1>;

const Login: FC = () => {
  const checker = async () => {
    // setIsLoading(true);
    const { coData }: handleCookieType | any = await checkCookie();
    // console.log(isLogin1, coData);
    if (coData?.email != undefined) navigate("/");
  };

  useEffect(() => {
    checker();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema1>({
    resolver: zodResolver(formShcema1),
    mode: "onChange",
  });

  const navigate = useNavigate();

  const { isLogin, setIsLogin } = useLogin();
  console.log("useLogin :", isLogin);

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

  const onSubmitHandler: SubmitHandler<FormSchema1> = async (data) => {
    console.log(data);

    const resData = await axios.post(
      "http://localhost:9000/auth/login",
      {
        data: data,
      },
      {
        withCredentials: true,
      }
    );
    const resdata = resData.data;
    console.log(resdata);

    if (resdata.status == "noerr") {
      notify1(resdata.msg);
      setIsLogin(true);
      console.log(isLogin);

      setTimeout(() => {
        navigate("/");
      }, 1000);

      // toast("🦄 Wow so easy!", {
      //   position: "top-center",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: false,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "dark",
      // });
    } else {
      notify2(resdata.msg);
    }
  };

  return (
    <>
      {/* <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
      /> */}
      <div className="relative flex min-h-screen min-w-full overflow-hidden dark:bg-darkClr dark:shadow-inner dark:shadow-actClr">
        {/* Buttons */}
        {/* <button className="w-full"> */}
        <NavLink
          to="/"
          className="absolute left-10 top-10  rounded-full border-2  border-actClr bg-actClr p-3 text-xl font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow hover:shadow-black hover:transition-all hover:duration-200 active:scale-100  active:transition-all active:duration-200 dark:shadow dark:hover:shadow-actClr "
        >
          <AiFillHome />
        </NavLink>
        {/* </button> */}

        <div className="absolute right-10 top-10">
          <DarkBtn />
        </div>

        <ToastContainer newestOnTop={true} />

        <motion.form
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          className=" borde-2 flex w-full border-red-500"
        >
          {/* 1 */}
          <div className="flex w-[100vw] items-center justify-center ">
            <div className=" flex w-11/12 flex-col rounded-xl border-2 border-priClr p-5 shadow-md  shadow-black dark:shadow-actClr md:w-8/12 lg:w-4/12">
              <h1 className="text-shadow mb-2 text-center  text-3xl font-bold text-priClr ">
                Login
              </h1>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="mb-2 block text-base  font-semibold text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className={`${
                    errors.email && "border-red-500"
                  } block w-full rounded-lg border-2  border-gray-300 bg-gray-50 p-2.5 text-base font-medium text-gray-900 outline-none hover:shadow hover:shadow-black focus:border-secClr focus:shadow focus:shadow-black focus:ring-secClr dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:hover:shadow-actClr dark:focus:border-secClr dark:focus:shadow-actClr dark:focus:ring-secClr`}
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

              <div className="mb-4 flex gap-1 text-center font-semibold">
                <h1 className="dark:text-slate-300">New user</h1>

                <h1 className="">
                  <NavLink
                    to="/signup"
                    className="text-actClr underline underline-offset-2"
                  >
                    signup now!
                  </NavLink>
                </h1>
              </div>

              <div className="flex justify-center ">
                <button
                  onClick={handleSubmit(onSubmitHandler)}
                  // type="button"
                  className="flex w-fit gap-1 rounded-lg border-2  border-actClr bg-actClr p-2 font-semibold text-white shadow-md shadow-black transition-all duration-200 hover:scale-105 hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </motion.form>
      </div>
    </>
  );
};

export default Login;
