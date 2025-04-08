import { FaInstagram, FaTiktok } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

import { CiFacebook } from "react-icons/ci";
import { RxTwitterLogo } from "react-icons/rx";
import { mainMenu } from "../SiteData";
import { useTranslation } from "react-i18next";

// import { useEffect, useState } from "react";

const Footer = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const myPath = location.pathname;

  return (
    <div
      className={`mx-auto max-w-[1280px] px-3 md:px-5 pt-10 flex-col ${
        myPath === "/login" ? "hidden" : "block"
      }`}
    >
      <div className="w-full flex flex-col md:flex-row justify-between pb-3">
        {/* first col */}
        <div className="mb-5 md:mb-0">
          <h3 className="text-md font-semibold md:pb-2">Menu</h3>
          {mainMenu.map((linkObj, index) => {
            const { name, url } = linkObj;
            const isActive = location.pathname === url;

            return (
              <Link
                to={url}
                key={index}
                className={`inline-block md:block pr-4 md:pr-0 py-1 text-left text-md transition-colors duration-400 text-stone-600 hover:text-primary-0 ${
                  isActive ? "text-black" : ""
                }`}
              >
                {t(name)}
              </Link>
            );
          })}
        </div>

        {/* second col  */}
        {/* second col  */}
        <div className="mb-5 md:mb-0">
          <div className="mb-5">
            <h3 className="text-md font-semibold pb-2">Legal</h3>
            <div className="flex gap-3">
              <Link
                to="/privacy-policy"
                className={`text-base transition-colors duration-400 text-stone-600 hover:text-primary-0 ${
                  location.pathname === "/privacy-policy"
                    ? "text-primary-0 "
                    : ""
                }`}
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-md font-semibold pb-2">
              Book Tickets faster. Download our mobile Apps
            </h3>
            <img
              src="/src/assets/images/home/playstore.jpg"
              alt="playstore"
              className="w-[250px]"
            />
          </div>
        </div>

        {/* third col */}
        <div className="mb-5 md:mb-0">
          <h3 className="text-md font-semibold pb-2">Follow Us</h3>
          <Link to="/">
            <CiFacebook size={33} className="inline-block mr-2" />
          </Link>
          <Link to="/">
            <FaTiktok size={25} className="inline-block mr-2" />
          </Link>
          <Link to="/">
            <RxTwitterLogo size={30} className="inline-block mr-2" />
          </Link>
          <Link to="/">
            <FaInstagram size={30} className="inline-block mr-2" />
          </Link>
        </div>

        {/* forth col */}
        <div>
          <h3 className="text-md font-semibold pb-2">We Accept</h3>
          <img
            src="/src/assets/images/home/kpay.png"
            alt="playstore"
            className="w-auto h-[40px] inline-block mr-2"
          />
          <img
            src="/src/assets/images/home/visa.png"
            alt="playstore"
            className="w-auto h-[40px] inline-block mr-2"
          />
        </div>
      </div>

      <div className="py-3 border-t border-t-gray-400 text-stone-600 flex flex-col-reverse md:flex-row text-center md:text-start md:justify-between text-sm">
        <p>&copy; Shwe Yote Lay Express Company Limited.</p>
        <p>Powered by Yolo Digital Myanmar.</p>
      </div>
    </div>
  );
};

export default Footer;
