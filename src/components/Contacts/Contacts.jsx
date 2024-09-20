import React from 'react';
import { MdLocalPhone, MdOutlinePermContactCalendar, MdEmail } from 'react-icons/md';

// Sample contact data
const contacts = [
  { id: 1, name: 'Patricia Mbui', email: '' },
  { id: 2, name: 'P.mbui@gmail.com', email: '' },
  { id: 3, name: '+254 721 615 569', email: '' }
];

const Contacts = () => {
  return (
    <div className="p-5 font-averia flex flex-col items-center min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-2 uppercase">Contacts</h1>
      <div className="w-full max-w-6xl p-8 bg-gray-100 rounded shadow-lg flex flex-col items-center space-y-10">
        <div className="w-full flex space-x-8">
          {/* Contacts Section */}
          <ul className="space-y-8 w-full max-w-md">
            {contacts.map(contact => (
              <li key={contact.id} className="bg-secondary p-4 rounded shadow-md text-center flex flex-col items-center">
                <div className="flex items-center space-x-2">
                  <MdOutlinePermContactCalendar />
                  <p className="text-lg font-semibold">{contact.name}</p>
                </div>
                {contact.email ? (
                  <div className="flex items-center space-x-2">
                    <MdEmail />
                    <p className="text-sm text-gray-600">{contact.email}</p>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <MdLocalPhone />
                    <p className="text-sm text-gray-600">{contact.name}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
          {/* Form Section */}
          <div className="ml-4 w-full max-w-md p-4 bg-secondary rounded shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Get in Touch</h2>
            <form>
              {/* Flex container for first name and last name */}
              <div className="flex space-x-4 mb-4">
                {/* First Name */}
                <div className="w-1/2">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    id="first-name"
                    name="first-name"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {/* Last Name */}
                <div className="w-1/2">
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    id="last-name"
                    name="last-name"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* Email */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {/* Message */}
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
