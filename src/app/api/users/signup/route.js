import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    const { username, email, password } = reqBody;

    const isPresent = await User.findOne({ email });
    if (isPresent) {
      return NextResponse.json({
        error: "User Already Exists",
        status: 400,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    if (!savedUser) {
      return NextResponse.json({
        message: "Unexpected Error Occured",
        status: 400,
      });
    }
    console.log(savedUser);

    return NextResponse.json({
      message: "User Saved Successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ Error: error.message }, { status: 400 });
  }
}
