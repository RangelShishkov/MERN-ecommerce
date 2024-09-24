import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SummaryApi from "../common";

const CategoryList = () => {
  const [productCategory, setProductCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(13).fill(null);
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
        {loading
          ? categoryLoading.map((el, index) => {
              return (
                <div
                  className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
                  key={"loading" + index}
                ></div>
              );
            })
          : productCategory.map((product, index) => {
              return (
                <Link
                  to={"/product-category/" + product?.category}
                  key={product?.category}
                  className="cursor-pointer"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center">
                    <img
                      src={product?.productImage[0]}
                      alt="product"
                      className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                    />
                  </div>
                  <p className="text-center text-sm md:text-base capitalize">
                    {product?.category}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;
