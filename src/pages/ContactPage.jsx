import { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../constants/endpoints";
import { postRequest } from "../helpers/api";

const ContactPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error message as the user types
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      const response = await postRequest(endpoints.contact, formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response?.status === 200) {
        setSubmitted(true);
        setFormData({ name: "", phone: "", email: "", message: "" });
        setTimeout(() => navigate("/dashboard"), 2000);
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1280px] px-3 md:px-5 flex flex-col items-center py-16">
      <h1 className="text-2xl md:text-3xl font-extrabold text-primary-0 mb-10">
        Contact Us
      </h1>

      {/* Company Info Section */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6">
          <FaMapMarkerAlt className="text-4xl text-primary-0 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Our Location</h3>
          <p className="text-sm text-center">123 Main Street, Yangon, Myanmar</p>
        </div>

        <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6">
          <FaPhoneAlt className="text-4xl text-primary-0 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Call Us</h3>
          <p className="text-sm">(+95) 123-456-789</p>
        </div>

        <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6">
          <FaEnvelope className="text-4xl text-primary-0 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Email Us</h3>
          <p className="text-sm">info@companyname.com</p>
        </div>
      </div>

      {/* Contact Form and Map Section */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Contact Form */}
        <div className="w-full min-h-[400px] bg-white shadow-lg rounded-lg p-8">
          {submitted ? (
            <div className="text-center">
              <h2 className="text-xl font-semibold text-primary-0 mb-4">
                Thank You!
              </h2>
              <p>Your message has been received. We&apos;ll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-0"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-0"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-0"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-0"
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-primary-0 text-white py-3 rounded-md text-base font-semibold hover:opacity-90 disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          )}
        </div>

        {/* Embedded Map */}
        <div className="w-full h-full bg-gray-200 rounded-lg overflow-hidden">
          <iframe
            title="Company Location"
            src="https://www.google.com/maps/embed?..."
            className="w-full h-full border-0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
