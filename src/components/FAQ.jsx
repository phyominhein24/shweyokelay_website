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
              Where are the Shwe Yoke Lay gates located?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            The Headoffice of Shwe Yoke Lay&apos;s Gate was located in Yangon.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span">
              How many trips do you have?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            We have Yangon ~ Taunggyi and Yangon ~ Mandalay but we are closing
            Yangon ~ Mandalay Trip Temporary.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <Typography component="span">
              How to purchase bus ticket?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            You can select seat yourself and after making the payment by KBZPay
            within the application, you can screenshot the E-ticket or check the
            E-ticket in the My Tickets.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <Typography component="span">
              Can I bring my lovely pets on the Express?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Yes, you can bring pets but they should be carried from the belly of
            the vehicle.{" "}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <Typography component="span">
              Can I cancel or refund for purchasing tickets?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Please note that bookings are final and non-refundable.
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <Typography component="span">
              Can I change Trip&apos;s plan?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Sorry, we cannot change trip&apos;s plan.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <Typography component="span">
              Can I change date and time of ticket?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Yes, you can modify your travel date and time with “Shwe Yoke Lay”
            Highway Express. Changes must be requested at least two days before
            your original departure date, and a 15% service fees will apply.
            Please contact our customer support team &#40;to contact 09
            408800095&#41; to assist you with the adjustment. We appreciate your
            understanding and are here to help ensure your journey is as smooth
            as possible.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <Typography component="span">
              What should I do if I encounter a problem while booking a ticket?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            If you encounter any issues during the booking process, please
            contact our customer support team &#40;to contact 09 408800095&#41;
            immediately. They will assist you in resolving the problem and
            ensure a smooth booking experience.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <Typography component="span">
              How do I know that I have purchased a ticket? When I arrive at the
              bus stop, what will I show as proof?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Once you have completed your purchase, your E-ticket will be
            available. Alternatively, you can find it in the My Ticket. Your
            E-ticket will include a unique reference number for verification.
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <Typography component="span">
              What do I need to bring to Bus station?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            If you are a Myanmar citizen, you have to bring your NRC and if you
            are a foreigner, a passport is needed to bring along with the
            purchased E-ticket. When you arrived at the bus-station, you have to
            show the purchased seat number to verify you are a right customer.
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
