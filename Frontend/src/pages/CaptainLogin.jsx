import {useState} from "react";
import { Link } from "react-router-dom";
const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      email: email,
      password: password,
    });
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          src="https://imgs.search.brave.com/FZq7YFqzVbkjhipVXmxfaZY-RmPwy3wsG0WV1UdM8bs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTcwMHgzOTQucG5n"
          alt="ridezy logo"
          className="w-20 mb-3"
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">what's your email</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eee] w-full border rounded-lg px-4 py-2 text-lg placeholder:text-base mb-2"
            placeholder="email@example.com"
            required
          />

          <h3 className="text-lg font-medium mb-2">enter password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eee] border w-full rounded-lg px-4 py-2 text-lg placeholder:text-base mb-5"
            placeholder="password"
            required
          />
          <button className="bg-black text-white w-full px-4 py-2 rounded-lg font-semibold text-lg mb-3">
            Login
          </button>
        </form>
        <p className="text-center">
          join a fleet?{" "}
          <Link to="/captain-signup" className="text-blue-600">
            Register as a Captain
          </Link>
        </p>
      </div>
      <div className="">
        <Link className="bg-[#d5622d] text-white flex items-center justify-center text-lg font-semibold px-4 py-2 rounded-lg w-ful mb-5">
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
