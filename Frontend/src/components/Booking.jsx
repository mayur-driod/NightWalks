import React, { useState } from "react";

function Booking({
  contact,
  email,
  address,
  items = [],
  totalAmount,
  handlepayment,
}) {
  // Flattened people array, one entry per ticket
  const [people, setPeople] = useState(
    items.flatMap((item) =>
      Array.from({ length: item.quantity }, () => ({ name: "", age: "" })),
    ),
  );

  const handleChange = (index, field, value) => {
    const updated = [...people];
    updated[index][field] = value;
    setPeople(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlepayment();
    console.log({
      contact,
      email,
      address,
      items,
      totalAmount,
      people,
    });
  };

  // Calculate starting indexes for each item
  let currentIndex = 0;

  return (
    <div className="overflow-auto max-h-[80vh] p-2">
      <form onSubmit={handleSubmit} className="space-y-4 min-w-[320px]">
        <h2 className="text-xl font-bold mb-4">Booking Details</h2>
        <div>
          <p>
            Email: <strong>{email}</strong>
          </p>
          <p>
            <strong>Contact:</strong> {contact}
          </p>
          <p>
            <strong>Address:</strong> {address}
          </p>
          <p>
            <strong>Total Amount:</strong> ₹{totalAmount}
          </p>
        </div>

        <hr className="my-4" />

        <h3 className="font-semibold mb-2">Participant Details</h3>

        {items.map((item) => {
          const participants = people.slice(
            currentIndex,
            currentIndex + item.quantity,
          );
          const startIndex = currentIndex;
          currentIndex += item.quantity;

          return (
            <div key={item.id} className="mb-6">
              <h4 className="font-bold text-blue-700 mb-2">
                {item.date} ({item.quantity} participant
                {item.quantity > 1 ? "s" : ""})
              </h4>
              {participants.map((person, idx) => (
                <div key={startIndex + idx} className="flex gap-4 mb-2">
                  <input
                    type="text"
                    placeholder="Name"
                    value={person.name}
                    onChange={(e) =>
                      handleChange(startIndex + idx, "name", e.target.value)
                    }
                    className="border px-3 py-2 rounded w-3/4"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Age"
                    value={person.age}
                    onChange={(e) =>
                      handleChange(startIndex + idx, "age", e.target.value)
                    }
                    className="border px-3 py-2 rounded w-1/4"
                    required
                  />
                </div>
              ))}
            </div>
          );
        })}

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
        >
          Confirm & Pay
        </button>
      </form>
    </div>
  );
}

export default Booking;
