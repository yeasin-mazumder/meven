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