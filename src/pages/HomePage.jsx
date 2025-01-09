import "react-datepicker/dist/react-datepicker.css";

import BusToLeft from "../assets/images/home/busToLeft.png";
import BusToRight from "../assets/images/home/busToRight.png";
import FAQ from "../components/FAQ";
import HeroPicture from "../assets/images/home/hero.jpg";
import SearchForm from "../components/SearchForm";
import StrenghtCards from "../components/StrenghtCards";
import Ticket from "../components/Ticket";
import Tips from "../components/Tips";
import { useCallback, useEffect, useState } from "react";
import { getRequest } from "../helpers/api";
import { endpoints } from "../constants/endpoints";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

  const [routes, setRoutes] = useState([])
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = (searchValue) => {
    navigate("/search", { state: searchValue });
  };

  const loadingData = useCallback(async () => {
    setLoading(true);
    const result = await getRequest(`${endpoints.routes}`);
    if (result.status === 200) {
        setRoutes(result.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
      loadingData();
  }, [loadingData]);

  return (
    // mx-auto max-w-[1280px] px-3 md:px-5
    <div className="mx-auto max-w-[1280px] px-3 md:px-5">
      <section>
        <div className="py-10 text-primary-0">
          <span className="block w-full font-extrabold text-3xl md:text-5xl">
            Shwe Yoke Lay Express,
          </span>
          <span className="block w-full font-extrabold text-3xl md:text-5xl">
            Safe Journeys Every Time
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-3 ">
          <div className="w-full md:w-[70%] h-auto relative overflow-hidden">
            <img src={HeroPicture} alt="hero_picture" />
            {/* but to right */}
            <img
              src={BusToRight}
              alt="bus_picture"
              className="h-6 md:h-10 w-auto absolute bottom-[40%] left-0 busToRight"
            />
            {/* but to left */}
            <img
              src={BusToLeft}
              alt="bus_picture"
              className="h-6 md:h-10 w-auto absolute bottom-[40%] right-0 busToLeft"
            />
          </div>

          <div className="w-full md:w-[30%]">
            <p className="text-2xl md:text-3xl leading-none font-bold">
              Travel with us now
            </p>
            <SearchForm onSearch={handleSearch} />
          </div>
        </div>
      </section>

      <StrenghtCards />

      {/* popular routes */}
      <section>
        <h1 className="text-2xl md:text-3xl md:text-[3rem] font-bold text-center pt-10 pb-5">
          Popular Routes
        </h1>

        <div className="flex flex-col pb-7 gap-7">
          {routes?.map((value,index)=>{
            return (
              <Ticket key={index} value={value} />
            )
          })}
        </div>
      </section>

      {/* Tips */}
      <Tips />

      {/* FAQs */}
      <FAQ />
    </div>
  );
};

export default HomePage;
