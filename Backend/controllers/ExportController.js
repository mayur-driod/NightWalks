const Order = require("../models/Order");
const Event = require("../models/Event");
const { json2csv } = require("json-2-csv");
const XLSX = require("xlsx");

exports.exportParticipantsByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ error: "Event not found" });

    const orders = await Order.find({ "items._id": eventId });

    const data = [];

    for (const order of orders) {
      for (const person of order.people) {
        data.push({
          Event: event.name,
          EventDate: event.date.toDateString(),
          Name: person.name,
          Age: person.age,
          Contact: order.contact,
          Email: order.email,
          Address: order.address,
          Status: order.status,
          OrderedAt: order.createdAt.toISOString(),
        });
      }
    }

    const csv = await json2csv(data);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="participants-${event.name}.csv"`,
    );
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to export participants" });
  }
};

exports.exportAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    const data = orders.map((order) => ({
      Contact: order.contact,
      Email: order.email,
      Address: order.address,
      Participants: order.people.length,
      Items: order.items.map((i) => `${i.name} x${i.quantity}`).join(", "),
      TotalAmount: order.totalAmount,
      Status: order.status,
      OrderedAt: order.createdAt.toISOString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="all-orders.xlsx"`,
    );
    res.type(
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to export orders" });
  }
};
