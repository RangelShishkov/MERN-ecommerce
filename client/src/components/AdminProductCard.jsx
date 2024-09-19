import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayCurrency from "../helpers/displayCurrency";

const AdminProductCard = ({ data, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);
  return (
    <div className="bg-white p-4 rounded">
      <div className="w-36">
        <div className="w-32 h-32 flex justify-center items-center">
          <img
            className="mx-auto object-fill h-full"
            src={data?.productImage[0]}
            alt="product"
            width={120}
            height={120}
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2">
          {data.brandName} {data.productName}
        </h1>
        <div>
          <div>
            <p className="font-semibold">
              {displayCurrency(data.sellingPrice)}
            </p>
          </div>

          <div
            className="w-fit ml-auto p-2 hover:bg-cyan-500 rounded-full hover:text-white cursor-pointer"
            onClick={() => setEditProduct(true)}
          >
            <MdEdit />
          </div>
        </div>
      </div>
      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
