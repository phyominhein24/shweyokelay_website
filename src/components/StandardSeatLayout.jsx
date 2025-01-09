import { FaTimes } from "react-icons/fa";
import Steering from "../../src/assets/images/icons/steering.png";
import { useState } from "react";

const StandardSeatLayout = ({value}) => {
  const rows = 11;
  const seatsPerRow = 4;
  const totalSeats = rows * seatsPerRow;

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

  const handleSeatTypeSelect = (type) => {
    setSelectedSeats((prev) =>
      prev.map((seat) =>
        seat.number === modal.seatNumber ? { ...seat, type } : seat
      )
    );
    setModal({ visible: false, seatNumber: null });
  };

  const seatTypeColors = {
    Man: "bg-blue-500",
    Woman: "bg-pink-600",
    Monk: "bg-red-800",
    Nun: "bg-pink-500",
  };


  return (
    <div className="flex flex-col items-center p-3">
      <h2 className="text-lg md:text-xl font-semibold mb-4">
        Shwe Yoke Lay Standard Bus
      </h2>

      <div className="bg-gray-100 border border-black p-1 md:p-4 rounded-t-[3rem] rounded-b-3xl shadow-xl grid grid-cols-5 gap-4 pt-10 pb-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 col-span-1 flex items-center justify-center text-gray-500">
          Walkway
        </div>
        <div className="absolute right-0 top-10 w-1 h-12 bg-gray-400 rounded-lg col-span-2"></div>
        <div className="flex justify-between col-span-5 row-span-1 relative">
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
          const seatPosition = index % 4;
          const seatRow = Math.floor(index / 4);
          const gridColumn = [1, 2, 4, 5][seatPosition];

          return (
            <div
              key={seatNumber}
              className={`min-w-11 min-h-11 md:w-14 md:h-14 max-w-16 max-h-16 flex items-center justify-center rounded-lg cursor-pointer select-none ${backgroundColor}`}
              style={{ gridColumn, gridRow: seatRow + 2 }}
              onClick={() => toggleSeat(seatNumber)}
            >
              {seatNumber}
            </div>
          );
        })}
      </div>

      <div className="w-full mt-5 red">
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

export default StandardSeatLayout;
