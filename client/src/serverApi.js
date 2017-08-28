export const getAllProducts = callback => {
  fetch('/api/products', {method: 'GET'})
    .then(response => response.json())
    .then(json => callback(json.data))
}
