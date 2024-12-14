import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlices";
import axios from "axios";
import ApiContext from "../baseapi/BaseApi";
import { FaHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import SkeletonLoader from "../skeletonLoader/SkeletonLoader";
import { motion } from "framer-motion";

const NewProductItem = ({
  image = [],
  product,
  discount,
  subtitle,
  title,
  brandName,
  categoryName,
  offerprice,
  regularprice,
  classItem,
  categoryId,
  brandId,
  discountType,
  discountPercent,
  priceAfterDiscount,
  id,
  slug,
  freeShipping,
  achieveSizes,
  stock,
}) => {
  const dispatch = useDispatch();

  const baseApi = useContext(ApiContext);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalCart, setShowModalCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null); // State for selected size
  const modalRef = useRef(null);
  const navigate = useNavigate();

  // const totalStock = achieveSizes?.reduce(
  //   (total, size) => total + size?.stock,
  //   0
  // );

  // console.log("Regular price", id, regularprice, priceAfterDiscount);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
        setShowModalCart(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  // const handleFetchOptionData = async (item) => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await axios.get(
  //       `${baseApi}/product/${item?.product?._id}/options`
  //     );

  //     setOptions(response.data.data?.options);
  //     setShowModal(true);
  //   } catch (err) {
  //     setError("Failed to fetch options. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // const handleFetchOptionDataCart = async (item) => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await axios.get(
  //       `${baseApi}/product/${item?.product?._id}/options`
  //     );

  //     setOptions(response.data.data?.options);
  //     setShowModalCart(true);
  //   } catch (err) {
  //     setError("Failed to fetch options. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // // console.log("product", product);
  // const handleAddToCart = () => {
  //   const selectedOption = options.find(
  //     (option) => option.size === selectedSize
  //   );

  //   if (!selectedOption) return;

  //   const item = {
  //     ...product?.product,
  //     id: product?.product?._id,
  //     slug: product?.product?.slug,
  //     quantity: 1,
  //     photos: product?.product?.photos,
  //     name: product?.product?.name,
  //     colorOptionId: selectedOption?._id,
  //     _id: product?._id,
  //     selectedOption: {
  //       _id: selectedOption?._id,
  //       sku: selectedOption?.sku,
  //       size: selectedOption?.size,
  //       price: selectedOption?.price,
  //       salePrice: selectedOption?.salePrice,
  //       stock: selectedOption?.stock,
  //       discountType: selectedOption?.discountType,
  //       discountValue: selectedOption?.discountValue,
  //       visitCount: selectedOption?.visitCount,
  //       saleNumber: selectedOption?.saleNumber,
  //       freeShipping: selectedOption?.freeShipping,
  //     },
  //     selectedColor: selectedOption?.variant,
  //   };

  //   dispatch(addToCart(item));
  //   setShowModal(false); // Close the modal after adding to cart
  // };

  // const handleFetchOptionData = async (item) => {
  //   // console.log(item);
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await axios.get(
  //       `${baseApi}/product/${item?.product?._id}/options`
  //     );

  //     const isEmpty =
  //       (await response.data.data?.options[0].size) === "" ? true : false;

  //     if (isEmpty) {
  //       console.log(response?.data?.data?.options, "REASponse..........");
  //       setOptions(response?.data?.data?.options);
  //       console.log("options[0]", options);
  //       await handleAddToCart();
  //       return;
  //     } else {
  //       console.log("options[0] DOWN", options);
  //       setOptions(response.data.data?.options);
  //       setShowModal(true);
  //     }
  //   } catch (err) {
  //     setError("Failed to fetch options. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleFetchOptionData = async (item) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${baseApi}/product/${item?.product?._id}/options`
      );

      const fetchedOptions = response?.data?.data?.options || [];
      const isEmpty = fetchedOptions[0]?.size === "";

      if (isEmpty) {
        // console.log("Fetched options (empty):", fetchedOptions);
        setOptions(fetchedOptions);
        await handleAddToCart(fetchedOptions); // Pass fetched options directly
        return;
      } else {
        // console.log("Fetched options:", fetchedOptions);
        setOptions(fetchedOptions);
        setShowModal(true);
      }
    } catch (err) {
      setError("Failed to fetch options. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFetchOptionDataCart = async (item) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${baseApi}/product/${item?.product?._id}/options`
      );
      const fetchedOptions = response?.data?.data?.options || [];
      const isEmpty =
        fetchedOptions[0]?.size === "" ||
        fetchedOptions[0]?.size === selectedSize;
      // const selectedOption = currentOptions.find(
      //   (option) => option.size === "" || option.size === selectedSize
      // );

      if (isEmpty) {
        // console.log("Fetched options (empty):", fetchedOptions);
        setOptions(fetchedOptions);
        await handleAddToCart(fetchedOptions); // Pass fetched options directly
        return;
      } else {
        // console.log("Fetched options:", fetchedOptions);
        setOptions(fetchedOptions);
        setShowModal(true);
      }

      // setOptions(response.data.data?.options);
      // setShowModalCart(true);
    } catch (err) {
      setError("Failed to fetch options. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  // console.log("options..................outer", options);
  // console.log("product", product);
  // const handleAddToCart = () => {
  //   const selectedOption = options.find((option) => option.size === "");

  //   console.log("options..................", options);
  //   console.log("options[0]..................", options[0]);
  //   console.log("options[0]?.price..................", options[0]?.price);
  //   // console.log(selectedOption, "sele..................");

  //   // console.log(selectedOption, "..........asdijuafoidjp");
  //   // console.log("product", product);
  //   if (!selectedOption) {
  //     // console.log(selectedOption, "Options.......Options.........");
  //     const item = {
  //       ...product?.product,
  //       id: product?.product?._id,
  //       slug: product?.product?.slug,
  //       quantity: 1,
  //       photos: product?.product?.photos,
  //       name: product?.product?.name,
  //       colorOptionId: selectedOption?._id,
  //       _id: product?._id,
  //       selectedOption: {
  //         _id: options[0]?._id,
  //         sku: options[0]?.sku,
  //         size: options[0]?.size,
  //         price: options[0]?.price,
  //         salePrice: options[0]?.salePrice,
  //         stock: options[0]?.stock,
  //         discountType: options[0]?.discountType,
  //         discountValue: options[0]?.discountValue,
  //         visitCount: options[0]?.visitCount,
  //         saleNumber: options[0]?.saleNumber,
  //         freeShipping: options[0]?.freeShipping,
  //       },
  //       selectedColor: options[0]?.variant,
  //     };

  //     console.log(item, ".........Itemsok................ridu");
  //     dispatch(addToCart(item));
  //     return;
  //   }

  //   const item = {
  //     ...product?.product,
  //     id: product?.product?._id,
  //     slug: product?.product?.slug,
  //     quantity: 1,
  //     photos: product?.product?.photos,
  //     name: product?.product?.name,
  //     colorOptionId: selectedOption?._id,
  //     _id: product?._id,
  //     selectedOption: {
  //       _id: selectedOption?._id,
  //       sku: selectedOption?.sku,
  //       size: selectedOption?.size,
  //       price: selectedOption?.price,
  //       salePrice: selectedOption?.salePrice,
  //       stock: selectedOption?.stock,
  //       discountType: selectedOption?.discountType,
  //       discountValue: selectedOption?.discountValue,
  //       visitCount: selectedOption?.visitCount,
  //       saleNumber: selectedOption?.saleNumber,
  //       freeShipping: selectedOption?.freeShipping,
  //     },
  //     selectedColor: selectedOption?.variant,
  //   };

  //   console.log("Product Item", item);
  //   dispatch(addToCart(item));
  //   setShowModal(false);
  // };

  const handleAddToCart = (currentOptions = options) => {
    // const selectedOption = currentOptions.find((option) => option.size === "");
    const selectedOption = currentOptions.find(
      (option) => option.size === "" || option.size === selectedSize
    );

    // console.log("Current options:", currentOptions);
    // console.log("Selected option:", selectedOption);

    const item = {
      ...product?.product,
      id: product?.product?._id,
      slug: product?.product?.slug,
      quantity: 1,
      photos: product?.product?.photos,
      name: product?.product?.name,
      colorOptionId: selectedOption?._id,
      _id: product?.product?._id,
      selectedOption: {
        _id: selectedOption?._id,
        sku: selectedOption?.sku,
        size: selectedOption?.size,
        price: selectedOption?.price,
        salePrice: selectedOption?.salePrice,
        stock: selectedOption?.stock,
        discountType: selectedOption?.discountType,
        discountValue: selectedOption?.discountValue,
        visitCount: selectedOption?.visitCount,
        saleNumber: selectedOption?.saleNumber,
        freeShipping: selectedOption?.freeShipping,
      },
      selectedColor: selectedOption?.variant,
    };

    // console.log("Product Item to Add:", item);
    dispatch(addToCart(item));
    setShowModal(false);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleCloseModalCart = () => {
    setShowModalCart(false);
  };

  // console.log(product, ".....pisdkjfoa");

  const slg = (product?.product?.name || "")
    .toLowerCase()
    .trim()
    .replace(/[^\u0980-\u09FF0-9a-zA-Z\s-]/g, "") // Allow Bangla, numbers, and letters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with a single one
    .replace(/^-|-$/g, ""); // Remove leading or trailing hyphens
  return (
    <>
      <motion.div className="max-w-xs border relative border-gray-200 rounded-lg overflow-hidden shadow-lg mx-1">
        {stock > 0 ? (
          <Link to={`/productdetail/${slg}/${id}`}>
            <div className="overflow-hidden group relative">
              <img
                className="w-full object-cover mx-auto transition-transform duration-300 group-hover:scale-105"
                src={image[0]}
                alt="product"
              />
              {discount > 0 && discountType === "amount" ? (
                <div className="absolute right-0 top-3 px-3 py-2 shadow-lg text-xs bg-red-500 text-white flex items-center gap-x-0.5">
                  ৳ {discount}
                </div>
              ) : (
                discount > 0 &&
                discountType === "percent" && (
                  <div className="absolute right-0 top-3 px-3 py-2 shadow-lg text-xs bg-red-500 text-white flex items-center gap-x-0.5">
                    {discount} %
                  </div>
                )
              )}
              {freeShipping && (
                <div className="absolute left-0 top-4 py-1 px-2 bg-danger  text-sm text-white gap-x-0.5">
                  {/* <img src={freeshippingImg} alt="" className="w-20" /> */}
                  Free Shipping
                </div>
              )}
            </div>
          </Link>
        ) : (
          <div className="overflow-hidden cursor-not-allowed">
            <div className="group">
              <img
                className="w-full object-cover mx-auto opacity-50"
                src={image[0]}
                alt="product"
              />
            </div>
          </div>
        )}

        <div className="lg:px-4 pb-4 text-center">
          {/* <h3>
            <Link
              to={`/shop/brand/${brandId}/${encodeURIComponent(
                (brandName || "").replace(/\s+/g, "")
              )}`}
              className="uppercase block text-xs text-customRed my-2 "
            >
              {subtitle}
            </Link>
          </h3> */}
          <h2 className="font-semibold h-8 ">
            <Link
              to={`/productdetail/${slg}/${id}`}
              className="text-sm leading-5 inline-block font-medium  py-3 text-center text-ellipsis overflow-hidden break-words"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
              }}
            >
              {title}
            </Link>
          </h2>
          <div className="flex flex-col items-center mt-6">
            <div className="flex items-center">
              <span className="text-lg font-semibold ">
                <span className="">৳</span>
                {priceAfterDiscount
                  ? Math.ceil(priceAfterDiscount)
                  : regularprice}
              </span>
              {priceAfterDiscount > 0 && (
                <span className="text-sm text-[#BD1E2D] line-through ml-2">
                  <span className="mr-1">৳</span>
                  {regularprice}
                </span>
              )}
            </div>
            {/* <span className="text-sm text-gray-500 mt-1">
              {stock > 0 ? `In Stock (${stock})` : "Out of Stock"}
            </span> */}
          </div>
        </div>

        <div
          className={`relative group duration-200 ${
            stock > 0
              ? "cursor-pointer hover:bg-customRed text-gray-500 hover:text-white"
              : "cursor-not-allowed text-gray-400"
          } flex justify-center`}
        >
          {stock > 0 && (
            <button
              disabled={stock <= 0}
              onClick={stock > 0 ? () => handleFetchOptionData(product) : null}
              className="border-[#F59120] border hover:bg-[#F59120] duration-200 hover:text-white text-xs font-semibold px-2 w-full text-center py-2"
            >
              Buy Now
            </button>
          )}
        </div>

        <div
          className={`relative group duration-200 ${
            stock > 0
              ? "cursor-pointer hover:bg-customRed text-gray-500 hover:text-white"
              : "cursor-not-allowed text-gray-400"
          } flex justify-center mt-2`}
        >
          {stock > 0 && (
            <button
              onClick={
                stock > 0 ? () => handleFetchOptionDataCart(product) : null
              }
              className="bg-[#F59120] hover:bg-danger  duration-200 text-white text-xs font-semibold px-2 w-full text-center py-2"
            >
              Add to Cart
            </button>
          )}
        </div>

        {/* Buy now model */}
        {showModal && (
          <div className="absolute inset-0 z-30 bg-black bg-opacity-50 flex justify-center items-center">
            <div
              ref={modalRef}
              className="bg-white absolute bottom-0 p-4 w-96 max-w-full rounded shadow-lg"
            >
              <h3 className="text-sm mb-4">Select Size</h3>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <ul className="flex gap-x-1 items-center text-sm">
                  {options?.map((option) => (
                    <li
                      key={option._id}
                      className={`py-1 px-2 border ${
                        selectedSize === option.size
                          ? "border-danger text-danger"
                          : ""
                      } cursor-pointer`}
                      onClick={() => handleSizeClick(option.size)}
                    >
                      <div className="flex flex-col items-center">
                        <span>{option.size}</span>
                        {/* <span className="text-xs text-gray-500">
                            {option?.stock > 0
                              ? `Stock: ${option?.stock}`
                              : "Out of Stock"}
                          </span> */}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-4 flex gap-x-1">
                <button
                  className="px-2 py-0.5 text-sm bg-texthead text-white rounded"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  className={`px-2 text-sm py-0.5 bg-[#F59120] text-white rounded flex items-center ${
                    !selectedSize ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => {
                    if (selectedSize) {
                      handleAddToCart();
                      navigate("/checkout");
                    }
                  }}
                  disabled={!selectedSize}
                >
                  Confirm
                  <TiTick className="text-xl group-hover:scale-125 duration-200" />
                </button>
              </div>
            </div>
          </div>
        )}
        {/* add to cart model */}
        {showModalCart && (
          <div className="absolute inset-0 z-30 bg-red bg-opacity-30 flex justify-center items-center">
            <div
              ref={modalRef}
              className="bg-white absolute bottom-0 p-4 w-full max-w-full rounded shadow-lg "
            >
              <h3 className="text-sm font-semibold mb-4">Select Size</h3>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <ul className="flex gap-x-1 items-center">
                  {options?.map((option) => (
                    <li
                      key={option._id}
                      className={`py-1 px-2 border ${
                        selectedSize === option.size
                          ? "border-[#10B1DF] text-danger "
                          : ""
                      } cursor-pointer ${
                        option?.stock <= 0
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={() =>
                        option?.stock > 0 && handleSizeClick(option.size)
                      }
                    >
                      <div className="flex flex-col items-center">
                        <span>{option.size}</span>
                        {/* <span className="text-xs text-gray-500">
                            {option?.stock > 0
                              ? `Stock: ${option?.stock}`
                              : "Out of Stock"}
                          </span> */}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-4 flex gap-x-2">
                <button
                  className="px-2 py-0.5 text-sm bg-texthead text-white rounded"
                  onClick={handleCloseModalCart}
                >
                  Cancel
                </button>
                <button
                  className={`px-2 text-sm py-0.5 bg-[#F59120] text-white rounded flex items-center ${
                    !selectedSize ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => {
                    setShowModalCart(false);
                    handleAddToCart();
                  }}
                  disabled={!selectedSize}
                >
                  Confirm
                  <TiTick className="text-xl group-hover:scale-125 duration-200" />
                </button>
              </div>
            </div>
          </div>
        )}
        {/* <div className="flex justify-around border-t border-gray-200 relative">
          <div
            onClick={stock > 0 ? () => handleFetchOptionData(product) : null}
            className={`relative group duration-200 ${
              stock > 0
                ? "cursor-pointer hover:bg-customRed text-gray-500 hover:text-white"
                : "cursor-not-allowed text-gray-400"
            } w-1/2 flex justify-center py-3`}
          >
            <button
              className="flex items-center justify-center"
              disabled={stock <= 0}
            >
              <FaHeart className="text-lg" />
            </button>
            {stock > 0 && (
              <span className="absolute bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs font-semibold px-2 w-[90px] text-center py-2 rounded">
                Buy Now
                <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-2 h-2 bg-black rotate-45"></span>
              </span>
            )}
          </div>

          {stock > 0 ? (
            <Link
              to={`/productdetail/${slg}/${id}`}
              className="border-r border-l relative group duration-200 cursor-pointer hover:bg-customRed text-gray-500 hover:text-white w-1/2 flex justify-center py-3"
            >
              <button className="flex items-center justify-center">
                <FaEye className="text-lg" />
              </button>
              <span className="absolute bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs font-semibold px-2 w-[90px] text-center py-2 rounded">
                View Details
                <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-2 h-2 bg-black rotate-45"></span>
              </span>
            </Link>
          ) : (
            <div className="border-r border-l relative group duration-200 cursor-not-allowed text-gray-400 w-1/2 flex justify-center py-3">
              <button className="flex items-center justify-center" disabled>
                <FaEye className="text-lg" />
              </button>
              <span className="absolute bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 bg-black text-white text-xs font-semibold px-2 w-[90px] text-center py-2 rounded">
                View Details
                <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-2 h-2 bg-black rotate-45"></span>
              </span>
            </div>
          )}

          <div
            onClick={
              stock > 0 ? () => handleFetchOptionDataCart(product) : null
            }
            className={`relative group duration-200 ${
              stock > 0
                ? "cursor-pointer hover:bg-customRed text-gray-500 hover:text-white"
                : "cursor-not-allowed text-gray-400"
            } w-1/2 flex justify-center py-3`}
          >
            <button
              className="flex items-center justify-center"
              disabled={stock <= 0}
            >
              <FaShoppingCart className="text-lg group-hover:scale-125 duration-200" />
            </button>
            {stock > 0 && (
              <span className="absolute bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs font-semibold px-2 w-[90px] text-center py-2 rounded">
                Add to Cart
                <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-2 h-2 bg-black rotate-45"></span>
              </span>
            )}
          </div>
        </div> */}
      </motion.div>
    </>
  );
};

export default NewProductItem;
