/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { MdUploadFile } from "react-icons/md";
import productCategory from "../helpers/productCategory";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const AdminEditProduct = ({ onClose, productData, fetchData }) => {
  const [data, setData] = useState({
    ...productData,
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage || [],
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice,
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const uploadProductImageHandler = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);
    setData((preve) => {
      return {
        ...preve,
        productImage: [...preve.productImage, uploadImageCloudinary.url],
      };
    });
  };
  const deleteProductImageHandler = async (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((preve) => {
      return {
        ...preve,
        productImage: [...newProductImage],
      };
    });
  };

  {
    /**upload product */
  }
  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.updateProduct.url, {
      method: SummaryApi.updateProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchData();
    }
    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };
  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-2">
          <h2 className="font-bold text-lg">Edit Product</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-cyan-500 cursor-pointer"
            onClick={onClose}
          >
            <MdClose />
          </div>
        </div>

        <form
          action=""
          onSubmit={submitHandler}
          className="grid p-4 gap-2 overflow-y-auto h-full pb-5"
        >
          <label htmlFor="brandName">Product Brand: </label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            placeholder="Enter product's brand"
            value={data.brandName}
            onChange={onChangeHandler}
            className="p-2 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="productName">Product Name: </label>
          <input
            type="text"
            id="productName"
            name="productName"
            placeholder="Enter product name"
            value={data.productName}
            onChange={onChangeHandler}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="category">Category: </label>
          <select
            value={data.category}
            name="category"
            className="p-2 bg-slate-100 border rounded"
            onChange={onChangeHandler}
            required
          >
            <option value={""}>Select product category</option>
            {productCategory.map((el, index) => {
              return (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              );
            })}
          </select>
          <label htmlFor="productImage">Product image: </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center">
              <div className="flex justify-center items-center flex-col gap-1">
                <span className="text-3xl">
                  <MdUploadFile />
                </span>
                <p className="text-sm">Upload product image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  name="uploadImageInput"
                  className="hidden"
                  onChange={uploadProductImageHandler}
                />
              </div>
            </div>
          </label>
          <div>
            {data?.productImage[0] ? (
              <div className="flex items-center gap-2">
                {data.productImage.map((el, index) => {
                  return (
                    <div className="relative group">
                      <img
                        src={el}
                        alt={el}
                        width={80}
                        height={80}
                        className="bg-slate-100 border cursor-pointer"
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(el);
                        }}
                      />
                      <div
                        className="absolute bottom-0 right-0 p-1 text-white bg-cyan-600 rounded-full hidden group-hover:block cursor-pointer"
                        onClick={() => deleteProductImageHandler(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-cyan-500 text-xs">* Please upload an image</p>
            )}
          </div>
          <label htmlFor="price">Price: </label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Enter product's price"
            value={data.price}
            onChange={onChangeHandler}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="sellingPrice">Selling Price: </label>
          <input
            type="number"
            id="sellingPrice"
            name="sellingPrice"
            placeholder="Enter product's selling price"
            value={data.sellingPrice}
            onChange={onChangeHandler}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="description">Description: </label>
          <textarea
            className="h-28 bg-slate-100 border resize-none p-1"
            placeholder="Enter product description"
            rows={3}
            value={data.description}
            name="description"
            onChange={onChangeHandler}
          ></textarea>

          <button className="px-3 py-2 bg-cyan-500 text-white mb-5 hover:bg-cyan-700">
            Edit Product
          </button>
        </form>
      </div>

      {/** display image full screen */}
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};
export default AdminEditProduct;
