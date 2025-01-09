import PropTypes from "prop-types";
import StandardSeatLayout from "./StandardSeatLayout";
import TripSummary from "./TripSummary";
import VipSeatLayout from "./VipSeatLayout";

const SeatSelectionStep = ({ handleNext, value }) => {

  return (
    <>
      <div className="mt-3 mx-auto max-w-[1280px] px-3 md:px-5 flex flex-col md:flex-row gap-y-6 md:gap-x-10">
        {/* sitting plan */}
        <div className="w-full md:w-[35%] ">
          {value?.vehicles_type?.seat_layout === "2:2" ? (
            <StandardSeatLayout value={value}/>
          ) : (
            <VipSeatLayout value={value}/>
          )}
        </div>

        {/* trip Summary */}
        <div className="w-full md:w-[65%] md:px-16 ">
          <TripSummary handleNext={handleNext} value={value}/>
        </div>
      </div>
    </>
  );
};

export default SeatSelectionStep;

SeatSelectionStep.propTypes = {
  activeStep: PropTypes.number.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired
};
