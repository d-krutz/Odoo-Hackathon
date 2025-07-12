const Item = require("../models/Item");
const PointsTransaction = require("../models/PointsTransaction");

exports.createItem = async (req, res) => {
  try {
    const item = await Item.create({ ...req.body, user: req.user.id });
    await PointsTransaction.create({
      user: req.user.id,
      type: "earned",
      amount: 10, // reward for listing
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find({ isSwapped: false }).populate("user", "name");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyItems = async (req, res) => {
  try {
    const items = await Item.find({ user: req.user.id });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
