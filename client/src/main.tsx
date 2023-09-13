import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import "./index.css";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import UserCart from "../pages/UserCart";
import ProductDetails from "../pages/ProductDetails";
import UserProfile from "../pages/UserProfile";
import BuyProduct from "../pages/BuyProduct";
import Admin from "../pages/Admin";
import Chat from "../pages/Chat";
import NotFound from "../pages/NotFound";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// socket.

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <Router>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/productdetails/:id" element={<ProductDetails />}></Route>
      <Route path="/usercart" element={<UserCart />}></Route>
      <Route path="/userprofile" element={<UserProfile />}></Route>
      <Route path="/orderproduct" element={<BuyProduct />}></Route>
      <Route path="/admin" element={<Admin />}></Route>
      <Route path="/chat" element={<Chat />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  </Router>
  // </React.StrictMode>
);
