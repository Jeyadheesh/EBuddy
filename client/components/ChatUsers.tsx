import { FC, useEffect, useState } from "react";
import profile from "../src/assets/profile.png";
import axios from "axios";
import { chatPropsType, userSchema } from "../types";
import Loader from "../components/Loader";
import { Buffer } from "buffer";
import { SERVER_URL } from "../src/Constants";

const ChatUsers: FC<chatPropsType> = ({ userId, setUserId, mobile }) => {
  const [lists, setLists] = useState<userSchema[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const renderData = async () => {
    setIsLoading(true);
    try {
      const resData = await axios.get(`${SERVER_URL}/admin/userdetails`);
      const resdata = resData.data;
      // setUserId(resdata.userDatas[0]._id);
      // setUserId(res)
      console.log(resdata.userDatas);
      if (resdata.length == 0) {
        // setIsLoading(false);
      } else {
        setLists(resdata.userDatas);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("UserId :", userId);

  useEffect(() => {
    renderData();
  }, []);

  const handleUserId = (list: userSchema) => {
    setUserId({
      userId: list._id,
      userImg: list.profileImgId?.profileImg,
      userName: list.name,
    });
    // setMobile(true);
    // renderData();
  };

  return (
    <div
      className={`${
        mobile ? (userId != null ? "hidden" : "flex-col") : ""
      } mt-[1rem] h-full w-10/12 flex-col overflow-auto rounded-lg border-2 border-priClr  shadow shadow-gray-600 dark:shadow-actClr md:w-3/12`}
    >
      <div className="ml-0 flex h-[4rem] items-center justify-center rounded-t-lg bg-secClr text-xl font-semibold text-white">
        <h1 className="">Users</h1>
      </div>

      {/* User lists */}
      {isLoading ? (
        <Loader />
      ) : (
        <ul className=" ">
          {lists.map((list, i) => {
            return (
              <li
                onClick={() => handleUserId(list)}
                key={i}
                className={`${
                  userId?.userId == list._id
                    ? "bg-priClr text-slate-100 hover:bg-priClr hover:opacity-90"
                    : "hover:bg-actClr"
                } dark:priClr flex  cursor-pointer gap-x-2 border-b-[1px] border-priClr px-2 py-2.5 transition-all duration-200  dark:text-slate-100`}
              >
                <div className="my-auto">
                  {!list.profileImgId?.profileImg ? (
                    <img
                      src={profile}
                      alt=""
                      className=" h-12 w-12 rounded-full bg-slate-300 shadow shadow-black ring-2 ring-priClr dark:shadow-actClr dark:ring-actClr md:h-10 md:w-10 lg:h-12 lg:w-12 "
                    />
                  ) : (
                    <img
                      src={`data:${
                        list.profileImgId?.profileImg.contentType
                      };base64,${Buffer.from(
                        list.profileImgId?.profileImg.data
                      ).toString("base64")}`}
                      alt=""
                      className=" h-12 w-12 rounded-full bg-slate-300 shadow shadow-black ring-2 ring-priClr dark:shadow-actClr dark:ring-actClr md:h-10 md:w-10 lg:h-12 lg:w-12 "
                    />
                  )}
                </div>
                <div className="my-auto ml-1 flex flex-col overflow-hidden whitespace-nowrap font-bold lg:text-lg">
                  <h1>{list.name}</h1>
                  {/* <p className="text-sm">Online</p> */}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ChatUsers;
