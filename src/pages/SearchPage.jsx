import "react-datepicker/dist/react-datepicker.css";

import FilterForm from "../components/FilterForm";
import SearchForm from "../components/SearchForm";
import Ticket from "../components/Ticket";
import { endpoints } from "../constants/endpoints";
import { getRequest } from "../helpers/api";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchPage = () => {

  const location = useLocation();
  const searchData = location.state || null;
  const [routes, setRoutes] = useState([]);
  const [orders, setOrders] = useState()
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    starting_point: "",
    ending_point: "",
    selected_date: "",
    filter: "vehicles_type_id",
    value: "",
    selected_user_type: ""
  });

  const handleSearch = async () => {
    setLoading(true);
    const result = await getRequest(`${endpoints.routes}`, params);
    if (result.status === 200) {
      setRoutes(result?.data?.routes);      
    }
    setLoading(false);
  };

  const updatePayloads = (key, value) => {
    setParams((prev) => {
      const updatedParams = { ...prev, [key]: value };
      return updatedParams;
    });
  };

  const loadingData = useCallback(async (params) => {
    setLoading(true);
    const result = await getRequest(`${endpoints.routes}`, {...searchData, ...params});
    if (result.status === 200) {
      setRoutes(result?.data?.routes);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (searchData !== null) {
      updatePayloads("starting_point", searchData.starting_point || "");
      updatePayloads("ending_point", searchData.ending_point || "");
      updatePayloads("selected_date", searchData.selected_date || today);
      updatePayloads("selected_user_type", searchData.selected_user_type || "");
    }
    loadingData(searchData);
  }, [searchData]);

  // useEffect(() => {
  //   loadingData(params);
  // }, [loadingData]);

  return (
    <div className="mx-auto max-w-[1280px] p-5">
      <section>
        <div className="flex flex-col-reverse md:flex-row gap-5">
          {/* search results column */}
          <div className="w-full md:w-[70%] h-auto relative overflow-hidden">
            <h1 className="text-[1rem] md:text-[1.5rem] font-bold text-center pb-5">
              Search Results
            </h1>

            {loading ? (
              <div className="flex justify-center items-center py-5">
                <p className="text-gray-500 animate-pulse">Loading...</p>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {routes && routes.length > 0 ? (
                  routes?.map((value, index) => <Ticket key={index} params={params} value={value}/>)
                ) : (
                  <p className="text-center text-gray-500">No routes available.</p>
                )}
              </div>
            )}
          </div>

          {/* search and filter column */}
          <div className="w-full md:w-[30%]">
            <p className="text-[1.5rem] leading-none font-bold">
              Change your trip here
            </p>
            <div className="mb-5 md:pb-0">
              <SearchForm onSearch={handleSearch} updatePayload={updatePayloads} params={params}/>
            </div>
            <FilterForm onSearch={handleSearch} updatePayload={updatePayloads} params={params}/>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchPage;

