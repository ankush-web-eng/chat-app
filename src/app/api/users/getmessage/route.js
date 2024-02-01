import { connect } from "@/dbConfig/dbConfig";
import Message from "@/models/chatModel";
import { NextResponse } from "next/server";

connect();

export async function GET(NextRequest) {
    try {
        const data =await Message.find({}).exec();

        return NextResponse.json({
            data:data
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

