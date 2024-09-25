import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import imageIphone from "../assets/banner/iphone-slider.webp";
import imagePlaystation from "../assets/banner/playstation-slider.jpg";
import imageCoffe from "../assets/banner/slider-coffe.jpg";
import imageIron from "../assets/banner/slider-iutiq.png";
import imageAirCon from "../assets/banner/slider-klimatik.jpg";
import imagePhone from "../assets/banner/slider-phone.png";
import imageTv from "../assets/banner/slider-tv.jpg";

const SlidingBanner = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const deskImages = [
    imageIphone,
    imagePlaystation,
    imageCoffe,
    imageIron,
    imageAirCon,
    imagePhone,
    imageTv,
  ];

  const nextImage = () => {
    if (deskImages.length - 1 > currentImage) {
      setCurrentImage((preve) => preve + 1);
    }
  };

  const previousImage = () => {
    if (currentImage != 0) {
      setCurrentImage((preve) => preve - 1);
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
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentImage,deskImages.length]);

  return (
    <div className="container mx-auto px-4 rounded">
      <div className="h-60 md:h-80 w-full bg-slate-200 relative">
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
        <div className="flex w-full h-full overflow-hidden">
          {deskImages.map((imageUrl, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all duration-500"
                key={imageUrl}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageUrl} className="w-full h-full" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default SlidingBanner;
