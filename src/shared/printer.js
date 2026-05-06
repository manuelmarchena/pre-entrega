
export const outcomePrinter = ( action, result ) => {
    if ( action === "listProducts" ) {

        return listCreater( result )
    }
    if ( action === "getProductById" ) {
        console.log("Búsqueda de productos")
        return productBody(result)
    }
    if ( action === "createProduct" ) {
       
        console.log("Creación de productos")
       return productBody(result)
    }
    if ( action === "deleteProductById" ) {

        console.log("Borrado de productos")
        return productBody(result)
    }
    return console.log(`No se pudo procesar el resultado de la acción. \n
        ${result}`)

}

const listCreater = ( result ) => {

    console.log("Listado de productos")
    for ( const product of result ) {
        productBody(product)
    }
    
}

const productBody = (body) => {
    const { id, title, price, description, category, image } = body

    console.log(`Producto: ${id}`)
    console.log(`Título: ${title}`)
    console.log(`Precio: ${price}`)

    if (description) {
      console.log(`Descripción: ${description}`)
    }

    if (category) {
      console.log(`Categoría: ${category}`)
    }

    if (image) {
      console.log(`Imagen URL: ${image}`)
    }
  }