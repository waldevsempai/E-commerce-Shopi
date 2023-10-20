import { createContext, useState } from 'react'

export const ShoppingCartContext = createContext()

// eslint-disable-next-line react/prop-types
export const ShoppingCartProvider = ({children}) => {
    const [count, setCount] = useState(0)
    const [ isProductDetailOpen, setIsProductDetailOpen] = useState(false)
    const  openProductDetail = () => setIsProductDetailOpen(true)
    const  closeProductDetail = () => setIsProductDetailOpen(false)

    return (
        <ShoppingCartContext.Provider value={{
          count,
          setCount,
          openProductDetail,
          closeProductDetail,
          isProductDetailOpen
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}