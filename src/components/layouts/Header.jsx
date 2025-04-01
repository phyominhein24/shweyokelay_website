import { ImMenu3, ImMenu4 } from "react-icons/im";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { mainMenu, userMenu } from "../SiteData";
import { useDispatch, useSelector } from "react-redux";

import Flag from "react-world-flags";
import { mobileMenuToggle } from "../../redux/shareSlice";
import { removeNotification } from "../../redux/shareSlice";
import { useTranslation } from "react-i18next";
import { getData, removeData } from "../../helpers/localstorage";
import { keys } from "../../constants/config";
import { updateUserLogin } from "../../shares/shareSlice";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [translation, setTranslation] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mobileMenu, notification, userLogIn } = useSelector((state) => state.share);

  const myPath = location.pathname;

  useEffect(() => {
    if (translation) {
      i18n.changeLanguage("mm");
    } else {
      i18n.changeLanguage("en");
    }
  }, [i18n, translation]);

  const logIn = () => {
    if(userLogIn){
      dispatch(updateUserLogin(false));
      removeData(keys.API_TOKEN);
      removeData(keys.USER);
      navigate("/");
    }else{
      navigate("/login");
    }
  };

  useEffect(() => {
    const timers = notification.map((noti) =>
      setTimeout(() => {
        dispatch(removeNotification(noti.id));
      }, 3000)
    );

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [notification, dispatch]);

  useEffect(()=>{
    const apiToken = getData(keys.API_TOKEN);
    const user = getData(keys.USER);
    if (apiToken && user) {
      dispatch(updateUserLogin(true))
    }
  },[])

  useEffect(()=>{
    console.log(userLogIn)
  },[userLogIn])

  return (
    <>
      {/* Notifications */}
      <div className="fixed top-9 right-5 space-y-3 z-50">
        {notification.map((noti) => (
          <div
            key={noti.id}
            className={`p-3 rounded-md shadow-lg ${
              noti.variant === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{noti.message}</span>
              <button
                onClick={() => dispatch(removeNotification(noti.id))}
                className="text-lg font-bold ml-3"
              >
                ✖
              </button>
            </div>
          </div>
        ))}
      </div>

      {mobileMenu && (
        <div className="w-[85vw] h-96 fixed z-40 top-32 -translate-x-1/2 left-1/2 bg-stone-200 rounded-md overflow-y-scroll">
          <div className="flex flex-col ">
            {!userLogIn
              ? mainMenu.map((linkObj, index) => {
                  const { name, url } = linkObj;
                  const isActive = location.pathname === url;

                  return (
                    <Link
                      to={url}
                      key={index}
                      className={`p-5 text-center text-md font-semibold transition-colors duration-400 hover:text-primary-0 ${
                        isActive ? "text-primary-0 bg-stone-300" : ""
                      }`}
                    >
                      {t(name)}
                    </Link>
                  );
                })
              : userMenu.map((linkObj, index) => {
                  const { name, url } = linkObj;
                  const isActive = location.pathname === url;

                  return (
                    <Link
                      to={url}
                      key={index}
                      className={`p-5 text-center text-md font-semibold transition-colors duration-400 hover:text-primary-0 ${
                        isActive ? "text-primary-0 bg-stone-300" : ""
                      }`}
                    >
                      {t(name)}
                    </Link>
                  );
                })}

            <button
              onClick={() => logIn()}
              className={`p-5 text-center text-md font-semibold transition-colors duration-400 hover:text-primary-0 hover:bg-stone-300 ${
                myPath === "/login" ? "text-primary-0 bg-stone-300" : ""
              }`}
            >
              <span className="text-md">
                {userLogIn ? "Log Out" : "Log In/ Register"}
              </span>
            </button>

            <button
              onClick={() => setTranslation(!translation)}
              className="p-5 text-center text-md font-semibold transition-colors duration-400 hover:text-primary-0 hover:bg-stone-300"
            >
              {!translation ? (
                <div>
                  <Flag
                    code="MM"
                    style={{
                      width: 40,
                      height: 20,
                      display: "inline-block",
                      paddingRight: 10,
                    }}
                    alt="Myanmar Flag"
                  />
                  <span>မြန်မာဘာသာ</span>
                </div>
              ) : (
                <div>
                  <Flag
                    code="GB"
                    style={{
                      width: 40,
                      height: 20,
                      display: "inline-block",
                      paddingRight: 10,
                    }}
                    alt="English Flag"
                  />
                  <span>English</span>
                </div>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <section className="bg-stone-200 shadow-md py-5 sticky top-0 z-50">
        <div className="mx-auto max-w-[1280px] px-3 md:px-5 py-0 flex justify-between items-center">
          {/* Logo */}
          <div>
            <img
              src="/public/images/logo.png"
              alt="logo"
              className="w-14 h-14"
            />
          </div>

          {/* Menu */}
          <div className="hidden md:flex items-center gap-10">
            {!userLogIn
              ? mainMenu.map((linkObj, index) => {
                  const { name, url } = linkObj;
                  const isActive = location.pathname === url;

                  return (
                    <Link
                      to={url}
                      key={index}
                      className={`text-md font-semibold transition-colors duration-400 hover:text-secondary-0 ${
                        isActive ? "text-primary-0" : ""
                      }`}
                    >
                      {t(name)}
                    </Link>
                  );
                })
              : userMenu.map((linkObj, index) => {
                  const { name, url } = linkObj;
                  const isActive = location.pathname === url;

                  return (
                    <Link
                      to={url}
                      key={index}
                      className={`text-md font-semibold transition-colors duration-400 hover:text-secondary-0 ${
                        isActive ? "text-primary-0" : ""
                      }`}
                    >
                      {t(name)}
                    </Link>
                  );
                })}

            <button
              onClick={() => logIn()}
              className={`text-md font-semibold transition-colors duration-400 hover:text-primary-0 ${
                myPath === "/login" ? "text-primary-0" : ""
              }`}
            >
              <span>{userLogIn ? "Log Out" : "Log In/ Register"}</span>
            </button>

            <button
              onClick={() => setTranslation(!translation)}
              className="text-md font-semibold transition-colors duration-400 hover:text-primary-0"
            >
              {!translation ? (
                <div>
                  <Flag
                    code="MM"
                    style={{
                      width: 40,
                      height: 20,
                      display: "inline-block",
                      paddingRight: 10,
                    }}
                    alt="Myanmar Flag"
                  />
                  <span>မြန်မာဘာသာ</span>
                </div>
              ) : (
                <div>
                  <Flag
                    code="GB"
                    style={{
                      width: 40,
                      height: 20,
                      display: "inline-block",
                      paddingRight: 10,
                    }}
                    alt="English Flag"
                  />
                  <span>English</span>
                </div>
              )}
            </button>
          </div>

          {/* Hamburger */}
          <div className="block md:hidden">
            <button onClick={() => dispatch(mobileMenuToggle())}>
              {mobileMenu ? (
                <ImMenu4 size="50" color="#3e3d32" className="inline-block" />
              ) : (
                <ImMenu3 size="50" color="#3e3d32" className="inline-block" />
              )}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
