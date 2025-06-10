import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dev() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [sortOption, setSortOption] = useState("latest");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/getall",
        );
        setData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchdata();
  }, []);

  const handleLogout = () => {
    axios
      .post(
        "http://localhost:3000/access/logout",
        {},
        { withCredentials: true },
      )
      .then(() => navigate("/"));
  };

  const filteredData = data.filter(
    (order) => filter === "ALL" || order.status === filter,
  );

  const sortedData = filteredData.sort((a, b) => {
    if (sortOption === "latest")
      return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortOption === "oldest")
      return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortOption === "amountHigh") return b.totalAmount - a.totalAmount;
    if (sortOption === "amountLow") return a.totalAmount - b.totalAmount;
    return 0;
  });

  return (
    <>
      {/* Filter, Sort, and Logout Bar */}
      <div className="min-h-screen">
        <div className="flex flex-wrap justify-between items-start px-5 pt-5 gap-4">
          <div className="flex gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded shadow-sm"
            >
              <option value="ALL">All</option>
              <option value="PENDING">Pending</option>
              <option value="PAID">Paid</option>
              <option value="CONFIRMED">Confirmed</option>
            </select>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded shadow-sm"
            >
              <option value="latest">Date: Latest First</option>
              <option value="oldest">Date: Oldest First</option>
              <option value="amountHigh">Amount: High to Low</option>
              <option value="amountLow">Amount: Low to High</option>
            </select>
          </div>

          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow transition duration-150"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {/* Orders List */}
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-6">Orders</h1>

          {sortedData.map((item, index) => (
            <div
              key={item._id || index}
              className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200"
            >
              {/* Contact + Order Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h2 className="text-lg font-semibold mb-1">Contact Info</h2>
                  <p>
                    <strong>Phone:</strong> {item.contact}
                  </p>
                  <p>
                    <strong>Email:</strong> {item.email}
                  </p>
                  <p className="mt-1">
                    <strong>Address:</strong> {item.address}
                  </p>
                </div>

                <div className="text-right md:text-left">
                  <p className="font-medium text-lg">
                    Total: ₹{item.totalAmount}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    Ordered on: {new Date(item.createdAt).toLocaleString()}
                  </p>

                  <select
                    value={item.status}
                    onChange={async (e) => {
                      const newStatus = e.target.value;
                      try {
                        await axios.put(
                          `http://localhost:3000/api/update-status/${item._id}`,
                          { status: newStatus },
                        );
                        setData((prev) =>
                          prev.map((order) =>
                            order._id === item._id
                              ? { ...order, status: newStatus }
                              : order,
                          ),
                        );
                      } catch (err) {
                        console.error(err);
                        alert("Failed to update status");
                      }
                    }}
                    className={`border px-3 py-1 rounded text-sm font-medium
                    ${item.status === "PAID" ? "bg-green-100 text-green-800 border-green-400" : ""}
                    ${item.status === "PENDING" ? "bg-yellow-100 text-yellow-800 border-yellow-400" : ""}
                    ${item.status === "CONFIRMED" ? "bg-blue-100 text-blue-800 border-blue-400" : ""}
                  `}
                  >
                    <option value="PENDING">Pending</option>
                    <option value="PAID">Paid</option>
                    <option value="CONFIRMED">Confirmed</option>
                  </select>
                </div>
              </div>

              {/* People */}
              {item.people?.length > 0 && (
                <>
                  <h3 className="font-semibold mt-4 mb-2">People</h3>
                  <ul className="list-disc list-inside text-sm text-gray-700 mb-4">
                    {item.people.map((person, i) => (
                      <li key={i}>
                        {person.name} ({person.age} years old)
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* Items */}
              <div>
                <h3 className="font-semibold mb-2">Items</h3>
                {item.items.map((orderItem, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between border-b border-gray-100 py-2 text-sm"
                  >
                    <div>
                      <p className="font-medium">{orderItem.name}</p>
                      <p className="text-gray-500">Qty: {orderItem.quantity}</p>
                    </div>
                    <p className="font-semibold">
                      ₹{orderItem.price * orderItem.quantity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dev;
