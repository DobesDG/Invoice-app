import { connectDB } from "../lib/connectdb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    await connectDB();
    return new NextResponse('connected')
}