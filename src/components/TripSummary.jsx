import {
  CalendarTodayOutlined,
  DepartureBoardSharp,
} from "@mui/icons-material";
import { GrLocation, GrMapLocation } from "react-icons/gr";
import { useEffect, useState } from "react";

import { BsTicket } from "react-icons/bs";
import { CiClock2 } from "react-icons/ci";
import { FaMoneyBill } from "react-icons/fa";
// import NRCForm from "react-mm-nrcform";
import { PiSeatbelt } from "react-icons/pi";
import PropTypes from "prop-types";
import { seatTypeColors } from "../helpers/utilities";
import { townshipData } from "./TownshipData";

const TripSummary = ({
  setBookerInfo,
  activeStep,
  handleNext,
  value,
  selectedSeats,
}) => {
  const [bookerName, setBookerName] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");

  const [region, setRegion] = useState("");
  const [townShip, setTownShip] = useState("");
  const [townships, setTownships] = useState([]);
  const [nrcNumber, setNrcNumber] = useState("");
  const [nrcType, setNrcType] = useState("(နိုင်)");
  const regions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
    setTownships(townshipData[e.target.value] || []);
  };

  const handleTownshipChange = (e) => {
    setTownShip(e.target.value);
  };

  const [errors, setErrors] = useState({});

  const filterSubmitted = (e) => {
    e.preventDefault();

    let isValid = true;
    const newErrors = {};

    if (selectedSeats.length == 0) {
      newErrors.selectedSeats = "Please select an seats.";
      alert("Please select an seats.");
      isValid = false;
    }
    if (!bookerName) {
      newErrors.bookerName = "Please select an booker name.";
      isValid = false;
    }
    if (!phone) {
      newErrors.phone = "Please select an phone number.";
      isValid = false;
    }
    if (!region) {
      newErrors.region = "Please select an region.";
      isValid = false;
    }
    if (!townShip) {
      newErrors.townShip = "Please select an townships.";
      isValid = false;
    }
    if (!nrcType) {
      newErrors.nrcType = "Please select an nrc type.";
      isValid = false;
    }
    if (!nrcNumber) {
      newErrors.nrcNumber = "Please select an nrc number.";
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) {
      return;
    }

    setBookerInfo({
      name: bookerName,
      phone: phone,
      specialRequest: specialRequest,
      region: region,
      township: townShip,
      nrcType: nrcType,
      nrcNumber: nrcNumber,
    });
    handleNext();
  };

  console.log("selectedSeats", selectedSeats);

  return (
    <div className="w-full ">
      <div className="flex flex-col border border-black p-3 md:p-5 md:mb-5">
        <p className="mb-5 py-3 border-b border-b-black text-2xl font-bold text-center">
          Your Trip Information
        </p>

        {/* ticket */}
        <div className="pb-5 md:pb-0 flex flex-col items-center ">
          {/* from + to */}
          <div className="mb-10 w-full flex justify-between">
            <div className="w-[60%]">
              <div className="pb-5">
                <GrLocation
                  color="#000"
                  size={30}
                  className="customIconWeight inline-block w-6 h-6 mr-3"
                />
                <span>{value?.starting_point2}</span>
              </div>
              <div className="border-l-2 border-black ml-3 h-6 mb-5 ">
                <span className="pl-3 text-stone-500">to</span>
              </div>
              <div>
                <GrMapLocation
                  color="#000"
                  size={30}
                  className="customIconWeight inline-block w-6 h-6 mr-3"
                />
                <span>{value?.ending_point2}</span>
              </div>
            </div>

            {/* time + bus type */}
            <div className="w-[40%] flex justify-center items-center">
              <div className="w-full text-center">
                <span className="block text-gray-700 text-xl font-bold">
                  {value?.departure &&
                    `${+value.departure.split(":")[0] % 12 || 12}:${
                      value.departure.split(":")[1]
                    } ${+value.departure.split(":")[0] >= 12 ? "PM" : "AM"}`}
                </span>
                <span className="block text-2xl font-bold">
                  {value?.vehicles_type?.name}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full">
            {/* Estimated Duration */}
            <div className="pb-5 flex justify-between">
              <div>
                <CiClock2
                  color="#000"
                  size={30}
                  className="customIconWeight inline-block w-6 h-6 mr-3"
                />
                <span>Estimated Duration:</span>
              </div>
              <p>{value?.duration}</p>
            </div>
            {/* Departure Date */}
            <div className="pb-5 flex justify-between">
              <div>
                <CalendarTodayOutlined
                  color="#000"
                  size={30}
                  className="customIconWeight inline-block w-6 h-6 mr-3"
                />
                <span>Departure Date:</span>
              </div>
              <p className="font-bold">
                {value?.selected_date &&
                  new Date(value.selected_date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
              </p>
            </div>
            {/* Boarding Time */}
            <div className="pb-5 flex justify-between">
              <div>
                <DepartureBoardSharp
                  color="#000"
                  size={30}
                  className="customIconWeight inline-block w-6 h-6 mr-3"
                />
                <span>Boarding Time:</span>
              </div>
              <p className="font-bold">
                {value?.departure &&
                  `${+value.departure.split(":")[0] % 12 || 12}:${
                    value.departure.split(":")[1]
                  } ${+value.departure.split(":")[0] >= 12 ? "PM" : "AM"}`}
              </p>
            </div>
            {/* Number of seat */}
            <div className="pb-5 flex justify-between">
              <div>
                <PiSeatbelt
                  color="#000"
                  size={30}
                  className="customIconWeight inline-block w-6 h-6 mr-3"
                />
                <span>Number of seat:</span>
              </div>
              <p>{selectedSeats?.length}</p>
            </div>
            {/* Selected seats */}
            <div className="pb-5 flex justify-between">
              <div>
                <BsTicket
                  color="#000"
                  size={30}
                  className="customIconWeight inline-block w-6 h-6 mr-3"
                />
                <span>Selected seats:</span>
              </div>
              <div className="flex gap-3">
                {selectedSeats
                  ?.filter((value) => !value.sold) // Exclude seats with sold: true
                  .map((value, index) => (
                    <p
                      key={index}
                      className={`px-3 py-1 border border-gray-500 rounded-lg ${
                        seatTypeColors[value.type]
                      }`}
                    >
                      {value?.number}
                    </p>
                  ))}
              </div>
            </div>
            {/* Unit Ticket Price */}
            <div className="pb-5 flex justify-between">
              <div>
                <FaMoneyBill
                  color="#000"
                  size={30}
                  className="customIconWeight inline-block w-6 h-6 mr-3"
                />
                <span>Unit Ticket Price:</span>
              </div>
              <p>{value?.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} MMK</p>
            </div>
          </div>

          {/* total */}
          <div className="w-full flex justify-between items-center text-xl border-t border-t-black py-5">
            <div className="">
              <FaMoneyBill
                color="#000"
                size={30}
                className="customIconWeight inline-block w-6 h-6 mr-3"
              />
              <span>Total Ticket Price: </span>
            </div>
            <div className="font-bold">
              {(selectedSeats?.length * Number(value?.price)).toLocaleString()}{" "}
              MMK
            </div>
          </div>

          {/* Facilities */}
          <div className="w-full pt-5 text-sm md:text-base border-t border-t-gray-400 border-dashed">
            <span className="pr-3">Including</span>

            {value?.vehicles_type?.facilities ? (
              JSON.parse(value.vehicles_type.facilities)?.map((v, index) => (
                <p
                  key={index}
                  className="inline-block px-3 py-1 border border-gray-500 rounded-lg mr-3 mb-2"
                >
                  {v}
                </p>
              ))
            ) : (
              <p className="text-gray-500">No facilities available</p> // Graceful fallback
            )}
          </div>
        </div>
      </div>

      {/* Traveller Info */}
      {activeStep !== 1 && (
        <div className="flex flex-col border border-black p-3 md:p-5">
          <div className="w-full">
            <form onSubmit={filterSubmitted} className="flex flex-col gap-4">
              <p className="mb-5 py-3 border-b border-b-black text-2xl font-bold text-center">
                Please fill in the required information for your trip.
              </p>

              {/* Booker Name */}
              <div className="flex items-center">
                <div className="w-[30%]">
                  <label className="font-semibold">
                    Booker Name<span className="text-red-500">&nbsp;*</span>
                  </label>
                </div>
                <div className="w-[70%]">
                  <input
                    type="text"
                    value={bookerName}
                    placeholder="Who is making this booking?"
                    onChange={(event) => setBookerName(event.target.value)}
                    className="w-full p-1 border border-stone-500"
                  />
                  {errors.bookerName && (
                    <p className="text-red-500 text-xs pl-2">
                      {errors.bookerName}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone Number */}
              <div className="flex items-center">
                <div className="w-[30%]">
                  <label className="font-semibold">
                    Phone Number<span className="text-red-500">&nbsp;*</span>
                  </label>
                </div>
                <div className="w-[70%]">
                  <input
                    type="text"
                    value={phone}
                    placeholder="09 XXX XXX XXX"
                    onChange={(event) => setPhone(event.target.value)}
                    className="w-full p-1 border border-stone-500"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs pl-2">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* NRC */}
              <div className="flex items-center">
                <div className="w-[30%]">
                  <label className="font-semibold">
                    NRC Number<span className="text-red-500">&nbsp;*</span>
                  </label>
                </div>
                <div className="w-[70%]">
                  <div>
                    <form className="flex gap-1">
                      {/* region */}
                      <div className="flex-none">
                        <select
                          id="region"
                          value={region}
                          onChange={handleRegionChange}
                          className="p-1 border border-stone-500 bg-transparent"
                        >
                          <option value="" disabled>
                            ရွေးပါ
                          </option>

                          {regions.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Township */}
                      <div className="flex-none">
                        <select
                          id="code"
                          value={townShip}
                          onChange={handleTownshipChange}
                          className="p-1 border border-stone-500 bg-transparent"
                        >
                          {townships.length > 0 ? (
                            townships.map((township, index) => (
                              <option key={index} value={township}>
                                {township}
                              </option>
                            ))
                          ) : (
                            <option value="">မရှိပါ</option>
                          )}
                        </select>
                      </div>

                      {/* type */}
                      <div className="flex-none">
                        <select
                          id="number_type"
                          value={nrcType}
                          onChange={(e) => setNrcType(e.target.value)}
                          className="p-1 border border-stone-500 bg-transparent"
                        >
                          <option value="(နိုင်)">နိုင်</option>
                          <option value="(ဧည့်)">ဧည့်</option>
                          <option value="(ပြု)">ပြု</option>
                        </select>
                      </div>

                      {/* Card no. */}
                      <div className="grow ">
                        <input
                          type="text"
                          id="nrcNumber"
                          minLength="6"
                          maxLength="7"
                          value={nrcNumber}
                          onChange={(e) => setNrcNumber(e.target.value)}
                          className="w-full p-1 border border-stone-500"
                          placeholder="123456"
                        />
                      </div>
                    </form>
                    {errors.region && (
                      <p className="text-red-500 text-xs pl-2">
                        {errors.region}
                      </p>
                    )}
                    {errors.townShip && (
                      <p className="text-red-500 text-xs pl-2">
                        {errors.townShip}
                      </p>
                    )}
                    {errors.nrcType && (
                      <p className="text-red-500 text-xs pl-2">
                        {errors.nrcType}
                      </p>
                    )}
                    {errors.nrcNumber && (
                      <p className="text-red-500 text-xs pl-2">
                        {errors.nrcNumber}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Special Request */}
              <div className="flex items-center">
                <div className="w-[30%]">
                  <label className="font-semibold">Special Request</label>
                </div>
                <div className="w-[70%]">
                  {/* <input
                    type="text"
                    value={specialRequest}
                    placeholder="Who is making this booking?"
                    onChange={(event) => setSpecialRequest(event.target.value)}
                    className="w-full p-1 border border-stone-500"
                  /> */}
                  <textarea
                    name="specialRequest"
                    id="specialRequest"
                    value={specialRequest}
                    rows={3}
                    onChange={(event) => setSpecialRequest(event.target.value)}
                    className="w-full p-1 border border-stone-500"
                    placeholder="Please let us know if you have any special requests"
                  ></textarea>
                </div>
              </div>

              <div className="w-full flex justify-center text-xl py-5">
                <button
                  onClick={filterSubmitted}
                  className={`w-1/2 bg-primary-0 hover:bg-secondary-0 px-5 py-[10px] border-none rounded-md text-[14px] font-semibold transition-colors duration-400`}
                >
                  Continue to payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripSummary;

TripSummary.propTypes = {
  activeStep: PropTypes.number.isRequired,
  handleNext: PropTypes.func.isRequired,
};
