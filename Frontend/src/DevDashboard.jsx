import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoReload } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";

function DevDashboard() {
  // Dummy live events data
  const [liveEvents, setLiveEvents] = useState([]);
  const [orders, setOrders] = useState([]);

  const getEvents = async () => {
    const events = await axios.get(
      "https://nightwalks.onrender.com/Events/Fetch",
    );
    if (!events) {
      return console.log("No events found!");
    }
    setLiveEvents(events.data);
  };

  useEffect(() => {
    const getEvents = async () => {
      const events = await axios.get(
        "https://nightwalks.onrender.com/Events/Fetch",
      );
      if (!events) {
        return console.log("No events found!");
      }
      setLiveEvents(events.data);
    };
    getEvents();
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(
          "https://nightwalks.onrender.com/api/getall",
        );
        setOrders(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchdata();
  }, []);

  const [form, setForm] = useState({
    name: "",
    date: "",
    time: "",
    price: 0,
    picture: null,
  });

  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("date", form.date);
    formData.append("time", form.time);
    formData.append("price", form.price);
    formData.append("image", form.picture); // MUST match 'upload.single("image")'

    try {
      const res = await axios.post(
        "https://nightwalks.onrender.com/Events/Create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log("✅ Upload success:", res.data);
      setForm({ name: "", date: "", time: "", price: 0, picture: null });
      alert("Uploaded successfully please refresh the live events panel!");
    } catch (err) {
      console.error("❌ Upload failed:", err.response?.data || err.message);
    }
  };

  const handleOrdersClick = () => {
    window.location.href = "/orders"; // Redirect to orders page
  };

  // Disable (retire) event by id
  const handleDisableEvent = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?",
    );

    if (!confirmed) return;

    setLiveEvents((prev) => prev.filter((event) => event.id !== id));
    console.log(id);

    try {
      const del = await axios.delete(
        `https://nightwalks.onrender.com/Events/Delete/${id}`,
      );
      console.log(del);
      alert("Deleted event! Please hit refresh on the live events panel.");
    } catch (err) {
      console.log("There was an error", err);
      alert("Failed to delete the event.");
    }
  };

  const handleLogout = () => {
    axios
      .post(
        "https://nightwalks.onrender.com/access/logout",
        {},
        { withCredentials: true },
      )
      .then(() => {
        navigate("/");
      });
  };

  const handleDownloadParticipants = async (eventId, eventName) => {
    try {
      const res = await axios.get(
        `https://nightwalks.onrender.com/api/export/participants/${eventId}`,
        { responseType: "blob" },
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `participants-${eventName}.csv`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
      alert("Failed to download participants");
    }
  };

  const handleDownloadAllOrders = async () => {
    try {
      const res = await axios.get(
        "https://nightwalks.onrender.com/api/export/orders",
        {
          responseType: "blob",
        },
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "all-orders.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
      alert("Failed to download orders");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <button
        className="absolute right-5 top-20 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow transition duration-150"
        onClick={() => {
          handleLogout();
        }}
      >
        Logout
      </button>
      {/* Sidepanel */}
      <aside className="w-64 bg-white border-r p-6">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl font-bold mb-4">Live Events</h2>
          <button
            onClick={() => {
              getEvents();
            }}
            className="mb-4"
          >
            {<IoReload />}
          </button>
        </div>
        <ul>
          <div className="mt-6">
            <button
              className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 text-sm"
              onClick={handleDownloadAllOrders}
            >
              Export All Orders (Excel)
            </button>
          </div>

          {liveEvents.map((event) => (
            <li
              key={event._id}
              className="mb-3 flex items-center justify-between"
            >
              <div>
                <div className="font-semibold">{event.name}</div>
                <div className="text-sm text-gray-600">
                  {new Date(event.date).toLocaleDateString("en-GB")} @{" "}
                  {event.time}
                </div>
                {/* Show price with rupee symbol if price exists */}
                {event.price !== undefined && (
                  <div className="text-sm text-green-700">₹{event.price}</div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <button
                  className="ml-2 text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDisableEvent(event._id)}
                  title="Disable Event"
                >
                  Disable
                </button>
                <button
                  className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  onClick={() =>
                    handleDownloadParticipants(event._id, event.name)
                  }
                  title="Export Participants"
                >
                  Export CSV
                </button>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-6 mt-4">Developer Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Orders Card */}
          <div className="p-6 bg-white border rounded-lg shadow hover:shadow-lg transition flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Orders</h2>
            {/* Orders Preview */}
            <div className="mb-4">
              <ul>
                {orders.length > 0 ? (
                  orders
                    .filter((item) => item.status === "PAID")
                    .map((item) => (
                      <li
                        key={item._id}
                        className="flex items-center justify-between py-1 border-b text-sm"
                      >
                        <span>{item.email}</span>
                        <div className="w-full h-full flex flex-row justify-center items-end gap-2">
                          <FaPeopleGroup className="text-3xl" />
                          <p className="text-xl">{item.people.length}</p>
                        </div>
                        <button
                          onClick={async () => {
                            const confirmed = window.confirm(
                              "Are you sure you want to Approve this user?",
                            );
                            if (!confirmed) return;
                            const newStatus = "CONFIRMED";
                            const curID = item._id;
                            try {
                              await axios.put(
                                `https://nightwalks.onrender.com/api/update-status/${curID}`,
                                { status: newStatus },
                              );
                              setOrders((prev) =>
                                prev.map((order) =>
                                  order._id === curID
                                    ? { ...order, status: newStatus }
                                    : order,
                                ),
                              );
                            } catch (err) {
                              console.error(err);
                              alert("Failed to update status");
                            }
                          }}
                          className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
                        >
                          Approve
                        </button>
                      </li>
                    ))
                ) : (
                  <></>
                )}
              </ul>
            </div>

            <button
              className="mt-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={handleOrdersClick}
            >
              See Orders
            </button>
          </div>

          {/* Add Event Form */}
          <div className="p-6 bg-white border rounded-lg shadow flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Add New Event</h2>
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Event Name"
                value={form.name}
                onChange={handleFormChange}
                required
                className="border rounded px-3 py-2"
              />
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleFormChange}
                required
                className="border rounded px-3 py-2"
              />
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleFormChange}
                required
                className="border rounded px-3 py-2"
              />
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleFormChange}
                  required
                  className="border rounded pl-7 px-3 py-2 w-full"
                  placeholder="Price"
                  min="0"
                />
              </div>

              {/* Drag and Drop Image Upload */}
              <div
                className={`border-2 border-dashed rounded px-3 py-6 text-center cursor-pointer transition ${
                  form.picture
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 bg-gray-50"
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    setForm((prev) => ({
                      ...prev,
                      picture: e.dataTransfer.files[0],
                    }));
                  }
                }}
                onClick={() => {
                  document.getElementById("event-picture-input").click();
                }}
              >
                {form.picture ? (
                  <div>
                    <span className="block font-medium text-green-700 mb-2">
                      {form.picture.name}
                    </span>
                    <img
                      src={URL.createObjectURL(form.picture)}
                      alt="Preview"
                      className="mx-auto h-24 object-contain rounded"
                    />
                    <button
                      type="button"
                      className="mt-2 text-xs text-red-500 underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setForm((prev) => ({
                          ...prev,
                          picture: null,
                        }));
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <span className="text-gray-500">
                    Drag &amp; drop an image here, or{" "}
                    <span className="underline text-blue-600">browse</span>
                  </span>
                )}
                <input
                  id="event-picture-input"
                  type="file"
                  name="picture"
                  accept="image/*"
                  onChange={handleFormChange}
                  className="hidden"
                />
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Add Event
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DevDashboard;
