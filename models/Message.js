import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  role: ["user", "system"],
  content: String,
  companionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Companion",
  },
  userId: String,
});

export default mongoose.models.Message ??
  mongoose.model("Message", messageSchema);
