import { GrLocation, GrMapLocation } from "react-icons/gr";

import { CiClock2 } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getData } from "../helpers/localstorage";
import { keys } from "../constants/config";

const Ticket = ({ value, params, orders }) => {

  const navigate = useNavigate();

  return (
    <div className="flex flex-col pt-8 pb-7 border border-gray-500 rounded-2xl bg-[#fafbfc] shadow-lg text-lg">
      <div className="pb-5 md:pb-0 flex flex-col md:flex-row items-center border-b border-b-gray-400 border-dashed">
        {/* time + bus type */}
        <div className="w-full md:w-[25%] text-center">
          <span className="block text-2xl font-bold">{value?.departure}</span>
          <span className="block text-2xl font-bold">{value?.vehicles_type_id}</span>
        </div>
        {/* from + to */}
        <div className="w-full md:w-[50%] px-5 md:px-0">
          <div className="pb-5">
            <GrLocation
              color="#000"
              size={30}
              className="customIconWeight inline-block w-6 h-6 mr-3"
            />
            <span>{value?.starting_point2}</span>
          </div>
          <div className="bordr border-l-2 border-black ml-3 h-6 mb-5"></div>
          <div className="pb-5">
            <GrMapLocation
              color="#000"
              size={30}
              className="customIconWeight inline-block w-6 h-6 mr-3"
            />
            <span>{value?.ending_point2}</span>
          </div>
          <div className="pb-5">
            <CiClock2
              color="#000"
              size={30}
              className="customIconWeight inline-block w-6 h-6 mr-3"
            />
            <span>Estimated Duration: {value?.duration}</span>
          </div>
        </div>
        {/* price + button */}
        <div className="w-full md:w-[25%] flex flex-col items-center justify-center text-center">
          <span className="block text-2xl w-[180px] font-bold pb-3">
            {params?.selected_user_type === "foreigner" ? value?.fprice : value?.price} MMK
          </span>
          <button
            type="button"
            onClick={() => {
              if (!getData(keys.USER)) {
                navigate("/login");
                return;
              }

              const orders = value?.orders?.map(order => {
                try {
                    const seats = JSON.parse(order.seat); // Parse seat JSON safely
                    if (!Array.isArray(seats)) return []; // Ensure it's an array
                    
                    return seats.map(seat => ({
                        number: seat?.number ?? null,  // Use null if undefined
                        type: seat?.type ?? "Unknown", // Use "Unknown" if undefined
                        sold: true
                    }));
                } catch (error) {
                    console.error("Invalid JSON in order.seat:", order.seat, error);
                    return []; // Return empty array if parsing fails
                }
            });
          
              const updatedValue = {
                ...value,
                price: params?.selected_user_type === "foreigner" ? value?.fprice : value?.price,
              };
           
              navigate("/step", { state: { value: { ...updatedValue, ...params }, orders: orders.flat() } });
            }}
            className="w-[180px] bg-primary-0 hover:bg-secondary-0 px-5 py-[7px] border-none rounded-sm text-[14px] font-semibold transition-colors duration-400 "
          >
            BUY
          </button>
        </div>
      </div>

      {/* Facilities */}
      <div className="px-5 md:px-20 pt-6 text-sm md:text-lg">
        <span className="pr-3">Facilities:</span>

        {JSON.parse(value?.vehicles_type?.facilities).map((v,index)=>{
          return (
          <p key={index} className="inline-block px-3 py-1 border border-gray-500 rounded-lg mr-3 mb-2">
            {v}
          </p>
          )
        })}
       
      </div>
    </div>
  );
};

export default Ticket;
