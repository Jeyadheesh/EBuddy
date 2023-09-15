import mongoose from "mongoose";
import { CookieOptions, Request, Response } from "express";
import { User, userType, ProfileImg } from "../schema/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { Token } from "typescript";
import { sendMailForSignUp } from "./mailController";

export const register = async (req: Request, res: Response) => {
  try {
    const {
      address,
      cardno,
      city,
      conPassword,
      cvcno,
      email,
      name,
      password,
      phno,
    } = req.body.data;

    const checkUser = await User.findOne({ email: email });
    // console.log(checkUser);
    if (checkUser != null) {
      return res.send({
        status: "err",
        msg: "User Already Exists :x",
      });
    } else {
      const hashpass = await bcryptjs.hash(password, 10);

      const UserDetails = await User.create({
        address: address,
        cardno: cardno,
        city: city,
        conPassword: hashpass,
        cvcno: cvcno,
        email: email,
        name: name,
        password: hashpass,
        phno: phno,
      });

      sendMailForSignUp(name, email);

      // console.log(UserDetails);
      return res.status(200).send({
        status: "noerr",
        msg: "Register Successful :)",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      status: "err",
      msg: error,
    });
  }
};

export const editUser = async (req: Request, res: Response) => {
  try {
    const {
      address,
      cardno,
      city,
      conPassword,
      cvcno,
      email,
      name,
      password,
      phno,
    } = req.body.data;

    const checkUser = await User.findOne({ email: email });
    // console.log(checkUser);
    if (checkUser == null) {
      return res.send({
        status: "err",
        msg: "User Not Found :x",
      });
    } else {
      const hashpass = await bcryptjs.hash(password, 10);

      const UserDetails = await User.updateOne(
        { email: email },
        {
          address: address,
          cardno: cardno,
          city: city,
          conPassword: hashpass,
          cvcno: cvcno,
          name: name,
          password: hashpass,
          phno: phno,
        }
      );
      // console.log(UserDetails);
      return res.status(200).send({
        status: "noerr",
        msg: "Update Profile Successful :)",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      status: "err",
      msg: error,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body.data;
    // console.log(email, password);

    const UserDetails1: any = await User.findOne({ email: email });
    // console.log(UserDetails1);

    if (UserDetails1 != null) {
      const checkPass = await bcryptjs.compare(password, UserDetails1.password);
      // console.log(UserDetails1.password, password, checkPass);

      if (!checkPass) {
        return res.send({
          status: "err",
          msg: "Password not matched :(",
        });
      }

      const token = jwt.sign(
        { userdetails: UserDetails1 },
        process.env.jwtSecretCode + "",
        {
          expiresIn: process.env.jwtExpireTime,
        }
      );

      const cookieOptions: CookieOptions = {
        expires: new Date(
          Date.now() + Number(process.env.jwtCookieExpire) * 1000 * 60 * 60 * 24
        ),
        httpOnly: true,
        sameSite: process.env.MODE == "production" ? "none" : "strict",
        path: "/",
        secure: true,
        // domain: "localhost",
      };
      // console.log(token, cookieOptions);
      res.cookie("jai", token, cookieOptions);

      res.send({
        status: "noerr",
        msg: "Login Successful :)",
      });
    } else {
      return res.status(200).send({
        status: "err",
        msg: "Check Your Email :(",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      status: "err",
      msg: error,
    });
  }
};

export const passCheck = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const UserDetails1: any = await User.findOne({ email: email });
    // console.log(UserDetails1);
    if (UserDetails1 != null) {
      const checkPass = await bcryptjs.compare(password, UserDetails1.password);
      // console.log(UserDetails1.password, password, checkPass);

      if (!checkPass) {
        return res.send({
          status: "err",
          msg: "Password not matched :(",
        });
      } else {
        return res.status(200).send({
          status: "noerr",
          msg: "Password  Matched :)",
        });
      }
    } else {
      return res.send({
        status: "err",
        msg: "Email Not Found :x",
      });
    }
  } catch (error) {
    return res.send({
      status: "err",
      msg: error,
    });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie("jai");
    res.send("Cookie Deleted");
  } catch (error) {
    res.status(400).send({
      status: "err",
      msg: error,
    });
  }
};

export const getCookieData = async (req: Request, res: Response) => {
  try {
    const cookie = await req.cookies.jai;
    // console.log(cookie);

    if (cookie) {
      const cookieData: any = jwt.verify(
        cookie,
        process.env.jwtSecretCode + ""
      );
      if (cookieData) {
        // const userData = await User.findOne({
        //   email:cookieData.
        // })

        const UserData = await User.findOne({
          email: cookieData?.userdetails.email,
        })?.populate("profileImgId");

        // console.log("Cookie : ", UserData);

        return res.status(200).send({
          status: "noerr",
          cookieData: UserData,
        });
      } else {
        // console.log("good", cookieData);
        return res.send({
          status: "err",
          msg: "Cookie cannot Verified",
        });
      }
    } else {
      return res.send({
        status: "err",
        msg: "Cannot get CookieData",
      });
    }
  } catch (error) {
    res.status(400).send({
      status: "err",
      msg: error,
    });
  }
};

export const getCookie = async (req: Request, res: Response) => {
  try {
    const cookieData = await req.cookies;
    // console.log(cookieData);
    res.send({ cookieData: cookieData });
  } catch (error) {
    res.status(400).send({
      status: "err",
      msg: error,
    });
  }
};

export const editProfileImg = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    // console.log("Email", email);
    // console.log(req.file);

    const UserDetails = await ProfileImg.find({ userEmail: email });
    console.log("Profile : ", UserDetails);
    if (UserDetails.length == 0) {
      const setImg = await ProfileImg.create({
        userEmail: email,
        profileImg: {
          data: req.file?.buffer,
          contentType: req.file?.mimetype,
        },
      });

      const getImgId = await ProfileImg.findOne({
        userEmail: email,
      });

      const updateUser = await User.updateOne(
        {
          email: email,
        },
        {
          $set: {
            profileImgId: getImgId?._id,
          },
        }
      );

      return res.status(200).send({
        status: "noerr",
        msg: "Image Created",
      });
    } else {
      const setImg = await ProfileImg.updateOne(
        {
          userEmail: email,
        },
        {
          $set: {
            profileImg: {
              data: req.file?.buffer,
              contentType: req.file?.mimetype,
            },
          },
        }
      );

      return res.status(200).send({
        status: "noerr",
        msg: "Image Updated",
      });
    }

    // console.log(UserDetails);
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      status: "err",
      msg: error,
    });
  }
};

// export const getImage = async(req: Request, res: Response){
//   try{

//     const {profileImgId} =req.body;

//     const imgData = await ProfileImg.findOne({
//       _id:profileImgId
//     });

//   return res.status(200).send({
//         status: "noerr",
//         msg: imgData,
//       });
//   }catch (error) {
//     console.log(error);
//     return res.status(400).send({
//       status: "err",
//       msg: error,
//     });
//   }
// }
