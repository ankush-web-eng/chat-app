import { connect } from "@/dbConfig/dbConfig";
import Message from "@/models/chatModel";
import { NextResponse } from "next/server";

connect();

export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    const { person, message } = reqBody;

    const newMessage = {
      name: person,
      message: message,
    };
    console.log(newMessage);

    let savedMessage = new Message(newMessage);
    const isSaved = await savedMessage.save();
    console.log(isSaved);

    return NextResponse.json(
      { message: "Message Saved Successfully", success: true, isSaved },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { Error: "Not Recieved anything" },
      { status: 404 }
    );
  }
}
