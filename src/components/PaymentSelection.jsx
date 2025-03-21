import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const PaymentSelection = ({ activeStep, handleNext, handleBack }) => {
  const navigate = useNavigate();

  const paymentMethods = [
    { id: 1, name: "KBZpay", icon: "\ud83d\udcb8", url: "/payment" },
    { id: 2, name: "MPU", icon: "\ud83d\udcb3", url: "/payment" },
    { id: 3, name: "Wave Money", icon: "\ud83c\udf10", url: "/payment" },
  ];

  const handleRedirect = (method) => {
    console.log(
      "Redirecting to: " + method.url + " with method: " + method.name
    );
    navigate(`${method.url}?method=${encodeURIComponent(method.name)}`);
  };

  return (
    <div className="w-full p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-primary-0 mb-6 text-center">
        Select Your Payment Method
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => handleRedirect(method)}
            className="p-6 border rounded-lg flex flex-col items-center cursor-pointer hover:shadow-md transition-all border-gray-300"
          >
            <span className="text-3xl mb-3">{method.icon}</span>
            <p className="text-lg font-medium">{method.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentSelection;

PaymentSelection.propTypes = {
  activeStep: PropTypes.number.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
};
