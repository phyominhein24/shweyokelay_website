import PaymentSelection from "./PaymentSelection";
import PropTypes from "prop-types";
import TripSummary from "./TripSummary";
import { useEffect } from "react";

const TravellerInfoStep = ({ confirmPayment, activeStep, bookerInfo, setBookerInfo, handleNext, selectedSeats, handleBack, value }) => {

  return (
    <div className="mt-10 mx-auto max-w-[1280px] px-3 md:px-5 flex flex-col md:flex-row gap-y-6 md:gap-x-16">
      {/* sitting plan */}
      <div className="w-full md:w-[50%]">
        <PaymentSelection confirmPayment={(id,file)=>confirmPayment(id,file)} handleNext={handleNext} value={value}/>
      </div>

      {/* trip Summary */}
      <div className="w-full md:w-[50%]">
        <TripSummary activeStep={activeStep} setBookerInfo={(e)=>setBookerInfo(e)} handleNext={handleNext} selectedSeats={selectedSeats} value={value}/>
      </div>
    </div>
  );
};

export default TravellerInfoStep;

TravellerInfoStep.propTypes = {
  activeStep: PropTypes.number.isRequired,
  handleNext: PropTypes.func.isRequired,
};
