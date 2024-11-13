import React, { useEffect, useState } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import imageIphone from "../assets/banner/iphone-slider.webp";
import imagePlaystation from "../assets/banner/playstation-slider.jpg";
import imageCoffe from "../assets/banner/slider-coffe.jpg";
import imageIron from "../assets/banner/slider-iutiq.png";
import imageAirCon from "../assets/banner/slider-klimatik.jpg";
import imagePhone from "../assets/banner/slider-phone.png";
import imageTv from "../assets/banner/slider-tv.jpg";
import imagePlaystationPro from "../assets/banner/ps5-pro_banner.jpg"

const SlidingBanner = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const deskImages = [
    imageIphone,
    imagePlaystation,
    imagePlaystationPro,
    imageCoffe,
    imageIron,
    imageAirCon,
    imagePhone,
    imageTv,
  ];

  const nextImage = () => {
    if (deskImages.length - 1 > currentImage) {
      setCurrentImage((prev) => prev + 1);
    }
  };

  const previousImage = () => {
    if (currentImage !== 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (deskImages.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImage, deskImages.length]);

  const handleDotClick = (index) => {
    setCurrentImage(index);
  };

  return (
    <div className="container mx-auto px-4 rounded">
      <div className="h-60 md:h-96 w-full bg-slate-200 relative">
        {/* Arrow buttons for navigation */}
        <div className="absolute z-10 h-full w-full md:flex items-center hidden">
          <div className="flex justify-between w-full text-3xl">
            <button
              onClick={previousImage}
              className="bg-white shadow-md rounded-full p-1"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className="bg-white shadow-md rounded-full p-1"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* Image Slideshow */}
        <div className="flex w-full h-full overflow-hidden">
          {deskImages.map((imageUrl, index) => (
            <div
              key={imageUrl}
              className="w-full h-full min-w-full min-h-full transition-all duration-500"
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <img src={imageUrl} alt={`banner-${index}`} className="w-full h-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Dot Navigation */}
      <div className="flex justify-center gap-2 mt-2">
        {deskImages.map((_, index) => (
          <div
            key={index}
            onClick={() => handleDotClick(index)}  // Change image when dot is clicked
            className={`w-3 h-3 rounded-full cursor-pointer ${
              currentImage === index ? "bg-cyan-500" : "bg-gray-400"
            }`}  // Style the active dot differently
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SlidingBanner;
