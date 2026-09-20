import {useState} from "react";
import { Link } from "react-router-dom";
const CaptainSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });

    setFirstName("");
    setlastName("");
    setEmail("");
    setPassword("");
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

            <button className="bg-black text-white w-full mb-5 px-4 py-2 rounded-lg text-lg font-semibold">
              Sign Up
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
