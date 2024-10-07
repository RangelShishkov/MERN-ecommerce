import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SummaryApi from "../common";

const SearchProduct = () => {
    const query = useLocation()

    const fetchProduct = async() => {
        const response = await fetch(SummaryApi.searchProduct.url+query.search)
        const dataResponse = await response.json()

        console.log("dataresposne",dataResponse)
    }

    useEffect(()=>{
    fetchProduct()
    },[query])

    return (
        <div>
            Search Product
        </div>
    )
}
export default SearchProduct