import { connectDB } from "../lib/connectdb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const db = await connectDB();
    console.log('Database connected:', db?.connection?.name);
    return new NextResponse('connected')
}