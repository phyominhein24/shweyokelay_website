import "react-datepicker/dist/react-datepicker.css";

import { useCallback, useEffect, useState } from "react";

import BusToLeft from "../assets/images/home/busToLeft.png";
import BusToRight from "../assets/images/home/busToRight.png";
import FAQ from "../components/FAQ";
import HeroPicture from "../assets/images/home/hero.jpg";
import SearchForm from "../components/SearchForm";
import StrenghtCards from "../components/StrenghtCards";
import Ticket from "../components/Ticket";
import Tips from "../components/Tips";
import { endpoints } from "../constants/endpoints";
import { getRequest } from "../helpers/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);

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
        <div className="py-5 md:py-8 text-primary-0">
          <img
            src="/public/images/brand.png"
            alt="logo"
            className="w-[50%] md:w-[30%] h-auto mb-0"
          />
          <div className="block md:inline-block font-extrabold text-2xl md:text-4xl">
            Shwe Yoke Lay Express,
          </div>
          <div className="block md:inline-block font-extrabold text-2xl md:text-4xl">
            <div className="hidden md:block">&nbsp;</div>Safe Journeys Every
            Time
          </div>
        </div>
        {/* <div className="py-10 text-primary-0">
          <span className="block w-full font-extrabold text-3xl md:text-5xl">
            Shwe Yoke Lay Express,
          </span>
          <span className="block w-full font-extrabold text-3xl md:text-5xl">
            Safe Journeys Every Time
          </span>
        </div> */}

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
          {routes?.map((value, index) => {
            return <Ticket key={index} value={value} />;
          })}
        </div>
      </section>

      {/* Download our app */}
      <section className="flex flex-col gap-y-5 md:gap-0 md:flex-row justify-between items-center mt-5 bg-primary-0 bg-opacity-50 p-8 ">
        <div className="w-full md:max-w-lg">
          <h2 className="text-3xl font-semibold mb-4">Download Our App</h2>
          <p className="text-lg mb-6">
            Get our app and start enjoying amazing features today.
          </p>
          <p className="text-lg mb-6">
            ရွှေရုပ်လေးရဲ့ ခရီးသွားပြည်သူတွေ ပိုမိုအဆင်ပြေဖို့ရည်ရွယ်ပြီး
            ရွှေရုပ်လေး Application ကို ထုတ်လုပ်လိုက်ပြီဖြစ်လို့ ကားဂိတ်ကို
            လူကိုယ်တိုင်လက်မှတ်သွားဝယ်စရာမလိုတော့ဘဲ သင့်ရဲ့ Smart Phone ကနေတဆင့်
            အချိန်မကုန်လူသက်သာစွာနဲ့ ရန်ကုန် - တောင်ကြီး အသွားအပြန်
            ခရီးစဉ်လက်မှတ်တွေ ကြိုတင်ဖြတ်လို့ရပါပြီ။Android နဲ့ iOS ၂
            ခုလုံးအတွက် ထုတ်လုပ်ထားတာဖြစ်လို့ ရွှေရုပ်လေး Application ကို
            အောက်ပါ Link ကနေ Download ဆွဲရင်း လက်မှတ်များ မှာယူနိုင်ပါပြီ။
          </p>
          <div className="flex space-x-4">
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/src/assets/images/home/playstore.jpg"
                alt="playstore"
                className="w-[300px]"
              />
            </a>
          </div>
        </div>
        <div className="w-full md:max-w-lg">
          <img
            src="/src/assets/images/home/download_our_app.png"
            alt="App Preview"
            className="w-full h-auto"
          />
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
