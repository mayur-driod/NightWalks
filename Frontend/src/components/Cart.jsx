import React, { useState } from "react";
import Booking from "./Booking";
import axios from "axios";

const Cart = ({ cart, setCart }) => {
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [showBooking, setShowBooking] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = async (people) => {
    if (!contact) return alert("Please enter your phone number");
    if (!people) return alert("Please enter participants details");
    if (!email) return alert("Please enter your email");
    if (!isValidEmail(email)) return alert("Invalid email format");
    if (!isValidPhone(contact)) return alert("Invalid Phone number");
    if (!isValidAddress(address)) return alert("Invalid address");

    try {
      const { data } = await axios.post(
        "https://nightwalks.onrender.com/api/create",
        {
          contact,
          email,
          people,
          address,
          items: cart,
          totalAmount: total,
        },
      );

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "My Shop",
        description: "Order Payment",
        order_id: data.orderId,
        handler: async (response) => {
          const verifyRes = await axios.post(
            "https://nightwalks.onrender.com/api/verify",
            response,
          );
          alert("Payment successful! 🎉 Order ID: " + verifyRes.data.order._id);
          setCart([]);
          setShowBooking(false);
        },
        prefill: { contact },
        theme: { color: "#0f766e" },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed.");
    }
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + delta;
            // Cap quantity between 1 and 6
            if (newQuantity < 1) return null; // filter out later
            if (newQuantity > 6) return item; // do not update
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item && item.quantity > 0),
    );
  };

  const isValidPhone = (phone) => /^[6-9]\d{9}$/.test(phone);
  const isValidAddress = (addr) => addr.trim().length >= 10;

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const submit = (e) => {
    e.preventDefault();
    setShowBooking(true);
  };

  return (
    <div className="mt-6 p-4 relative">
      <h2 className="text-xl font-semibold mb-4 text-white">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-50">No items in cart</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-gray-50 p-3 rounded shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image || "https://via.placeholder.com/50"}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg font-bold"
                      >
                        −
                      </button>
                      <span className="px-2">People: {item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <span className="text-right font-semibold text-gray-700">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 text-lg text-white font-bold text-right">
            Total: ₹{total}
          </div>

          <form
            onSubmit={(e) => {
              submit(e);
            }}
          >
            <label className="text-white block mt-4">Contact Number</label>
            <input
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="+91 98765 43210"
              required
              pattern="[6-9][0-9]{9}"
              title="Enter a valid 10-digit phone number starting with 6, 7, 8, or 9"
              className="border bg-gray-50 border-gray-300 px-4 py-2 w-full rounded mt-2"
            />

            <label className="text-white block mt-4">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mayur@example.com"
              className="border bg-gray-50 border-gray-300 px-4 py-2 w-full rounded mt-2"
            />

            <label className="text-white block mt-4">Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 h-20 border bg-gray-50 border-gray-300 rounded-xs"
              placeholder="Your full address..."
            />

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded mt-3 w-full transition"
            >
              Book Now
            </button>
          </form>
        </>
      )}

      {showBooking && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          {/* Blur background */}
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.7)] backdrop-blur-sm"></div>
          <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
            <Booking
              contact={contact}
              email={email}
              address={address}
              items={cart}
              totalAmount={total}
              handlepayment={handlePayment}
            />
            <button
              onClick={() => setShowBooking(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
