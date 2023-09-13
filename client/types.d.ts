// import { type } from "os";

export default interface sliderDataType {
  sName: "string";
  desc: "string";
  btnName: "string";
  imgSrc: "string";
}

interface profileImg {
  data: Buffer;
  contentType: string;
}

interface profileImgIdd {
  userEmail: string;
  profileImg: profileImg;
}

interface userSchema {
  _id: string;
  address: string;
  cardno: number;
  city: string;
  conPassword: string;
  cvcno: number;
  email: string;
  name: string;
  password: string;
  phno: number;
  role: string;
  profileImgId?: profileImgIdd;
}

interface handleCookieType {
  isLogin1: boolean;
  coData: userSchema | null;
}

interface productType {
  _id: string;
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  review:
    | [
        {
          userId: string;
          userName: string;
          title: string;
          rating: number;
          message: string;
        }
      ]
    | [];
}

type categoriesType =
  | "all"
  | "electronics"
  | "jewelery"
  | "men's clothing"
  | "women's clothing"
  | "null";

type cartPageType = "cart" | "buyed" | "shipped";

interface userCartType {
  _id: string;
  userEmail: string;
  userName: string;
  productId: number;
  title: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
  isCart: boolean;
  isBuyed: boolean;
  isShipped: boolean;
  review: string;
  reject: boolean;
  isReviewed: boolean;
}

interface contextType {
  categories: categoriesType;
  setCategories: React.Dispatch<React.SetStateAction<categoriesType>>;
  searchVal: string;
  setSearchVal: React.Dispatch<React.SetStateAction<string>>;
  setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
  lists: productType[];
  setLists: React.Dispatch<React.SetStateAction<productType[]>>;
  handleSearchClick: () => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getAllData: () => void;
  isSearch: boolean;
}

type adminPageType = "users" | "products" | "chat";

interface chatUserType {
  userName: string;
  userImg: {
    contentType: string;
    data: Buffer;
  };
  userId: string;
}

interface chatPropsType {
  userId?: chatUserType | null;
  setUserId?: React.Dispatch<React.SetStateAction<chatUserType | null>> | any;
  mobile?: boolean;
  setMobile?: React.Dispatch<React.SetStateAction<boolean>>;
}

// interface adminPageProp {
//   isLoading: boolean;
//   setIsLoading: React.Dispatch<any | boolean>;
// }

interface chatMessageType {
  senderId: string | undefined;
  userId: string | undefined;
  userName: string | undefined;
  message: string | undefined;
  adminId: string | undefined;
  date: string | undefined;
  time: string | undefined;
  role: string | undefined;
}
