const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");
const sendConfirmationEmail = require("../utils/mailer");
require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

createOrder = async (req, res) => {
  const { contact, email, people, address, items, totalAmount } = req.body;
  try {
    const options = {
      amount: totalAmount * 100, // INR to paisa
      currency: "INR",
      receipt: "order_rcptid_" + Date.now(),
    };

    const razorpayOrder = await razorpay.orders.create(options);
    console.log(razorpayOrder);

    const newOrder = await Order.create({
      contact,
      email,
      people,
      address,
      items,
      totalAmount,
      razorpayOrderId: razorpayOrder.id,
    });

    res.status(201).json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create order", error: err.message });
  }
};

verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generatedSignature === razorpay_signature) {
    const order = await Order.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      { status: "PAID", razorpayPaymentId: razorpay_payment_id },
      { new: true },
    );
    res.json({ message: "Payment verified successfully", order });
  } else {
    res.status(400).json({ message: "Payment verification failed" });
  }
};

const getall = async (req, res) => {
  try {
    const data = await Order.find();
    res.status(200).json({ data: data, msg: "Got data successfully" });
  } catch (err) {
    res.status(500).json({ Msg: "There was an internal server error!" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log(id);

    const validStatuses = ["PENDING", "PAID", "CONFIRMED"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ msg: "Invalid status" });
    }

    const updated = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!updated) return res.status(404).json({ msg: "Order not found" });

    const ord = await Order.findById(id);
    const sent = await sendConfirmationEmail(ord.email);

    res.status(200).json({ msg: "Status updated", order: updated, mail: sent });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

const sendemail = async (req, res) => {
  const email = req.body.email;
  if (!email) {
    return res.status(400).json({ Msg: "An email is required!" });
  }
  try {
    await sendConfirmationEmail(email);
    res.status(200).json({ Msg: "Mail was successfully sent" });
  } catch (err) {
    res.status(500).json({ error: err, Msg: "There was a technical error" });
  }
};

module.exports = {
  verifyPayment,
  createOrder,
  getall,
  updateStatus,
  sendemail,
};
