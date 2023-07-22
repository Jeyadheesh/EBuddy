import { useEffect, useState } from "react";
import ChatBox from "./ChatBox";
import ChatUsers from "./ChatUsers";
import { chatUserType } from "../types";
import { motion } from "framer-motion";

const AdminChat = () => {
  const [userId, setUserId] = useState<chatUserType | null>(null);
  const [mobile, setMobile] = useState<boolean>(false);
  // console.log(window.innerWidth);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  // const [isLoading, setIsLoading] = useState<boolean | any>(true);

  useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    // console.log(windowWidth);
    console.log("Mobile : ", mobile);
    if (windowWidth < 768) setMobile(true);
    else setMobile(false);

    return () => {
      window.removeEventListener("resize", () =>
        setWindowWidth(window.innerWidth)
      );
    };
  }, [windowWidth]);

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="borde  inline-flex h-[78vh] w-full items-center justify-center  border-red-600"
    >
      <ChatUsers
        userId={userId}
        setUserId={setUserId}
        setMobile={setMobile}
        mobile={mobile}
      />
      <ChatBox
        setMobile={setMobile}
        setUserId={setUserId}
        userId={userId}
        mobile={mobile}
      />
    </motion.div>
  );
};

export default AdminChat;
