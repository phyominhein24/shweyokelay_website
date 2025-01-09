import PaymentSelection from "./PaymentSelection";
import PropTypes from "prop-types";
import TripSummary from "./TripSummary";

const TravellerInfoStep = ({ activeStep, handleNext, handleBack, value }) => {
  return (
    <div className="mt-10 mx-auto max-w-[1280px] px-3 md:px-5 flex flex-col md:flex-row gap-y-6 md:gap-x-16">
      {/* sitting plan */}
      <div className="w-full md:w-[50%]">
        <PaymentSelection handleNext={handleNext} value={value}/>
      </div>

      {/* trip Summary */}
      <div className="w-full md:w-[50%]">
        <TripSummary activeStep={activeStep} value={value}/>
      </div>
    </div>
  );
};

export default TravellerInfoStep;

TravellerInfoStep.propTypes = {
  activeStep: PropTypes.number.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};
