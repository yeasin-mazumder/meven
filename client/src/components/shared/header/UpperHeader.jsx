// import React from "react";
// import { FaMapLocation } from "react-icons/fa6";

// import Containar from "../../../layouts/Containar";
// import { Link } from "react-router-dom";
// import LogoContainer from "./LogoContainer";
// import { CiMobile3 } from "react-icons/ci";

// const UpperHeader = () => {
//   return (
//     <header className="">
//       <div className="border-b border-b-gray-700 py-4  text-white">
//         <Containar>
//           <div className="mx-auto">
//             <div className="flex flex-col lg:flex-row justify-center xl:justify-between items-center text-sm space-y-2 xl:space-y-0 lg:px-5 xl:px-0">
//               {/* Left Section */}
//               <div className="flex flex-col xl:flex-row justify-center items-center space-y-2 xl:space-y-0 xl:space-x-4">
//                 <div className="flex gap-2 text-sm">
//                   {/* <a
//                     className="flex items-center  transition-all ease-linear duration-200 hover:underline "
//                     href="tel:01924853285"
//                   >
//                    01924853285
//                   </a> */}

//                   {/* <span>|</span> */}
//                   <a
//                     href="https://www.facebook.com/mas.dreamangel?mibextid=ZbWKwL"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className=" hover:underline "
//                   >
//                     Facebook
//                   </a>
//                   <span>|</span>
//                   <a
//                     href="https://www.instagram.com/massajib/?igsh=dWJlNTdrem44c3px#"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className=" hover:underline "
//                   >
//                     Instagram
//                   </a>
//                   <span>|</span>
//                   <a
//                     href="https://www.youtube.com/@user-mk_kitchen"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className=" hover:underline"
//                   >
//                     Youtube
//                   </a>
//                 </div>
//               </div>

//               {/* Middle Section */}
//               {/* <LogoContainer /> */}

//               {/* Right Section */}
//               <div className="hidden lg:flex space-x-4">
//                 <Link
//                   to="/about"
//                   className="hover:bg-gray-900 hover:underline duration-200"
//                 >
//                   About us
//                 </Link>
//                 <Link
//                   to="/contact"
//                   className="hover:bg-gray-900 hover:underline duration-200"
//                 >
//                   Contact us
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </Containar>
//       </div>
//     </header>
//   );
// };

// export default UpperHeader;

import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import {
  CiCircleQuestion,
  CiMobile3,
  CiFacebook,
  CiInstagram,
  CiYoutube,
} from "react-icons/ci";
import { HiOutlineMapPin } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { FaMapLocation } from "react-icons/fa6";

const UpperHeader = () => {
  return (
    <header className="border-b px-14 font-inter border-b-border  py-2.5 text-gray-200 hidden lg:block">
      {/* bg-brand */}
      <div className="  mx-auto text-texthead flex justify-between items-center ">
        <div className="flex gap-x-8 items-center">
          <Link
            to="mailto:meven.query@gmail.com"
            className="flex items-center gap-x-2 text-texthead transition-all ease-linear duration-200 hover:text-danger"
          >
            <span className="text-lg">
              <CiCircleQuestion />
            </span>
            <span className="text-para">Can we help you?</span>
          </Link>
          <Link
            to={"tel:01780508545"}
            className="flex items-center gap-x-2 text-texthead transition-all ease-linear duration-200 hover:text-danger"
          >
            <span className="text-lg">
              <CiMobile3 />
            </span>
            <span className="text-para">017 8050 8545</span>
          </Link>
        </div>
        <div className="flex items-center">
          <div className="flex items-center gap-x-5 ">
            <Link
              target="_blanck"
              to={"https://maps.app.goo.gl/umpc6JyseZBArsUv6"}
            >
              <span className="text-lg hover:text-danger text-gray-700 transition-all ease-linear duration-200">
                <FaMapLocation />
              </span>
            </Link>
            <Link
              to={"https://www.facebook.com/mymeven"}
              target="_blank"
              rel="noreferrer"
              className="hover:text-danger text-gray-700  cursor-pointer"
            >
              <FaFacebookF className="text-lg hover:text-danger transition-all ease-linear duration-200" />
            </Link>

            <Link
              to={"https://www.instagram.com/my_meven/"}
              target="_blank"
              rel="noreferrer"
              className="hover:text-brand  text-gray-700  cursor-pointer"
            >
              <FaInstagram className="text-lg hover:text-danger transition-all ease-linear duration-200" />
            </Link>
            <Link
              to={"https://www.youtube.com/@MYMEVEN"}
              target="_blank"
              rel="noreferrer"
              className="hover:text-brand text-gray-700 rounded-full transition-colors duration-[350ms] cursor-pointer"
            >
              <FaYoutube className="text-lg hover:text-danger transition-all ease-linear duration-200" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UpperHeader;
