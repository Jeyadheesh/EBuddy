import { FC, useEffect, useState } from "react";
import success from "../src/assets/iii5.png";
import { AiFillHome } from "react-icons/ai";
import DarkBtn from "../components/DarkBtn";
import { NavLink } from "react-router-dom";

const BuyProduct: FC = () => {
  const [isProcess, setIsProcess] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsProcess(false);
    }, 2000);
  }, []);

  return (
    <section className="flex min-h-screen items-center justify-center dark:bg-darkClr">
      {!isProcess && (
        <NavLink
          to="/"
          className="absolute left-3 top-3 z-10 rounded-full border-2  border-actClr bg-actClr  p-3 text-xl font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow hover:shadow-black hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200  dark:shadow dark:hover:shadow-actClr md:left-10 md:top-6 "
        >
          <AiFillHome />
        </NavLink>
      )}
      {/* </button> */}

      <div className="absolute right-5 top-5 z-10 md:right-10 md:top-6">
        <DarkBtn />
      </div>

      {!isProcess ? (
        <div className="flex h-4/6 w-10/12 flex-col gap-3 rounded-lg border-2 border-secClr p-2 py-5 shadow-md shadow-black dark:shadow-actClr">
          <img className="mx-auto" src={success} alt="" />

          <h1 className="text-shadow text-center text-2xl font-bold text-green-600 md:text-4xl">
            Your Product Successfully Ordered 🤩🥳
          </h1>
        </div>
      ) : (
        <div className="flex h-4/6 w-10/12 flex-col gap-3 rounded-lg border-2 border-secClr p-2 py-5 shadow-md shadow-black dark:shadow-actClr">
          <h1 className="text-shadow text-center text-2xl font-bold text-secClr md:text-4xl">
            Processing ...
          </h1>
        </div>
      )}
    </section>
  );
};

export default BuyProduct;
