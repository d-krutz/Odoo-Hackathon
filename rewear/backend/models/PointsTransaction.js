const mongoose = require("mongoose");

const pointsTransactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
  type: { type: String, enum: ["earned", "redeemed"], required: true },
  points: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("PointsTransaction", pointsTransactionSchema);
