import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { endpoints } from "../constants/endpoints";
import { postRequest } from "../helpers/api";
import { setData } from "../helpers/localstorage";
import { updateNotification } from "../shares/shareSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const updatePayload = (key, value) => {
    setPayload((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const result = await postRequest(`${endpoints.register}`, payload);
    if (result.status === 200) {
      dispatch(
        updateNotification({
          variant: "success",
          message: "Register successful!",
        })
      );
      navigate("/");
    } else {
      dispatch(
        updateNotification({ variant: "error", message: result?.message })
      );
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-[1280px] px-3 md:px-5 flex flex-col items-center py-16">
      <h1 className="text-2xl md:text-3xl font-extrabold text-primary-0 mb-10">
        Create an Account
      </h1>
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              required
              onChange={(e) => updatePayload("name", e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-0"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Phone
            </label>
            <input
              type="number"
              id="phone"
              required
              onChange={(e) => updatePayload("phone", e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-0"
            />
          </div>

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
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-primary-0 font-semibold ml-2"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
