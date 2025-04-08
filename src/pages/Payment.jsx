import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const PaymentPage = () => {
  const [screenshot, setScreenshot] = useState(null);
  const [searchParams] = useSearchParams();
  const method = searchParams.get("method") || "Unknown";

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setScreenshot(URL.createObjectURL(file));
    }
  };

  const handleRemoveFile = () => {
    setScreenshot(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!screenshot) {
      alert("Please upload a screenshot of your transaction.");
      return;
    }
    console.log("Payment screenshot uploaded");
    // Handle form submission (e.g., send to server)
  };

  return (
    <div className="md:my-8 max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-primary-0 mb-4 text-center">
        Upload Payment Screenshot
      </h2>
      <p className="text-center text-base mb-4">
        Payment Method: <strong>{method}</strong>
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col items-center border p-4 rounded-lg border-gray-300">
          {screenshot && (
            <img
              src={screenshot}
              alt="Payment Screenshot"
              className="w-32 h-32 object-cover rounded-lg"
            />
          )}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
          <label className="py-2 px-4 bg-primary-0 text-white text-base font-semibold text-center rounded-md cursor-pointer hover:opacity-90">
            Choose File
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <button
            type="submit"
            className="w-auto px-6 bg-primary-0 text-white py-2 rounded-md text-base font-semibold hover:opacity-90 block mx-auto"
          >
            Submit
          </button>
          {screenshot && (
            <button
              type="button"
              onClick={handleRemoveFile}
              className="w-auto px-6 py-2 bg-red-500 text-white rounded-md text-base font-semibold hover:bg-red-600"
            >
              Remove File
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PaymentPage;
