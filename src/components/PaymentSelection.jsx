import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import mpuQR from "../assets/images/qr/test.png";
import { getRequest } from "../helpers/api";
import { endpoints } from "../constants/endpoints";

const PaymentSelection = ({ confirmPayment, activeStep, handleNext, handleBack }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [screenshot, setScreenshot] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState([])

  const handleSelect = (method) => {
    setSelectedMethod(method);
    setScreenshot(null);
    setPreview(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setScreenshot(file);
      setPreview(URL.createObjectURL(file));
    } else {
      alert("Please upload a valid image file.");
      setScreenshot(null);
      setPreview(null);
    }
  };

  const createOrder = async () => {
    setLoading(true);
    try {
      await confirmPayment(selectedMethod?.id, screenshot);
    } catch (error) {
      console.error("Payment confirmation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadingData = useCallback(async () => {
    setLoading(true);
    const result = await getRequest(`${endpoints?.payment}`);
    if (result.status === 200) {
      setPayments(result?.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  return (
    <div className="w-full p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-primary-0 mb-6 text-center">
        Select Your Payment Method
      </h2>

      <div>
        {loading ? (
          // Show a loading indicator while fetching data
          <div className="flex justify-center items-center h-32">
            <p className="text-lg font-medium text-gray-500">Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {payments?.map((method) => (
              <div
                key={method?.id}
                onClick={() => handleSelect(method)}
                className={`p-6 border rounded-lg flex flex-col items-center cursor-pointer hover:shadow-md transition-all ${
                  selectedMethod?.id === method?.id ? "border-primary-0" : "border-gray-300"
                }`}
              >
                {method?.photo ? (
                  <img
                    src={`${endpoints?.image}${method?.photo}`}
                    alt="Method Photo"
                    className="w-20 h-20 mb-3 rounded-lg"
                  />
                ) : (
                  <div className="w-20 h-20 mb-3 bg-gray-200 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500 text-sm">No Image</p>
                  </div>
                )}
                <p className="text-lg font-medium">{method?.acc_name}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedMethod && (
        <form className="space-y-6 mt-6 text-center">
          <h3 className="text-xl font-semibold mb-4">Scan QR Code</h3>
          <img
            src={selectedMethod?.acc_qr ?  `${endpoints?.image}${selectedMethod?.acc_qr}` : null}
            alt={`${selectedMethod?.acc_name} QR Code`}
            className="mx-auto w-48 h-48 border p-2 rounded-lg"
          />
          <div className="mt-4">
            <label className="block text-lg font-medium mb-2">
              Upload Transaction Screenshot
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border rounded-md p-2 w-full"
            />
            {preview && (
              <img
                src={preview}
                alt="Transaction Screenshot Preview"
                className="mx-auto mt-4 w-48 h-48 border p-2 rounded-lg"
              />
            )}
          </div>

          {screenshot && (
            <button
              onClick={()=>createOrder()}
              className="w-full bg-primary-0 text-white py-3 rounded-md text-base font-semibold hover:opacity-90 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? "Processing..." : "Confirm Payment"}
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default PaymentSelection;

PaymentSelection.propTypes = {
  activeStep: PropTypes.number.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
};
