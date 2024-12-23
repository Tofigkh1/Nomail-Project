import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import Logo from "../../assets/images/Logo.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedLoginInfo = JSON.parse(localStorage.getItem("rememberedUser"));
    if (savedLoginInfo) {
      setEmail(savedLoginInfo.email);
      setPassword(savedLoginInfo.password);
      setRememberMe(true);
    }
  }, []);

  const renderData = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers && storedUsers.length > 0) {
      const userFound = storedUsers.find(
        (user) => user.email === email && user.password === password
      );
      if (userFound) {
        alert("Login successful!");


        if (rememberMe) {
          localStorage.setItem(
            "rememberedUser",
            JSON.stringify({ email, password })
          );
        } else {
          localStorage.removeItem("rememberedUser");
        }

        navigate("/home");
      } else {
        alert("Incorrect email or password.");
      }
    } else {
      alert("No user found. Please sign up.");
    }
  };

  return (
    <div className="flex">
      <div className="leftSide grid w-1/2 h-screen py-2 px-9">
        <div className="w-fit">
          <img src={Logo} alt="logo" />
        </div>
        <div className="registerContainer justify-self-center w-[65%] flex flex-col gap-7">
          <h3 className="text-3xl text-[#02826D]">SIGN IN</h3>
          <form onSubmit={renderData} className="flex flex-col gap-8">
            <input
              type="text"
              placeholder="Enter your email"
              className="border py-2 px-4 border-[#D1D1D6] rounded-lg focus:border-[#3182ce] focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border py-2 px-4 border-[#D1D1D6] rounded-lg focus:border-[#3182ce] focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <p>Remember me</p>
              </div>
              <div>
                <Link to="/forget-password">Forget password?</Link>
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-4 bg-[#00987F] text-white"
            >
              Sign in
            </button>
          </form>
          <div className="flex gap-4 w-full justify-between items-center">
            <button className="w-[45%] py-4 px-6 border border-[#00987F] rounded-lg text-[#00987F] hover:bg-[#e6f7f3]">
              Sign in with Google
            </button>
            <span>Or</span>
            <button className="w-[45%] py-4 px-6 border border-[#00987F] rounded-lg text-[#00987F] hover:bg-[#e6f7f3]">
              Sign in with Apple
            </button>
          </div>
          <div className="flex gap-3 justify-center">
            <p>Don’t have an account?</p>
            <Link to="/register">Sign Up</Link>
          </div>
        </div>
      </div>
      <div className="rightSide w-1/2 h-screen flex flex-col gap-2 justify-center items-center">
        <p className="text-4xl text-white">Welcome back</p>
        <p className="text-5xl text-white">Nomail</p>
      </div>
    </div>
  );
}

export default Login;
