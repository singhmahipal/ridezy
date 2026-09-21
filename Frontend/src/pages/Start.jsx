import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen w-full flex flex-col justify-between pt-8">
        <img
          src="https://imgs.search.brave.com/FZq7YFqzVbkjhipVXmxfaZY-RmPwy3wsG0WV1UdM8bs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTcwMHgzOTQucG5n"
          alt="ridezy logo"
          className="w-25 ml-8"
        />
        <div className="bg-white pb-8 px-4 py-4">
          <h2 className="text-[30px] font-bold">Get Started with Ridezy</h2>
          <Link
            to="/login"
            className="bg-black text-white flex justify-center items-center w-full py-3 mt-4 rounded-lg"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
