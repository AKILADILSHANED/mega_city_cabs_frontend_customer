"use client";
import React, { useState } from "react";

export default function CancelBooking() {
  const [bookingDetailsWindow, setBookingDetailsWindow] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [message, setMessage] = useState(false);

  const [bookingIdVeiw, setBookingIdVeiw] = useState("");
  const [bookingDateView, setBookingDateView] = useState("");
  const [bookingTypeView, setBookingType] = useState("");
  const [pickupLocationView, setPickupLocationView] = useState("");
  const [destinationView, setDestinationView] = useState("");
  const [vehicleTypeView, setVehicleTypeView] = useState("");

  //functions

  const handleClickDisplayBooking = async (e) => {
    setMessage(false);
    setBookingDetailsWindow(false);
    e.preventDefault();
    if (bookingId === "") {
      setMessage("Please provide Booking ID!");
      return;
    } else {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/booking/displayBookingForCancel?bookingId=${encodeURIComponent(
            bookingId
          )}`,
          {
            credentials: "include",
            method: "GET",
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.message !== null) {
            setMessage(data.message);
          } else {
            setBookingIdVeiw(data.bookingId);
            setBookingDateView(data.bookingDate);
            setBookingType(data.bookingType);
            setPickupLocationView(data.pickupLocation);
            setDestinationView(data.destination);
            setVehicleTypeView(data.vehicleType);

            setBookingDetailsWindow(true);
          }
        } else {
          setBookingDetailsWindow(false);
          setMessage("An error occurred while retriving the data!");
        }
      } catch (error) {
        setBookingDetailsWindow(false);
        setMessage("Failed to fetch data. Please try again later!");
      }
    }
  };

  const clickExit = () => {
    setBookingDetailsWindow(false);
  };

  const handleCancelBooking = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/booking/cancelBooking?bookingId=${encodeURIComponent(
          bookingId
        )}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.text();
        setMessage(data);
        setBookingDetailsWindow(false);
      } else {
        setBookingDetailsWindow(false);
        setMessage("An error occurred while retriving the data!");
      }
    } catch (error) {
      setBookingDetailsWindow(false);
      setMessage("Booking cancellation failed. Please try again later!");
    }
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="h-[35px] mt-2 flex flex-row items-center justify-center bg-blue-400 hover:bg-blue-500 text-white text-lg">
          <label>Booking cancellation</label>
        </div>
        <div className="h-[85px] bg-slate-50 shadow-md">
          <form onSubmit={handleClickDisplayBooking}>
            <div className="flex flex-row mt-2">
              <div className="mt-4 ml-2">
                <label className="text-slate-600">Booking ID: </label>
                <input
                  onChange={(e) => setBookingId(e.target.value)}
                  type="text"
                  className="border border-slate-700 outline-blue-200 rounded-sm px-2 text-slate-500"
                  placeholder="Enter Booking ID"
                />
              </div>

              <div className="mt-[15px] ml-4">
                <button
                  type="submit"
                  className="border border-slate-600 hover:text-white hover:bg-slate-600 w-[110px] h-[28px]">
                  View Booking
                </button>
              </div>
            </div>

            {message && (
              <div className="mt-2 ml-2 flex text-red-500 text-sm">
                <label>{message}</label>
              </div>
            )}
          </form>
        </div>
      </div>

      {bookingDetailsWindow && (
        <div>
          <div className="h-[35px] mt-8 flex flex-row items-center justify-center bg-slate-200 hover:bg-slate-300 text-lg">
            <label>Booking details</label>
          </div>

          <div className="h-[165px] bg-slate-50 shadow-md">
            <form onSubmit={handleCancelBooking}>
              <div>
                <div className="flex flex-row">
                  <div className="mt-4 ml-10">
                    <label className="text-slate-600">Booking ID: </label>
                    <input
                      value={bookingIdVeiw}
                      readOnly
                      type="text"
                      className="border border-blue-300 outline-none rounded-sm px-2 text-slate-500 w-[300px]"
                    />
                  </div>

                  <div className="mt-4 ml-10">
                    <label className="text-slate-600">Booking Date: </label>
                    <input
                      value={bookingDateView}
                      readOnly
                      type="text"
                      className="border border-blue-300 outline-none rounded-sm px-2 text-slate-500 w-[300px]"
                    />
                  </div>

                  <div className="mt-4 ml-10">
                    <label className="text-slate-600">Booking Type: </label>
                    <input
                      value={bookingTypeView}
                      readOnly
                      type="text"
                      className="border border-blue-300 outline-none rounded-sm px-2 text-slate-500 w-[300px]"
                    />
                  </div>
                </div>

                <div className="flex flex-row">
                  <div className="mt-4 ml-10">
                    <label className="text-slate-600">Pickup On: </label>
                    <input
                      value={pickupLocationView}
                      readOnly
                      type="text"
                      className="ml-[4px] border border-blue-300 outline-none rounded-sm px-2 text-slate-500 w-[300px]"
                    />
                  </div>

                  <div className="mt-4 ml-10">
                    <label className="text-slate-600">Destination: </label>
                    <input
                      value={destinationView}
                      readOnly
                      type="text"
                      className="ml-[16px] border border-blue-300 outline-none rounded-sm px-2 text-slate-500 w-[300px]"
                    />
                  </div>

                  <div className="mt-4 ml-10">
                    <label className="text-slate-600">Vehicle Type: </label>
                    <input
                      value={vehicleTypeView}
                      readOnly
                      type="text"
                      className="ml-[7px] border border-blue-300 outline-none rounded-sm px-2 text-slate-500 w-[300px]"
                    />
                  </div>
                </div>

                <div className="flex flex-row ml-[450px] mt-5">
                  <div className="mt-[15px] ml-10">
                    <button
                      type="submit"
                      className="border-none rounded-md text-white  bg-red-500 hover:bg-red-600 w-[200px] h-[28px]">
                      Cancel Booking
                    </button>
                  </div>
                  <div className="mt-[15px] ml-4">
                    <button
                      onClick={clickExit}
                      type="button"
                      className="border-none bg-slate-500 text-white  hover:bg-slate-600 rounded-md w-[200px] h-[28px]">
                      Exit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
