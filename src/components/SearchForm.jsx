import { useCallback, useEffect, useState } from "react";
import { BsArrowDownUp } from "react-icons/bs";
import { CiCalendarDate } from "react-icons/ci";
import DatePicker from "react-datepicker";
import { GrMapLocation } from "react-icons/gr";
import { IoLocationOutline } from "react-icons/io5";
import PropTypes from "prop-types";
import { getRequest } from "../helpers/api";
import { endpoints } from "../constants/endpoints";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchForm = ({ onSearch, searchData = null }) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [counter, setCounter] = useState([]);
  const [startingPointOptions, setStartingPointOptions] = useState([]);
  const [endingPointOptions, setEndingPointOptions] = useState([]);
  const [payload, setPayload] = useState({
    starting_point: "",
    ending_point: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Load options from API
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

  // Handle Redux Data
  useEffect(() => {
    if (searchData !== null) {
      setPayload({
        starting_point: searchData.payload?.starting_point || "",
        ending_point: searchData.payload?.ending_point || "",
      });
      setSelectedDate(new Date(searchData.selectedDate) || today);
    }
  }, [searchData]);

  // Filter options dynamically
  useEffect(() => {
    setStartingPointOptions(
      counter.filter((point) => point.name !== payload?.ending_point)
    );
    setEndingPointOptions(
      counter.filter((point) => point.name !== payload?.starting_point)
    );
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
    const formattedDate = format(selectedDate, "MM/dd/yyyy");
    onSearch({ payload, selectedDate: formattedDate });
  };

  return (
    <div className="">
      <div className="pt-5">
        <form
          onSubmit={searchFormSubmitted}
          id="routeSearchForm"
          className="flex flex-col gap-3 "
        >
          {/* Starting Point */}
          <div className="flex gap-3 p-2 border-2 border-black rounded-md">
            <IoLocationOutline size={22} className="text-gray-600" />
            <select
              name="origin"
              id="origin"
              className="bg-transparent focus:outline-none w-[70%]"
              value={payload?.starting_point}
              onChange={(e) => updatePayload("starting_point", e.target.value)}
            >
              <option value="" disabled>
                Select origin
              </option>
              {startingPointOptions?.map((value, index) => (
                <option key={index} value={value.name}>
                  {value.name}
                </option>
              ))}
            </select>
          </div>

          {/* Destination */}
          <div className="flex gap-3 p-2 border-2 border-black rounded-md relative">
            <GrMapLocation size={20} className="text-gray-500" />
            <select
              name="destination"
              id="destination"
              className="bg-transparent focus:outline-none w-[70%]"
              value={payload?.ending_point}
              onChange={(e) => updatePayload("ending_point", e.target.value)}
            >
              <option value="" disabled>
                Select destination
              </option>
              {endingPointOptions?.map((value, index) => (
                <option key={index} value={value.name}>
                  {value.name}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={swapRoute}
              className="w-8 h-8 absolute -top-6 right-5 flex justify-center items-center rounded-full border-2 border-black bg-white"
            >
              <BsArrowDownUp />
            </button>
          </div>

          {/* Date Picker */}
          <div className="flex gap-3 p-2 border-2 border-black rounded-md">
            <CiCalendarDate size={22} className="text-gray-600" />
            <DatePicker
              id="selectedDate"
              name="selectedDate"
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={today}
              closeOnScroll={true}
              className="w-full focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary-0 hover:bg-secondary-0 px-5 py-[10px] border-none rounded-md text-[14px] font-semibold transition-colors duration-400 "
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchForm;
