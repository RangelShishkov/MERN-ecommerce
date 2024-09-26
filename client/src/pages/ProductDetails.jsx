import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../common";

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
  const [activeImage,setActiveImage] = useState("")

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
    setActiveImage(dataResponse?.data.productImage[0])
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const onImageHoverHandle = (imageURL) => {
    setActiveImage(imageURL)
  }
  return (
    <div className="container mx-auto p-4">
      <div className=" min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* product image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200">
            <img src={activeImage} alt={data.productName} className="h-full w-full object-scale-down mix-blend-multiply" />
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
                        onMouseEnter={()=>onImageHoverHandle(imgURL)}
                        onClick={()=>onImageHoverHandle(imgURL)}
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
        <div>Product Details</div>
      </div>
    </div>
  );
};
export default ProductDetails;
