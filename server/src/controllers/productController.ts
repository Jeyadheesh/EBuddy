import { Request, Response } from "express";
import mongoose from "mongoose";
import { Product } from "../schema/productModel";

export const getProducts = async (req: Request, res: Response) => {
  const datas = await Product.find();
  // console.log("Products sent");
  res.send(datas);
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const dataa = await Product.findOne({ id: id });
  // console.log("One Product sent ");
  res.send(dataa);
};

export const getProductsByCategory = async (req: Request, res: Response) => {
  const { category } = req.params;
  const datas = await Product.find({ category: category });
  // console.log("Categoty Product sent ");
  res.send(datas);
};
