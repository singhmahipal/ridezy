import { useState } from "react";
import { Link } from "react-router-dom";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  return (
    <div>
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          <img
            src="https://imgs.search.brave.com/FZq7YFqzVbkjhipVXmxfaZY-RmPwy3wsG0WV1UdM8bs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTcwMHgzOTQucG5n"
            alt="ridezy logo"
            className="w-20 mb-10"
          />
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <h3 className="font-medium text-lg w-1/2 mb-2">what's your name</h3>
            <div className="flex gap-4 mb-7">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-[#eee] border rounded-lg placeholder:text-base text-lg px-4 py-2 w-1/2"
                placeholder="first name"
                required
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-[#eee] rounded-lg border px-4 py-2 text-lg placeholder:text-base w-1/2"
                placeholder="last name"
              />
            </div>

            <h3 className="font-medium text-lg mb-2">what's your email</h3>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="bg-[#eee] border rounded-lg w-full px-4 py-2 mb-7 text-lg placeholder:text-base"
              placeholder="email@example.com"
              required
            />

            <h3 className="text-lg font-medium mb-2">Enter password</h3>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="bg-[#eee] border rounded-lg px-4 py-2 text-lg w-full placeholder:text-base mb-7"
              placeholder="password"
              required
            />

            <button className="bg-black text-white w-full px-4 py-2 rounded-lg text-lg font-semibold mb-3">
              Login
            </button>
          </form>

          <p className="text-center">
            Already have a account?{" "}
            <Link to="/login" className="text-blue-600">
              Login Here
            </Link>
          </p>
        </div>

        <div>
          <p className="text-[10px] leading-tight text-center">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline">Google Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
