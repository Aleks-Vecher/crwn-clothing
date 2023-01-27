import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils'
// import SHOP_DATA from '../shop-data.js'

export const CategoriesContext = createContext({
  categoriesMap: {},
})

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setcategoriesMap] = useState({})

  // useEffect(() => {
  //   addCollectionAndDocuments('categories', SHOP_DATA)
  // },[]) this effect just for creating a new data category inside firebase db

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments()
      setcategoriesMap(categoryMap)
    }
    getCategoriesMap()
  },[])

  return (
    <CategoriesContext.Provider value={{ categoriesMap }}>
      {children}
    </CategoriesContext.Provider>
  )
}