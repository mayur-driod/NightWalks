import React, { useEffect, useState } from "react";
import Cart from "./components/Cart";
import { FaCartArrowDown } from "react-icons/fa";
import ScrollToBottomButton from "./components/ScrollToBottomButton";
import stars from "./assets/stars-1654074.jpg";
import Booking from "./components/Booking";
import axios from "axios";

function Buy() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const events = await axios.get("http://localhost:3000/Events/Fetch");
      if (!events) {
        return console.log("No events found!");
      }
      setProducts(events.data);
    };
    getEvents();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // If item already in cart, increment only if quantity < 6
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity < 6 ? item.quantity + 1 : item.quantity,
              }
            : item,
        );
      } else {
        // If item not in cart, add with quantity 1
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <div className="w-screen min-h-screen flex flex-col md:flex-row bg-black">
      {/* Product Section */}
      <div className="w-full md:w-2/3 p-6 z-1">
        <h1 className="text-3xl font-bold mb-6">Sessions happening soon</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((event) => (
            <div
              key={event.id}
              className="flex flex-col bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-[1.02] transition duration-300"
            >
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-52 object-cover"
              />
              <div className="p-5 flex flex-col h-full justify-between">
                <div>
                  <h2 className="text-2xl font-semibold mb-2 text-white">
                    {event.name}
                  </h2>
                  <p className="text-green-300 text-lg font-medium">
                    ₹{event.price}
                  </p>
                  <p className="text-sm text-gray-300 mt-1">
                    {new Date(event.date).toLocaleDateString("en-GB")} @{" "}
                    {event.time}
                  </p>
                </div>
                <button
                  className="mt-6 bg-green-500 text-black font-semibold py-2 px-4 rounded-xl hover:bg-green-400 transition"
                  onClick={() => addToCart(event)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-full border-white md:w-1/3 p-6 border-t md:border-t-0 md:border-l bg-[rgba(0,0,0,0.3)] z-1">
        <Cart cart={cart} setCart={setCart} />
      </div>

      <ScrollToBottomButton />

      {/* Background Stars (need to work on and change) */}
      <img
        src={stars}
        alt="Background stars"
        className="absolute top-15 left-0 w-full h-full object-cover opacity-30 z-0"
      />
    </div>
  );
}

export default Buy;
