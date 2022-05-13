import { createContext, useEffect, useState } from 'react'

import PRODUCTS from '../data/products.json'
import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils'

export const ProductsContext = createContext({
  products: []
})

export const ProductsProvider = ({ children }) => {
  const [products] = useState([])

  useEffect(() => {
    addCollectionAndDocuments('categories', PRODUCTS)
  }, [])

  const value = { products }
  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}
