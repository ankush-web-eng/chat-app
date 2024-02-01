import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import getDataFromToken from "@/helpers/getDataFromToken";

connect();

export async function GET(request) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");

    return NextResponse.json({
      mesaaage: "User Found!",
      data: user,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}