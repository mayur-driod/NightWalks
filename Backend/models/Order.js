const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  contact: { type: String, required: true }, // email or phone
  address: { type: String, required: true },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalAmount: Number,
  status: {
    type: String,
    enum: ["PENDING", "PAID", "SHIPPED"],
    default: "PENDING",
  },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
