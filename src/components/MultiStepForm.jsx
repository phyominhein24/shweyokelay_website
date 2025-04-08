import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SeatSelectionStep from "./SeatSelectionStep";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import TravellerInfoStep from "./TravellerInfoStep";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import { postRequest } from "../helpers/api";
import { endpoints } from "../constants/endpoints";
import { keys } from "../constants/config";
import { getData } from "../helpers/localstorage";

const steps = ["Seat & Traveller Info", "Payment", "Confirmation"];
const MultiStepForm = () => {

  const navigate = useNavigate();
  const location = useLocation();
  
  const { value, orders } = location.state;

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const [bookerInfo, setBookerInfo] = React.useState({});
  const [selectedSeats, setSelectedSeats] = React.useState(orders);

  React.useEffect(()=>{
    console.log(selectedSeats)
  },[selectedSeats])

  const confirmPayment = async (id, file) => {
    const formData = new FormData();
  
    formData.append("member_id", getData(keys.USER)?.id);
    formData.append("route_id", value?.id);
    formData.append("phone", bookerInfo?.phone);
    formData.append(
      "nrc",
      `${bookerInfo?.region}/${bookerInfo?.township}${bookerInfo?.nrcType}${bookerInfo?.nrcNumber}`
    );
    formData.append("seat", JSON.stringify(selectedSeats.filter(seat => !seat.sold)));
    formData.append("total", selectedSeats?.length * Number(value?.price));
    formData.append("note", bookerInfo?.specialRequest || "");
    formData.append("start_time", value?.selected_date);
    formData.append("payment_id", id);
  
    if (file) {
      formData.append("screenshot", file);
    }
  
    try {
      const result = await postRequest(`${endpoints.paymentHistory}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (result?.status === 200) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
    }
  };

  const isStepOptional = (step) => {
    // return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // adding steps
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <SeatSelectionStep
            selectedSeats={selectedSeats}
            setSelectedSeats={(e)=>setSelectedSeats(e)}
            setBookerInfo={(e)=>setBookerInfo(e)}
            bookerInfo={bookerInfo}
            activeStep={activeStep}
            handleNext={handleNext}
            handleBack={handleBack}
            value={value}
            orders={orders}
          />
        );
      case 1:
        return (
          <TravellerInfoStep
            selectedSeats={selectedSeats}
            setSelectedSeats={(e)=>setSelectedSeats(e)}
            setBookerInfo={(e)=>setBookerInfo(e)}
            bookerInfo={bookerInfo}
            activeStep={activeStep}
            handleNext={handleNext}
            handleBack={handleBack}
            value={value}
            confirmPayment={(id,file)=>confirmPayment(id,file)}
          />
        );
      // case 2:
      //   return <Payment />;
      default:
        return "Unknown Step";
    }
  };

  React.useEffect(()=>{
    if(value == null){
      navigate('/')
    }
  },[])


  return (
    <div className="max-w-[1280px] mx-auto py-5">
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {
              StepIconProps: {
                sx: { fontSize: "2rem" }, // Current Step Number
              },
            };
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              {getStepContent(activeStep)}
            </Typography>
            {/* <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                pt: 2,
              }}
            >
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box> */}
          </React.Fragment>
        )}
      </Box>
    </div>
  );
};

export default MultiStepForm;
