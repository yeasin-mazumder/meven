// // import React, { useState, useEffect, useContext } from "react";
// // import axios from "axios";
// // import Containar from "../../../layouts/Containar";
// // import { socialList } from "../../constants";
// // // import logo from "../../../assets/logos/logowhite.png";
// // import logo from "../../../assets/logos/logowhite.png";
// // import { Link } from "react-router-dom";

// // const UpperFooter = () => {
// //   return (
// //     <div className="py-6 font-inter text-gray-600 px-10 border-b border-b-gray-700 bg-[#1F2937]">
// //       <Containar>
// //         <div className="w-full flex justify-between flex-wrap">
// //           <img src={logo} alt="logo" className="w-32" />

// //           <ul className="flex items-center gap-x-5">
// //             {socialList.map((item, index) => {
// //               let Logo = item.logo;
// //               return (
// //                 <Link
// //                   to={item.link}
// //                   key={index}
// //                   className="flex hover:bg-[#EF4444] transition-all ease-linear duration-200 hover:text-white justify-center items-center w-10 h-10 rounded-md bg-[#3C4454]"
// //                 >
// //                   <Logo className="text-white" />
// //                 </Link>
// //               );
// //             })}
// //           </ul>
// //         </div>
// //       </Containar>
// //     </div>
// //   );
// // };

// // export default UpperFooter;

// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import Containar from "../../../layouts/Containar";
// import { socialList } from "../../constants";
// import { Link } from "react-router-dom";
// import ApiContext from "../../baseapi/BaseApi";

// const UpperFooter = () => {
//   const [categories, setCategories] = useState([]);

//   const accountList = [
//     {
//       name: "Shipping rates & policies",
//       link: "/shipingrates-policy",
//     },
//     {
//       name: "Refunds & replacements",
//       link: "/refund-replace",
//     },
//     {
//       name: "Delivery info",
//       link: "/delivery-info",
//     },
//     {
//       name: "About us",
//       link: "/about",
//     },
//   ];
//   const baseApi = useContext(ApiContext);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(`${baseApi}/category`);
//         setCategories(response.data.data.doc); // Assuming response.data contains the array of categories
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   return (
//     <div className="py-12 font-inter bg-[#373F50] px-10">
//       <Containar>
//         <div className="w-full flex justify-between flex-wrap">
//           <div className="w-1/2 md:w-1/3">
//             <h3 className="text-base md:text-lg text-white font-semibold">
//               Shop Categories
//             </h3>
//             <ul className="mt-6 flex flex-col gap-y-4">
//               {categories.slice(0, 6).map((item, index) => (
//                 <li key={index}>
//                   <Link
//                     // to={`/shop/category/${item?._id}`}

//                     to={`/shop/category/${item?._id}/${encodeURIComponent(
//                                           item?.title.replace(/\s+/g, "")
//                                         )}`}
//                     className="text-base hover:pl-1.5 cursor-pointer text-gray-400 transition-all ease-linear duration-200 hover:text-danger inline-block"
//                   >
//                     {item?.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="w-1/2 md:w-1/3">
//             <h3 className="text-base md:text-lg text-white font-semibold">
//               Shipping info
//             </h3>
//             <ul className="mt-6 flex flex-col gap-y-4">
//               {accountList.map((item, index) => (
//                 <li key={index}>
//                   <Link
//                     to={item?.link}
//                     className="text-base text-gray-400 hover:pl-1.5 cursor-pointer transition-all ease-linear duration-200 hover:text-danger inline-block"
//                   >
//                     {item?.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="w-full md:w-1/3">
//             <div className="w-full">
//               <h3 className="text-base md:text-lg text-white font-semibold">
//                 Stay Connected
//               </h3>
//               <div className="mt-6">
//                 <iframe
//                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29207.29930694762!2d90.35781652800708!3d23.78613308331609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c718d96f5cf7%3A0x147c4a2b8bb92ea2!2sCantonment%20Bazar%20Road%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1728189538726!5m2!1sen!2sbd"
//                   width="100%"
//                   title="Nexlin address"
//                   className="h-52"
//                   style={{ border: "0" }}
//                   allowFullScreen=""
//                   loading="lazy"
//                   referrerPolicy="no-referrer-when-downgrade"
//                 ></iframe>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Containar>
//     </div>
//   );
// };

// export default UpperFooter;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Containar from "../../../layouts/Containar";
import { socialList } from "../../constants";
import { Link } from "react-router-dom";

const UpperFooter = () => {
  const [categories, setCategories] = useState([]);

  const accountList = [
    {
      name: "Shipping rates & policies",
      link: "/shipingrates-policy",
    },
    {
      name: "Refunds & replacements",
      link: "/refund-replace",
    },
    {
      name: "Delivery info",
      link: "/delivery-info",
    },
    {
      name: "About us",
      link: "/about",
    },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://server.mymeven.com/api/v1/category"
        );
        setCategories(response.data.data.doc); // Assuming response.data contains the array of categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="py-12 font-inter bg-[#373F50]">
      <Containar>
        <div className="w-full flex justify-between flex-wrap">
          <div className="w-1/2 md:w-1/3">
            <h3 className="text-base md:text-lg text-white font-semibold">
              Shop Categories
            </h3>
            <ul className="mt-6 flex flex-col gap-y-4">
              {categories.slice(0, 6).map((item, index) => (
                <li key={index}>
                  <Link
                    to={`/shop/category/${item?._id}`}
                    className="text-base hover:pl-1.5 cursor-pointer text-gray-400 transition-all ease-linear duration-200 hover:text-danger inline-block"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-1/2 md:w-1/3">
            <h3 className="text-base md:text-lg text-white font-semibold">
              Shipping info
            </h3>
            <ul className="mt-6 flex flex-col gap-y-4">
              {accountList.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item?.link}
                    className="text-base text-gray-400 hover:pl-1.5 cursor-pointer transition-all ease-linear duration-200 hover:text-danger inline-block"
                  >
                    {item?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <div className="w-full">
              <h3 className="text-base md:text-lg mt-8 sm:mt-0 text-white font-semibold">
                Stay Connected
              </h3>
              <div className="mt-5 sm:mt-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58445.91395172296!2d90.39049569100283!3d23.716349495314883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8f48bffd7c5%3A0x709a3d804583c93a!2sEastern%20Commercial%20Complex!5e0!3m2!1sen!2sbd!4v1725970854365!5m2!1sen!2sbd"
                  width="100%"
                  className="h-52"
                  style={{ border: "0" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </Containar>
    </div>
  );
};

export default UpperFooter;
