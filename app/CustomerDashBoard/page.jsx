"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import NewBooking from "../NewBooking/page";
import CancelBooking from "../CancelBooking/page";


export default function CustomerDashBoard() {
  const router = useRouter();
  const handleLogout = () => {
    router.push("/CustomerLogin");
  };

  //Use States
  const [isClickedNewBook, setClickNewBook] = useState(false);
  const [isClickedCancelBooking, setClickCancelBooking] = useState(false);

  const mainButtonArray = [
    { status: isClickedNewBook, setter: setClickNewBook },
    { status: isClickedCancelBooking, setter: setClickCancelBooking },
  ];

  //Handling functions

  const handleNewBookClick = (clickedStatus, setterFunction) => {
    mainButtonArray.forEach((element) => {
      element.setter(false);
    });
    if (clickedStatus == false) {
      setterFunction(true);
    } else {
      setterFunction(false);
    }
  };


  return (
    <div className="bg-slate-100 min-h-screen w-full">
      <div className="bg-slate-600 h-[55px] flex flex-row items-center text-white shadow-md">
        <div className="ml-4 hover:text-xl font-serif font-bold text-lg">
          Mega City Dash Board
        </div>
        <div>
          <input
            className="border-none outline-none text-slate-500 px-2 w-[300px] rounded-sm ml-10"
            type="text"
            placeholder="Search Anything here"
          />
        </div>
        <button
          type="Submit"
          className="border border-white text-white h-[26px] w-[75px] ml-2 hover:text-sm hover:shadow-md">
          Search
        </button>

        <div className="ml-[180px] bg-slate-100 h-[35px] w-[500px] flex flex-row items-center justify-center">
          <button
            onClick={()=>handleNewBookClick(isClickedNewBook, setClickNewBook)}
            type="Submit"
            className="border border-slate-600 text-slate-600 h-[26px] w-[110px] ml-2 hover:text-sm hover:shadow-md">
            Book a Ride
          </button>

          <button
            onClick={()=>handleNewBookClick(isClickedCancelBooking, setClickCancelBooking)}
            type="Submit"
            className="border border-slate-600 text-slate-600 h-[26px] w-[125px] ml-2 hover:text-sm hover:shadow-md">
            Cancel Booking
          </button>

          <button
            type="Submit"
            className="border border-slate-600 text-slate-600 h-[26px] w-[125px] ml-2 hover:text-sm hover:shadow-md">
            Booking History
          </button>

          <button
            onClick={handleLogout}
            type="Submit"
            className="border border-slate-600 text-slate-600 h-[26px] w-[90px] ml-2 hover:text-sm hover:shadow-md">
            Log Out
          </button>
        </div>
      </div>

      {isClickedNewBook && (
        <div className="mt-4">
          <NewBooking />
        </div>
      )}

      {isClickedCancelBooking && (
        <div className="mt-4">
          <CancelBooking />
        </div>
      )}
    </div>
  );
}
