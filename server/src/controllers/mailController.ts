import nodemailer from "nodemailer";
import Mailgen from "mailgen";

let config = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EPASSWORD,
  },
};

// console.log("Email", process.env.EMAIL);

let transporter = nodemailer.createTransport(config);

let mailGenerator = new Mailgen({
  theme: "default", //cerberus , salted
  product: {
    name: "E-Buddy",
    link: process.env.CLIENT_PORT + "",
    // logo: "https://mailgen.js/img/logo.png",
  },
});

// interface sendMailParams {
//   userName: string;
//   productStatus: string;
//   productName: string;
//   quantity: number;
//   price: number;
//   userEmail: string;
// }

export const sendMailFunc: any = (
  productData: any,
  productStatus: string
): void => {
  let proccessData = productData.map((li: any) => {
    return {
      product: li.title,
      quantity: li.quantity,
      price: `$${li.quantity * li.price}`,
    };
  });

  // // console.log(proccessData);
  // console.log("Email", process.env.EMAIL);
  // console.log("Pass", process.env.EPASSWORD);
  // console.log("UserEmail", productData[0].userEmail);

  let response = {
    body: {
      name: productData[0].userName,
      intro: productStatus,
      action: {
        instructions:
          "To check your product details, please click the button :",
        button: {
          color: "#A033CE",
          text: "Check Your Cart  🛒",
          link: process.env.CLIENT_PORT + "/usercart",
        },
      },
      table: {
        data: proccessData,
        columns: {
          customWidth: {
            item: "75%",
            price: "15%",
            quantity: "10%",
          },
          customAlignment: {
            product: "left",
            quantity: "center",
            price: "center",
          },
        },
      },
    },
  };

  let mail = mailGenerator.generate(response);

  let message = {
    from: process.env.EMAIL,
    to: productData[0].userEmail,
    subject: "EBuddy Product Status 😄",
    html: mail,
  };

  transporter.sendMail(message, (err, info) => {
    if (err) console.log("Error to send mail", err);
    else {
      console.log("Email Sent");
    }
  });
};

export const sendMailForSignUp: any = (name: string, email: string): void => {
  let response = {
    body: {
      name: name,
      intro:
        " You Successfully Registered✨ EBuddy Official Shopping Platform💥",
      action: {
        instructions:
          "To check your profile details, please click the button :",
        button: {
          color: "#A033CE",
          text: "Check Your Profile 😉",
          link: process.env.CLIENT_PORT + "/userprofile",
        },
      },
    },
  };

  let mail = mailGenerator.generate(response);

  let message = {
    from: process.env.EMAIL,
    to: email,
    subject: "EBuddy Registration Status 😄",
    html: mail,
  };

  transporter.sendMail(message, (err, info) => {
    if (err) console.log("Error to send mail", err);
    else {
      console.log("Email Sent");
    }
  });
};
