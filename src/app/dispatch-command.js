// import { validateInput } from "../cli/validate-command"


export const dispatch = (validatedInput) => {
    
    const { method, resourceId, bodyArguments } = validatedInput
    
    if(method === "GET"){
        if(resourceId == undefined){
            return {
                action: "listProducts",
                payload: {}
            }
        }
    return {
        action: "getProductById",
        payload: { resourceId }
    }
    }
    
    if (method === "POST") {
        const [ title, price, category ] = bodyArguments
        return {
            action: "createProduct",
            payload: { title, price, category }
        }
    }

    if (method === "DELETE") {
        return {
            action: "deleteProductById",
            payload: { resourceId }
        }
    }
}

/*
BBVA
Polo203$
1921
RiverID
Polo0620!
*/