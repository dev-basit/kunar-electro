import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import db from "@/lib/utils/db";
import UserModel from "@/lib/models/UserModel";

export const POST = async (request: NextRequest) => {
  try {
    console.log("======= before db connect");
    const { name, email, password } = await request.json();
    await db();
    console.log("======= after db connect");

    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();
    return Response.json({ message: "User has been created" }, { status: 201 });
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
};
