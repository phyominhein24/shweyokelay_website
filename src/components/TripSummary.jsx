import {
  CalendarTodayOutlined,
  DepartureBoardSharp,
} from "@mui/icons-material";
import { GrLocation, GrMapLocation } from "react-icons/gr";

import { BsTicket } from "react-icons/bs";
import { CiClock2 } from "react-icons/ci";
import { FaMoneyBill } from "react-icons/fa";
import NrcForm from "./NrcForm";
// import NRCForm from "react-mm-nrcform";
import { PiSeatbelt } from "react-icons/pi";
import PropTypes from "prop-types";
import { useState } from "react";

const TripSummary = ({ activeStep, handleNext, value }) => {
  const [bookerName, setBookerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");

  const [nrcNumber, setNrcNumber] = useState("");
  const [error, setError] = useState("");

  const handleNrcChange = (e) => {
    const value1 = e.target.value;
    setNrcNumber(value1);

    // Basic NRC format validation (customize based on specific rules)
    const nrcRegex = /^[0-9]{1,2}\/[A-Za-z]{3,7}\(N\)[0-9]{6}$/;

    if (!nrcRegex.test(value1) && value1 !== "") {
      setError("Invalid NRC format. Example: 12/ThaGaKa(N)123456");
    } else {
      setError("");
    }
  };

  const filterSubmitted = (e) => {
    e.preventDefault();
    if (!error && nrcNumber) {
      alert(`NRC Submitted: ${nrcNumber}`);
    } else {
      alert("Please enter a valid NRC number.");
    }
    console.log("info form submitted");
  };

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
                <span>{value?.starting_point}</span>
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
                <span>{value?.ending_point}</span>
              </div>
            </div>

            {/* time + bus type */}
            <div className="w-[40%] flex justify-center items-center">
              <div className="w-full text-center">
                <span className="block text-gray-700 text-xl font-bold">
                  {value?.departure}
                </span>
                <span className="block text-2xl font-bold">{value?.vehicles_type?.name}</span>
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
              <p className="font-bold">{"12 Jan 2025"}</p>
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
              <p className="font-bold">{value?.departure}</p>
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
              <p>2</p>
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
                <p className="px-3 py-1 border border-gray-500 rounded-lg">
                  21
                </p>
                <p className="px-3 py-1 border border-gray-500 rounded-lg">
                  22
                </p>
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
              <p>40,000 MMK</p>
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
            <div className="font-bold">80,000 MMK</div>
          </div>

          {/* Facilities */}
          <div className="w-full pt-5 text-sm md:text-base border-t border-t-gray-400 border-dashed">
            <span className="pr-3">Including</span>

            {JSON.parse(value?.vehicles_type?.facilities).map((v,index)=>{
              return (
                <p key={index} className="inline-block px-3 py-1 border border-gray-500 rounded-lg mr-3 mb-2">
                {v}
              </p>
              )
            })}

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
                  <NrcForm />
                </div>
              </div>

              {/* Email */}
              {/* <div className="flex items-center">
              <div className="w-[30%]">
                <label className="font-semibold">Email</label>
              </div>
              <div className="w-[70%]">
                <input
                  type="text"
                  value={email}
                  placeholder="This email will be used to send your ticket"
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full p-1 border border-stone-500"
                />
              </div>
            </div> */}

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
                  onClick={handleNext}
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
  handleBack: PropTypes.func.isRequired,
};
