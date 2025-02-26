"use client";
import React, { useState } from "react";

export default function NewBooking() {
  //State Variables.
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  //handle functions.

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    const textStates = [pickupLocation, destination, vehicleType];
    if (pickupLocation === "" || destination === "" || vehicleType === "") {
      setErrorMsg("Please fill out all fields!");
      return;
    } else {
    }

    try {
      const request = await fetch(
        "http://localhost:8080/api/v1/booking/newBooking",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pickupLocation: pickupLocation,
            destination: destination,
            vehicleType: vehicleType,
          }),
        }
      );
      if (request.ok) {
        const response = await request.text();
        setErrorMsg(response);
      } else {
        setErrorMsg("Error in response. Please try again!");
      }
    } catch (error) {
      setErrorMsg("Service unavailable. Please try again!");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="h-[35px] mt-2 flex flex-row items-center justify-center bg-blue-400 hover:bg-blue-500 text-white text-lg">
        <label>Please add booking details</label>
      </div>
      <div className="h-[85px] bg-slate-50 shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row mt-2">
            <div className="mt-4 ml-2">
              <label className="text-slate-600">Pickup Location: </label>
              <input
                onChange={(e) => setPickupLocation(e.target.value)}
                type="text"
                className="border border-slate-700 outline-blue-200 rounded-sm px-2 text-slate-500"
                placeholder="Enter Pickup location"
              />
            </div>

            <div className="mt-4 ml-[40px]">
              <label className="text-slate-600">Destination: </label>
              <input
                onChange={(e) => setDestination(e.target.value)}
                type="text"
                className="border border-slate-700 outline-blue-200 rounded-sm px-2 text-slate-500"
                placeholder="Enter Destination"
              />
            </div>

            <div className="mt-4 ml-[40px]">
              <label className="text-slate-600">Vehicle Type: </label>
              <select
                onChange={(e) => setVehicleType(e.target.value)}
                type="text"
                className="border border-slate-700 outline-blue-200 rounded-sm px-2 text-slate-500 w-[200px] h-[26px]"
                placeholder="Enter Destination">
                <option></option>
                <option>Car</option>
                <option>Mini Cab</option>
                <option>Van</option>
                <option>Bike</option>
                <option>Tuk Tuk</option>
                <option>Lorry</option>
                <option>Bus</option>
              </select>
            </div>

            <div className="mt-[15px] ml-4">
              <button
                type="submit"
                className="border border-slate-600 hover:text-white hover:bg-slate-600 w-[70px] h-[28px]">
                Submit
              </button>
            </div>
          </div>
          {errorMsg && (
            <div className="mt-2 flex flex-col items-center text-red-500 text-sm">
              <label>{errorMsg}</label>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
