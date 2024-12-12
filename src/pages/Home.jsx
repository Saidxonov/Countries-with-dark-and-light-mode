import React, { useEffect } from "react";
import { ThemeContext } from "../App";
import { useContext } from "react";
import lightImg from "../images/light-mode.svg";
import darkImg from "../images/dark-mode-icon.svg";
import { Link, useFetcher, useLocation, useNavigate } from "react-router-dom";
import countries from "../countries.json";
import quit from "../images/quit.svg";

function Home() {
  const { theme, setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  function handleChangeTheme(e) {
    e.preventDefault();
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }
  function handleNav(e) {
    e.preventDefault();
    const con = confirm("Are you sure , you want to quit?");
    if (con) {
      navigate("/login");
      localStorage.clear();
    }
  }
  return (
    <div className="all dark:bg-[#202C36] dark:text-white ">
      <div className="signPage bg-[#2B3844] p-3 text-end gap-2">
        <div className="container flex justify-end gap-5 text-white ">
          <div
            onClick={handleNav}
            className="flex gap-3 cursor-pointer hover:underline"
          >
            Quit
            <img src={quit} width={30} height={30} alt="img" />
          </div>
        </div>
      </div>
      <div className="shadow header mb-[50px] text-black home dark:text-white dark:bg-[#2B3844]">
        <div className="container mb-[48px] flex justify-between p-[23px] head-container bg-white dark:bg-[#2B3844] ">
          <div className="text-[#111517] text-[24px] font-[800] dark:text-white">
            Where in the world?
          </div>
          <div className="flex items-center gap-3 sameHeader">
            <img
              onClick={handleChangeTheme}
              className="cursor-pointer"
              src={theme === "light" ? darkImg : lightImg}
              width={30}
              height={30}
              alt="img"
            />
            <div className="">
              {theme === "light" ? "Dark mode " : "Light mode"}
            </div>
          </div>
        </div>
      </div>
      <div className="container flex flex-wrap justify-between cards gap-[40px] mb-[500px]">
        {countries.length > 0 &&
          countries.map((data, index) => {
            return (
              <div
                className="card cursor-pointer hover:shadow-xl transition-shadow w-[264px]  rounded-[5px] shadow-lg bg-white dark:bg-[#2B3844]"
                key={index}
              >
                <img
                  className="rounded-t-[5px] w-full bg-cover"
                  src={data.flag}
                  alt="img"
                />
                <div className="p-5 innerCard">
                  <div>{data.country}</div>
                  <div className="">
                    <span>Population:</span> {data.population}
                  </div>
                  <div className="">
                    <span>Region:</span> {data.region}
                  </div>
                  <div className="">
                    <span>Capital:</span> {data.capital}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
