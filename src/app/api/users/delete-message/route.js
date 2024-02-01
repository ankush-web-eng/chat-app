import { connect } from "@/dbConfig/dbConfig";
import Message from "@/models/chatModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function DELETE(NextRequest){
    try {
        const reqBody = await NextRequest.json()
        const {name,message} = reqBody

        await Message.deleteOne({name,message})
        return NextResponse.json({
            success: true,
            Message: "Message deleted Successfully"
        }, {status: 201})

    } catch (error) {
        return NextResponse.json({error: error.Message}, {status:400})
    }
}