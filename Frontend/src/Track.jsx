import axios from "axios";
import React, { useEffect, useState } from "react";
import ProgressBar from "./components/ProgressBar";
import stars from "./assets/stars-1654074.jpg";

function Track() {
  const [data, setData] = useState([]);
  const [contactInput, setContactInput] = useState("");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/getall",
        );
        setData(res.data.data);
      } catch (err) {
        setError("Failed to load orders.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilter(contactInput.trim());
  };

  const filteredData = data.filter((item) => item.contact === filter);

  return (
    <>
      <div className="min-h-screen px-4 py-8 bg-[rgba(0,0,0,0.7)] text-white z-1">
        <h1 className="text-3xl font-bold mb-8 mt-10 text-center">
          Track Your Order
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-10"
        >
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={contactInput}
            onChange={(e) => setContactInput(e.target.value)}
            className="w-full max-w-lg px-4 py-2 rounded border border-gray-300 shadow-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded transition duration-200"
          >
            Check Status
          </button>
        </form>

        <div className="flex justify-center">
          <div className="w-full max-w-4xl space-y-6">
            {loading && (
              <p className="text-center text-gray-400">Loading orders...</p>
            )}
            {error && <p className="text-center text-red-400">{error}</p>}

            {filter && !loading && filteredData.length === 0 && (
              <p className="text-center text-gray-400">
                No orders found for this number.
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6">
              {filteredData.map((item) => (
                <div
                  key={item._id}
                  className="bg-white text-black p-6 rounded-lg shadow border border-gray-200"
                >
                  <ProgressBar status={item.status} />

                  <div className="mb-4 space-y-1">
                    <p>
                      <span className="font-semibold">Contact:</span>{" "}
                      {item.contact}
                    </p>
                    <p className="overflow-x-auto">
                      <span className="font-semibold">Address:</span>{" "}
                      {item.address}
                    </p>
                    <p>
                      <span className="font-semibold">Status:</span>{" "}
                      <span
                        className={`inline-block px-2 py-1 text-sm rounded text-white font-medium ${
                          item.status === "PAID"
                            ? "bg-green-600"
                            : item.status === "CONFIRMED"
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
                    <h3 className="font-semibold mb-2">Items</h3>
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
            </div>
          </div>
        </div>
      </div>

      <div
        className="fixed inset-0 bg-cover -z-10"
        style={{ backgroundImage: `url(${stars})` }}
      ></div>
    </>
  );
}

export default Track;
