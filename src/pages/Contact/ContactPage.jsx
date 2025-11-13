import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center py-16 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-8"
      >
        Contact Us
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-orange-400 mb-6">Get in Touch</h2>
          <div className="space-y-4 text-gray-300">
            <p className="flex items-center gap-3">
              <Mail className="text-orange-500" /> support@moviemasterpro.com
            </p>
            <p className="flex items-center gap-3">
              <Phone className="text-orange-500" /> +880 1312 939 830
            </p>
            <p className="flex items-center gap-3">
              <MapPin className="text-orange-500" /> Mirpur 1, Dhaka, Bangladesh
            </p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-orange-400 mb-6">Send a Message</h2>

          <div className="mb-4">
            <label className="block mb-1 text-sm text-orange-300">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-black border border-orange-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm text-orange-300">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-black border border-orange-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-sm text-orange-300">Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 rounded-lg bg-black border border-orange-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-700 py-3 rounded-lg font-bold hover:scale-105 transition-transform"
          >
            <Send size={20} /> Send Message
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default ContactPage;
