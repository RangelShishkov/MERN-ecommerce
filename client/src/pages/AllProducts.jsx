import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProducts,setAllProducts] = useState([]);

  const fetchAllProduct = async() => {
    const response = await fetch(SummaryApi.allProducts.url)
    const dataResponse = await response.json()
    
    setAllProducts(dataResponse?.data || [])
  }

  useEffect(()=>{
    fetchAllProduct()
  },[])

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          className="border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white transition-all py-1 px-3 rounded-full"
          onClick={() => setOpenUploadProduct(true)}
        >
          Add new product
        </button>
      </div>
      {/* all product */}
      <div className="flex items-center gap-5 py-4">
        {
          allProducts.map((product,index) => {
            return(
              <AdminProductCard  data={product} key={index} fetchData={fetchAllProduct}/>
            )
          })
        }
      </div>

      {/**upload product component */}
      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} />
      )}
    </div>
  );
};

export default AllProducts;
