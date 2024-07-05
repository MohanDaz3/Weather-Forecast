import { useState } from "react";
import { toast } from "react-toastify";
import {BiSearch,BiCurrentLocation} from "react-icons/bi"
import { FaRegUserCircle } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";


const Inputs = ({ name, token, setAuth, setQuery, setUnits }) => {

  const[city, setCity] = useState('')

  const handleSearchClick = () =>{
    if(city !== "")setQuery({q:city})
  }

  // const handleLocationClick = () =>{
    
  //   if(navigator.geolocation){
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const { latitude, longitude } = position.coords;
  //       setQuery({ lat: latitude, lon: longitude });
  //     });
  //   }
  // }
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setQuery({ lat: latitude, lon: longitude }); // Include units
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false)
    toast.success("Logged out successfully")
    window.location.reload();
  };
    return (
      <div className="flex flex-row justify-center my-6">
        <div className="flex flex-row  w-3/4 items-center justify-center space-x-4">
          <input value={city} onChange={(e)=>setCity(e.currentTarget.value)} type="text" placeholder="Search by cities.." className="rounded-md text-gray-500 text-xl shadow-xl p-2 w-full capitalize focus:outline-none placeholder:lowercase" />
          <BiSearch onClick={handleSearchClick} size={30} className="cursor-pointer transition ease-out hover:scale-125" />
          <BiCurrentLocation onClick={handleLocationClick} size={30} className="cursor-pointer transition ease-out hover:scale-125" />
        </div>
        <div className="flex flex-row w-1/4 items-center justify-center">
        <button onClick={()=>setUnits("metric")} className="text-2xl font-medium transition ease-out hover:scale-125">
        °C
        </button>
        <p className="text-2xl font-medium mx-1">|</p>
        <button onClick={()=>setUnits("imperial")} className="text-2xl font-medium transition ease-out hover:scale-125">
        °F
        </button>
        </div>

        <div className="relative flex flex-row w-1/4 items-center justify-center">
        <FaRegUserCircle size={45} className="ml-10 cursor-pointer text-2xl font-medium transition ease-out hover:scale-125" />
        <p>{name}</p>
        <MdKeyboardArrowDown onClick={toggleDropdown} className="cursor-pointer" />
        {dropdownOpen && (
          <div className=" text-black absolute ml-24 mt-36 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
            <ul>
              <li className="p-2 hover:bg-gray-100 cursor-pointer">Profile</li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>Logout</li>
            </ul>
          </div>
        )}
      </div>
        
      </div>
    );
  };
  
  export default Inputs;
  