// import React from "react";
// import Containar from "../../../layouts/Containar";
// import logo from "../../../assets/logos/logoblack.png";
// import { Link } from "react-router-dom";

// const BottomFooter = () => {
//   return (
//     <footer className="font-inter py-5 bg-[#151515] px-10">
//       <Containar>
//         <div className="flex justify-center items-center">
//           <p className="text-sm text-gray-400 text-center">
//             ©2024 Nexlinbd, All rights reserved. Developed by
//             <span className="text-white mx-2">
//               <Link target="_blanck" to={"https://www.okobiz.com/"}>
//                 okobiz.
//               </Link>
//             </span>
//           </p>
//         </div>
//       </Containar>
//     </footer>
//   );
// };

// export default BottomFooter;

import React from "react";
import Containar from "../../../layouts/Containar";
import logo from "../../../assets/logos/logowhite.png";
import { Link } from "react-router-dom";

const BottomFooter = () => {
  return (
    <footer className="font-inter py-5 bg-[#2B3445] px-10">
      <Containar>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-400">
            ©2024 Nexlinbd, All rights reserved. Developed by
            <span className="text-white mx-2">
              <Link target="_blanck" to={"https://www.okobiz.com/"}>
                okobiz.
              </Link>
            </span>
          </p>
          <Link className="flex items-baseline" to={"/"}>
            <div className="w-5">
              <img className="w-full" src={logo} />
            </div>
            <h4 className="text-2xl italic text-white">
              e<span className="text-danger">v</span>en
            </h4>
          </Link>
        </div>
      </Containar>
    </footer>
  );
};

export default BottomFooter;
