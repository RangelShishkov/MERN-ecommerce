import SummaryApi from "../common";

const fetchCategoryProducts = async (category) => {
    const response = await fetch(SummaryApi.categoryWiseProduct.url,{
        method: SummaryApi.categoryWiseProduct.method,
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify({
            category: category
        })
    })

    const dataResponse = await response.json();
    return dataResponse
}

export default fetchCategoryProducts