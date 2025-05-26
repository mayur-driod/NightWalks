import React, { useState } from "react";

function DevDashboard() {
  // Dummy live events data
  const [liveEvents, setLiveEvents] = useState([
    { id: 1, name: "Night Walk 1", date: "2024-06-10", time: "20:00" },
    { id: 2, name: "City Lights", date: "2024-06-12", time: "21:30" },
  ]);
  const [form, setForm] = useState({
    name: "",
    date: "",
    time: "",
    price: 0,
    picture: null,
  });

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLiveEvents((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: form.name,
        date: form.date,
        time: form.time,
        picture: form.picture,
      },
    ]);
    setForm({ name: "", date: "", time: "", picture: null });
  };

  const handleOrdersClick = () => {
    window.location.href = "/orders"; // Redirect to orders page
  };

  // Disable (retire) event by id
  const handleDisableEvent = (id) => {
    setLiveEvents((prev) => prev.filter((event) => event.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidepanel */}
      <aside className="w-64 bg-white border-r p-6">
        <h2 className="text-xl font-bold mb-4">Live Events</h2>
        <ul>
          {liveEvents.map((event) => (
            <li
              key={event.id}
              className="mb-3 flex items-center justify-between"
            >
              <div>
                <div className="font-semibold">{event.name}</div>
                <div className="text-sm text-gray-600">
                  {event.date} @ {event.time}
                </div>
                {/* Show price with rupee symbol if price exists */}
                {event.price !== undefined && (
                  <div className="text-sm text-green-700">₹{event.price}</div>
                )}
              </div>
              <button
                className="ml-2 text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                onClick={() => handleDisableEvent(event.id)}
                title="Disable Event"
              >
                Disable
              </button>
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
              {/* Dummy preview data */}
              <ul>
                <li className="flex items-center justify-between py-1 border-b text-sm">
                  <span>Order #101</span>
                  <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600">
                    Approve
                  </button>
                </li>
                <li className="flex items-center justify-between py-1 border-b text-sm">
                  <span>Order #102</span>
                  <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600">
                    Approve
                  </button>
                </li>
                <li className="flex items-center justify-between py-1 text-sm">
                  <span>Order #103</span>
                  <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600">
                    Approve
                  </button>
                </li>
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
