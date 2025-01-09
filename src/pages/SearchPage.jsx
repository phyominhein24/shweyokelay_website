import "react-datepicker/dist/react-datepicker.css";

import FilterForm from "../components/FilterForm";
import SearchForm from "../components/SearchForm";
import Ticket from "../components/Ticket";
import { endpoints } from "../constants/endpoints";
import { getRequest } from "../helpers/api";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const handleSearch = (searchValue) => {
    console.log("Search applied:", searchValue);
  };

  const handleFilter = (filters) => {
    console.log("Filters applied:", filters);
  };

  const location = useLocation();
  const searchData = location.state || null;

  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    filter: "vehicles_type_id",
    value: ""
  });

  const updatePayloads = (key, value) => {
    setParams((prev) => {
      const updatedParams = { ...prev, [key]: value };
      // Trigger the API call whenever params are updated
      loadingData(updatedParams); // Call loadingData with updated params
      return updatedParams;
    });
  };

  const loadingData = useCallback(async (params) => {
    setLoading(true);
    const result = await getRequest(`${endpoints.routes}`, params);
    if (result.status === 200) {
      setRoutes(result.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadingData(params); // Load data on page load with initial params
  }, [params, loadingData]);

  return (
    <div className="mx-auto max-w-[1280px] p-5">
      <section>
        <div className="flex flex-col-reverse md:flex-row gap-5">
          {/* search results column */}
          <div className="w-full md:w-[70%] h-auto relative overflow-hidden">
            <h1 className="text-[1rem] md:text-[1.5rem] font-bold text-center pb-5">
              Search Results
            </h1>

            <div className="flex flex-col gap-5">
              {routes?.map((value, index) => (
                <Ticket key={index} value={value} />
              ))}
            </div>
          </div>

          {/* search and filter column */}
          <div className="w-full md:w-[30%]">
            <p className="text-[1.5rem] leading-none font-bold">
              Change your trip here
            </p>
            <div className="mb-5 md:pb-0">
              <SearchForm onSearch={handleSearch} searchData={searchData} />
            </div>
            <FilterForm onFilter={handleFilter} updatePayload={updatePayloads} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchPage;

