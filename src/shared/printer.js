
export const outcomePrinter = ( action, result ) => {
    if ( action === "listProducts" ) {
        return formater(titleAction, result)
    }
    if ( action === "getProductById" ) {
        const { id, title, price, description, category, image } = result
        return console.log(`
            Busqueda de items
            Producto: ${id}
            Título: ${title}
            Precio: ${price}
            descripcion: ${description}
            categoria: ${category}
            imagen URL: ${image}
            `)
    }
    if ( action === "createProduct" ) {
        const { id, title, price, category, image} = result
        return console.log(`
            Creación de productos
            Producto: ${id}
            Título: ${title}
            Precio: ${price}
            descripcion: ${description}
            categoria: ${category}
            imagen URL: ${image}
            `)
    }
    if ( action === "deleteProductById" ) {
        const { id, title, price, category, image} = result
        return console.log(`
            Creación de productos
            Producto: ${id}
            Título: ${title}
            Precio: ${price}
            descripcion: ${description}
            categoria: ${category}
            imagen URL: ${image}
            `)
        }
}

const formater = ( titleAction, result ) => {
    
    for ( const product of result ) {
        console.log("Listado de productos")
        productBody(product)
    }
    
}

const productBody = (body) =>{
    const { id, title, price, description, category, image } = body
    return console.log(`
            Producto: ${id}
            Título: ${title}
            Precio: ${price}
            descripcion: ${description}
            categoria: ${category}
            imagen URL: ${image}
            `) 
}