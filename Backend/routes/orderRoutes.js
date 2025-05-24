const express = require("express");
const router = express.Router();
const {
  createOrder,
  verifyPayment,
  getall,
  updateStatus,
} = require("../controllers/orderController");

router.post("/create", createOrder);
router.post("/verify", verifyPayment);

router.get("/getall", getall);

router.put("/update-status/:id", updateStatus);

module.exports = router;
