import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../common";
import { FaStar, FaStarHalf } from "react-icons/fa";
import displayCurrency from "../helpers/displayCurrency";
import VerticalCardProduct from "../components/VerticalCardProduct";
import ProductDisplay from "../components/ProductDisplay";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [imageZoomCords, setImageZoomCords] = useState({
    x: 0,
    y: 0,
  });

  const [zoomImage, setZoomImage] = useState(false);

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setLoading(false);

    const dataResponse = await response.json();

    setData(dataResponse?.data);
    setActiveImage(dataResponse?.data.productImage[0]);
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const onImageHoverHandle = (imageURL) => {
    setActiveImage(imageURL);
  };

  const imageZoomHandler = (e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();

    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setImageZoomCords({ x, y });
  };

  const imageZoomOutHandler = () => {
    setZoomImage(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className=" min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* product image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2">
            <img
              src={activeImage}
              alt={data.productName}
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={imageZoomHandler}
              onMouseLeave={imageZoomOutHandler}
            />
            {/* image zoom on hover */}
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[500px] min-h-[400px] overflow-hidden bg-slate-200 p-1 -right-[510px] top-0">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150"
                  style={{
                    background: `url(${activeImage})`,
                    backgroundPosition: `${imageZoomCords.x * 100}% ${
                      imageZoomCords.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>
          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 h-full lg:flex-col overflow-scroll scrollbar-none">
                {productImageListLoading.map((el, index) => {
                  return (
                    <div
                      key={"loadingImage" + index}
                      className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 h-full lg:flex-col overflow-scroll scrollbar-none">
                {data.productImage.map((imgURL, index) => {
                  return (
                    <div
                      key={imgURL}
                      className="h-20 w-20 bg-slate-200 rounded p-1"
                    >
                      <img
                        src={imgURL}
                        onMouseEnter={() => onImageHoverHandle(imgURL)}
                        onClick={() => onImageHoverHandle(imgURL)}
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* product details */}
        {loading ? (
          <div className="grid gap-1 w-full">
            <p className="bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full "></p>
            <h2 className="text-2xl lg:text-3xl font-medium h-6 lg:h-8 bg-slate-200 animate-pulse rounded-full w-full"></h2>
            <p className="bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8 w-full"></p>
            <div className="bg-slate-200 h-6 lg:h-8 animate-pulse flex items-center gap-1 w-full">
              {" "}
            </div>
            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8 animate-pulse w-full">
              <p className="text-cyan-600 bg-slate-200 w-full"></p>
              <p className="text-slate-400 line-through bg-slate-200 w-full"></p>
            </div>
            <div className="flex items-center gap-3 my-2 w-full">
              <button className="h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full "></button>
              <button className="h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full"></button>
            </div>
            <div className="w-full">
              <p className="text-slate-600 font-medium my-1 h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full"></p>
              <p className="h-10 lg:h-12 bg-slate-200 rounded animate-pulse w-full"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <p className="bg-cyan-200 text-cyan-600 px-2 rounded-full w-fit">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-3xl font-medium">
              {data?.productName}
            </h2>
            <p className="text-slate-400">{data.category}</p>

            <div className="text-yellow-500 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
              <p className="text-cyan-600">
                {displayCurrency(data?.sellingPrice)}
              </p>
              <p className="text-slate-400 line-through">
                {displayCurrency(data?.price)}
              </p>
            </div>
            <div className="flex items-center gap-3 my-2">
              <button className="border-2 border-cyan-600 rounded px-3 py-1 min-w-[100px] text-cyan-600 font-medium hover:bg-cyan-600 hover:text-white">
                Buy
              </button>
              <button className="border-2 border-cyan-600 rounded px-3 py-1 min-w-[100px] text-white font-medium  bg-cyan-600 hover:bg-white hover:text-cyan-600">
                Add to Cart
              </button>
            </div>
            <div>
              <p className="text-slate-600 font-medium my-1">Description :</p>
              <p>{data?.description}</p>
            </div>
          </div>
        )}
      </div>

      {data.category && (
        <ProductDisplay
          category={data?.category}
          heading={"Similar products"}
        />
      )}
    </div>
  );
};
export default ProductDetails;
