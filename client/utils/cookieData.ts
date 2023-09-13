import axios from "axios";
import { handleCookieType } from "../types";

const checkCookie = async (): Promise<handleCookieType | any> => {
  try {
    let datas: handleCookieType = {
      isLogin1: false,
      coData: null,
    };
    const resData = await axios.get(
      `http://localhost:9000/auth/getcookiedata`,
      {
        withCredentials: true,
      }
    );
    const data = resData.data;
    if (data.status != "err") {
      console.log(data.cookieData);

      if (data.cookieData) {
        datas.isLogin1 = true;
        datas.coData = data.cookieData;
      } else {
        // console.log("bad");
        datas.isLogin1 = false;
      }
    }
    return datas;
    // console.log("FinalUseLogin", isLogin);
  } catch (error) {
    console.log(error);
  }
};

export default checkCookie;
