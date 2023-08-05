import mongoose from "mongoose";

const companionSchema = mongoose.Schema(
  {
    userId: String,
    userName: String,
    src: String,
    description: String,
    instructions: String,
    seed: String,
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

export default mongoose.models.companions ??
  mongoose.models("Companion", companionSchema);
