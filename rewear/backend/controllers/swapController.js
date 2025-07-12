const Swap = require("../models/Swap");
const Item = require("../models/Item");
const User = require("../models/User");
const PointsTransaction = require("../models/PointsTransaction");

exports.requestSwap = async (req, res) => {
  try {
    const { itemId, ownerId } = req.body;

    const item = await Item.findById(itemId);
    const requester = await User.findById(req.user.id);

    if (!item || !requester) return res.status(404).json({ message: "Invalid item or user" });
    if (requester.points < item.points)
      return res.status(400).json({ message: "Insufficient points" });

    const swap = await Swap.create({
      requester: req.user.id,
      owner: ownerId,
      item: itemId,
    });

    // Hold points (deduct now, refund on reject if needed)
    requester.points -= item.points;
    await requester.save();
    await PointsTransaction.create({ user: requester._id, type: "spent", amount: item.points });

    res.status(201).json(swap);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserSwaps = async (req, res) => {
  try {
    const swaps = await Swap.find({
      $or: [{ requester: req.user.id }, { owner: req.user.id }],
    })
      .populate("item")
      .populate("requester", "name")
      .populate("owner", "name");
    res.json(swaps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSwapStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const swap = await Swap.findById(req.params.id).populate("item");
    if (!swap) return res.status(404).json({ message: "Swap not found" });
    if (swap.owner.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    swap.status = status;

    const item = await Item.findById(swap.item._id);
    const requester = await User.findById(swap.requester);

    if (status === "accepted") {
      // optionally notify
    }

    if (status === "rejected") {
      requester.points += item.points;
      await requester.save();
      await PointsTransaction.create({ user: requester._id, type: "earned", amount: item.points });
    }

    if (status === "completed") {
      swap.completedAt = new Date();
      item.isSwapped = true;
      await item.save();

      const owner = await User.findById(swap.owner);
      owner.points += item.points;
      await owner.save();
      await PointsTransaction.create({ user: owner._id, type: "earned", amount: item.points });
    }

    await swap.save();
    res.json(swap);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllSwaps = async (req, res) => {
  try {
    const swaps = await Swap.find()
      .populate("item")
      .populate("requester", "name")
      .populate("owner", "name");

    res.json(swaps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};