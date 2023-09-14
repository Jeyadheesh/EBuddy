import { createContext, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import SampleProducts from "../components/SampleProducts";
import { categoriesType, contextType, productType } from "../types";
import axios from "axios";

export const CategoryContext = createContext<contextType | null>(null);

const Home = () => {
  const [categories, setCategories] = useState<categoriesType>("all");
  const [searchVal, setSearchVal] = useState<string>("");
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [lists, setLists] = useState<Array<productType>>([]);
  const [lists1, setLists1] = useState<Array<productType>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSearchClick = async (): Promise<void> => {
    setIsLoading(true);
    if (searchVal != "") {
      // await getAllData();
      setIsSearch(true);
      setCategories("all");
      console.log(lists1);
      const changedList = lists1.filter((li) => {
        console.log(li.title.includes(searchVal));
        return li.title.toLowerCase().includes(searchVal.toLowerCase());
      });
      console.log(changedList);
      setLists(changedList);
    } else {
      setIsSearch(false);
      getAllData();
    }
    setSearchVal("");
    setIsLoading(false);
  };

  // scrollRef.current.scrollTop = 0;

  const getAllData = async (): Promise<void> => {
    const resData = await axios.get(
      `https://ebuddy-server.onrender.com/products`
    );
    const resdata = resData.data;
    setLists(resdata);
    setLists1(resdata);
    setIsLoading(false);
  };

  const handleScroll = (): void => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // useEffect(() => {

  // }, [categories]);

  // console.log(isLogin);

  return (
    <div className="relative  min-h-screen dark:bg-darkClr">
      <CategoryContext.Provider
        value={{
          categories,
          setCategories,
          searchVal,
          setSearchVal,
          setIsSearch,
          lists,
          setLists,
          handleSearchClick,
          isLoading,
          setIsLoading,
          getAllData,
          isSearch,
        }}
      >
        <Navbar />
        {!isSearch && <Slider handleScroll={handleScroll} />}
        <SampleProducts scrollRef={scrollRef} handleScroll={handleScroll} />
        <Footer />
      </CategoryContext.Provider>
    </div>
  );
};

export default Home;
