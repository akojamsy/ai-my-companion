import { SingleChatProps } from "@/app/(chat)/(root)/chat/[chatId]/page";
import Companion from "@/models/Companion";
import Message from "@/models/Message";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }: SingleChatProps) => {
  const companions = await Companion.findById(params.chatId)
    .sort({ createdAt: -1 })
    .populate("messages")
    .exec()
    .then(async (companion: any) => {
      if (companion) {
        const messageCount = await Message.countDocuments({
          companion: companion._id,
        });

        const companionWithMessageCount = {
          ...companion.toObject(),
          messageCount,
        };
        return companionWithMessageCount;
      } else {
        console.log("Companion not found.");
      }
    });

  return NextResponse.json(
    { companions, message: "success", success: true },
    { status: 200 }
  );
};
