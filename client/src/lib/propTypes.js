import PropTypes from 'prop-types'

export const product = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
})

export const domainData = PropTypes.shape({
  addProduct: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  products: PropTypes.arrayOf(product).isRequired
}).isRequired
