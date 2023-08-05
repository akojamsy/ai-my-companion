import { connect } from "@/Dbconnection/dbconnect";
import Category from "@/models/Category";
import { NextRequest, NextResponse } from "next/server";

connect();

type Props = {
  params: {
    companionId: string;
  };
};

export const GET = async (request: NextRequest, { params }: Props) => {
  const reqBody = params.companionId;
  if (reqBody === "new") {
    const categories = await Category.find();
    return NextResponse.json({ categories, success: true }, { status: 200 });
  }
  console.log(reqBody);
};
