import PropTypes from "prop-types";
import { useState } from "react";

const PaymentSelection = ({ activeStep, handleNext, handleBack }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const paymentMethods = [
    { id: 1, name: "MPU", icon: "\ud83d\udcb3" },
    { id: 2, name: "KBZpay", icon: "\ud83d\udcb8" },
    { id: 3, name: "Wave Money", icon: "\ud83c\udf10" },
  ];

  const handleSelect = (method) => {
    setSelectedMethod(method);
    console.log("Selected method >> " + method);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMethod) {
      console.log(`Payment method selected: ${selectedMethod.name}`);
    } else {
      alert("Please select a payment method");
    }
  };

  return (
    <>
      <div className="w-full p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-primary-0 mb-6 text-center">
          Select Your Payment Method
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => handleSelect(method)}
                className={`p-6 border rounded-lg flex flex-col items-center cursor-pointer hover:shadow-md transition-all ${
                  selectedMethod?.id === method.id
                    ? "border-primary-0"
                    : "border-gray-300"
                }`}
              >
                <span className="text-3xl mb-3">{method.icon}</span>
                <p className="text-lg font-medium">{method.name}</p>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-primary-0 text-white py-3 rounded-md text-base font-semibold hover:opacity-90"
          >
            Proceed to Payment
          </button>
        </form>
      </div>
    </>
  );
};

export default PaymentSelection;

PaymentSelection.propType = {
  activeStep: PropTypes.number.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
};
