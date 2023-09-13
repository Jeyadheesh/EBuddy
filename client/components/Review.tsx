import axios from "axios";
import { FC, useRef, useState } from "react";
import { AiFillStar, AiOutlineClose, AiOutlineStar } from "react-icons/ai";
import useUser from "../store/useUser";
import { ToastContainer, toast } from "react-toastify";

const Review: FC<any> = ({ setIsRevOpen, revData, renderData }) => {
  const refs: any = useRef<HTMLDivElement[]>([]);
  const [isTest, setIsTest] = useState([false, false, false, false, false]);
  const [isError, setIsError] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  const { userData } = useUser();

  // useEffect(() => {
  console.log(revData);
  // }, []);

  const handleRating = (id: number) => {
    console.log(id + 1);

    setIsTest((isTest) => {
      return isTest.map((it, i) => {
        console.log(it);
        return i <= id;
      });
    });
    setRating(id + 1);
  };

  const notify1 = (msg: string) =>
    toast.success(msg, {
      position: "top-center",
      autoClose: 3000,
      // theme: "dark",
    });

  const handleEnter = async () => {
    if (title != "" && message != "" && rating != 0) {
      console.log(title, message, rating);
      setIsError(false);

      const resData = await axios.post(
        "http://localhost:9000/usercart/setreview",
        {
          productId: revData.productId,
          mainId: revData._id,
          userId: userData?._id,
          userName: userData?.name,
          title: title,
          rating: rating,
          message: message,
        }
      );
      const resdata = resData.data;
      console.log(resdata);
      renderData(userData?.email, "shipped");
      notify1(resdata.msg);
      setIsRevOpen(false);
    } else {
      // console.log(title, message, rating);
      setIsError(true);
    }
  };

  return (
    <div className="fixed top-0 z-10 flex h-screen w-screen items-center justify-center  bg-white dark:bg-darkClr">
      <ToastContainer newestOnTop={true} />
      <div className=" flex w-11/12 flex-col rounded-xl border-2 border-priClr p-5 shadow-md  shadow-black dark:shadow-actClr md:w-8/12 lg:w-4/12">
        <h1 className="text-shadow mb-2 text-center  text-3xl font-bold text-priClr ">
          Review
        </h1>

        {isError && (
          <p className="my-1 text-center text-lg font-semibold text-red-500">
            Enter All Details
          </p>
        )}

        <div className="mb-6">
          <label
            htmlFor="title"
            className="mb-2 block text-base  font-semibold text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="ti"
            className={` block w-full rounded-lg border-2  border-gray-300 bg-gray-50 p-2.5 text-base font-medium text-gray-900 outline-none hover:shadow hover:shadow-black focus:border-secClr focus:shadow focus:shadow-black focus:ring-secClr dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:hover:shadow-actClr dark:focus:border-secClr dark:focus:shadow-actClr dark:focus:ring-secClr`}
            placeholder="Give title..."
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="message"
            className="mb-2 block text-base  font-semibold text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            id="message"
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className=" block w-full rounded-lg border-2  border-gray-300 bg-gray-50 p-2.5 text-base font-medium text-gray-900 outline-none hover:shadow hover:shadow-black focus:border-secClr focus:shadow focus:shadow-black focus:ring-secClr dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:hover:shadow-actClr dark:focus:border-secClr dark:focus:shadow-actClr dark:focus:ring-secClr"
            placeholder="Leave a comment..."
          ></textarea>
        </div>

        <div className="mb-6  flex-col items-center">
          <label
            htmlFor="rating"
            className="mb-2  block font-semibold  text-gray-900 dark:text-white"
          >
            Rating
          </label>
          {/* <select
            id="rating"
            className="block w-full  rounded-lg border-2 border-gray-300  bg-gray-50 p-2.5 text-base font-semibold  text-gray-900 outline-none hover:shadow hover:shadow-black focus:border-secClr focus:shadow focus:shadow-black focus:ring-secClr dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:hover:shadow-actClr dark:focus:border-secClr dark:focus:shadow-actClr dark:focus:ring-secClr"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select> */}

          <div className=" flex gap-1 text-yellow-400">
            {[0, 1, 2, 3, 4].map((i) => {
              return (
                <button
                  key={i}
                  //   onMouseEnter={() => handleRating(i)}
                  value="ha"
                  //   data
                  //   defaultValue="f"
                  className=" text-4xl transition-all duration-200 hover:scale-110 active:scale-100"
                  onClick={() => handleRating(i)}
                  ref={(e) => (refs.current[i] = e)}
                >
                  {/* {value} */}
                  {isTest[i] ? <AiFillStar /> : <AiOutlineStar />}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleEnter}
          className=" mx-auto  h-fit w-fit rounded-xl bg-priClr  px-3 py-2 font-semibold 
       text-white shadow-sm shadow-black transition-all duration-200 hover:scale-110 hover:shadow hover:shadow-black hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200 dark:shadow-actClr dark:hover:shadow-actClr "
        >
          Enter
        </button>
      </div>

      <button
        onClick={() => setIsRevOpen(false)}
        className="absolute right-5 top-5 rounded-full border-2 border-actClr bg-actClr p-2 text-lg font-bold text-gray-100  shadow-md shadow-black transition duration-200  hover:scale-[1.05] active:scale-90    active:transition-all active:duration-200 md:right-10 md:top-10 md:text-xl"
      >
        <AiOutlineClose />
      </button>
    </div>
  );
};

export default Review;
