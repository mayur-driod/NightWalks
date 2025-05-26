import axios from "axios";
import React, { useEffect, useState } from "react";
import ProgressBar from "./components/ProgressBar";

function Track() {
  const [data, setData] = useState([]);
  const [contactInput, setContactInput] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(
          "https://product-page-pcoy.onrender.com/api/getall",
        );
        setData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchdata();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilter(contactInput.trim());
  };

  return (
    <div className="max-screen min-h-screen mx-auto px-4 py-8 bg-black opacity-90">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">
        Track Your Order
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4 mb-8 justify-center"
      >
        <input
          type="tel"
          placeholder="Enter your phone number"
          value={contactInput}
          onChange={(e) => setContactInput(e.target.value)}
          className="flex-1 px-4 py-2 border max-w-4xl bg-gray-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          type="submit"
          className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition duration-200"
        >
          Check Status
        </button>
      </form>

      <div className="flex justify-center mb-6">
        {filter !== "" && (
          <div className="space-y-6 max-w-6xl">
            {data
              .filter((item) => item.contact === filter)
              .map((item) => (
                <div
                  key={item._id}
                  className="bg-white border border-gray-200 shadow-sm rounded-lg p-6"
                >
                  <ProgressBar status={item.status} />

                  <div className="mb-4">
                    <p>
                      <span className="font-semibold">Contact:</span>{" "}
                      {item.contact}
                    </p>
                    <p className="overflow-x-scroll">
                      <span className="font-semibold">Address:</span>{" "}
                      {item.address}
                    </p>
                    <p>
                      <span className="font-semibold">Status:</span>{" "}
                      <span
                        className={`px-2 py-1 rounded text-white text-sm ${
                          item.status === "PAID"
                            ? "bg-green-600"
                            : item.status === "SHIPPED"
                              ? "bg-blue-600"
                              : "bg-yellow-500"
                        }`}
                      >
                        {item.status}
                      </span>
                    </p>
                    <p>
                      <span className="font-semibold">Total:</span> ₹
                      {item.totalAmount}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Items:</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      {item.items.map((i, idx) => (
                        <li key={idx}>
                          {i.name} × {i.quantity} — ₹{i.price * i.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

            {data.filter((item) => item.contact === filter).length === 0 && (
              <p className="text-center text-gray-500">
                No orders found for this number.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Track;
