import { connectDB } from "@/lib/config/connectDB";
import UserModel from "@/lib/models/UserModel";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();
        const { email } = await request.json();
        const user = await UserModel.findOne({ email });

        if (user) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        return NextResponse.json({ message: "User does not exist" }, { status: 200 });
    } catch (error) {
        console.error("Error:", error.message);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
