// src/components/Sidebar.js
import  { useState } from 'react';
import {
  RiDashboardLine,
  RiUserLine,
  RiSettingsLine,
  RiArrowDownSLine,
  RiArrowRightSLine,
} from 'react-icons/ri';
import { FaBox } from 'react-icons/fa';

const Sidebar = () => {
  const [showProducts, setShowProducts] = useState(false);

  const toggleProducts = () => {
    setShowProducts(!showProducts);
  };
  

  return (
   
    <div className="bg-white h-screen w-64 text-gray-800">
      <div className="p-4 my-1">
        <ul className="mt-4">
          <li className="mb-2 ">
            <a href="#" className="flex items-center p-2   focus:bg-orange-brand  hover:bg-orange-brand  focus:text-white hover:text-white"  >
              <RiUserLine className="mr-2" />
              Users
            </a>
          </li>
          <li className="mb-2">
            <button className="flex items-center justify-between w-full p-2  focus:text-white focus:bg-orange-brand  hover:bg-orange-brand hover:text-white "
              onClick={toggleProducts} >
              <div className="flex items-center">
                <FaBox className="mr-2" />
                Products
              </div>
              {showProducts ? <RiArrowDownSLine /> : <RiArrowRightSLine />}
            </button>
            {showProducts && (
              <ul className="ml-4">
                <li>
                  <a href="#"  className="block p-2  focus:bg-orange-brand  hover:bg-orange-brand  focus:text-white hover:text-white" >
                    All Products
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block p-2  focus:bg-orange-brand  hover:bg-orange-brand  focus:text-white hover:text-white"
                  >
                    Add Product
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block p-2  focus:bg-orange-brand  hover:bg-orange-brand  focus:text-white hover:text-white"
                  >
                    Add Product
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li className="mb-2">
            <a
              href="#"
              className="flex items-center p-2  focus:bg-orange-brand  hover:bg-orange-brand  focus:text-white hover:text-white"
            >
              <RiSettingsLine className="mr-2" />
              Settings
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
