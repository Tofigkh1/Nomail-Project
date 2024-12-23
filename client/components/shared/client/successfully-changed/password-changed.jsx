import Logo from "../../assets/images/Logo.svg";
import Success from "../../assets/images/Success.svg";
import { useNavigate } from "react-router";

function PasswordChanged() {
  const navigate = useNavigate();
  const backToLogin = () => {
    navigate("/");
  };
  return (
    <>
      <div className="h-screen grid py-2 px-9  bg-[#fce4ec]">
        <img src={Logo} />
        <div className="flex flex-col gap-4 bg-white p-12 rounded h-fit  w-[30%] justify-self-center">
          <div className="flex justify-center">
            <img src={Success} className="w-2/5" />
          </div>
          <h2 className="text-3xl mb-2 text-center">Password changed</h2>
          <p className="text-center text-gray-600 mb-4">
            Your password has been changed successfully
          </p>

          <button
            type="submit"
            className="bg-[#00987F] text-white py-2 px-4 rounded-lg hover:bg-[#02AC90]"
            onClick={backToLogin}
          >
            Back to sign in
          </button>
        </div>
      </div>
    </>
  );
}

export default PasswordChanged;
