import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dev() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("ALL");

  const navigate = useNavigate();

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

  const handleLogout = () => {
    axios
      .post(
        "https://product-page-pcoy.onrender.com/access/logout",
        {},
        { withCredentials: true },
      )
      .then(() => {
        navigate("/");
      });
  };

  return (
    <>
      <div className="flex flex-col items-center absolute right-5 top-20">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mb-4 px-3 py-2 border border-gray-300 rounded shadow-sm"
        >
          <option value="ALL">All</option>
          <option value="PENDING">Pending</option>
          <option value="PAID">Paid</option>
          <option value="SHIPPED">Shipped</option>
        </select>
      </div>

      <button
        className="absolute right-5 top-34 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow transition duration-150"
        onClick={() => {
          handleLogout();
        }}
      >
        Logout
      </button>

      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Orders</h1>
        {data
          .filter((order) => filter === "ALL" || order.status === filter)
          .map((item, index) => (
            <div
              key={item._id || index}
              className="bg-white shadow-md rounded p-4 mb-4 border border-gray-200"
            >
              {/* Top Row: Contact and Address */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                  <h2 className="text-lg font-semibold">{item.contact}</h2>
                  <p className="text-gray-600">{item.address}</p>
                </div>
                <div className="mt-2 md:mt-0 text-right">
                  <p className="text-gray-700 font-medium">
                    Total: ₹{item.totalAmount}
                  </p>
                  <select
                    value={item.status}
                    onChange={async (e) => {
                      const newStatus = e.target.value;
                      try {
                        await axios.put(
                          `https://product-page-pcoy.onrender.com/api/update-status/${item._id}`,
                          {
                            status: newStatus,
                          },
                        );
                        // Update local state
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
                    className={`border px-2 py-1 rounded text-sm mt-1
                        ${item.status === "PAID" ? "bg-green-100 text-green-700 border-green-400" : ""}
                        ${item.status === "PENDING" ? "bg-yellow-100 text-yellow-800 border-yellow-400" : ""}
                        ${item.status === "SHIPPED" ? "bg-blue-100 text-blue-700 border-blue-400" : ""}
                      `}
                  >
                    <option className="bg-yellow-300" value="PENDING">
                      Pending
                    </option>
                    <option className="bg-green-500" value="PAID">
                      Paid
                    </option>
                    <option className="bg-blue-500" value="SHIPPED">
                      Shipped
                    </option>
                  </select>
                  <p className="text-gray-500 text-sm">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <hr className="mb-4" />

              {/* Items List */}
              <div>
                <h3 className="font-semibold mb-2">Items</h3>
                {item.items.map((orderItem, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between border-b border-gray-100 py-1"
                  >
                    <div>
                      <p className="font-medium">{orderItem.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {orderItem.quantity}
                      </p>
                    </div>
                    <p className="font-medium">
                      ₹{orderItem.price * orderItem.quantity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Dev;
