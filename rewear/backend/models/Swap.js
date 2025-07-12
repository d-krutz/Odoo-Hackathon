const mongoose = require("mongoose");

const swapSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
  status: { type: String, default: "pending" }, // pending, accepted, rejected, completed
  createdAt: { type: Date, default: Date.now },
  completedAt: Date
});

module.exports = mongoose.model("Swap", swapSchema);
