import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const DevPrivateRoute = ({ children }) => {
  const [user, setuser] = useState({ User: "", Password: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get(
          "https://product-page-pcoy.onrender.com/access/protected",
          {
            withCredentials: true, // Send cookies with the request
          },
        );
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
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
      const response = await axios.post(
        "https://product-page-pcoy.onrender.com/access/login",
        {
          User: user.User, // You can use a static user or make it dynamic if needed
          Password: user.Password,
        },
      );

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

  const handleLogout = () => {
    axios
      .post(
        "https://product-page-pcoy.onrender.com/access/logout",
        {},
        { withCredentials: true },
      )
      .then(() => {
        navigate("/");
      });
  };

  if (isAuthenticated) {
    return children; // Proceed to the protected route
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handlePasswordSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-xl font-semibold mb-4">Enter Dev Credentials</h2>
        <input
          type="text"
          value={user.User}
          onChange={(e) => setuser({ ...user, User: e.target.value })}
          placeholder="Dev Name"
          className="border border-gray-300 p-2 w-full rounded mb-4"
        />
        <input
          type="password"
          value={user.Password}
          onChange={(e) => setuser({ ...user, Password: e.target.value })}
          placeholder="Password"
          className="border border-gray-300 p-2 w-full rounded mb-4"
        />
        {isError && (
          <p className="text-red-500 text-sm">
            Incorrect password, please try again.
          </p>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded mt-2 w-full"
        >
          Access
        </button>
      </form>
    </div>
  );
};

export default DevPrivateRoute;
