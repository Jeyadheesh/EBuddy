import { create } from "zustand";

interface loginType {
  isLogin: boolean;
  setIsLogin: (loginState: boolean) => void;
}

const useLogin = create<loginType>()((set) => ({
  isLogin: false,
  setIsLogin: (loginState: boolean) => set({ isLogin: loginState }),
}));

export default useLogin;
