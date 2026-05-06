import { listProducts, getProductById, createProduct, deleteProductById } from "../services/products.service.js"

export const executeCommand = ({ action, payload }) => {

    const { resourceId } = payload

    if (action === "listProducts"){
        return listProducts()
    }
    if (action === "getProductById"){

        return getProductById(resourceId)
    }
    if (action === "createProduct"){

        const { title, price, category } = payload
        return createProduct({ title, price, category })
    }
    if (action === "deleteProductById"){

        return deleteProductById(resourceId)
    }
}