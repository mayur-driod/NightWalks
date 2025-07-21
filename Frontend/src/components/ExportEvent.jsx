import axios from "axios";

function ExportEvent() {
  const handleDownloadParticipants = async (eventId) => {
    const res = await axios.get(`/api/order/export/participants/${eventId}`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `participants-${eventId}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  const handleDownloadAllOrders = async () => {
    const res = await axios.get(`/api/order/export/orders`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "all-orders.xlsx");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Export Data</h1>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
        onClick={() => handleDownloadParticipants("your_event_id_here")}
      >
        Export Participants (Event)
      </button>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={handleDownloadAllOrders}
      >
        Export All Orders
      </button>
    </div>
  );
}

export default ExportEvent;
