import React, { useState } from "react";

const OrderPaypal = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle Paypal payment logic here
    console.log("Paypal payment submitted", formData);
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 pt-12 pb-20 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-center pb-10 uppercase font-averia">
          Paypal Payment
        </h1>
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-lg font-semibold">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-2 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-lg font-semibold">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-2 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-lg font-semibold">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-2 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 p-2 border rounded-md w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md w-full"
          >
            Pay
          </button>
        </form>
      </div>
    </section>
  );
};

export default OrderPaypal;
