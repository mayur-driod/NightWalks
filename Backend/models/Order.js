const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  contact: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Contact must be a valid 10-digit phone number"],
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  address: {
    type: String,
    required: true,
    minlength: [10, "Address must be at least 10 characters long"],
  },
  items: [
    {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
        minlength: [1, "Item name cannot be empty"],
      },
      price: {
        type: Number,
        required: true,
        min: [0, "Price must be a positive number"],
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity must be at least 1"],
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
    min: [0, "Total amount must be a positive number"],
  },
  status: {
    type: String,
    enum: ["PENDING", "PAID", "CONFIRMED"],
    default: "PENDING",
  },
  razorpayOrderId: {
    type: String,
    default: null,
  },
  razorpayPaymentId: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
