import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import Companion from "@/models/Companion";
import { connect } from "@/Dbconnection/dbconnect";

connect();

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const user = await currentUser();
    const { src, description, seed, instructions, categoryId, name } = reqBody;

    if (!user || !user.id || !user.firstName) {
      return NextResponse.json(
        { error: "Unauthorized!", success: false },
        { status: 401 }
      );
    }

    if (
      !src ||
      !description ||
      !seed ||
      !instructions ||
      !categoryId ||
      !name
    ) {
      return NextResponse.json(
        { error: "Missing required fields!", success: false },
        { status: 400 }
      );
    }

    // Check for subscriptions

    const companion = await new Companion({
      userId: user.id,
      userName: user.firstName,
      name,
      src,
      description,
      instructions,
      seed,
      categoryId,
    }).save();

    return NextResponse.json(
      { companion, message: "Companion created successfully", success: false },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 501 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  let query: any = {};

  if (searchParams.get("name") !== "null") {
    query.name = searchParams.get("name");
  }
  if (searchParams.get("categoryId") !== "null") {
    query.categoryId = searchParams.get("categoryId");
  }

  const companions = await Companion.find(query)
    .sort({ createdAt: -1 })
    .populate("messages");

  return NextResponse.json(
    { companions, message: "success", success: true },
    { status: 200 }
  );
};
