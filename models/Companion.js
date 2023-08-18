import mongoose from "mongoose";
import Message from "@/models/Message";

const companionSchema = mongoose.Schema(
  {
    userId: String,
    userName: String,
    name: String,
    src: String,
    description: String,
    instructions: String,
    seed: String,
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    messages: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true }
);

// companionSchema.prev("remove", async function (next) {
//   const messages = await Message.find({ companionId: this._id });
//   for (const message of messages) {
//     await message.remove();
//   }

//   next();
// });

export default mongoose.models.Companion ??
  mongoose.model("Companion", companionSchema);
