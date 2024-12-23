import React from "react";
import Envelope from "../../assets/images/envelope-mail.svg";
import Logo from "../../assets/images/Logo.svg";
import { useNavigate } from "react-router";

function CheckEmail() {
  const navigate = useNavigate();

  const handleResendEmail = () => {
    navigate("/forget-password");
  };

  return (
    <>
      <div className=" h-screen bg-[#f5f5f5] py-2 px-9 grid">
        <div className="h-fit">
          <img src={Logo} />
        </div>
        <div className="justify-self-center">
          <div className="flex flex-col items-center bg-white p-10 rounded-lg shadow-md text-center w-full max-w-md">
            <img src={Envelope} className=" mb-4"></img>
            <h2 className="text-2xl font-semibold mb-6">Check your email</h2>
            <p className="text-gray-600 mb-6">
              We have sent password recovery instructions to your email.
            </p>
            <p className="text-gray-600">
              Did not receive the email?{" "}
              <button
                onClick={handleResendEmail}
                className="text-[#00987F] font-semibold hover:underline"
              >
                Resend email
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckEmail;
