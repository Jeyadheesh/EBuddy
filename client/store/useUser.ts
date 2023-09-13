import { create } from "zustand";
import { userSchema } from "../types";

interface useUserType {
  userData: userSchema | null | any;
  setUserData: (data: userSchema | null) => void;
}

const useUser = create<useUserType>()((set) => ({
  userData: null,
  setUserData: (data: userSchema | null) => set({ userData: data }),
}));

export default useUser;
