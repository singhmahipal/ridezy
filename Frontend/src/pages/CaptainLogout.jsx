import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CaptainLogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 3000,
      })
      .then((response) => {
        if (response.status == 200) {
          localStorage.removeItem("token");
          navigate("/captain-login");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
    </div>
  );
};

export default CaptainLogout;
