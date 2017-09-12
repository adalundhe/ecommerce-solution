export const getAllProducts = (callback) => {
  const options = {
    method: 'GET'
  }

  fetch('/api/products', options)
    .then(response => response.json())
    .then(json => callback(json.data))
}

export const addProduct = (newProduct, callback) => {
  const headers = new Headers({
    'Content-Type': 'application/json'
  })

  const options = {
    headers: headers,
    method: 'POST',
    body: JSON.stringify(newProduct)
  }

  fetch('/api/products', options)
    .then(response => response.json())
    .then(json => callback(json.data))
}

export const deleteProduct = (productId, callback) => {
  const options = {
    method: 'DELETE'
  }

  fetch(`/api/products/${productId}`, options)
    .then(response => response.json())
    .then(json => callback(json.data))
}

export const updateProduct = (product, callback) => {
  const headers = new Headers({
    'Content-Type': 'application/json'
  })

  const options = {
    headers: headers,
    method: 'PUT',
    body: JSON.stringify(product)
  }

  fetch(`/api/products/${product._id}`, options)
    .then(response => response.json())
    .then(json => {
      console.log(json)
      return json
    })
    .then(json => callback(json.data))
}

export const signupUser = (user) => {
  const headers = new Headers({
    'Content-Type': 'application/json'
  })

  const options = {
    headers: headers,
    method: 'POST',
    body: JSON.stringify(user)
  }

  return fetch('/api/signup', options)
    .then(response => response.json())
    .catch(err => console.log(err))
}

export const loginUser = (email, password) => {

}
