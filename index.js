function parseResource(resource) {
  const parts = resource.split("/");
  const resourceName = parts[0];
  const resourceId = parts[1];

  return {
    parts,
    resourceName,
    resourceId,
  };
}

function validateInput(method, resource, parts, resourceName, resourceId) {
  if (!method || !resource) {
    console.error("Error: faltan argumentos.");
    console.log("Uso esperado: npm start -- <METHOD> <RESOURCE>");
    process.exit(1);
  }

  if (parts.length > 2) {
    console.error("Error: el recurso tiene un formato inválido.");
    console.log("Formato válido: products o products/<id>");
    process.exit(1);
  }

  if (!resourceName) {
    console.error("Error: falta el nombre del recurso.");
    process.exit(1);
  }

  if (parts.length === 2 && !resourceId) {
    console.error("Error: falta el id del recurso.");
    process.exit(1);
  }
}

function detectAction(method, resourceName, resourceId) {
  if (method === "GET" && resourceName === "products" && !resourceId) {
    return "listProducts";
  }

  if (method === "GET" && resourceName === "products" && resourceId) {
    return "getProductById";
  }

  if (method === "POST" && resourceName === "products" && !resourceId) {
    return "createProduct";
  }

  if (method === "DELETE" && resourceName === "products" && resourceId) {
    return "deleteProductById";
  }

  console.error("Error: combinación de método y recurso no soportada.");
  process.exit(1);
}

async function listProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const products = await response.json();

    console.log("Productos obtenidos:");
    console.log(products);
  } catch (error) {
    console.error("Error al obtener productos:", error.message);
    process.exit(1);
  }
}

async function getProductById(id) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const product = await response.json();

    console.log("Producto obtenido:");
    console.log(product);
  } catch (error) {
    console.error("Error al obtener producto por id:", error.message);
    process.exit(1);
  }
}

function createProduct() {
  console.log("Ejecutando: crear producto");
}

function deleteProductById(id) {
  console.log(`Ejecutando: eliminar producto con id ${id}`);
}

async function main() {
  const args = process.argv.slice(2);

  const method = args[0];
  const resource = args[1];

  const { parts, resourceName, resourceId } = parseResource(resource ?? "");

  validateInput(method, resource, parts, resourceName, resourceId);

  const action = detectAction(method, resourceName, resourceId);

  if (action === "listProducts") {
    await listProducts();
  } else if (action === "getProductById") {
    await getProductById(resourceId);
  } else if (action === "createProduct") {
    createProduct();
  } else if (action === "deleteProductById") {
    deleteProductById(resourceId);
  }
}

main();