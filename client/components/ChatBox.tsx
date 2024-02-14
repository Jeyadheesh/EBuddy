import { useState, useEffect, FC, useRef, MutableRefObject } from "react";
import { IoIosArrowBack, IoMdSend } from "react-icons/io";
import { chatMessageType, chatPropsType, handleCookieType } from "../types";
import checkCookie from "../utils/cookieData";
import useLogin from "../store/useLogin";
import useUser from "../store/useUser";
import profile from "../src/assets/profile.png";
import profile1 from "../src/assets/j3.png";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
const socket: any = io(`http://localhost:9000`);
import { Buffer } from "buffer";
import Loader from "../components/Loader";
import axios from "axios";
import { SERVER_URL } from "../src/Constants";

const ChatBox: FC<chatPropsType> = ({ userId, setUserId, mobile }) => {
  const [curMsg, setCurMsg] = useState<string>("");
  const [msgs, setMsgs] = useState<chatMessageType[] | []>([]);
  const [adminId, setAdminId] = useState<string>("");
  const [admin, setAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const setAdminn = async () => {
    const adminn = await axios.get(`${SERVER_URL}/admin/admins`);
    const admindata = adminn.data.adminData[0];
    console.log(admindata);
    setAdminId(admindata?._id);
  };

  const { setIsLogin } = useLogin();
  const { userData, setUserData } = useUser();
  // const [prfImg, setPrfImg] = useState<any>();
  const refs = useRef<MutableRefObject<HTMLDivElement[]> | [] | any>([]);

  const checker = async () => {
    setIsLoading(true);
    const { isLogin1, coData }: handleCookieType | any = await checkCookie();
    // console.log(isLogin1, coData);
    if (coData.email == undefined) navigate("/");
    // if (coData.profileImgId) setPrfImg(coData.profileImgId.profileImg);
    setIsLogin(isLogin1);
    setUserData(coData);
    setIsLoading(false);
  };

  // console.log(userId.userId);
  let a: string;

  useEffect(() => {
    checker();
    console.log(window.location.pathname);
    if (window.location.pathname == "/admin") setAdmin(true);
    else setAdmin(false);
    setAdminn();
  }, []);

  useEffect(() => {
    !admin && adminId == userData?._id && navigate("/");

    console.log(userData?._id, adminId);
    if (userData && !admin) {
      console.log("fivarudhu");
      socket.emit("joinuser", userData._id);
    }
  }, [userData, adminId]);

  // const joinAdmin = (id: string) => {
  //   socket.emit("joinuser", id);
  //   // handleReceiveData();
  // };

  useEffect(() => {
    setIsLoading(true);
    console.log("UserId IN : ", userId?.userId);
    socket.emit("joinuser", userId?.userId);
    // handleReceiveData();
    setIsLoading(false);
  }, [userId]);

  let msgFormat: chatMessageType;

  if (admin) {
    msgFormat = {
      senderId: userData?._id,
      userId: userId?.userId, // room
      // userEmail: userData.email,
      userName: userData?.name,
      message: curMsg,
      adminId: adminId,
      date: new Date(Date.now()).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      time: new Date(Date.now()).toLocaleTimeString(),
      role: userData?.role,
    };
  } else {
    msgFormat = {
      senderId: userData?._id,
      userId: userData?._id, // room
      userName: userData?.name,
      // userEmail: userData.email,
      message: curMsg,
      adminId: adminId,
      date: new Date(Date.now()).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      time: new Date(Date.now()).toLocaleTimeString(),
      role: userData?.role,
    };
  }

  const sendMsgs = () => {
    if (curMsg != "") {
      socket.emit("sendMsg", msgFormat);
      setMsgs((msgs) => [...msgs, msgFormat]);
      // autoMsgScroll();
      console.log(msgFormat);
      setCurMsg("");
    }
  };

  const autoMsgScroll = () => {
    // console.log(msgs.length);
    const curElement = refs.current[msgs.length - 1];
    curElement?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (msgs?.length != 0) autoMsgScroll();
  }, [msgs]);
  // const handleReceiveData = () => {};

  useEffect(() => {
    socket.on("receiveMsg", (data: any) => {
      if (data.length != 0) {
        setIsLoading(true);
        console.log("in");
        console.log("Data : ", data);
        console.log("Data :", data[0].userId, " : ", userId?.userId);

        if (admin) {
          console.log("Admin In 1");
          if (userId?.userId == data[0].userId && adminId != data[0].userId) {
            console.log("Admin In 2");
            setMsgs(data);
            // autoMsgScroll();
          } //else setMsgs([]);
        } else {
          console.log("User In 1");
          console.log("Data :", userData?._id, " : ", data[0].userId);
          if (userData?._id == data[0].userId) {
            console.log("User In 2");
            setMsgs(data);
            // autoMsgScroll();
          } // else setMsgs([]);
          console.log("admin ila");
        }
        // socket.emit("joinuser", );
        setIsLoading(false);
      } else {
        console.log("bas");
        setMsgs([]);
      }
    });
  }, [socket, userId, userData]);
  console.log(
    new Date(Date.now()).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  );
  // console.log(new Date(Date.now()).toLocaleTimeString());
  return (
    <div
      className={`flex ${
        admin
          ? `col-start-2  col-end-4 mt-[1rem] h-full  md:flex ${
              mobile
                ? userId != null
                  ? "flex w-11/12"
                  : "hidden"
                : "md:w-8/12 lg:w-7/12"
            }`
          : "h-4/5 w-11/12 md:w-8/12  lg:w-5/12"
      }   flex-col rounded-lg border-2 border-priClr shadow shadow-gray-600 dark:shadow-actClr`}
    >
      {/* User Info */}
      <div className="relative flex h-[4rem] gap-4 rounded-t bg-secClr p-2 text-white shadow ">
        <div className="my-auto">
          {admin ? (
            !userId?.userImg ? (
              <img
                src={profile}
                alt=""
                className="h-10 w-10 rounded-full bg-slate-300 shadow shadow-black ring-2 ring-priClr dark:shadow-actClr dark:ring-actClr"
              />
            ) : (
              <img
                src={`data:${userId.userImg.contentType};base64,${Buffer.from(
                  userId.userImg.data
                ).toString("base64")}`}
                alt=""
                className="h-10 w-10 rounded-full bg-slate-300 shadow shadow-black ring-2 ring-priClr dark:shadow-actClr dark:ring-actClr"
              />
            )
          ) : (
            <img
              src={profile1}
              alt=""
              className="h-10 w-10 rounded-full bg-slate-300 shadow shadow-black ring-2 ring-priClr dark:shadow-actClr dark:ring-actClr"
            />
          )}
        </div>
        <div className="my-auto flex flex-col text-lg font-bold">
          <h1>{admin ? userId?.userName : "Admin"}</h1>
          {/* <p className="text-sm">Online</p> */}
        </div>

        {admin && mobile && (
          <h1
            onClick={() => setUserId(null)}
            className="text-bold absolute right-4 top-4 rounded-full bg-actClr p-2 text-xl shadow shadow-black md:hidden"
          >
            <IoIosArrowBack />
          </h1>
        )}
      </div>

      {/* Ul */}
      {isLoading ? (
        <Loader />
      ) : (
        <ul className="mb-5 flex flex-col  gap-3 overflow-y-auto  p-4">
          {msgs.length != 0 ? (
            msgs.map((li, i: number) => {
              return (
                <div className="" key={i}>
                  <div
                    className={` ${
                      a == li?.date ? "hidden" : (a = li?.date as string)
                    } mx-auto my-1 mb-2.5 w-fit rounded bg-priClr p-1 px-4 text-center font-semibold text-slate-200`}
                  >
                    {li?.date}
                  </div>

                  <div
                    ref={(el) => (refs.current[i] = el)}
                    key={i}
                    className={`${
                      !admin
                        ? adminId == li.senderId
                          ? "you"
                          : "me"
                        : adminId == li.senderId
                        ? "me"
                        : "you"
                    }
                relative max-w-[60%] rounded-lg px-2   py-1 font-medium text-white md:px-4`}
                  >
                    <div className=" flex flex-col gap-[0.075rem]">
                      <p className="text-left text-[0.9rem] md:text-base">
                        {li.message}
                      </p>
                      <p className="  whitespace-nowrap pb-0 text-right text-[0.65rem] font-light">
                        {li?.time}
                      </p>
                    </div>
                    <span className="h-5 w-5"></span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-shadow flex h-full items-center justify-center text-2xl  font-bold text-priClr">
              {msgs?.length == 0
                ? !admin
                  ? "Start Chat with Your Admin 😉"
                  : userId?.userId == undefined
                  ? "Click One of the Users, to Chat 😉"
                  : "No Chats Yet 🙂"
                : ""}
            </div>
          )}
        </ul>
      )}

      {/* Send Message */}
      <div className="mt-auto flex gap-5  p-3">
        <input
          onKeyUp={(e) => {
            if (e.key === "Enter") sendMsgs();
          }}
          onChange={(e) => setCurMsg(e.target.value)}
          type="text"
          id="name"
          value={curMsg}
          className={`block w-full rounded-lg border-2  border-gray-400 bg-gray-50 p-2.5 text-base font-semibold text-gray-900 shadow shadow-black outline-none hover:shadow hover:shadow-black focus:border-secClr focus:shadow focus:shadow-black focus:ring-secClr dark:border-gray-400 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:hover:shadow-actClr dark:focus:border-secClr dark:focus:shadow-actClr dark:focus:ring-secClr`}
          placeholder="Enter a Message ..."
        />
        <button
          onClick={sendMsgs}
          className="rounded-[100%] border-[3px] border-actClr  bg-actClr  p-2 px-2.5 text-center  text-2xl text-white hover:scale-[1.05] hover:border-actClr hover:shadow-sm hover:shadow-black  active:scale-[1]"
        >
          <IoMdSend />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
