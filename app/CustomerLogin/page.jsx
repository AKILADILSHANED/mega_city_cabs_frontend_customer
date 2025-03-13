"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [emailError, setemailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setpasswordError] = useState("");

  const [commonError, setCommonError] = useState("");

  const errorMessages = [
    { state: email, errorSetting: setemailError },
    { state: password, errorSetting: setpasswordError },
  ];

  const handleSignin = async (e) => {
    e.preventDefault();
    setemailError("");
    setpasswordError("");

    errorMessages.forEach((element) => {
      if (element.state == "") {
        element.errorSetting("This field is required!");
        return;
      } else {
        element.errorSetting("");
      }
    });
    try {
      const request = await fetch(
        `http://localhost:8080/api/v1/customer/customer-login?email=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}`,
        { credentials: "include" }
      );
      if (request.ok) {
        const response = await request.text();
        if (response == 1) {
          router.push("/CustomerDashBoard");
        } else {
          setCommonError(response);
        }
      } else {
        setCommonError(
          "Unexpected error occuured. Please contact the administrator!"
        );
      }
    } catch (e) {
      setCommonError("No response from server. Please contact administrator!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-blue-900">
      <div className="border border-blue-300 w-full bg-white rounded-lg shadow-xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-blue-500 md:text-2xl dark:text-white">
            Sign in to our services
          </h1>
          <form
            onSubmit={handleSignin}
            className="space-y-4 md:space-y-6"
            action="#">
            <div>
              <label className="block mb-2 text-sm font-medium text-blue-400 dark:text-white">
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="outline-blue-400 bg-gray-50 border border-blue-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              {emailError && (
                <div className="text-red-400 font-serif text-sm">
                  {emailError}
                </div>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-blue-400 dark:text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="outline-blue-400 bg-gray-50 border border-blue-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {passwordError && (
                <div className="text-red-400 font-serif text-sm">
                  {passwordError}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label className="text-blue-300 dark:text-gray-300">
                    Remember me
                  </label>
                </div>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-blue-400 hover:underline dark:text-primary-500">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full h-[30px] text-white bg-blue-500 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-primary-300 text-lg rounded-lg  px-5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Sign in
            </button>
            {commonError && (
              <div className="text-red-400 font-serif text-sm">
                <label>{commonError}</label>
              </div>
            )}
            <p className="text-sm font-light text-blue-400 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <a
                href="/CustomerRegister"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
