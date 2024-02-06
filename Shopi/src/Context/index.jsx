import { createContext, useState, useEffect } from 'react'

export const ShoppingCartContext = createContext()

// eslint-disable-next-line react/prop-types
export const ShoppingCartProvider = ({children}) => {
    // Shopping Cart · Increment quantity
    const [count, setCount] = useState(0)

    // Product Detail · Open/Close
    const [ isProductDetailOpen, setIsProductDetailOpen] = useState(false)
    const  openProductDetail = () => setIsProductDetailOpen(true)
    const  closeProductDetail = () => setIsProductDetailOpen(false)

    // Checkout Side Menu · Open/Close
    const [ isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
    const  openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
    const  closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

    // Product Detail · Show product
    const [productToShow, setProducToShow] = useState({})

    // Product Cart · Add products to cart
    const [cartProducts, setCartProducts] = useState([])

    // Shopping Cart · Order
    const [order, setOrder] = useState([])


    // Get Products
    const [items, setItems] = useState(null)

    // Get Products by title
    const [searchByTitle, setSearchByTitle] = useState(null)

    useEffect( () => {
      fetch('https://api.escuelajs.co/api/v1/products')
      .then(response => response.json())
      .then(data => setItems(data))
    }, [])
    return (
        <ShoppingCartContext.Provider value={{
          count,
          setCount,
          openProductDetail,
          closeProductDetail,
          isProductDetailOpen,
          productToShow, 
          setProducToShow,
          cartProducts,
          setCartProducts,
          isCheckoutSideMenuOpen,
          openCheckoutSideMenu,
          closeCheckoutSideMenu,
          order,
          setOrder,
          items,
          setItems,
          searchByTitle,
          setSearchByTitle
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}