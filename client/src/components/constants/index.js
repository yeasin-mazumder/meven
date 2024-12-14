import { color } from "framer-motion"
import { BiHealth, BiLogoGraphql } from "react-icons/bi"
import { FaFacebook, FaFacebookF, FaInstagram, FaPinterestP , FaYoutube, FaTiktok, FaMap } from "react-icons/fa"
// import {  } from "react-icons/fa";
import { FaLinkedin, FaMapLocation } from "react-icons/fa6"
import { IoImagesOutline } from "react-icons/io5"
import { LiaDoveSolid } from "react-icons/lia"
import { MdDinnerDining } from "react-icons/md"

export const menusList = [
  {
    name:"Home",
    link:"/"
  },
  {
    name:"Shop",
    link:"/shop"
  },
  {
    name:"Contact",
    link:"/contact"
  },
  {
    name:"About",
    link:"/about"
  },
]

export const socialList = [
  
  {
    name: "facebook",
    logo:FaFacebookF,
    link:"https://www.facebook.com/mymeven"

  },
  {
    name: "instragram",
    logo:FaInstagram,
    link:" https://www.instagram.com/my_meven/"
  },
  {
    name: "tiktok",
    logo:FaTiktok,
    link:"www.tiktok.com/@mymeven"
  },

  {
    name: "pinterest",
    logo:FaPinterestP,
    link:"https://www.pinterest.com/my_meven/"

  },
  {
    name: "youtube",
    logo:FaYoutube,
    link:"https://www.youtube.com/@MYMEVEN"
  },
  {

    name: "maps",
    logo:FaMapLocation,
    link:"https://maps.app.goo.gl/umpc6JyseZBArsUv6"
  },
]

export const categoryList = [
  {
    name:"Arts & Photography",
    icon:IoImagesOutline,
    bgColor:"#F9F1FF",
    iconColor:"#A201FD",
    link:"/"
  },
  {
    name:"Food & Drink",
    icon:MdDinnerDining,
    bgColor:"#FAF4EB",
    iconColor:"#F79400",
    link:"/"
  },
  {
    name:"Romance",
    icon:LiaDoveSolid,
    bgColor:"#F4E5E5",
    iconColor:"#F01101",
    link:"/"
  },
  {
    name:"Health",
    icon:BiHealth,
    bgColor:"#E6F2F4",
    iconColor:"#04CDEF",
    link:"/"
  },
  {
    name:"Biography",
    icon:BiLogoGraphql,
    bgColor:"#FEF6F6",
    iconColor:"#FF8E8E",
    link:"/"
  },
]

export const city = [
  {
    city_id: 30000,
    city_name: "Select A City ↓",
  },
  {
    city_id: 32,
    city_name: "B. Baria",
  },
  {
    city_id: 52,
    city_name: "Bagerhat",
  },
  {
    city_id: 62,
    city_name: "Bandarban ",
  },
  {
    city_id: 34,
    city_name: "Barguna ",
  },
  {
    city_id: 17,
    city_name: "Barisal",
  },
  {
    city_id: 53,
    city_name: "Bhola",
  },
  {
    city_id: 9,
    city_name: "Bogra",
  },
  {
    city_id: 8,
    city_name: "Chandpur",
  },
  {
    city_id: 15,
    city_name: "Chapainawabganj",
  },
  {
    city_id: 2,
    city_name: "Chittagong",
  },
  {
    city_id: 61,
    city_name: "Chuadanga",
  },
  {
    city_id: 11,
    city_name: "Cox's Bazar",
  },
  {
    city_id: 5,
    city_name: "Cumilla",
  },
  {
    city_id: 1,
    city_name: "Dhaka",
  },
  {
    city_id: 35,
    city_name: "Dinajpur",
  },
  {
    city_id: 18,
    city_name: "Faridpur",
  },
  {
    city_id: 6,
    city_name: "Feni",
  },
  {
    city_id: 38,
    city_name: "Gaibandha",
  },
  {
    city_id: 22,
    city_name: "Gazipur",
  },
  {
    city_id: 56,
    city_name: "Gopalgonj ",
  },
  {
    city_id: 30,
    city_name: "Habiganj",
  },
  {
    city_id: 41,
    city_name: "Jamalpur",
  },
  {
    city_id: 19,
    city_name: "Jashore",
  },
  {
    city_id: 27,
    city_name: "Jhalokathi",
  },
  {
    city_id: 49,
    city_name: "Jhenidah",
  },
  {
    city_id: 48,
    city_name: "Joypurhat",
  },
  {
    city_id: 63,
    city_name: "Khagrachari",
  },
  {
    city_id: 20,
    city_name: "Khulna",
  },
  {
    city_id: 42,
    city_name: "Kishoreganj",
  },
  {
    city_id: 55,
    city_name: "Kurigram ",
  },
  {
    city_id: 28,
    city_name: "Kushtia",
  },
  {
    city_id: 40,
    city_name: "Lakshmipur",
  },
  {
    city_id: 57,
    city_name: "Lalmonirhat ",
  },
  {
    city_id: 43,
    city_name: "Madaripur",
  },
  {
    city_id: 60,
    city_name: "Magura ",
  },
  {
    city_id: 16,
    city_name: "Manikganj",
  },
  {
    city_id: 50,
    city_name: "Meherpur",
  },
  {
    city_id: 12,
    city_name: "Moulvibazar",
  },
  {
    city_id: 23,
    city_name: "Munsiganj",
  },
  {
    city_id: 26,
    city_name: "Mymensingh",
  },
  {
    city_id: 46,
    city_name: "Naogaon",
  },
  {
    city_id: 54,
    city_name: "Narail ",
  },
  {
    city_id: 21,
    city_name: "Narayanganj",
  },
  {
    city_id: 47,
    city_name: "Narshingdi",
  },
  {
    city_id: 14,
    city_name: "Natore",
  },
  {
    city_id: 44,
    city_name: "Netrakona",
  },
  {
    city_id: 39,
    city_name: "Nilphamari",
  },
  {
    city_id: 7,
    city_name: "Noakhali",
  },
  {
    city_id: 24,
    city_name: "Pabna",
  },
  {
    city_id: 37,
    city_name: "Panchagarh",
  },
  {
    city_id: 29,
    city_name: "Patuakhali",
  },
  {
    city_id: 31,
    city_name: "Pirojpur",
  },
  {
    city_id: 58,
    city_name: "Rajbari ",
  },
  {
    city_id: 4,
    city_name: "Rajshahi",
  },
  {
    city_id: 59,
    city_name: "Rangamati ",
  },
  {
    city_id: 25,
    city_name: "Rangpur",
  },
  {
    city_id: 51,
    city_name: "Satkhira",
  },
  {
    city_id: 64,
    city_name: "Shariatpur ",
  },
  {
    city_id: 33,
    city_name: "Sherpur",
  },
  {
    city_id: 10,
    city_name: "Sirajganj",
  },
  {
    city_id: 45,
    city_name: "Sunamganj",
  },
  {
    city_id: 3,
    city_name: "Sylhet",
  },
  {
    city_id: 13,
    city_name: "Tangail",
  },
  {
    city_id: 36,
    city_name: "Thakurgaon ",
  },
];