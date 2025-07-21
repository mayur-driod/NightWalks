const express = require("express");
const router = express.Router();
const ExportController = require("../controllers/ExportController");
const {
  createOrder,
  verifyPayment,
  getall,
  updateStatus,
  sendemail,
} = require("../controllers/orderController");

router.post("/create", createOrder);
router.post("/verify", verifyPayment);

router.post("/sendemail", sendemail);

router.get("/getall", getall);

router.put("/update-status/:id", updateStatus);

//export specific order
router.get(
  "/export/participants/:eventId",
  ExportController.exportParticipantsByEvent,
);

// Export all orders
router.get("/export/orders", ExportController.exportAllOrders);

module.exports = router;
