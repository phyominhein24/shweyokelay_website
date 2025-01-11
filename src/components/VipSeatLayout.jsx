import { FaTimes } from "react-icons/fa";
import Steering from "../../src/assets/images/icons/steering.png";
import { useState } from "react";

const VipSeatLayout = ({ value }) => {
  const rows = 10;
  const seatsPerRow = 3;
  const totalSeats = rows * seatsPerRow;

  // Track selected seats and their types
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [modal, setModal] = useState({ visible: false, seatNumber: null });

  const toggleSeat = (seatNumber) => {
    setSelectedSeats((prev) => {
      const isSelected = prev.some((seat) => seat.number === seatNumber);
      if (isSelected) {
        return prev.filter((seat) => seat.number !== seatNumber);
      } else {
        setModal({ visible: true, seatNumber });
        return [...prev, { number: seatNumber, type: null }];
      }
    });
  };

  // Handle seat type selection and color change
  const handleSeatTypeSelect = (type) => {
    setSelectedSeats((prev) =>
      prev.map((seat) =>
        seat.number === modal.seatNumber ? { ...seat, type } : seat
      )
    );
    setModal({ visible: false, seatNumber: null });
  };

  // Mapping seat types to background colors
  const seatTypeColors = {
    Man: "bg-blue-500",
    Woman: "bg-pink-600",
    Monk: "bg-red-800",
    Nun: "bg-pink-300",
  };

  return (
    <div className="flex flex-col items-center p-3">
      <h2 className="text-lg md:text-xl font-semibold mb-4 bg-pink">
        Shwe Yoke Lay VIP Bus
      </h2>

      <div className="bg-gray-100 border border-black p-1 md:p-4 rounded-t-[3rem] rounded-b-3xl shadow-xl grid grid-cols-4 gap-4 pt-10 pb-8 relative">
        <div className="absolute top-1/2 left-2/3 -translate-x-2/3 -translate-y-1/2 col-span-1 flex items-center justify-center text-gray-500">
          Walkway
        </div>
        {/* Door */}
        <div className="absolute right-0 top-10 w-1 h-12 bg-gray-400 rounded-lg col-span-2"></div>

        <div className="flex justify-between col-span-4 row-span-1 relative">
          <div className="w-11 h-11 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center rounded-lg">
            <img src={Steering} alt="Driver" />
          </div>

          <div className="w-16 h-16 flex items-center justify-center text-gray-500">
            Door
          </div>
        </div>

        {/* Passenger seats layout */}
        {Array.from({ length: totalSeats }, (_, index) => {
          const seatNumber = index + 1;
          const seat = selectedSeats.find((seat) => seat.number === seatNumber);
          const backgroundColor = seat
            ? seatTypeColors[seat.type] || "bg-green-400"
            : "bg-green-400";

          // Calculate seat position
          const seatPosition = index % 3;
          const seatRow = Math.floor(index / 3);
          const gridColumn = [1, 2, 4, 1][seatPosition];

          // let gridColumn;
          // switch (seatPosition) {
          //   case 0:
          //     gridColumn = 1; // Column 1 for seat 1, 5, 9
          //     break;
          //   case 1:
          //     gridColumn = 2; // Column 2 for seat 2, 6, 10
          //     break;
          //   case 2:
          //     gridColumn = 4; // Column 4 for seat 3, 7, 11
          //     break;
          //   default:
          //     gridColumn = 1;
          // }

          return (
            <div
              key={seatNumber}
              className={`min-w-11 min-h-11 md:w-14 md:h-14 max-w-16 max-h-16 flex items-center justify-center rounded-lg cursor-pointer select-none ${backgroundColor}`}
              style={{
                gridColumn,
                gridRow: seatRow + 2, // Seats start below driver and door
              }}
              onClick={() => toggleSeat(seatNumber)}
            >
              {seatNumber}
            </div>
          );
        })}
      </div>

      <div className="w-full mt-5">
        <h3 className="text-lg text-center font-semibold mb-2">
          Color definitions
        </h3>
        <div className="flex gap-2 justify-center">
          {["Man", "Woman", "Monk", "Nun"].map((type) => (
            <div
              key={type}
              className={`px-3 py-2 ${seatTypeColors[type]} text-white rounded-lg`}
            >
              {type}
            </div>
          ))}
        </div>
      </div>

      {/* Modal for selecting seat type */}
      {modal.visible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <h3 className="text-xl font-semibold mb-4">Who will sit here?</h3>
            <div className="flex gap-2 justify-around">
              {["Man", "Woman", "Monk", "Nun"].map((type) => (
                <button
                  key={type}
                  className={`p-2 ${seatTypeColors[type]} text-white rounded-lg`}
                  onClick={() => handleSeatTypeSelect(type)}
                >
                  {type}
                </button>
              ))}
            </div>
            <div className="absolute top-0 right-0">
              <button
                className="p-1 border-l-2 border-b-2 border-red-500 text-sm text-black hover:text-white hover:bg-red-200 rounded-lg"
                onClick={() => setModal({ visible: false, seatNumber: null })}
              >
                <FaTimes size={25} color="red" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VipSeatLayout;
