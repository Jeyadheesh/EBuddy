import { FC, useContext } from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { CategoryContext } from "../pages/Home";
import { contextType } from "../types";

const Footer: FC = () => {
  const { lists, isSearch } = useContext<contextType | any>(CategoryContext);

  return (
    <footer
      className={`${
        isSearch && lists.length == 0 ? "absolute bottom-0 left-0 right-0" : ""
      } bg-gray-800 py-6 shadow-inner shadow-actClr dark:bg-gray-800`}
    >
      <div className="mx-auto px-4">
        <div className="flex items-center justify-around gap-2">
          <p className="text-shadow1 text-xl font-semibold text-priClr md:text-2xl ">
            Created by Jeyadheesh_N
          </p>
          <div className="flex gap-5">
            <a
              target="_blank"
              href="https://github.com/Jeyadheesh"
              className="p-2 text-gray-500 shadow shadow-actClr transition duration-200 hover:scale-[1.15] hover:text-white    active:scale-90 active:transition-all active:duration-200"
            >
              <BsGithub />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/jeyadheesh-n-65a68623a/"
              className="p-2 text-gray-500 shadow shadow-actClr transition duration-200 hover:scale-[1.15] hover:text-blue-500  active:scale-90 active:transition-all active:duration-200"
            >
              <BsLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
