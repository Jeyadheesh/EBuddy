import { NavLink } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import { AiFillHome } from "react-icons/ai";
import DarkBtn from "../components/DarkBtn";

const Chat = (): JSX.Element => {
  return (
    <div className="flex h-screen flex-col items-center  justify-center  dark:bg-darkClr">
      <NavLink
        to="/"
        className="absolute left-3 top-3 z-10 rounded-full border-2  border-actClr bg-actClr  p-3 text-xl font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow hover:shadow-black hover:transition-all hover:duration-200 active:scale-100 active:transition-all active:duration-200  dark:shadow dark:hover:shadow-actClr md:left-10 md:top-6 "
      >
        <AiFillHome />
      </NavLink>
      {/* </button> */}

      <div className="absolute right-5 top-5 z-10 md:right-10 md:top-6">
        <DarkBtn />
      </div>

      <ChatBox />
    </div>
  );
};

export default Chat;
