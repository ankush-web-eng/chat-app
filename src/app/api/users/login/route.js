import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();


export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: "Wrong Password!!" },
        { status: 404 }
      );
    }

    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: "Login Successfully",
      sucess: true,
    });

    response.cookies.set("token", token,{
        httpOnly: true 
    });

    return response;

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
