import React from "react";

const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className="flex justify-center p-4">
      <img src={imgUrl} className="w-full h-full" />
    </div>
  );
};
export default DisplayImage;
