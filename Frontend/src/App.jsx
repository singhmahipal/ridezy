import React from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start.jsx";
import UserSignup from "./pages/UserSignup.jsx";
import UserLogin from "./pages/UserLogin.jsx";
import CaptainSignup from "./pages/CaptainSignup.jsx";
import CaptainLogin from "./pages/CaptainLogin.jsx";
import Home from "./pages/Home.jsx";
import UserProtectWrapper from "./pages/UserProtectWrapper.jsx";
import UserLogout from "./pages/UserLogout.jsx";
import CaptainHome from "./pages/CaptainHome.jsx";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper.jsx";
import CaptainLogout from "./pages/CaptainLogout.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/captain-home"
          element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
          }
        />
        <Route path="/captain/logout" element={<CaptainLogout />} />
        <Route path="/logout" element={<UserLogout />} />
      </Routes>
    </div>
  );
};

export default App;
