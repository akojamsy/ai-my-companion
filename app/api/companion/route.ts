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

    console.log(name);

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
