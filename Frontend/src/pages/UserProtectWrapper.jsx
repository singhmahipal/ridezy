import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

const UserProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const verifyUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!cancelled) {
          setUser(response.data);
          setIsLoading(false);
        }
      } catch (err) {
        if (cancelled) return;

        console.error(
          "Profile verification failed:",
          err.response?.status,
          err.response?.data || err.message
        );

        // Remove the token only if the server says
        // the authentication credentials are invalid.
        if (
          err.response?.status === 401 ||
          err.response?.status === 403
        ) {
          localStorage.removeItem("token");
          navigate("/login", { replace: true });
          return;
        }

        // Keep the token if this is a network/server problem.
        setIsLoading(false);
      }
    };

    verifyUser();

    return () => {
      cancelled = true;
    };
  }, [navigate, setUser]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export default UserProtectWrapper;