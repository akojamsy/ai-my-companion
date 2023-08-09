import mongoose from "mongoose";

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
  },
  { timestamps: true }
);

export default mongoose.models.Companion ??
  mongoose.model("Companion", companionSchema);
