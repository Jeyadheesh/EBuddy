import { useEffect, FC, useContext, ForwardedRef } from "react";
import { AiFillStar } from "react-icons/ai";
import axios from "axios";
import { productType } from "../types";
import { CategoryContext } from "../pages/Home";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// import categoriesType from "../types";
// import {contextType} from "../pages/Home"

interface propType {
  scrollRef: ForwardedRef<HTMLDivElement>;
  handleScroll: () => void;
}

const SampleProducts: FC<propType> = ({ scrollRef, handleScroll }) => {
  const navigate = useNavigate();
  // const containerRef = useRef(null);
  const {
    categories,
    setIsSearch,
    setCategories,
    lists,
    setLists,
    isLoading,
    setIsLoading,
    getAllData,
    isSearch,
  } = useContext<any>(CategoryContext);
  // console.log(searchVal);

  const getDataByCategory = async () => {
    if (categories != "all") {
      const resData = await axios.get(
        `https://ebuddy-server.onrender.com/products/category/${categories}`
      );
      const resdata = resData.data;
      setLists(resdata);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getAllData();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getDataByCategory();
    if (categories == "all") getAllData();
  }, [categories]);

  // useEffect(() => {
  //   getAllData();
  //   lists1.filter((li) => {
  //     console.log(li.title.includes(searchVal));
  //     return li.title.indexOf(searchVal) > -1;
  //   });
  //   console.log(lists1);
  //   setLists(lists1);
  // }, [searchVal]);

  // useEffect(() => {
  //   containerRef.scrollIntoView({ behavior: 'smooth' });
  // }, [doScroll]);

  const handleAllData = () => {
    handleScroll();
    setIsSearch(false);
    setCategories("all");
    getAllData();
  };

  // console.log(lists);

  return (
    <section
      ref={scrollRef}
      className="relative mb-10  mt-2 pt-3 dark:bg-darkClr"
    >
      <h1 className="text-shadow px-1 text-center text-3xl font-bold capitalize text-priClr md:text-3xl">
        {isSearch
          ? "Filtered Products"
          : categories == "all"
          ? `${categories} Products`
          : `${categories}`}
      </h1>
      <button
        onClick={handleAllData}
        className=" my-3 mb-4 ml-auto mr-10 flex w-fit gap-1 rounded-lg border-2  border-actClr bg-actClr p-2 font-semibold text-white shadow-md shadow-black transition-all duration-200 hover:scale-105 hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200"
      >
        <h1>Go to All Produts</h1>
      </button>

      {/* Loader */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className=" shado-md mx-auto mt-3 grid w-[93vw] items-center justify-center gap-y-7 shadow-black sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {lists.map((data: productType, i: number) => {
            return (
              <motion.div
                initial={{ x: -30 }}
                whileInView={{ x: 0 }}
                onClick={() => navigate(`/productdetails/${data.id}`)}
                key={i}
                className="boxShadow relative mx-auto  flex h-[22rem] w-10/12 cursor-pointer flex-col  items-center justify-center gap-2 rounded-lg border border-black bg-gray-100 p-2  shadow shadow-black transition-all hover:scale-[1.02] active:scale-100 "
              >
                <img
                  className="h-32 w-32 object-contain "
                  src={data.image}
                  alt=""
                />
                <h1 className="text-center text-xl font-bold text-blue-600">
                  {data.title.length > 25
                    ? data.title.substring(0, 24) + "....."
                    : data.title}
                </h1>
                <p className="text-sm leading-tight">
                  {data.description.length > 100
                    ? data.description.substring(0, 98) + "....."
                    : data.description}
                </p>

                <h1 className="text-xl font-bold text-actClr">${data.price}</h1>
                <div className="flex items-center">
                  <span className="text-2xl">
                    <AiFillStar fill="gold" />
                  </span>
                  <p className="ml-1 text-sm font-bold text-gray-900 ">
                    {data.rating.rate}
                  </p>
                  <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400"></span>
                  <span className="text-sm font-medium text-gray-900">
                    {data.rating.count} reviews
                  </span>
                </div>

                {/* <div className="absolute bottom-4 right-4 text-2xl text-red-700 transition-all duration-200 hover:scale-[1.02] active:scale-100">
           <AiFillHeart />
         </div> */}
              </motion.div>
            );
          })}
        </div>
      )}
      {isSearch && lists.length == 0 && (
        <div className="text-shadow mt-5 text-center text-2xl font-bold text-rose-500 md:text-4xl">
          Search Related Product Not Found 😶
        </div>
      )}
    </section>
  );
};

export default SampleProducts;
