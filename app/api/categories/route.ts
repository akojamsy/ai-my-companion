import { connect } from "@/Dbconnection/dbconnect";
import { NextRequest, NextResponse } from "next/server";
import Category from "./../../../models/Category";

connect();
export const GET = async (request: NextRequest) => {
  try {
    const categories = await Category.find();
    return NextResponse.json(
      { data: categories, success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error, success: false }, { status: 200 });
  }
};
