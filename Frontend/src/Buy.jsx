import React, { useEffect, useState } from "react";
import Cart from "./components/Cart";
import { FaCartArrowDown } from "react-icons/fa";
import ScrollToBottomButton from "./components/ScrollToBottomButton";
import stars from "./assets/stars-1654074.jpg";
import Booking from "./components/Booking";

const products = [
  {
    id: "p1",
    date: "27th May 2025",
    venue: "Kudremukh National Park",
    price: 499,
    pic: "https://ugc.production.linktr.ee/8b4a9e9e-3ee8-4f22-96e2-2f4626e07664_image.png?io=true&size=thumbnail-feature-v1_0",
  },
  {
    id: "p2",
    date: "31st May 2025",
    venue: "Kudremukh National Park",
    price: 799,
    pic: "https://ugc.production.linktr.ee/bc80d637-17b6-412d-a022-53dd7939bbaa_image.png?io=true&size=thumbnail-feature-v1_0",
  },
  // {
  //   id: "p3",
  //   date: "Malabar Pit Viper",
  //   venue: "Kudremukh National Park",
  //   price: 999,
  //   pic: "https://res.cloudinary.com/dh4zgual6/image/upload/v1744810516/TerraQuest/Sightings/oiftxsbprqhn8dbeprk9.jpg",
  // },
  // {
  //   id: "p4",
  //   date: "Oriental Garden Lizard",
  //   venue: "Kudremukh National Park",
  //   price: 1299,
  //   pic: "https://res.cloudinary.com/dh4zgual6/image/upload/v1744793542/TerraQuest/Sightings/xcok7xn8d7jblxkylagi.jpg",
  // },
];

function Buy() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

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
          {products.map((p) => (
            <div
              key={p.id}
              className="p-4 bg-white border rounded-lg shadow hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold">{p.date}</h2>
              <img className="w-full h-50 object-cover rounded" src={p.pic} />
              <p className="text-sm mb-2 mt-2">₹{p.price}</p>
              <button
                className="mt-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={() => addToCart(p)}
              >
                Add to Cart
              </button>
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
