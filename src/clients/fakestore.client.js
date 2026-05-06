
const BASE_URL = "https://fakestoreapi.com/products/";

export const getAllProducts = async() => {
    const response = await fetch(BASE_URL)
    if(!response.ok){
        throw new Error(`getAllProducts | Error HTTP al obtener productos: ${response.status}`);
    }

    const products = await response.json();
    return products
}

export const fetchProductById = async(resourceId) => {
    const response = await fetch(`${BASE_URL}/${resourceId}`)   

    if(!response.ok){
        throw new Error(`getProductsById | Error HTTP al obtener productos: ${response.status}`);
    }

    const product = await response.json();
    return product
}

export const postProduct = async(productData) => {
    const payload ={
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
    }

    const response = await fetch(BASE_URL, payload)
    if(!response.ok){
        throw new Error(`postProduct | Error HTTP al obtener productos: ${response.status}`);
    }
    
    const postResponse = await response.json();
    return postResponse
}
export const deleteProduct = async(resourceId) => {
    const payload ={
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }

    const response = await fetch(`${BASE_URL}/${resourceId}`, payload)
    if(!response.ok){
        throw new Error(`deleteProduct | Error HTTP al obtener productos: ${response.status}`);
    }

    const deleteResponse = await response.json();
    return deleteResponse
}