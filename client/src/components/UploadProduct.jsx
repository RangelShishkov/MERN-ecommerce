import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { MdUploadFile } from "react-icons/md";
import productCategory from "../helpers/productCategory";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";

const UploadProduct = ({ onClose }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    selling: "",
  });
  const [uploadProductImageInput, setUploadProductImageInput] = useState("");
  const onChangeHandler = (e) => {};

  const uploadProductImageHandler = async (e) => {
    const file = e.target.files[0];
    setUploadProductImageInput(file.name);
    const uploadImageCloudinary = await uploadImage(file);
    setData((preve) => {
      return {
        ...preve,
        productImage: [...preve.productImage, uploadImageCloudinary.url],
      };
    });
    console.log(uploadImageCloudinary.url);
  };
  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-2">
          <h2 className="font-bold text-lg"> Upload Product</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-cyan-500 cursor-pointer"
            onClick={onClose}
          >
            <MdClose />
          </div>
        </div>

        <form action="" className="grid p-4 gap-2 overflow-y-auto h-full pb-5">
          <label htmlFor="productName">Product Name: </label>
          <input
            type="text"
            id="productName"
            name="productName"
            placeholder="Enter product name"
            value={data.productName}
            onChange={onChangeHandler}
            className="p-2 bg-slate-100 border rounded"
          />
          <label htmlFor="brandName">Product Brand: </label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            placeholder="Enter product's brand"
            value={data.brandName}
            onChange={onChangeHandler}
            className="p-2 bg-slate-100 border rounded"
          />
          <label htmlFor="category">Category: </label>
          <select
            value={data.category}
            className="p-2 bg-slate-100 border rounded"
          >
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
                  className="hidden"
                  onChange={uploadProductImageHandler}
                />
              </div>
            </div>
          </label>
          <div>
            {data?.productImage[0] ? (
          <div className="flex items-center gap-2">
            {
                    data.productImage.map((el) => {
                        return (
                          <img
                            src={el}
                            alt="el"
                            width={80}
                            height={80}
                            className="bg-slate-100 border "
                          />
                        );
                      })
            }
          </div>
            ) : (
              <p className="text-cyan-500 text-xs">Upload product image</p>
            )}
          </div>
          <button className="px-3 py-2 bg-cyan-500 text-white mb-5 hover:bg-cyan-700">
            Upload product
          </button>
        </form>

      </div>
      {/** display image full screen */}
      <DisplayImage onClose={} imgUrl={}/>
    </div>
  );
};
export default UploadProduct;
