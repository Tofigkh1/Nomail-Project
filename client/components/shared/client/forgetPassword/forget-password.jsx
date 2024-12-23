import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import { v4 as uuidv4 } from "uuid"; 
import Logo from "../../assets/images/Logo.svg";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      const token = uuidv4();
      const resetLink = `http://localhost:5173/reset-password?token=${token}`;

      localStorage.setItem("resetToken", JSON.stringify({ email, token }));

      emailjs
        .send(
          "service_xue5jmu",
          "template_oyazl9d",
          {
            to_email: email,
            verification_code: resetLink,
          },
          "VK-11stihUFpx-spq"
        )
        .then(() => {
          navigate("/check-email"); 
        })
        .catch((error) => {
          console.error("Failed to send email:", error);
          alert("Failed to send reset email. Please try again later.");
        });
    } else {
      alert("User not found.");
    }
  };

  return (
    <div className="bg-[#fce4ec] py-2 px-9 h-screen grid">
      <img src={Logo} alt="Logo" />
      <div className="w-[30%] justify-self-center">
        <form
          onSubmit={handlePasswordChange}
          className="flex flex-col gap-4 bg-white p-8 rounded w-full"
        >
          <h2 className="text-2xl font-semibold mb-2 text-center">Forgot password</h2>
          <p className="text-center text-gray-600 mb-4">
            Enter the email associated with your account and we’ll send an email with instructions to reset your password.
          </p>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border py-2 px-4 mb-4 border-gray-300 rounded-lg focus:border-[#3182ce] focus:outline-none"
            required
          />
          <button
            type="submit"
            className="bg-[#00987F] text-white py-2 px-4 rounded-lg hover:bg-[#02AC90]"
          >
            Next
          </button>
          <div className="text-center mt-4">
            <span className="text-gray-600">Remember Password? </span>
            <Link
              to="/"
              className="text-[#00987F] font-semibold hover:underline"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
