import { FC } from "react";
import DarkBtn from "../components/DarkBtn";
import { NavLink } from "react-router-dom";

const NotFound: FC = () => {
  return (
    <section className="flex h-screen flex-col items-center justify-center gap-5 dark:bg-darkClr">
      <div className="absolute right-5 top-5 z-10 md:right-10 md:top-6">
        <DarkBtn />
      </div>

      <h1 className="text-shadow text-4xl font-bold text-priClr">404 Error</h1>
      <p className="text-shadow text-xl font-bold text-priClr">
        Page Not Found
      </p>

      <NavLink
        to={"/"}
        className=" rounded-xl bg-actClr p-2  font-semibold
           text-white shadow-sm shadow-black transition-all duration-200 hover:scale-110 hover:shadow hover:shadow-black hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200 dark:shadow-actClr dark:hover:shadow-actClr "
      >
        Go to Home 😊
      </NavLink>
    </section>
  );
};

export default NotFound;
