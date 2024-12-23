import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/Logo.svg";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long and include letters, numbers, and symbols."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const storedData = JSON.parse(localStorage.getItem("resetToken"));

    if (storedData && storedData.token === token) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.map((user) =>
        user.email === storedData.email ? { ...user, password } : user
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      localStorage.removeItem("resetToken");
      navigate("/changed-password");
    } else {
      setError("Invalid or expired reset token.");
    }
  };

  return (
    <>
      <div className="h-screen grid py-2 px-9  bg-[#fce4ec]">
        <img src={Logo} />
        <div className="w-[30%] h-fit flex justify-center items-center justify-self-center bg-[#fce4ec]">
          <form
            onSubmit={handlePasswordReset}
            className="flex flex-col gap-4 bg-white p-8 rounded"
          >
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Create New Password
            </h2>
            <p className="text-center text-gray-600 mb-4">
              Your new password must be different from previous used passwords.
            </p>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border py-2 px-4 mb-2 border-gray-300 rounded-lg focus:border-[#3182ce] focus:outline-none"
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border py-2 px-4 mb-4 border-gray-300 rounded-lg focus:border-[#3182ce] focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-[#00987F] text-white py-2 px-4 rounded-lg hover:bg-[#02AC90]"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
