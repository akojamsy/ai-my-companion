import { connect } from "@/Dbconnection/dbconnect";
import Category from "@/models/Category";
import Companion from "@/models/Companion";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

connect();

export type Props = {
  params: {
    companionId: string;
  };
};

export const GET = async (request: NextRequest, { params }: Props) => {
  const id = params.companionId;
  const categories = await Category.find();
  if (id === "new") {
    return NextResponse.json({ categories, success: true }, { status: 200 });
  }

  const companion = await Companion.findById({ _id: id });
  if (companion) {
    return NextResponse.json(
      { companion, categories, success: true },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { error: "Unable to fetch data for this companion.", success: false },
      { status: 400 }
    );
  }
};

export const PUT = async (req: NextRequest, { params }: Props) => {
  try {
    const reqBody = await req.json();
    const user = await currentUser();
    const id = params?.companionId;
    const { src, description, seed, instructions, categoryId, name } = reqBody;

    console.log(id);
    if (!id) {
      return NextResponse.json(
        { error: "Companion ID is required", success: false },
        { status: 400 }
      );
    }

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
    const companion = await Companion.findByIdAndUpdate(
      { _id: id },
      {
        userId: user.id,
        userName: user.firstName,
        name,
        src,
        description,
        instructions,
        seed,
        categoryId,
      }
    );

    return NextResponse.json(
      {
        companion,
        message: "Companion updated successfully",
        success: false,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Something went wrong, Try again.", success: false },
      { status: 501 }
    );
  }
};
