"use client";
import React, { useState } from "react";

export default function BookingHistory() {
  const [bookingObjs, setObject] = useState([{}]);

  const handleBookingHistory = async (e) => {
    e.preventDefault();
    try {
      const request = await fetch(
        "http://localhost:8080/api/v1/booking/booking-history",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (request.ok) {
        const response = await request.json();
        setObject(response);
      } else {
        return;
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <div>
      <div>
        <button
        className="ml-3 border w-[200px] border-green-500 text-green-500 rounded-sm font-bold font-serif hover:bg-green-500 hover:text-white"
         onClick={handleBookingHistory}>Display History Data</button>
      </div>

      <div className="flex flex-col">
        <div className="h-[35px] mt-2 flex flex-row items-center justify-center bg-blue-400 hover:bg-blue-500 text-white text-lg">
          <label>Booking History</label>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Booking ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Booking Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Booking Type
                </th>
                <th scope="col" className="px-6 py-3">
                  PickUp
                </th>
                <th scope="col" className="px-6 py-3">
                  Destination
                </th>
                <th scope="col" className="px-6 py-3">
                  Vehicle No
                </th>
                <th scope="col" className="px-6 py-3">
                  Driver
                </th>
              </tr>
            </thead>
            <tbody>
              {bookingObjs.map((element) => (
                <tr className="bg-white text-md hover:text-red-600 h-[40px] border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <td className="px-6">{element.bookingId}</td>
                  <td className="px-6">{element.bookingDate}</td>
                  <td className="px-6">{element.bookingType}</td>
                  <td className="px-6">{element.pickupLocation}</td>
                  <td className="px-6">{element.destination}</td>
                  <td className="px-6">{element.vehicleNumber}</td>
                  <td className="px-6">{element.firstName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
