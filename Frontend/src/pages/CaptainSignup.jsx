import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const CaptainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        capacity: Number(vehicleCapacity),
        plate: vehiclePlate,
        vehicleType: vehicleType,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/captains/register",
        CaptainData,
      );
      if (response.status == 200) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      }
      console.log("Success:", response.data);
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
      console.log("Message:", error.message);

      if (!error.response) {
        console.log("Network error — is the server running?");
      }
    }

    setFirstName("");
    setlastName("");
    setEmail("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  };

  return (
    <div>
      <div className="p-10 flex flex-col justify-between h-screen">
        <div>
          <img
            src="https://imgs.search.brave.com/FZq7YFqzVbkjhipVXmxfaZY-RmPwy3wsG0WV1UdM8bs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTcwMHgzOTQucG5n"
            alt="ridezy logo"
            className="w-20 mb-10"
          />
          <form onSubmit={(e) => submitHandler(e)}>
            <h3 className="text-lg font-medium mb-2">
              what's our captain's name
            </h3>
            <div className="flex gap-3 mb-7">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-[#eee] border rounded-lg w-1/2 px-4 py-2 text-lg font-medium placeholder:text-base"
                placeholder="first name"
                required
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
                className="bg-[#eee] w-1/2 border rounded-lg text-lg px-4 py-2 font-medium placeholder:text-base"
                placeholder="last name"
              />
            </div>

            <h3 className="font-medium text-lg mb-2">
              what's our captain's email
            </h3>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="bg-[#eee] border rounded-lg px-4 py-2 text-lg font-medium w-full mb-2 placeholder:text-base"
              placeholder="email@example.com"
              required
            />

            <h3 className="text-lg font-medium mb-2">Enter password</h3>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#eee] rounded-lg border w-full px-4 py-2 text-lg font-medium mb-5 placeholder:text-base"
              placeholder="password"
            />

            <h3 className="font-medium text-lg mb-2">Vehicle Information</h3>
            <div>
              <div className="flex gap-4 mb-7">
                <input
                  type="text"
                  value={vehicleColor}
                  onChange={(e) => setVehicleColor(e.target.value)}
                  className="bg-[#eee] border rounded-lg w-1/2 text-lg
                font-medium px-4 py-2 placeholder:text-base"
                  placeholder="vehicle color"
                />

                <input
                  type="text"
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                  className="bg-[#eee] border
                font-medium rounded-lg w-1/2 px-4 py-2 text-lg placeholder:text-base"
                  placeholder="vehicle plate"
                />
              </div>

              <div className="flex gap-3 mb-7">
                <input
                  type="number"
                  value={vehicleCapacity}
                  onChange={(e) => setVehicleCapacity(e.target.value)}
                  placeholder="capacity"
                  className="bg-[#eee] px-4 py-2
                 border w-1/2 rounded-lg text-lg font-medium placeholder:text-base "
                />
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="bg-[#eee] border rounded-lg px-4 py-2 w-1/2 text-lg font-medium placeholder:text-base"
                  required
                >
                  <option value="" disabled>
                    Select Vehicle Type
                  </option>
                  <option value="motorcycle">MotorCycle</option>
                  <option value="auto">Auto</option>
                  <option value="car">Car</option>
                </select>
              </div>
            </div>

            <button className="bg-black text-white w-full mb-5 px-4 py-2 rounded-lg text-lg font-semibold">
              Create Captain Account
            </button>
          </form>
          <p className="text-center">
            already have a account?{" "}
            <Link className="text-blue-600" to="/captain-login">
              Login Here
            </Link>
          </p>
        </div>

        <div>
          <p className="text-center text-[15px] mt-6 leading-tight">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline">Google Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;
