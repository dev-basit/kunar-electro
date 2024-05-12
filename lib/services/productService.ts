import { cache } from "react";
import db from "@/lib/utils/db";
import ProductModel, { InteraceProduct } from "@/lib/models/ProductModel";

export const revalidate = 3600;

const getLatest = cache(async () => {
  try {
    await db();
    const products = await ProductModel.find({}).sort({ _id: -1 }).limit(4).lean();
    return products as InteraceProduct[];
  } catch (error) {}
});

const getFeatured = cache(async () => {
  try {
    await db();
    const products = await ProductModel.find({ isFeatured: true }).limit(3).lean();
    return products as InteraceProduct[];
  } catch (error) {}
});

const getBySlug = cache(async (slug: string) => {
  try {
    await db();
    const product = await ProductModel.findOne({ slug }).lean();
    return product as InteraceProduct;
  } catch (error) {}
});

export const productService = {
  getLatest,
  getFeatured,
  getBySlug,
};
