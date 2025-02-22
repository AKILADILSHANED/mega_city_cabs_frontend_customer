"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [nic, setNic] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    //Check Password and Confirmed Password is matched.
    if (password != confirmPassword) {
      setErrorMessage("Your password does not match with confirmed password!");
      return;
    }

    try {
      const request = await fetch(
        "http://localhost:8080/api/v1/customer/customer-register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            contact: contact,
            email: email,
            nic: nic,
            address: address,
            password: password,
          }),
        }
      );
      if (request.ok) {
        const response = await request.text();
        setErrorMessage("");
        setSuccessMessage(response);

        //Set all fields empty.
        setFirstName("");
        setLastName("");
        setAddress("");
        setContact("");
        setNic("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setSuccessMessage("");
        setErrorMessage(
          "An error occurred while receiving response. Please contact administrator!"
        );
        return;
      }
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage("An error occurred. Please contact administrator!");
      return;
    }
  };

  const handleSignin = () => {
    router.push("/CustomerLogin");
  };

  return (
    <div className="flex flex-row items-center justify-center">
      <div className="bg-blue-500 h-screen w-[600px] rounded-md">
        <div className="bg-blue-500 p-4 rounded-lg ">
          <h2 className="text-2xl font-bold mb-2 text-white">
            Welcome to Mega City Cab Services!
          </h2>
          <p className="mb-4 text-white">
            Experience hassle-free travel with our reliable and affordable cab
            services. Whether you're heading to the airport, a business meeting,
            or a night out, we’ve got you covered!
          </p>
          <ul className="list-disc list-inside mb-4 text-white">
            <li>🌟 24/7 Availability</li>
            <li>🚖 Clean and Comfortable Vehicles</li>
            <li>👨‍✈️ Professional Drivers</li>
            <li>💰 Competitive Rates</li>
          </ul>
          <p className="text-white">
            Sign up today and enjoy exclusive discounts on your first ride. Your
            journey starts here!
          </p>
        </div>
      </div>

      <div className="w-full h-screen ml-1">
        <div className="flex items-center justify-center border border-blue-400 shadow-md h-10 rounded-md">
          <label className="text-blue-700 font-bold text-2xl">
            Customer Registration Form
          </label>
          <button
            type="button"
            onClick={handleSignin}
            className="border border-blue-500 rounded-md text-blue-500 w-[70px] hover:bg-blue-700 hover:text-white ml-[20px]">
            Sign In
          </button>
        </div>

        <div className="border border-blue-400 mt-2 rounded-md h-[600px] flex flex-col">
          <form onSubmit={handleRegister}>
            <div className="flex flex-col ml-4">
              <div className="mt-2 ml-4 flex flex-col">
                <label className="text-blue-700">First Name:</label>
                <input
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  placeholder="Enter First Name"
                  className="outline-blue-200 outline-1 border rounded-md w-[500px] px-2 hover:shadow-md"
                />
              </div>

              <div className="mt-4 ml-4 flex flex-col">
                <label className="text-blue-700">Last Name:</label>
                <input
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  placeholder="Enter Last Name"
                  className="outline-blue-200 outline-1 border rounded-md w-[500px] px-2 hover:shadow-md"
                />
              </div>

              <div className="mt-4 ml-4 flex flex-col">
                <label className="text-blue-700">Address:</label>
                <input
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  placeholder="Enter Address"
                  className="outline-blue-200 outline-1 border rounded-md w-[500px] px-2 hover:shadow-md"
                />
              </div>

              <div className="mt-4 ml-4 flex flex-col">
                <label className="text-blue-700">Contact Number:</label>
                <input
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  type="text"
                  placeholder="Enter Contact Number"
                  className="outline-blue-200 outline-1 border rounded-md w-[500px] px-2 hover:shadow-md"
                />
              </div>

              <div className="mt-4 ml-4 flex flex-col">
                <label className="text-blue-700">NIC:</label>
                <input
                  required
                  value={nic}
                  onChange={(e) => setNic(e.target.value)}
                  type="text"
                  placeholder="Enter NIC"
                  className="outline-blue-200 outline-1 border rounded-md w-[500px] px-2 hover:shadow-md"
                />
              </div>

              <div className="mt-4 ml-4 flex flex-col">
                <label className="text-blue-700">Email:</label>
                <input
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter Email"
                  className="outline-blue-200 outline-1 border rounded-md w-[500px] px-2 hover:shadow-md"
                />
              </div>

              <div className="mt-4 ml-4 flex flex-col">
                <label className="text-blue-700">Password:</label>
                <input
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter Password"
                  className="outline-blue-200 outline-1 border rounded-md w-[500px] px-2 hover:shadow-md"
                />
              </div>

              <div className="mt-4 ml-4 flex flex-col">
                <label className="text-blue-700">Confirm Password:</label>
                <input
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  placeholder="Enter Password"
                  className="outline-blue-200 outline-1 border rounded-md w-[500px] px-2 hover:shadow-md"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 h-[30px] w-[500px] mt-2 rounded-md text-white ml-4">
                  Register
                </button>
              </div>

              <div>
                {successMessage && (
                  <label className="text-green-600 ml-4 font-serif">
                    {successMessage}
                  </label>
                )}
              </div>

              <div>
                {errorMessage && (
                  <label className="text-red-600 ml-4 font-serif">
                    {errorMessage}
                  </label>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
