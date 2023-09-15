import { FC, useState, useContext } from "react";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { motion } from "framer-motion";
import { sliderData } from "../utils/jsonData";
import { contextType } from "../types";
import { CategoryContext } from "../pages/Home";
import { NavLink } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";

interface propType {
  handleScroll: () => void;
}

const Slider: FC<propType> = ({ handleScroll }) => {
  const { setCategories } = useContext<contextType | any>(CategoryContext);
  const [curSlide, setCurSlide] = useState<number>(0);
  // console.log(categories);
  // const [X, setX] = useState("0vw");

  // useEffect(() => {
  //   setInterval(() => {
  //     nextHandler();
  //   }, 3000);
  // }, []);
  // const len: number = sliderData.length * 82;

  const prevHandler = (): void => {
    // curSlide <= 0 ? setCurSlide(0) : setCurSlide((curSlide) => curSlide + 1);
    if (curSlide <= 0) {
      setCurSlide(sliderData.length - 1);
      // setX(`${curSlide * 82}vw`);
      console.log(curSlide);
    } else {
      // setX(`${curSlide * 82}vw`);
      setCurSlide((curSlide) => curSlide - 1);
      console.log(curSlide);
    }
  };

  const nextHandler = (): void => {
    // curSlide <= 0 ? setCurSlide(0) : setCurSlide((curSlide) => curSlide + 1);
    if (curSlide >= sliderData.length - 1) {
      setCurSlide(0);
      console.log(curSlide);
    } else {
      setCurSlide((curSlide) => curSlide + 1);
      console.log(curSlide);
    }
  };

  const handleClick = (sName: string) => {
    handleScroll();
    setCategories(sName.toLowerCase());
    // productsRef.current.scrollIntoView();
  };

  return (
    <div className="flex flex-col">
      <NavLink
        to={"/usercart"}
        className="ml-auto mr-3 mt-4 flex w-fit  gap-2 rounded-xl bg-actClr p-2 px-3.5 
       font-semibold text-white shadow-sm shadow-black transition-all duration-200 hover:scale-105 hover:shadow hover:shadow-black hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200 dark:shadow-actClr dark:hover:shadow-actClr "
      >
        <span className="my-auto text-lg">
          <BsFillCartFill />
        </span>
        <span>Your Cart</span>
      </NavLink>

      <section className=" mt-3 flex h-[24rem] dark:bg-darkClr md:mt-5  md:h-[27rem]">
        <div className="flex w-[9vw] items-center justify-center">
          <button
            onClick={prevHandler}
            className="m-auto rounded-full border-2 border-secClr bg-secClr p-2 shadow shadow-black  transition-all  duration-200 hover:shadow hover:shadow-black active:scale-90 active:transition-all  active:duration-200 dark:shadow-actClr dark:hover:shadow-actClr md:p-3 md:hover:scale-[1.09]  md:active:scale-90 md:active:transition-all md:active:duration-200"
          >
            <AiOutlineArrowLeft />
          </button>
        </div>

        <div className="flex h-full w-[82vw]  overflow-hidden">
          <motion.div
            animate={{ x: `-${82 * curSlide}vw` }}
            className={` flex`}
          >
            {sliderData.map((data, i) => {
              return (
                <motion.div
                  key={i}
                  // initial={{ x: `${82 * i}vw` }}
                  className={`relative mx-[1.5vw] mb-3 grid w-[79vw] grid-cols-1 overflow-hidden rounded-lg border-2 border-priClr  bg-secClr text-white shadow-md shadow-black dark:shadow-actClr md:grid-cols-2`}
                >
                  <div
                    // animate={{ x: X }}
                    className="flex flex-col items-center justify-center gap-2 p-2  text-center md:gap-5"
                  >
                    <h1 className="text-2xl font-bold text-blue-700 md:text-3xl">
                      {data.sName}
                    </h1>
                    <p className="font-medium">{data.desc}</p>
                    <button
                      onClick={() => handleClick(data.sName)}
                      className="   flex w-fit gap-1 rounded-lg border-2  border-actClr bg-actClr p-2 text-white shadow-md shadow-black transition-all duration-200 hover:scale-105 hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200"
                    >
                      <h1>{data.btnName}</h1>
                      <span className="my-auto text-white">
                        <AiOutlineArrowRight />
                      </span>
                    </button>
                  </div>

                  <div
                    // animate={{ x: X }}
                    className="mx-auto my-auto hidden  h-[80%] w-[80%] items-center justify-center md:flex"
                  >
                    <motion.img
                      whileInView={{ y: 20 }}
                      src={data.imgSrc}
                      className="imgMotion object-cover"
                      alt=""
                    />
                  </div>

                  <div className="absolute right-2 top-1.5 font-semibold text-blue-200">
                    <span>
                      {curSlide + 1}/{sliderData.length}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div className="flex w-[9vw] items-center justify-center">
          <button
            onClick={nextHandler}
            className="my-auto rounded-full border-2 border-secClr bg-secClr p-2  text-black shadow  shadow-black
           transition-all duration-200 hover:shadow hover:shadow-black active:scale-90 active:transition-all active:duration-200 dark:shadow-actClr dark:hover:shadow-actClr md:p-3 md:hover:scale-[1.09] md:active:scale-90 md:active:transition-all md:active:duration-200"
          >
            <AiOutlineArrowRight />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Slider;
