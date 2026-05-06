// import { inputParser } from "./parse-command"
/**
 * ! Normalizar metodo y precio, mover a capa intermedia entre paser y validator
 */
const methodNormalized = ( method ) =>{
    return method.trim().toUpperCase()
}

/**
 * ? Validadores genéricos
 */

const validateString = ( inputString ) => {

    if (typeof inputString !== "string" || inputString.trim() === "") {
        throw new Error("validateString | Hay un error en la consulta enviada.");
    }

}

const validateId = (number) => {

    const id = Number(number);

    if (isNaN(id)) {
        throw new Error("El id debe ser numérico");
    }

    if (!Number.isInteger(id) || id <= 0) {
        throw new Error("El id debe ser un entero positivo");
    }
}

const validatePrice = ( priceStr ) => {
    const price = Number.parseFloat(priceStr)
     if (isNaN(price)) {
        throw new Error("El precio debe ser numérico");
    }
    if (price <= 0) {
        throw new Error("El precio debe ser positivo");
    }
}


const validateMethod = ( method ) => {

    const httpMethods = ["POST", "GET", "DELETE"]

    validateString(method)
    if(!(httpMethods.includes(method))){
        throw new Error("ValidateMethod | Método no soportado, intente POST, GET o DELETE.");        
    }
}

/**
 * ? Validaciones de resource
 */
const validateResourceName = ( resourceName ) => {

    if ( resourceName !== "products" ){
        throw new Error ("ValidateResourceName | El recurso recibido es diferente de 'products'")
    }
}
const validateResourceId = ( resourceId ) => {

    validateString(resourceId)
    validateId(resourceId)
    
}

const validateResource = ( resource ) => {

    const parts = resource.split("/")
    if(parts.length > 2 ){
        throw new Error("ValidateResource | La consulta tiene mas argumentos de los esperado E.G.: 'products/7'")
    }
    validateResourceName(parts[0])
    if(parts.length == 2 && parts[1] != "") {
        validateResourceId(parts[1])
    }
}

/**
 * ? Valida estructura de la entrada
 */

const validateGet = ({ resourceId, bodyArguments }) => {
    if(
        resourceId == undefined &&
        bodyArguments.length == 0
    ){
        return
    }
    if(
        resourceId != undefined &&
        bodyArguments.length == 0
    ){
        validateResourceId(resourceId)
        return 
    }
    throw new Error("validateGet | Hay un error en la consulta enviada.");
}

const validatePost = ({ resourceId, bodyArguments }) => {
    if(
        resourceId == undefined &&
        bodyArguments.length === 3
    ){
        const [ title, price, category ] = bodyArguments
        
        validateString( title )
        validatePrice( price )
        validateString( category )
        return
    }
    throw new Error("validatePost | Hay un error en la consulta enviada.");
}

const validateDelete = ({ resourceId, bodyArguments }) => {
    if( resourceId != undefined &&
        bodyArguments.length === 0
     ){
        validateResourceId(resourceId)
        return
     }
     throw new Error("validateDelete | Hay un error en la consulta enviada.");
}

const validateCommandByType = ({ methodNormal, resourceId, bodyArguments }) => {

    if ( methodNormal  === "GET" ){
        validateGet({resourceId, bodyArguments})
    }
    else if ( methodNormal  === "POST" ){
        validatePost({resourceId, bodyArguments})
    }
    else if ( methodNormal  === "DELETE" ){
        validateDelete({resourceId, bodyArguments})
    }
}


export const validateInput = ( inputParsed ) => {

    const { method, resource, resourceId, bodyArguments } = inputParsed
    const methodNormal = methodNormalized(method)
    validateMethod(methodNormal)
    validateResource(resource)
    validateCommandByType({ methodNormal, resourceId, bodyArguments })
    return {
        ... inputParsed,
        method: methodNormal
    }
}
