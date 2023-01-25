import { createContext, useState } from "react";
import PRODUCT from '../shop-data.json'

export const ProductsContext = createContext({
  products: [],
})

export const ProductsProvider = ({ children }) => {
  const [products, setProduct] = useState(PRODUCT)

  return (
    <ProductsContext.Provider value={{ products, setProduct }}>
      {children}
    </ProductsContext.Provider>
  )
}