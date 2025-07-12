const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const auth = require("../middleware/authMiddleware");
const { upload } = require("../config/cloudinary");

// ✅ POST /api/items with image upload
router.post("/", auth, upload.array("images", 5), async (req, res) => {
  try {
    const imageUrls = req.files.map((file) => file.path); // ✅ get Cloudinary URLs

    const newItem = new Item({
      ...req.body,
      uploader: req.user.id, // use `uploader` if that’s in your schema
      images: imageUrls,
      tags: req.body.tags?.split(",").map(tag => tag.trim()) || [],
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    console.error("Item upload error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET /api/items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().populate("user", "name");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
