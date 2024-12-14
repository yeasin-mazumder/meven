import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Containar from "../../layouts/Containar";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import ProductItem from "../productitem/ProductItem";
import ApiContext from "../baseapi/BaseApi";
import { FaLuggageCart } from "react-icons/fa";

const BestSell = () => {
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate();
  const baseApi = useContext(ApiContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await axios.get(`${baseApi}/varient`);

        const fetchedProducts = data?.data?.data?.doc; // Adjust according to API response structure

        // Remove duplicates based on product ID
        const uniqueProducts = [];
        const seenProductIds = new Set();
        fetchedProducts.forEach((item) => {
          if (!seenProductIds.has(item.product._id)) {
            seenProductIds.add(item.product._id);
            uniqueProducts.push(item);
          }
        });

        setProductList(uniqueProducts);
        // console.log("Fetched and processed product list:", uniqueProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return productList.length > 0 ? ( // Conditionally render if products are available
    <section className="py-14 lg:pt-28 font-inter px-3 2xl:px-0 bg-[#F6F6F7]">
      <Containar>
        <div>
          <div className="flex flex-wrap justify-between items-center border-b pb-3">
            <div className="px-2">
              <p className="flex items-center gap-2 text-danger  text-sm">
                <FaLuggageCart className="bg-danger  font-bold text-2xl p-1 rounded-full text-white" />
                This Month
              </p>
              <h3 className="text-[24px] mr-3 lg:text-2xl text-texthead mt-1 uppercase font-bold">
                Best Selling
              </h3>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 2 }}
            className="mt-12 w-full relative"
          >
            <Swiper
              modules={[Navigation, Autoplay]}
              slidesPerView={1}
              loop={true}
              speed={1000}
              autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
              navigation={{
                nextEl: ".swiper-button-next1",
                prevEl: ".swiper-button-prev1",
              }}
              breakpoints={{
                370: { slidesPerView: 2 },
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1278: { slidesPerView: 5 },
              }}
              className="mySwiper w-full group-edit"
            >
              {productList.map((item, index) => (
                <SwiperSlide key={index}>
                  <ProductItem
                    key={item?._id}
                    product={item?.product}
                    image={item?.product?.photos}
                    id={item?.product?._id}
                    subtitle={item?.brand?.title}
                    title={item?.product?.name}
                    categoryId={item?.category?._id}
                    brandId={item?.brand?._id}
                    brandName={item?.brand?.title}
                    categoryName={item?.category?.title}
                    discount={item?.options[0]?.discountValue}
                    discountType={item?.options[0]?.discountType}
                    discountPercent={item?.discountPercent}
                    priceAfterDiscount={item?.options[0]?.salePrice}
                    offerprice={
                      item?.options[0]?.price - item?.options[0]?.discountValue
                    }
                    freeShipping={item?.options[0]?.freeShipping}
                    regularprice={item?.options[0]?.price}
                    classItem="w-full "
                    achieveSizes={item?.options}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <motion.div className="swiper-button-next1 z-20 absolute rounded-full right-1 -top-20 -translate-y-1/2 w-10 h-10 border bg-white hover:bg-texthead transition-all ease-linear hover:text-white cursor-pointer hover:border-texthead border-[#b6b5b2] flex justify-center items-center text-[#858380]">
              <FaChevronRight className="text-xs" />
            </motion.div>
            <motion.div className="swiper-button-prev1 absolute z-20 rounded-full right-14 -top-20 -translate-y-1/2 w-10 h-10 border bg-white hover:bg-texthead transition-all ease-linear hover:text-white cursor-pointer hover:border-texthead border-[#b6b5b2] flex justify-center items-center text-[#858380]">
              <FaChevronLeft className="text-xs" />
            </motion.div>
          </motion.div>
          <div className="flex justify-center ">
            <p
              onClick={() => navigate("/shop/mega-sale")}
              className="mt-12 px-10 py-2 bg-gray-300 hover:opacity-90 cursor-pointer font-medium text-base rounded-md text-gray-900  transition-all ease-linear duration-200"
            >
              Show All
            </p>
          </div>
        </div>
      </Containar>
    </section>
  ) : (
    // Fallback for when no products are available
    <section className="py-14 lg:pt-28 font-inter px-3 2xl:px-0 bg-[#F6F6F7] text-center">
      <p className="text-xl text-gray-500">No best-selling products found.</p>
    </section>
  );
};

export default BestSell;
