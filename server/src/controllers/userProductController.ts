import { Request, Response } from "express";
import { UserProduct } from "../schema/userProductModel";
import { Product } from "../schema/productModel";

export const getCartProducts = async (req: Request, res: Response) => {
  try {
    // const test = "isCart";
    let cart = false;
    let buyed = false;
    let shipped = false;
    const { email, page } = req.body;

    switch (page) {
      case "cart":
        cart = true;
        break;
      case "buyed":
        buyed = true;
        break;
      case "shipped":
        shipped = true;
        break;

      default:
        break;
    }

    const data = await UserProduct.find({
      userEmail: email,
      isCart: cart,
      isBuyed: buyed,
      isShipped: shipped,
    }).sort({ _id: -1 });
    return res.status(200).send({
      status: "noerr",
      data: data,
    });
  } catch (error) {
    return res.send({
      status: "err",
      msg: error,
    });
  }
};

export const postCartProducts = async (req: Request, res: Response) => {
  try {
    const {
      userEmail,
      userName,
      productId,
      title,
      price,
      description,
      image,
      quantity,
    } = req.body;

    const checkData = await UserProduct.find({
      userEmail: userEmail,
      productId: productId,
      isCart: true,
      isBuyed: false,
    });
    // console.log(checkData);
    if (checkData.length != 0) {
      console.log("irukku");
      const updateData = await UserProduct.updateOne(
        {
          userEmail: userEmail,
          productId: productId,
          isCart: true,
        },
        { $set: { quantity: quantity } }
      );
      console.log(updateData);
      return res.status(200).send({
        status: "noerr",
        msg: "Cart Product Updated :)",
      });
    } else {
      console.log("ila");
      const data = await UserProduct.create({
        userEmail: userEmail,
        userName: userName,
        productId: productId,
        title: title,
        price: price,
        description: description,
        image: image,
        quantity: quantity,
        isCart: true,
      });

      return res.status(200).send({
        status: "noerr",
        msg: "Product Added Successful :)",
      });
    }
  } catch (error) {
    return res.send({
      status: "err",
      msg: error,
    });
  }
};

export const buyOneProduct = async (req: Request, res: Response) => {
  try {
    const {
      userEmail,
      userName,
      productId,
      title,
      price,
      description,
      image,
      quantity,
    } = req.body;

    const data = await UserProduct.create({
      userEmail: userEmail,
      userName: userName,
      productId: productId,
      title: title,
      price: price,
      description: description,
      image: image,
      quantity: quantity,
      isCart: false,
      isBuyed: true,
    });

    return res.status(200).send({
      status: "noerr",
      msg: "Product Ordered Successful :)",
    });
  } catch (error) {
    return res.send({
      status: "err",
      msg: error,
    });
  }
};

export const buyCartProducts = async (req: Request, res: Response) => {
  try {
    const { userEmail } = req.body;
    const data = await UserProduct.updateMany(
      {
        userEmail: userEmail,
        isCart: true,
      },
      { $set: { isBuyed: true, isCart: false } }
    );

    return res.status(200).send({
      status: "noerr",
      msg: "Products Ordered Successful :)",
    });
  } catch (error) {
    return res.send({
      status: "err",
      msg: error,
    });
  }
};

export const getBuyProducts = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const data = await UserProduct.find({
      userEmail: email,
      isShipped: false,
      isBuyed: true,
    });
    return res.status(200).send({
      status: "noerr",
      data: data,
    });
  } catch (error) {
    return res.send({
      status: "err",
      msg: error,
    });
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const deleteData = await UserProduct.deleteOne({
      _id: id,
    });

    return res.status(200).send({
      status: "noerr",
      msg: "Product Deleted Successful :)",
    });
  } catch (error) {
    return res.send({
      status: "err",
      msg: error,
    });
  }
};

export const deleteCartProduct = async (req: Request, res: Response) => {
  try {
    let cart = false;
    let buyed = false;
    let shipped = false;
    const { userEmail, productId, page } = req.body;

    switch (page) {
      case "cart":
        cart = true;
        break;
      case "buyed":
        buyed = true;
        break;
      case "shipped":
        shipped = true;
        break;

      default:
        break;
    }

    const deleteData = await UserProduct.deleteOne({
      userEmail: userEmail,
      productId: productId,
      isCart: cart,
      isBuyed: buyed,
      isShipped: shipped,
    });
    return res.status(200).send({
      status: "noerr",
      msg: "Product Deleted Successful :)",
    });
  } catch (error) {
    return res.send({
      status: "err",
      msg: error,
    });
  }
};

export const setReview = async (req: Request, res: Response) => {
  try {
    const { productId, mainId, userName, userId, title, message, rating } =
      req.body;

    const resData = await UserProduct.updateOne(
      {
        _id: mainId,
      },
      { $set: { isReviewed: true } }
    );

    let data = {
      userId: userId,
      userName: userName,
      title: title,
      rating: rating,
      message: message,
    };

    const updateReview = await Product.updateOne(
      {
        id: productId,
      },
      { $push: { review: data } }
    );

    return res.status(200).send({
      status: "noerr",
      msg: "Product Reviewed Successful :)",
    });
  } catch (error) {
    return res.send({
      status: "err",
      msg: error,
    });
  }
};
