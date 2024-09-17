import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";

const AdminProductCard = ({ data, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);
  return (
    <div className="bg-white p-4 rounded">
      <div className="w-36">
        <img
          className="w-fit mx-auto"
          src={data?.productImage[0]}
          alt="product"
          width={120}
          height={120}
        />

        <h1>{data.productName}</h1>
        <div
          className="w-fit ml-auto p-2 hover:bg-cyan-500 rounded-full hover:text-white cursor-pointer"
          onClick={() => setEditProduct(true)}
        >
          <MdEdit />
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
