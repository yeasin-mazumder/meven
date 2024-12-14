import React from "react";

const MapConatacts = () => {
  return (
    <div className="">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29207.29930694762!2d90.35781652800708!3d23.78613308331609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c718d96f5cf7%3A0x147c4a2b8bb92ea2!2sCantonment%20Bazar%20Road%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1728189538726!5m2!1sen!2sbd"
        className="w-full h-[180px] sm:h-[300px] lg:h-[500px]"
        title="Nexlin address"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MapConatacts;
