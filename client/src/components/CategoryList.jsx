import React, { useEffect, useState } from "react";
import SummaryApi from "../common";

const CategoryList = () => {
  const [productCategory, setProductCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchProductCategory = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.categoryProduct.url);
    const dataResponse = await response.json();
    setLoading(false);
    setProductCategory(dataResponse.data);
  };
  useEffect(() => {
    fetchProductCategory();
  }, []);
  return (
    <div className="container  mx-auto p-4">
      <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
        {productCategory.map((product, index) => {
          return (
            <div key={product._id} className="cursor-pointer">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-3 bg-white flex items-center justify-center">
                <img
                  src={product?.productImage[0]}
                  alt="product"
                  className="h-full object-fill"
                />
              </div>
              <p className="text-center text-sm md:text-base capitalize">
                {product?.category}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;
