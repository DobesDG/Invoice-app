import { connectToMongoDB } from "../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    const con = await connectToMongoDB();
    return new NextResponse('connected')
}