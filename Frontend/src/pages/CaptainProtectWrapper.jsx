import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const { captain, setCaptain, isLoading, setIsLoading } =
    useContext(CaptainDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      navigate("/captain-login");
      return;
    }

    let cancelled = false;

    const fetchCaptain = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!cancelled && response.status === 200) {
          setCaptain(response.data.captain);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to fetch captain:", err);
          localStorage.removeItem("token");
          setCaptain(null);
          navigate("/captain-login");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchCaptain();

    return () => {
      cancelled = true;
    };
  }, [token, navigate, setCaptain, setIsLoading]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export default CaptainProtectWrapper;
