import mongoose from "mongoose";

const Category = mongoose.Schema({
  name: { type: String, required: true },
});

export default mongoose.models.Category ?? mongoose.model("Category", Category);
