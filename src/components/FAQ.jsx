import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";

const FAQ = () => {
  return (
    <div className="pb-10">
      <h1 className="text-[2rem] md:text-[3rem] font-bold text-center pt-10 pb-5">
        FAQs
      </h1>

      <div className="shadow-lg">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">
              How do I book a bus ticket?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            To book a bus ticket, simply select your departure and destination
            locations, choose your travel date, and browse through the available
            buses. After selecting your preferred bus, enter your passenger
            details, and proceed with payment to confirm your booking.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span">
              Can I cancel or modify my booking?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Yes, you can cancel or modify your booking by logging into your
            account and visiting the My Bookings section. Cancellation and
            modification policies vary depending on the bus operator, so please
            review the terms carefully before making any changes.
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <Typography component="span">
              What payment methods do you accept?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            We accept a variety of payment methods including credit cards, debit
            cards, and online payment platforms such as PayPal. For specific
            payment options, please check the payment section during the booking
            process.
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
