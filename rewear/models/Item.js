const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  images: [String],
  category: String,
  type: String,
  size: String,
  condition: String,
  tags: [String],
  status: { type: String, default: "available" }, // available, swapped, redeemed
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  approved: { type: Boolean, default: false }
});

module.exports = mongoose.model("Item", itemSchema);
