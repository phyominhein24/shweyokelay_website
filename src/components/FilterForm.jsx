import PropTypes from "prop-types";
import { RiResetLeftFill } from "react-icons/ri";
import { useCallback, useEffect, useState } from "react";
import { endpoints } from "../constants/endpoints";
import { getRequest } from "../helpers/api";

const FilterForm = ({ onSearch, updatePayload }) => {
  const [loading, setLoading] = useState(false);
  const [selectedBusType, setSelectedBusType] = useState('All');
  const [BusType, setBusType] = useState([]);
  const [selectedDeparture, setSelectedDeparture] = useState("any");

  const loadingData = useCallback(async () => {
    setLoading(true);
    const result = await getRequest(`${endpoints.vehiclesType}`);
    if (result.status === 200) {
      setBusType(result.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadingData();
  }, [loadingData]);
  
  const filterClick = (event) =>{
    event.preventDefault();
    onSearch()
  }

  return (
    <div className="md:mt-5 bg-stone-100 p-5 w-full rounded-xl shadow-lg">
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold">Filters</span>
        <button
          title="Reset filters"
          type="button"
          onClick={() => {
            setSelectedBusType("All");
            setSelectedDeparture("any");
            onFilter({ selectedBusType: "All", selectedDeparture: "any" });
            updatePayload("value", "");
          }}
        >
          <RiResetLeftFill size={25} />
        </button>
      </div>

      <form className="flex flex-col gap-4">
        {/* Bus Type */}
        <div className="mt-3 border border-stone-400 rounded-xl">
          <p className="p-1 font-bold text-center text-lg">Bus Types</p>
          <div className="p-2 flex flex-col gap-3">
            <label className="flex items-center">
              <input
                type="radio"
                value="All"
                checked={selectedBusType === "All"}
                onChange={() => {
                  setSelectedBusType("All");
                  updatePayload("value", ""); // Set empty value for All
                }}
                className="mr-2"
              />
              All
            </label>

            {BusType?.map((value, index) => {
              return (
                <label className="flex items-center" key={index}>
                  <input
                    type="radio"
                    value={value?.name}
                    checked={selectedBusType === value?.name}
                    onChange={() => {
                      setSelectedBusType(value?.name);
                      updatePayload("value", value?.id); // Update value with the selected bus type id
                    }}
                    className="mr-2"
                  />
                  {value?.name}
                </label>
              );
            })}
          </div>
        </div>

        {/* Departure Time */}
        <div className="mt-3 border border-stone-400 rounded-xl">
          <p className="p-1 font-bold text-center text-lg">Departure Times</p>
          <div className="p-2 flex flex-col gap-3">
            {["any", "morning", "evening"].map((time) => (
              <label key={time} className="flex items-center">
                <input
                  type="radio"
                  value={time}
                  checked={selectedDeparture === time}
                  onChange={() => {
                    updatePayload("departure", event.target.value); // Set empty value for All
                    setSelectedDeparture(event.target.value);
                  }}
                  className="mr-2"
                />
                {time.charAt(0).toUpperCase() + time.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={filterClick}
          className="p-2 bg-primary-0 hover:bg-secondary-0 text-white"
        >
          Apply Filters
        </button>
      </form>
    </div>
  );
};


FilterForm.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default FilterForm;
