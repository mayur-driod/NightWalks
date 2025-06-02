import React, { useState } from "react";
import emailjs from "emailjs-com";
import stars from "./assets/stars-1654074.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    organization: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJSSERVICE, // EmailJS service ID
        import.meta.env.VITE_EMAILJSTEMP, // EmailJS template ID
        formData,
        import.meta.env.VITE_PUBLIC, // EmailJS public key
      );

      setStatus("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        organization: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4 relative">
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg z-10 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center tracking-wide">
          📧 Get in Touch
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition shadow-sm bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition shadow-sm bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="organization"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Organization
            </label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition shadow-sm bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition shadow-sm bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition shadow-sm bg-white resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-[1.02]"
          >
            🚀 Send Message
          </button>
        </form>

        {status && (
          <p className="text-center text-sm text-gray-600 mt-4">{status}</p>
        )}
      </div>

      <img
        src={stars}
        alt="Background stars"
        className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
      />
    </div>
  );
};

export default Contact;
