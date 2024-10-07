import React, { useContext } from "react";
import scrollBehavior from "../helpers/scrollBehavior";
import displayCurrency from "../helpers/displayCurrency";
import Context from "../context";
import addToCart from "../helpers/addToCart";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";

const VerticalCard = ({loading,data = []}) => {
  const loadingList = new Array(13).fill(null);
  const {  fetchUserAddToCart } = useContext(Context);


  const addToCartHandler = async(e,id) => {
    await addToCart(e, id)
    fetchUserAddToCart()
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all">
      {loading
        ? loadingList.map((product, index) => {
            return (
              <div
                key={"verticalLoading" + index}
                className="w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[310px] bg-white rounded-sm shadow"
              >
                <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse"></div>
                <div className="p-4 grid gap-2 ">
                  <h2 className="font-semibold text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200"></h2>
                  <p className="text-sm text-slate-400 p-1 py-2 animate-pulse rounded-full bg-slate-200 "></p>
                  <div className="flex gap-3">
                    <p className="text-cyan-500 font-medium p-1 py-2 animate-pulse rounded-full bg-slate-200 w-full"></p>
                    <p className=" text-slate-500 line-through p-1 py-2 animate-pulse rounded-full bg-slate-200 w-full"></p>
                  </div>

                  <button className="text-sm text-white px-3 py-2 flex gap-1 rounded-full animate-pulse bg-slate-200"></button>
                </div>
              </div>
            );
          })
        : data.map((product, index) => {
            return (
              <Link
                to={"/product/" + product?._id}
                key={product._id}
                className="w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-white rounded-sm shadow"
                onClick={scrollBehavior}
              >
                <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                  <img
                    src={product?.productImage[0]}
                    className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                  />
                </div>
                <div className="p-4 grid gap-2 ">
                  <h2 className="font-semibold text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                    {product?.brandName + " "}
                    {product?.productName}
                  </h2>
                  <p className="text-sm text-slate-400">{product?.category}</p>
                  <div className="flex gap-3">
                    <p className="text-cyan-500 font-medium">
                      {displayCurrency(product.sellingPrice)}
                    </p>

                    <p className=" text-slate-500 line-through">
                      {displayCurrency(product.price)}
                    </p>
                  </div>

                  <button
                    className="bg-cyan-500 hover:bg-cyan-600 text-sm text-white rounded-full px-3 py-1 flex gap-1 items-center justify-center"
                    onClick={(e) => addToCartHandler(e, product?._id)}
                  >
                    <BsCartPlus
                     /> Add to Cart
                  </button>
                </div>
              </Link>
            );
          })}
    </div>
  );
};
export default VerticalCard;
