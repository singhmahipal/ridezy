import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      newUser,
    );

    if (response.status == 200) {
      const data = response.data;
      setUser(data);

      localStorage.setItem("token", data.token);
      navigate("/home");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex flex-col justify-between h-screen p-7">
      <div className="">
        <img
          src="https://imgs.search.brave.com/FZq7YFqzVbkjhipVXmxfaZY-RmPwy3wsG0WV1UdM8bs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTcwMHgzOTQucG5n"
          alt="ridezy logo"
          className="w-16 mb-10"
        />
        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-lg font-medium mb-2">what's your email</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="bg-[#eee] rounded-lg px-4 py-2 text-lg border w-full mb-7 placeholder:text-base"
            required
          />

          <h3 className="font-medium text-lg mb-2">Enter password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eee] border rounded-lg w-full px-4 py-2 mb-7 placeholder:text-base text-lg"
            placeholder="password"
            required
          />

          <button className="bg-black text-white w-full py-2 px-4 font-semibold text-lg rounded-lg mb-3">
            Login
          </button>
        </form>

        <p className="text-center">
          New here?{" "}
          <Link className="text-blue-600" to="/signup">
            Create new Account
          </Link>
        </p>
      </div>

      <div>
        <Link
          className="bg-[#10b461] text-white px-4 py-2 w-full flex items-center justify-center rounded-lg font-semibold text-lg mb-5"
          to="/captain-login"
        >
          Sign in as captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
