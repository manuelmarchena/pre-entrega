import { getAllProducts, fetchProductById, postProduct, deleteProduct } from "../clients/fakestore.client.js"

export const listProducts = () =>{
    return getAllProducts()
}
export const getProductById = (resourceId) => {
    return fetchProductById(resourceId)
}
export const createProduct = (productData) => {
    return postProduct(productData)
}
export const deleteProductById = (resourceId) => {
    return deleteProduct(resourceId)
}