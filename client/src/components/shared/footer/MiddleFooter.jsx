// import React, { useContext, useEffect, useState } from "react";
// import Containar from "../../../layouts/Containar";
// import { socialList } from "../../constants";
// import { Link } from "react-router-dom";
// import ApiContext from "../../baseapi/BaseApi";
// import axios from "axios";

// const MiddleFooter = () => {
//   const [categories, setCategories] = useState([]);

//   const accountList = [
//     {
//       name: "Privacy Policy",
//       link: "/privacy",
//     },
//     {
//       name: "Refunds Policy",
//       link: "/refund-replace",
//     },
//     {
//       name: "Delivery policy",
//       link: "/delivery-info",
//     },
//     {
//       name: "Terms & Condition",
//       link: "/terms-condition",
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
//     <div className="text-gray-600 px-10 bg-[#2B3445]">
//       <Containar>
//         <div className="w-full flex justify-between flex-wrap py-10 gap-10 md:gap-0">
//           <div className="w-full md:w-1/3">
//             <h3 className="text-base md:text-lg text-white font-semibold uppercase">
//               NEXLINBD
//             </h3>
//             <ul className="mt-3 flex flex-col gap-y-4 list-disc custom-list">
//               {accountList.map((item, index) => (
//                 <li key={index}>
//                   <Link
//                     to={item?.link}
//                     className="text-base text-gray-200 hover:pl-1.5 cursor-pointer transition-all ease-linear duration-200 hover:text-[#F59120] inline-block"
//                   >
//                     {item?.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="w-full md:w-1/3">
//             <h3 className="text-base md:text-lg text-white font-semibold uppercase">
//               Electronic Store
//             </h3>
//             <ul className="mt-4 flex flex-col gap-y-4 list-disc custom-list">
//               {categories.slice(0, 6).map((item, index) => (
//                 <li key={index}>
//                   <Link
//                     to={`/shop/category/${item?._id}/${encodeURIComponent(
//                       item?.title.replace(/\s+/g, "")
//                     )}`}
//                     className="text-base hover:pl-1.5 cursor-pointer text-gray-200 transition-all ease-linear duration-200 hover:text-[#F59120] inline-block"
//                   >
//                     {item?.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* <div className="w-full md:w-1/3">
//             <div className="w-full">
//               <h3 className="text-base md:text-lg text-white font-semibold uppercase">
//                 Contacts
//               </h3>
//               <div className="mt-4">
//                 <p className="text-gray-200">Address</p>
//                 <p className="text-gray-200">
//                   136/3 mazar co-paretive market, mirpur-1,Dhaka-1216
//                 </p>
//                 <p className="text-gray-200">Phone</p>
//                 <a className="text-gray-200" href="tel:+01780508545">
//                   01780508545
//                 </a>
//                 <p className="text-gray-200">Email</p>
//                 <a
//                   className="text-gray-200"
//                   href="mailto:tech10mirpur@gmail.com"
//                 >
//                   tech10mirpur@gmail.com
//                 </a>
//               </div>
//             </div>
//           </div> */}
//         </div>
//         {/* <div>
//           <ul className="flex flex-wrap items-center gap-y-8 justify-between py-12 border-b border-b-gray-600">
//             {servicelist.map((item, index) => {
//               let Icon = item.icon;
//               return (
//                 <li
//                   key={index}
//                   className="flex w-full sm:w-1/2 lg:w-[24%]  gap-x-5 items-center"
//                 >
//                   <h3>
//                     <Icon className="lg:text-3xl xl:text-5xl text-[#EF4444]" />
//                   </h3>
//                   <div>
//                     <h3 className="text-base text-white font-medium">
//                       {item.title}
//                     </h3>
//                     <p className="text-sm text-gray-400 font-normal mt-1">
//                       {item.details}
//                     </p>
//                   </div>
//                 </li>
//               );
//             })}
//           </ul>

//           <div>
//             <ul className="flex justify-between flex-wrap  py-8">
//               <li>
//                 <Link to={"/"} className=" text-lg font-medium text-[#EF4444]">
//                  Bismillah E Supershops
//                 </Link>
//                 <div className="flex flex-wrap gap-x-5 gap-y-3 sm:gap-x-10 mt-5">
//                   {infolist.map((item, index) => (
//                     <Link
//                       to={item.link}
//                       className="text-base text-gray-400 hover:text-[#EF4444] transition-all ease-linear duration-200"
//                       key={index}
//                     >
//                       {item.name}
//                     </Link>
//                   ))}
//                 </div>
//               </li>
//               <li>
//                 <ul className="flex items-center gap-x-5 mt-5 lg:mt-0">
//                   {socialList.map((item, index) => {
//                     let Logo = item.logo;
//                     return (
//                       <Link
//                         to={item.link}
//                         key={index}
//                         className="flex hover:bg-[#EF4444] transition-all ease-linear duration-200 hover:text-white justify-center items-center w-10 h-10 rounded-md bg-[#3C4454]"
//                       >
//                         <Logo className="text-white" />
//                       </Link>
//                     );
//                   })}
//                 </ul>
//               </li>
//             </ul>
//           </div>
//         </div> */}
//       </Containar>
//     </div>
//   );
// };

// export default MiddleFooter;

import React from "react";
import Containar from "../../../layouts/Containar";
import { BsRocketTakeoff, BsCreditCard } from "react-icons/bs";
import { MdCurrencyExchange } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { Link } from "react-router-dom";
import { socialList } from "../../constants";

const MiddleFooter = () => {
  const servicelist = [
    {
      title: "Fast and free delivery",
      details: "Free delivery on purchases of 5,000 Taka",
      icon: BsRocketTakeoff,
    },
    {
      title: "Money back guarantee",
      details: "We return money within 30 days",
      icon: MdCurrencyExchange,
    },
    {
      title: "24/7 customer support",
      details: "Friendly 24/7 customer support",
      icon: BiSupport,
    },
    {
      title: "Secure online payment",
      details: "We possess SSL / Secure сertificate",
      icon: BsCreditCard,
    },
  ];

  const infolist = [
    {
      name: "Outlets",
      link: "/contact",
    },
    // {
    //   name: "Shop Address",
    //   link: "/contact",
    // },
    {
      name: "Support",
      link: "/contact",
    },
    {
      name: "Privacy",
      link: "/privacy",
    },
    {
      name: "Terms & Condition",
      link: "/terms-condition",
    },
    // {
    //   name: "FAQ",
    //   link: "/faq",
    // },
  ];

  return (
    <div className="bg-[#2B3445] px-10">
      <Containar>
        <div>
          <ul className="flex flex-wrap items-center gap-y-8 justify-between py-12 border-b border-b-gray-600">
            {servicelist.map((item, index) => {
              let Icon = item.icon;
              return (
                <li
                  key={index}
                  className="flex w-full sm:w-1/2 lg:w-[24%]  gap-x-5 items-center"
                >
                  <h3>
                    <Icon className="text-5xl text-danger" />
                  </h3>
                  <div>
                    <h3 className="text-base text-white font-medium">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400 font-normal mt-1">
                      {item.details}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div>
            <ul className="flex justify-between flex-wrap  py-8">
              <li>
                <Link to={"/"} className=" text-lg font-medium text-danger">
                  NEXLIN
                </Link>
                <div className="flex flex-wrap gap-x-5 gap-y-3 sm:gap-x-10 mt-5">
                  {infolist.map((item, index) => (
                    <Link
                      to={item.link}
                      className="text-base text-gray-400 hover:text-danger transition-all ease-linear duration-200"
                      key={index}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </li>
              <li>
                <ul className="flex items-center gap-x-5 mt-5 lg:mt-0">
                  {socialList.map((item, index) => {
                    let Logo = item.logo;
                    return (
                      <Link
                        to={item.link}
                        key={index}
                        className="flex hover:bg-danger transition-all ease-linear duration-200 hover:text-white justify-center items-center w-10 h-10 rounded-md bg-[#3C4454]"
                      >
                        <Logo className="text-white" />
                      </Link>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </Containar>
    </div>
  );
};

export default MiddleFooter;
