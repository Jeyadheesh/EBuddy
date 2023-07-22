import React from "react";
import { IoMdSend } from "react-icons/io";
import profile from "../src/assets/profile.png";

const AdminChatBox = () => {
  return (
    <div
      className={`col-start-2 col-end-4  mt-[1rem]  hidden h-full w-8/12 flex-col rounded-lg border-2 border-priClr shadow-md shadow-gray-600 dark:shadow-actClr md:flex`}
    >
      {/* User Info */}
      <div className="flex h-[4rem] gap-4 rounded-t bg-secClr p-2 text-white shadow ">
        <div className="my-auto">
          <img
            src={profile}
            alt=""
            className="h-10 w-10 rounded-full bg-slate-300 shadow shadow-black ring-2 ring-priClr dark:shadow-actClr dark:ring-actClr"
          />
        </div>
        <div className="my-auto flex flex-col text-lg font-bold">
          <h1>asd</h1>
          {/* <p className="text-sm">Online</p> */}
        </div>
      </div>

      {/* <CreatUl /> */}

      {/* Send Message */}
      <div className="mt-auto flex gap-5  p-3">
        <input
          type="text"
          id="name"
          className={`block w-full rounded-lg border-2  border-gray-300 bg-gray-50 p-2.5 text-base font-medium text-gray-900 shadow shadow-black outline-none hover:shadow hover:shadow-black focus:border-secClr focus:shadow focus:shadow-black focus:ring-secClr dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:hover:shadow-actClr dark:focus:border-secClr dark:focus:shadow-actClr dark:focus:ring-secClr`}
          placeholder="Enter a Message ..."
        />
        <button
          // onClick={sendMsgs}
          className="rounded-[100%] border-[3px] border-actClr  bg-actClr  p-2 px-2.5 text-center  text-2xl text-white hover:scale-[1.05] hover:border-actClr hover:shadow-sm hover:shadow-black  active:scale-[1]"
        >
          <IoMdSend />
        </button>
      </div>
    </div>
  );
};

export default AdminChatBox;
