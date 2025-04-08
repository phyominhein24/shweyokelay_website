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
import { updateUserLogin } from "../shares/shareSlice";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

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

  const handleLogin = async () => {
    setLoading(true);
    setErrors({});
    try {
      const result = await postRequest(`${endpoints.login}`, payload);
      if (result.status === 200) {
        setData(keys.API_TOKEN, result.data.token);
        setData(keys.USER, result.data.user);
        dispatch(updateUser(result.data.user));
        dispatch(
          updateNotification({
            variant: "success",
            message: result.message || "Login successful!",
          })
        );
        dispatch(updateUserLogin(true))
        navigate("/dashboard");
      }else if (result.status === 422) {
        console.log(result.error)
        setErrors(result.error || {});
        dispatch(
          updateNotification({
            variant: "error",
            message: "Validation Failed. Please check your inputs.",
          })
        );
      }else if (result.status === 401) {
        // Handle unauthorized (401) response
        dispatch(
          updateNotification({
            variant: "error",
            message: result.message || "Unauthorized. Please check your credentials.",
          })
        );
        // Do not reload the page, just show an error
      } else {
        dispatch(
          updateNotification({
            variant: "error",
            message: result.message || "Login failed. Please try again.",
          })
        );
      }
    } catch (error) {
      dispatch(
        updateNotification({
          variant: "error",
          message: "An error occurred. Please try again later.",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1280px] px-3 md:px-5 flex flex-col items-center py-16">
      <h1 className="text-2xl md:text-3xl font-extrabold text-primary-0 mb-10">
        Log In to Your Account
      </h1>
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={payload.email}
              onChange={(e) => updatePayload("email", e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-0"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={payload.password}
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
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>
            )}
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-primary-0 text-white py-3 rounded-md text-base font-semibold hover:opacity-90"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

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
