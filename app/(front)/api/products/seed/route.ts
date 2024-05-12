import { NextRequest, NextResponse } from "next/server";

import data from "@/lib/data";
import db from "@/lib/utils/db";
import ProductModel from "@/lib/models/ProductModel";
import UserModel from "@/lib/models/UserModel";

export const GET = async (request: NextRequest) => {
  try {
    const { users, products } = data;
    await db();
    await UserModel.deleteMany();
    await UserModel.insertMany(users);

    await ProductModel.deleteMany();
    await ProductModel.insertMany(products);

    return NextResponse.json({
      message: "seeded successfully",
      users,
      products,
    });
  } catch (error) {}
};
