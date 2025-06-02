import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import stars from "../assets/stars-1654074.jpg";

const DevPrivateRoute = ({ children }) => {
  const [user, setuser] = useState({ User: "", Password: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isError, setIsError] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/access/protected",
          {
            withCredentials: true, // Send cookies with the request
          },
        );
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
        console.log(response);
      } catch (err) {
        setIsAuthenticated(false);
        console.error(err);
      }
    };

    checkAuthentication();
  }, []);

  if (isAuthenticated) {
    return children; // Proceed to the protected route
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the entered password to the backend for verification
      const response = await axios.post("http://localhost:3000/access/login", {
        User: user.User, // You can use a static user or make it dynamic if needed
        Password: user.Password,
      });

      if (response.data.Msg === "Password matched, access granted!") {
        setIsAuthenticated(true);
      } else {
        setIsError(true);
      }
    } catch (err) {
      console.error(err);
      setIsError(true);
    }
  };

  if (isAuthenticated) {
    return children; // Proceed to the protected route
  }

  return (
    <div className="flex flex-col gap-10 justify-center items-center min-h-screen">
      <h1 className="text-red-500 text-2xl font-bold tracking-wider animate-pulse">
        🚫 Restricted Zone: Authorized Personnel Only!
      </h1>
      <form
        onSubmit={handlePasswordSubmit}
        className="bg-white p-6 rounded shadow-md w-[90%] max-w-sm"
      >
        <h2 className="text-xl font-semibold mb-4">Enter Dev Credentials</h2>

        <input
          type="text"
          value={user.User}
          onChange={(e) => setuser({ ...user, User: e.target.value })}
          placeholder="Dev Name"
          className="border border-gray-300 p-2 w-full rounded mb-4"
        />

        {/* Password Field with Eye Icon */}
        <div className="relative mb-4">
          <input
            type={visible ? "text" : "password"}
            value={user.Password}
            onChange={(e) => setuser({ ...user, Password: e.target.value })}
            placeholder="Password"
            className="border border-gray-300 p-2 w-full rounded pr-10"
          />
          <button
            type="button"
            onClick={() => setVisible((prev) => !prev)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
          >
            {visible ? <FaRegEye /> : <FaRegEyeSlash />}
          </button>
        </div>

        {isError && (
          <p className="text-red-500 text-sm mb-2">
            Incorrect password, please try again.
          </p>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded w-full"
        >
          Access
        </button>
      </form>
      <div
        className="fixed bg-(rgba[0,0,0,0.5]) inset-0 bg-cover -z-10"
        style={{ backgroundImage: `url(${stars})` }}
      ></div>
    </div>
  );
};

export default DevPrivateRoute;
