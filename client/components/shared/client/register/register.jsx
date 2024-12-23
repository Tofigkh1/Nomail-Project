import { useState } from "react";
import emailjs from "emailjs-com";
import Logo from "../../assets/images/Logo.svg";
import View from "../../assets/images/view.png";
import NoView from "../../assets/images/noview.png";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const navigate = useNavigate();

  const setView = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      alert(
        "Password must be at least 8 characters long and include letters, numbers, and symbols."
      );
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(code);

    try {
      await emailjs.send(
        "service_xue5jmu",
        "template_oyazl9d",
        {
          user_name: firstName,
          verification_code: code,
          to_email: email,
        },
        "VK-11stihUFpx-spq"
      );

      setIsCodeSent(true);
      alert("Verification code sent to your email!");
    } catch (e) {
      alert("Failed to send verification email.", e);
    }
  };

  const handleVerifyCode = () => {
    if (enteredCode === verificationCode) {
      setIsVerified(true);
      alert("Email verified successfully!");

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const newUser = {
        firstName,
        lastName,
        email,
        password,
      };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      navigate("/");

    } else {
      alert("Verification code is incorrect. Please try again.");
    }
  };

  return (
    <>
      <div className="grid h-screen bg-[#f5f5f5] py-2 px-9">
        <div className="h-fit">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="container grid place-items-center w-full">
          <div className="flex flex-col items-center bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),_0_4px_6px_-2px_rgba(0,0,0,0.05)] px-[40px] py-[20px]">
            {!isVerified ? (
              !isCodeSent ? (
                <div className="flex flex-col gap-4 p-[20px]">
                  <h2 className="text-center text-[40px]">Sign Up</h2>
                  <form
                    className="flex flex-col gap-8"
                    onSubmit={handleRegister}
                  >
                    <div className="flex justify-between">
                      <input
                        type="text"
                        placeholder="First Name"
                        className="w-[45%] px-4 py-3 rounded-lg border border-[#D1D1D6] focus:border-[#3182ce] focus:outline-none"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="w-[45%] px-4 py-3 rounded-lg border border-[#D1D1D6] focus:border-[#3182ce] focus:outline-none"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                    <div
                      className={`passwordClass flex items-center rounded-lg py-1 pr-2 gap-1 w-full border ${
                        focused ? "border-[#3182ce]" : "border-[#D1D1D6]"
                      }`}
                    >
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full px-4 py-3 border-r-0 focus:outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        required
                      />
                      <span className="h-fit cursor-pointer" onClick={setView}>
                        <img
                          src={showPassword ? View : NoView}
                          className="w-[25px]"
                          alt="Toggle view"
                        />
                      </span>
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="rounded-lg w-full px-4 py-3 border border-[#D1D1D6] focus:border-[#3182ce] focus:outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <p className="text-[13px] px-4 pt-2">
                        It must be a combination of minimum 8 letters, numbers,
                        and symbols.
                      </p>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full py-4 bg-[#00987F] text-white hover:bg-[#02AC90]"
                      >
                        Sign Up
                      </button>
                    </div>
                    <div className="flex gap-4 w-full justify-between">
                      <button className="w-[45%] py-4 px-6 border border-[#00987F] rounded-lg text-[#00987F] hover:bg-[#e6f7f3]">
                        Sign in with Google
                      </button>

                      <button className="w-[45%] py-4 px-6 border border-[#00987F] rounded-lg text-[#00987F] hover:bg-[#e6f7f3]">
                        Sign in with Apple
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="w-[70%] flex flex-col items-center justify-center p-[40px]">
                  <h2 className="text-3xl font-semibold mb-6 text-center">
                    Enter confirmation code
                  </h2>
                  <p className="mb-6 text-center ">
                    Enter the confirmation code we sent to{" "}
                    <span> {email} </span>
                    <span
                      onClick={handleRegister}
                      className="cursor-pointer text-[#00987F]"
                    >
                      Resend code
                    </span>
                  </p>
                  <input
                    type="text"
                    placeholder="Enter verification code"
                    className="rounded-lg w-full px-4 py-3 mb-4 border border-[#D1D1D6] focus:border-[#3182ce] focus:outline-none"
                    value={enteredCode}
                    onChange={(e) => setEnteredCode(e.target.value)}
                    required
                  />
                  <button
                    onClick={handleVerifyCode}
                    className="w-full py-4 mt-4 bg-[#00987F] text-white hover:bg-[#02AC90]"
                  >
                    Verify Code
                  </button>
                </div>
              )
            ) : null}
            <div className="flex gap-3 justify-center w-fit mt-4">
              <p>Already have an account?</p>
              <Link to="/">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
