import React, { useContext, useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Containar from "../layouts/Containar";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { RiSecurePaymentLine } from "react-icons/ri";
import { MdCheckCircleOutline } from "react-icons/md";
import { LiaHandsHelpingSolid } from "react-icons/lia";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { socialList } from "../components/constants";
import RelatedProduct from "../components/productdetails/RelatedProduct";
import ParagraphtoList from "../components/productdetails/ParagraphtoList";
import axios from "axios";
import { addToCart } from "../redux/slices/cartSlices";
import RightPartProduct from "../components/productdetails/RightPartProduct";
import ApiContext from "../components/baseapi/BaseApi";
import youtube from "../../src/assets/productdetails/youtube.png";
import { IoCartOutline } from "react-icons/io5";
import { RiShoppingBag2Fill } from "react-icons/ri";
const serviceList = [
  {
    icon: TbTruckDelivery,
    title: "Fast Delivery",
    // details: "Orders over $100",
  },
  {
    icon: RiSecurePaymentLine,
    title: "Secure Payment",
    details: "100% Secure Payment",
  },
  {
    icon: MdCheckCircleOutline,
    title: "Money Back Guarantee",
    // details: "Within 30 Days",
  },
  {
    icon: LiaHandsHelpingSolid,
    title: "24/7 Support",
    details: "Within 1 Business Day",
  },
];

const ProductDetail = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [userChoice, setUserChoiceColor] = useState("");
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const baseApi = useContext(ApiContext);
  const { slug, id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseApi}/product/${id}`);
        const productData = response.data.data.doc;
        setData(productData);

        // console.log(productData, "........................");

        if (productData?.variants && productData?.variants?.length > 0) {
          const firstValidVariant = productData?.variants?.find(
            (variant) => variant?.options && variant?.options?.length > 0
          );

          if (firstValidVariant) {
            setSelectedColor(firstValidVariant);
            setUserChoiceColor(firstValidVariant?.colorCode);
            setSelectedSize(firstValidVariant?.options[0]?.size);
          }
        }

        const hasReloaded = sessionStorage?.getItem("hasReloaded");
        if (!hasReloaded) {
          sessionStorage?.setItem("hasReloaded", "true");
          window?.location?.reload();
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const totalStock = data?.variants?.reduce((total, variant) => {
    const optionsStock = variant?.options?.reduce(
      (optionTotal, option) => optionTotal + (option?.stock || 0),
      0
    );
    return total + (optionsStock || 0);
  }, 0);

  const handleAddToCart = () => {
    const selectedOption = selectedColor?.options?.find(
      (option) => option?.size === selectedSize
    );

    const item = {
      ...data,
      id,
      quantity,
      colorOptionId: selectedOption?._id,
      selectedOption,
      selectedColor,
    };

    dispatch(addToCart(item));
    setQuantity(1);
  };

  const handleSelectColorChange = (color) => {
    setUserChoiceColor(color);
  };

  const handleColorChange = (variant) => {
    setSelectedColor(variant);
    setUserChoiceColor(variant?.colorCode);

    if (variant?.options && variant?.options?.length > 0) {
      setSelectedSize(variant?.options[0]?.size);
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const renderSizes = () => {
    if (!selectedColor || !selectedColor.options) {
      return null;
    }

    return selectedColor.options.map((option) => (
      <button
        key={option._id}
        onClick={() => handleSizeChange(option?.size)}
        className={`${
          selectedSize === option?.size
            ? "bg-texthead text-white"
            : "text-gray-600"
        } px-2 py-1 rounded text-sm mx-2`}
      >
        {option?.size}
      </button>
    ));
  };

  const renderPrice = () => {
    let selectedOption;

    // If a size is selected, find the option with that size
    if (selectedSize) {
      selectedOption = selectedColor?.options?.find(
        (option) => option?.size === selectedSize
      );
    } else {
      // If no size is selected, use the first available option
      selectedOption = selectedColor?.options?.[0];
    }

    // If a selectedOption exists, display the price
    if (selectedOption) {
      return (
        <div>
          {selectedOption?.salePrice ? (
            <div className="flex text-2xl items-center gap-x-1 text-green-600">
              ৳ {parseInt(selectedOption?.salePrice)}
              <div className="flex text-xl items-center gap-x-0.5 text-red-500 line-through">
                {parseInt(selectedOption?.price)} tk
              </div>
            </div>
          ) : (
            <div className="flex text-2xl items-center gap-x-1 text-green-600">
              ৳ {parseInt(selectedOption?.price)}
            </div>
          )}
        </div>
      );
    }

    // If no selectedOption is found, fallback to a default price (you can return an error message or fallback logic here)
    return <p>Price not available</p>;
  };

  const renderDiscount = () => {
    if (selectedSize) {
      const selectedOption = selectedColor?.options?.find(
        (option) => option?.size === selectedSize
      );

      if (selectedOption) {
        return (
          <>
            <div className="absolute right-4 top-4 z-10">
              {selectedOption?.freeShipping && (
                <h3 className="px-3 bg-green-600 text-white py-1 shadow-xl rounded-md">
                  Free Shipping
                </h3>
              )}
            </div>

            {selectedOption?.discountValue > 0 && (
              <div className="absolute left-4 top-4 z-10">
                <h3 className="px-3 bg-danger text-white py-1 shadow-xl rounded-md">
                  {selectedOption?.discountType == "percent" ? (
                    <>{selectedOption?.discountValue} %</>
                  ) : (
                    <> ৳ {selectedOption?.discountValue} </>
                  )}
                </h3>
              </div>
            )}
          </>
        );
      }
    }
  };

  const renderDetails = () => {
    if (selectedColor?.details?.length > 0) {
      return <ParagraphtoList paragraph={selectedColor?.details} />;
    }
  };

  const photos = data?.photos || [];

  const isYouTubeLink = (url) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  return (
    <>
      <section className="border-b border-b-border px-5 xl:px-0">
        <Containar>
          <div className="pt-10 px-4">
            <h4 className="flex flex-wrap items-center gap-x-2 text-sm py-7">
              <span className="cursor-pointer hover:text-danger text-texthead transition-all ease-linear duration-200">
                <Link to={"/"}>Home</Link>
              </span>{" "}
              <span>
                <FaChevronRight className="w-[5px] mt-0.5" />
              </span>{" "}
              <Link
                className="hover:text-danger text-texthead transition-all ease-linear duration-200"
                to={"/shop"}
              >
                Shop
              </Link>{" "}
              <span>
                <FaChevronRight className="w-[5px] mt-0.5" />
              </span>{" "}
              <span>{data?.name}</span>
            </h4>
          </div>
        </Containar>
      </section>

      <section className="font-inter pt-10 xl:pt-16 bg-[#F2F3F8]">
        <Containar>
          <div className="">
            <div className="bg-white rounded">
              {loading ? (
                <div className="animate-pulse flex flex-wrap justify-between">
                  <div className="w-full relative md:w-[50%] lg:w-[50%] xl:w-[40%] text-gray-600 h-[590px] rounded-lg mb-4"></div>

                  <div className="w-full md:w-[45%] lg:w-[45%] xl:w-[55%] px-5 lg:px-0">
                    <div className="h-10 text-gray-600 rounded w-3/4 mb-4"></div>
                    <div className="h-5 text-gray-600 rounded w-1/2 mb-4"></div>
                    <div className="flex gap-x-3 mt-4 md:mt-10">
                      <div className="h-8 text-gray-600 rounded w-20"></div>
                    </div>
                    <div className="h-4 text-gray-600 rounded w-5/6 mt-6 md:mt-10"></div>
                    <div className="mt-6 grid grid-cols-3 gap-4">
                      <div className="h-8 text-gray-600 rounded"></div>
                      <div className="h-8 text-gray-600 rounded"></div>
                      <div className="h-8 text-gray-600 rounded"></div>
                    </div>
                    <div className="flex mt-10 gap-x-8">
                      <div className="h-[60px] w-24 text-gray-600 rounded"></div>
                      <div className="h-[60px] w-24 text-gray-600 rounded"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex gap-5 flex-col md:flex-row xl:gap-20 p-5 xl:p-10">
                  <div className="w-full relative md:w-[40%] lg:w-[50%] xl:w-[40%] product_Details">
                    {renderDiscount()}
                    <PhotoProvider>
                      {photos?.length > 0 && (
                        <>
                          <Swiper
                            style={{
                              "--swiper-navigation-color": "#fff",
                              "--swiper-navigation-size": "25px",
                            }}
                            loop={true}
                            spaceBetween={10}
                            navigation={true}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper2 w-full max-h-[590px] flex"
                          >
                            {photos.map((item, index) => (
                              <SwiperSlide key={index}>
                                {isYouTubeLink(item) ? (
                                  (() => {
                                    const videoId = item
                                      .split("v=")[1]
                                      ?.split("&")[0];
                                    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

                                    return (
                                      <iframe
                                        width="100%"
                                        height="315"
                                        src={embedUrl}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title={`YouTube Video ${index}`}
                                      ></iframe>
                                    );
                                  })()
                                ) : (
                                  <PhotoView src={item}>
                                    <img
                                      className="w-full object-contain"
                                      src={item}
                                      alt={`Image ${index}`} // Adding alt for accessibility
                                    />
                                  </PhotoView>
                                )}
                              </SwiperSlide>
                            ))}
                          </Swiper>

                          <Swiper
                            onSwiper={setThumbsSwiper}
                            loop={true}
                            slidesPerView={4}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper max-h-[180px]"
                          >
                            {photos.map((item, index) => (
                              <SwiperSlide key={index}>
                                {isYouTubeLink(item) ? (
                                  <img
                                    className="w-full object-contain"
                                    src={youtube}
                                    alt="YouTube Thumbnail"
                                  />
                                ) : (
                                  <img
                                    className="w-full object-contain"
                                    src={item}
                                  />
                                )}
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </>
                      )}
                    </PhotoProvider>
                  </div>

                  <div className="w-full ">
                    <h1 className="text-xl font-semibold">{data?.name}</h1>
                    <p className="text-gray-500 mt-1 border-b pb-5">
                      {data?.description !== "undefined" && (
                        <p>{data?.description}</p>
                      )}
                    </p>

                    <div className="mt-4 text-2xl border-b pb-5 flex">
                      <p className="text-gray-400 mr-2 text-sm w-[20%]">
                        Price:
                      </p>
                      {renderPrice()}
                    </div>
                    <div className="">
                      {data?.variants?.length > 0 &&
                        data?.variants[0]?.colorCode &&
                        data?.variants[0]?.colorName &&
                        data?.variants?.some(
                          (variant) => variant?.options?.length > 0
                        ) && (
                          <div className="flex items-center">
                            <h3 className="text-gray-400 mr-2 text-sm w-[20%] mt-4  pb-5">
                              {data?.variants?.length > 0 ? "Colors:" : ""}
                            </h3>

                            <ul className="mt-4 flex flex-wrap gap-2">
                              {data?.variants
                                .filter(
                                  (variant) => variant?.options?.length > 0
                                )
                                .map((item, index) => (
                                  <li
                                    onClick={() => {
                                      handleColorChange(item);
                                      handleSelectColorChange(item?.colorCode);
                                    }}
                                    key={index}
                                  >
                                    <button
                                      style={{
                                        backgroundColor: item?.colorCode,
                                      }}
                                      className={`w-8 h-8 text-sm ${
                                        userChoice === item?.colorCode
                                          ? "shadow-2xl rounded-full "
                                          : "text-gray-600 border-[4px] border-white text-texthead"
                                      }`}
                                    ></button>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        )}
                    </div>

                    {data?.variants[0]?.options[0]?.size &&
                      !isNaN(parseInt(data?.variants[0]?.options[0]?.size)) && (
                        <div className="mt-4 text-2xl border-b pb-5 flex">
                          <p className="text-gray-400 mr-2 text-sm w-[20%]">
                            {parseInt(data?.variants[0]?.options[0]?.size)
                              ? "Quantity:"
                              : "Sizes:"}
                          </p>
                          {renderSizes()}
                        </div>
                      )}

                    <div className="flex items-center mt-4 border-b pb-5">
                      <p className="text-gray-400 mr-2 text-sm w-[20%]">
                        Quantity:
                      </p>
                      <div className="h-full border flex border-border">
                        <button
                          onClick={() => {
                            if (quantity > 1) {
                              setQuantity(quantity - 1);
                              setError("");
                            }
                          }}
                          className="w-[60px] h-full flex items-center cursor-pointer justify-center"
                          disabled={quantity === 1}
                        >
                          <span className="w-10 h-10 text-3xl text-gray-600">
                            -
                          </span>
                        </button>
                        <div className="flex items-center justify-center">
                          {quantity}
                        </div>
                        <button
                          onClick={() => {
                            if (quantity < totalStock) {
                              setQuantity(quantity + 1);
                              setError("");
                            } else {
                              setError("Cannot exceed available stock!");
                            }
                          }}
                          className="w-[60px] h-full flex items-center justify-center"
                        >
                          <span className="w-10 h-10 text-3xl text-gray-600">
                            +
                          </span>
                        </button>
                      </div>

                      {error && (
                        <p className="text-red-500 text-sm mt-2">{error}</p>
                      )}
                      <span className="ml-2 text-gray-500">
                        <p>({totalStock} available)</p>
                        {/* (200 available) */}
                      </span>
                    </div>

                    <div className="mt-6 flex gap-4">
                      <button
                        onClick={() => handleAddToCart(data)}
                        className="px-4 py-2 rounded flex items-center gap-2 hover:bg-[#6D9157] duration-200"
                      >
                        <RiShoppingBag2Fill /> Add to Cart
                      </button>
                      <button
                        onClick={() => {
                          handleAddToCart(data);
                          navigate("/checkout");
                          // console.log(data);
                        }}
                        className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-opacity-70 duration-200"
                      >
                        <IoCartOutline /> অর্ডার করুন
                      </button>
                    </div>

                    <div className="mt-20 flex gap-4 items-center">
                      <p className="text-gray-400 mr-2 text-sm w-[20%]">
                        Social Media:
                      </p>
                      {socialList.map((item, index) => {
                        let Icon = item?.logo;
                        return (
                          <Link
                            key={index}
                            className="text-texthead"
                            to={item?.link}
                          >
                            <li
                              className="w-10 h-10 rounded-full flex items-center justify-center border border-border hover:bg-danger transition-all ease-linear duration-200 hover:text-white"
                              key={index}
                            >
                              <Icon />
                            </li>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-5 my-10 ">
              <div className="w-[25%] mb-10 hidden lg:block">
                {loading ? (
                  <div className="animate-pulse space-y-4">
                    <div className="h-8 text-gray-600 rounded w-full"></div>
                    <div className="h-8 text-gray-600 rounded w-full"></div>
                    <div className="h-8 text-gray-600 rounded w-full"></div>
                    <div className="h-8 text-gray-600 rounded w-full"></div>
                  </div>
                ) : (
                  <ul>
                    <RightPartProduct />
                    <li className="mt-8 flex flex-wrap lg:block  bg-white xl:px-3 shadow rounded">
                      {serviceList?.map((item, index) => {
                        let Icon = item.icon;
                        return (
                          <div
                            key={index}
                            className="flex items-center gap-x-5 border-b py-5 w-full sm:w-[50%] lg:w-full px-[30px]"
                          >
                            <h2 className="text-5xl text-danger">
                              <Icon />
                            </h2>
                            <div>
                              <h3 className="text-base text-texthead font-medium">
                                {item?.title}
                              </h3>
                              <p>{item?.details}</p>
                            </div>
                          </div>
                        );
                      })}
                    </li>
                  </ul>
                )}
              </div>
              <div className="w-full lg:w-[75%] bg-white shadow rounded">
                <div>
                  {selectedColor?.details?.length > 0 && (
                    <div>
                      <h2 className="text-xl font-medium text-texthead border-b p-5 text-gray-600">
                        Product Details
                      </h2>
                      <div className="p-5">{renderDetails()}</div>
                    </div>
                  )}
                </div>
                <RelatedProduct id={data?.category?._id} />
              </div>
            </div>
          </div>
        </Containar>
      </section>
    </>
  );
};

export default ProductDetail;
