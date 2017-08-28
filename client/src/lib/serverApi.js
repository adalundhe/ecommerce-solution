const getAllProducts = (callback) => {
  const options = {
    method: 'GET'
  }

  fetch('/api/products', options)
    .then(response => response.json())
    .then(json => callback(json.data))
}

const addProduct = (product, callback) => {
  const headers = new Headers({
    'Content-Type': 'application/json'
  })

  const options = {
    headers,
    method: 'POST',
    body: JSON.stringify(product)
  }

  fetch('/api/products', options)
    .then(response => response.json())
    .then(json => callback(json.data))
}

const deleteProduct = (productId, callback) => {
  const options = {
    method: 'DELETE'
  }

  fetch(`/api/products/${productId}`, options)
    .then(response => response.json())
    .then(json => callback(json.data))
}

export {getAllProducts, addProduct, deleteProduct}
