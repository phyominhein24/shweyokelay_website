import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowDownUp } from "react-icons/bs";
import { CiCalendarDate } from "react-icons/ci";
import { GrMapLocation } from "react-icons/gr";
import { IoLocationOutline } from "react-icons/io5";
import { RiAccountPinCircleLine } from "react-icons/ri";
import PropTypes from "prop-types";
import { endpoints } from "../constants/endpoints";
import { format } from "date-fns";
import { getRequest } from "../helpers/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchForm2 = ({ onSearch, searchData = null }) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [counter, setCounter] = useState([]);
  const [startingPointOptions, setStartingPointOptions] = useState([]);
  const [endingPointOptions, setEndingPointOptions] = useState([]);
  const [payload, setPayload] = useState({
    starting_point: "",
    ending_point: "",
  });
  const [errors, setErrors] = useState({
    starting_point: "",
    ending_point: "",
  });
  const [userType, setUserType] = useState("")

  const navigate = useNavigate();

  const loadingData = useCallback(async () => {
    const result = await getRequest(`${endpoints.counter}`);
    if (result.status === 200) {
      setCounter(result.data);
      setStartingPointOptions(result.data);
      setEndingPointOptions(result.data);
    }
  }, []);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    if (searchData !== null) {
      setPayload({
        starting_point: searchData.starting_point || "",
        ending_point: searchData.ending_point || "",
      });
      setSelectedDate(new Date(searchData.selectedDate) || today);
    }
  }, [searchData]);

  useEffect(() => {
    const filteredStartingPoints = counter?.filter(
      (point) => point.id != payload?.ending_point
    );
    const filteredEndingPoints = counter?.filter(
      (point) => point.id != payload?.starting_point
    );
    setStartingPointOptions(filteredStartingPoints);
    setEndingPointOptions(filteredEndingPoints);
  }, [payload, counter]);

  const updatePayload = (key, value) => {
    setPayload((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const swapRoute = () => {
    setPayload({
      starting_point: payload?.ending_point,
      ending_point: payload?.starting_point,
    });
  };

  const searchFormSubmitted = (event) => {
    event.preventDefault();

    let isValid = true;
    const newErrors = {};

    if (!payload?.starting_point) {
      newErrors.starting_point = "Please select an origin.";
      isValid = false;
    }
    if (!payload?.ending_point) {
      newErrors.ending_point = "Please select a destination.";
      isValid = false;
    }
    if (userType == "") {
      newErrors.user_type = "Please select a user type.";
      isValid = false;
    }
    setErrors(newErrors);
    if (!isValid) {
      return;
    }

    const formattedDate = format(selectedDate, "MM/dd/yyyy");

    onSearch({
      starting_point: payload?.starting_point,
      ending_point: payload?.ending_point,
      selected_date: formattedDate,
      selected_user_type: userType
    });
  };

  return (
    <div className="py-5">
      <form
        onSubmit={searchFormSubmitted}
        id="routeSearchForm"
        className="flex flex-col gap-4"
      >
        {/* Starting Point */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3 p-3 border-2 rounded-md focus-within:border-primary-500">
            <IoLocationOutline size={22} className="text-gray-600" />
            <select
              name="origin"
              id="origin"
              className="bg-transparent focus:outline-none w-full text-gray-700 placeholder-gray-400"
              value={payload?.starting_point}
              onChange={(e) => updatePayload("starting_point", e.target.value)}
            >
              <option value="" disabled>
                Select origin
              </option>
              {startingPointOptions?.map((value, index) => (
                <option key={index} value={value.id}>
                  {value.name}
                </option>
              ))}
            </select>
          </div>
          {errors.starting_point && (
            <p className="text-red-500 text-xs pl-2">{errors.starting_point}</p>
          )}
        </div>

        {/* Destination */}
        <div className="flex flex-col gap-1 relative">
          <div className="flex items-center gap-3 p-3 border-2 rounded-md focus-within:border-primary-500">
            <GrMapLocation size={20} className="text-gray-500" />
            <select
              name="destination"
              id="destination"
              className="bg-transparent focus:outline-none w-full text-gray-700 placeholder-gray-400"
              value={payload?.ending_point}
              onChange={(e) => updatePayload("ending_point", e.target.value)}
            >
              <option value="" disabled>
                Select destination
              </option>
              {endingPointOptions?.map((value, index) => (
                <option key={index} value={value.id}>
                  {value.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={swapRoute}
              className="absolute -top-6 right-5 w-8 h-8 flex justify-center items-center rounded-full border-2 border-gray-300 bg-white"
            >
              <BsArrowDownUp />
            </button>
          </div>
          {errors.ending_point && (
            <p className="text-red-500 text-xs pl-2">{errors.ending_point}</p>
          )}
        </div>

        {/* Date Picker */}
        <div className="flex items-center gap-3 p-3 border-2 rounded-md focus-within:border-primary-500">
          <CiCalendarDate size={22} className="text-gray-600" />
          <DatePicker
            id="selectedDate"
            name="selectedDate"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={today}
            closeOnScroll={true}
            className="w-full focus:outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

      <div className="flex flex-col gap-1 relative">
        <div className="flex items-center gap-3 p-3 border-2 rounded-md focus-within:border-primary-500">
          <RiAccountPinCircleLine size={22} className="text-gray-500" />
          <div className="flex gap-4 w-[70%]">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="userType"
                value="local"
                onChange={(e)=> setUserType(e.target.value)}
                className="accent-black focus:outline-none"
              />
              Local
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="userType"
                value="foreigner"
                onChange={(e)=> setUserType(e.target.value)}
                className="accent-black focus:outline-none"
              />
              Foreigner
            </label>
          </div>
        </div>
        {errors.user_type && (
          <p className="text-red-500 text-xs pl-2">{errors.user_type}</p>
        )}
      </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary-0 hover:bg-secondary-0 px-5 py-3 border-none rounded-md text-[14px] font-semibold transition-colors duration-400"
        >
          Search
        </button>
      </form>
    </div>
  );
};

SearchForm2.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchForm2;
