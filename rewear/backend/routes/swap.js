const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  requestSwap,
  getUserSwaps,
  updateSwapStatus,
  getAllSwaps,
} = require("../controllers/swapController");

router.post("/", auth, requestSwap); // Create a new swap request
router.get("/", auth, getUserSwaps); // Get all swaps for logged-in user
router.put("/:id", auth, updateSwapStatus); // Accept/Reject/Complete a swap
router.get("/admin/all", auth, getAllSwaps); // (optional) Get all swaps for admin

module.exports = router;
