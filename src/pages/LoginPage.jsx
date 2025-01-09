import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postRequest } from "../helpers/api";
import { endpoints } from "../constants/endpoints";
import { updateNotification, updateUser } from "../redux/shareSlice";
import { keys } from "../constants/config";
import { setData } from "../helpers/localstorage";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updatePayload = (key, value) => {
    setPayload((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const result = await postRequest(`${endpoints.login}`, payload);
    if (result.status === 200) {
        setData(keys.API_TOKEN, result.data.token);
        setData(keys.USER, result.data.user);
        dispatch(updateUser(result?.data?.user));
        dispatch(updateNotification({
            variant : 'success',
              message : result?.message
        }))
        dispatch(updateNotification({ variant: "success", message: "Login successful!" }));
        navigate("/dashboard");
    }else{
      dispatch(updateNotification({ variant: "error", message: result?.message }));
    }
    setLoading(false);
  }
  

  return (
    <div className="mx-auto max-w-[1280px] px-3 md:px-5 flex flex-col items-center py-16">
      <h1 className="text-2xl md:text-3xl font-extrabold text-primary-0 mb-10">
        Log In to Your Account
      </h1>
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              onChange={(e) => updatePayload("email", e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-0"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                required
                onChange={(e) => updatePayload("password", e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-0"
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary-0 text-white py-3 rounded-md text-base font-semibold hover:opacity-90"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Don't have an account?
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-primary-0 font-semibold ml-2"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
