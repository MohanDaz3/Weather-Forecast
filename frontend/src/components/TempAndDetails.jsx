import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

const TempAndDetails = ({ temp, feels_like, temp_min, temp_max, humidity, speed, details, icon, sunrise, sunset, units }) => {
  
  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300 ">
        <p>{details}</p>
      </div>

      <div className="flex flex-row items-center justify-between py-3">
        <img src={icon} alt="weather icon" className="w-20" />
        <p className="text-5xl">{temp}°</p>

        <div className="flex flex-col space-y-3 items-start">
          <div className="flex font-light text-sm items-center justify-center">
            <FaThermometerEmpty size={20} className="mr-1" />
            Real Feel: <span className="font-medium ml-1">{feels_like}°</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <BiSolidDropletHalf size={20} className="mr-1" />
            Humidity: <span className="font-medium ml-1">{humidity}%</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
          <FiWind size={20} className="mr-1" />
            Wind: <span className="font-medium ml-1">{speed}</span>
 </div>

        </div>
      </div>

      <div className="flex flex-row items-center justify-center space-x-10 text-sm py-3">
        <div className="flex flex-row items-center">
          <GiSunrise size={20} />
          <p className="font-light ml-1">Sunrise: <span className="font-medium ml-1">{sunrise}</span></p>
        </div>
        <div className="flex flex-row items-center">
          <GiSunset size={20} />
          <p className="font-light ml-1">Sunset: <span className="font-medium ml-1">{sunset}</span></p>
        </div>
        <div className="flex flex-row items-center">
          <MdKeyboardArrowUp size={20} />
          <p className="font-light ml-1">High: <span className="font-medium ml-1">{temp_max}°</span></p>
        </div>
        <div className="flex flex-row items-center">
          <MdKeyboardArrowDown size={20} />
          <p className="font-light ml-1">Low: <span className="font-medium ml-1">{temp_min}°</span></p>
        </div>
      </div>
    </div>
  );
};

export default TempAndDetails;
