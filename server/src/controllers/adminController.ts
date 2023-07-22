import { NextFunction, Request, Response } from "express";
import { UserProduct, userProductType } from "../schema/userProductModel";
import { User } from "../schema/userModel";
// import { Product } from "../schema/productModel";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { sendMailFunc } from "./mailController";
import { productType } from "../schema/productModel";

export const userDetails = async (req: Request, res: Response) => {
  try {
    const userDatas = await User.find({ role: "user" })?.populate(
      "profileImgId"
    );
    return res.status(200).send({
      status: "noerr",
      userDatas: userDatas,
    });
  } catch (error) {
    return res.send({
      status: "err",
      msg: error,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const userData = await User.find({ email: email });
    console.log(userData[0].role);

    if (userData[0].role == "admin") {
      return res.status(200).send({
        status: "err",
        msg: "Admin ID, Cannot Delete this 😎",
      });
    }

    const userDatas = await User.deleteOne({ email: email });
    return res.status(200).send({
      status: "noerr",
      msg: "User Successfully Deleted :)",
    });
  } catch (error) {
    return res.send({
      status: "err",
      msg: error,
    });
  }
};

export const upDetails = async (req: Request, res: Response) => {
  try {
    const usersData = await User.find()?.populate("profileImgId");
    const productsData = await UserProduct.find({
      isBuyed: true,
      isShipped: false,
    });

    return res.status(200).send({
      status: "noerr",
      usersData: usersData,
      productsData: productsData,
    });
  } catch (error) {
    return res.send({
      status: "err",
      msg: error,
    });
  }
};

export const sellOneProduct = async (req: Request, res: Response) => {
  try {
    const { userEmail, productId, type } = req.body;
    let reject: boolean = false;
    let msg: string = "";
    let productStatus: string = "";
    switch (type) {
      case "sell":
        reject = false;
        msg = "Product Sold Successfully😉";
        productStatus = "Your Product Shipped Successfully 😉";
        break;
      case "unsell":
        reject = true;
        msg = "Product UnSold Successfully🙃";
        productStatus = "Your Product Rejected by Admin 🙃";
        break;
      default:
        break;
    }

    const productDetail: userProductType[] = await UserProduct.find({
      userEmail: userEmail,
      _id: productId,
      isBuyed: true,
      isShipped: false,
    });

    // console.log(productDetail);
    sendMailFunc(productDetail, productStatus);

    const productsData = await UserProduct.updateOne(
      {
        userEmail: userEmail,
        _id: productId,
        isBuyed: true,
        isShipped: false,
      },
      { $set: { isBuyed: false, isShipped: true, reject: reject } }
    );
    // console.log(productsData);
    return res.status(200).send({
      status: "noerr",
      msg: msg,
    });
  } catch (error) {
    return res.send({
      status: "err",
      msg: error,
    });
  }
};

export const sellAllProduct = async (req: Request, res: Response) => {
  try {
    const { userEmail, type } = req.body;
    let msg: string = "";
    let productStatus: string = "";

    let reject: boolean = false;
    switch (type) {
      case "sell":
        reject = false;
        msg = "Products Sold Successfully😉";
        productStatus = "Your Products Shipped Successfully 😉";
        break;
      case "unsell":
        reject = true;
        msg = "Product UnSold Successfully🙃";
        productStatus = "Your Product Rejected by Admin 🙃";
        break;
      default:
        break;
    }

    const productDetail = await UserProduct.find({
      userEmail: userEmail,
      isBuyed: true,
      isShipped: false,
    });

    // console.log(productDetail);
    sendMailFunc(productDetail, productStatus);

    const productsData = await UserProduct.updateMany(
      {
        userEmail: userEmail,
        isBuyed: true,
        isShipped: false,
      },
      { $set: { isBuyed: false, isShipped: true, reject: reject } }
    );

    return res.status(200).send({
      status: "noerr",
      msg: msg,
    });
  } catch (error) {
    return res.send({
      status: "err",
      msg: error,
    });
  }
};

export const admins = async (req: Request, res: Response) => {
  try {
    const adminData = await User.find({ role: "admin" });

    return res.status(200).send({
      status: "noerr",
      adminData: adminData,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      status: "err",
      msg: error,
    });
  }
};
