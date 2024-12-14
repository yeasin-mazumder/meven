import React from "react";
import Containar from "../../layouts/Containar";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CartBradCumbs = () => {
    const navigate = useNavigate()
  return (
    <section className="border-b border-b-border px-5 xl:px-0">
      <Containar>
        <div>
          <h4 className="flex items-center gap-x-2 text-sm leading-3 p-10">
            <span onClick={()=>navigate("/")} className="cursor-pointer hover:text-danger text-texthead transition-all ease-linear duration-200">
              Home
            </span>{" "}
            <span>
              <FaChevronRight className="w-[5px] mt-0.5" />
            </span>{" "}
            <span>Cart</span>{" "}
          </h4>
        </div>
      </Containar>
    </section>
  );
};

export default CartBradCumbs;
