const ajaxRequest = (uri, method, body) => {
  const headers = new Headers({
    'Content-Type': 'application/json'
  })

  const options = {
    headers: headers,
    method: method,
    body: JSON.stringify(body),
    credentials: 'include'
  }

  return fetch(`/api/${uri}`, options)
    .then(handleErrors)
    .then(response => response.json())
    .then(json => json.data)
}

const handleErrors = response => {
  if (!response.ok) {
    return response.json()
      .then(({message, data}) => {
        const err = Error(message)
        Object.assign(err, data)
        err.status = response.status
        throw err
      })
  }
  return response
}

export const getAllProducts = () => ajaxRequest('products', 'GET')

export const addProduct = (newProduct) => ajaxRequest('products', 'POST', newProduct)

export const deleteProduct = (productId) => ajaxRequest(`products/${productId}`, 'DELETE')

export const updateProduct = (product) => ajaxRequest(`products/${product.id}`, 'PUT', product)

export const signupUser = (user) => ajaxRequest('signup', 'POST', user)

export const loginUser = (email, password) => ajaxRequest('login', 'POST', {email, password})

export const getUser = () => ajaxRequest('get_user', 'GET')

export const logoutUser = () => ajaxRequest('logout', 'GET')
