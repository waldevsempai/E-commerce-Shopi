/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect } from 'react'

export const ShoppingCartContext = createContext();

// eslint-disable-next-line react/prop-types
export const ShoppingCartProvider = ({children}) => {
    // Shopping Cart · Increment quantity
    const [count, setCount] = useState(0)

    // Product Detail · Open/Close
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
    const  openProductDetail = () => setIsProductDetailOpen(true)
    const  closeProductDetail = () => setIsProductDetailOpen(false)

    // Checkout Side Menu · Open/Close
    const [ isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
    const  openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
    const  closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

    // Product Detail · Show product
    const [productToShow, setProductToShow] = useState({})

    // Product Cart · Add products to cart
    const [cartProducts, setCartProducts] = useState([])

    // Shopping Cart · Order
    const [order, setOrder] = useState([])


    // Get Products
    const [items, setItems] = useState(null)
    const [filteredItems, setFilteredItems] = useState(null)

    // Get Products by title
    const [searchByTitle, setSearchByTitle] = useState(null)

    // Get Products by category
    const [searchByCategory, setSearchByCategory] = useState(null)

    useEffect(() => {
      fetch("https://api.escuelajs.co/api/v1/products")
      .then((response) => response.json())
      .then((data) => setItems(data))
    }, [])

    const filteredItemsByTitle = (items, searchByTitle) => {
      return items?.filter((item) => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }

    const filteredItemsByCategory = (items, searchByCategory) => {
      return items?.filter((item) => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
    }

    const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
      if (searchType === 'BY_TITLE') {
        return filteredItemsByTitle(items, searchByTitle)
      }

      if (searchType === 'BY_CATEGORY') {
        return filteredItemsByCategory(items, searchByCategory)
      }
      if (searchType === 'BY_TITLE_AND_CATEGORY') {
        return filteredItemsByCategory(items, searchByCategory).filter((item) => 
               item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
      }
      if (!searchType) {
        return items
      }
    }

    useEffect(() => {
      let filteredResults = items;
  
      if (searchByTitle || searchByCategory) {
        filteredResults = filterBy(
          searchByTitle && searchByCategory
            ? "BY_TITLE_AND_CATEGORY"
            : searchByTitle
            ? "BY_TITLE"
            : "BY_CATEGORY",
          items,
          searchByTitle,
          searchByCategory
        );
      }
  
      setFilteredItems(filteredResults);
    }, [items, searchByTitle, searchByCategory]);

  
    return (
        <ShoppingCartContext.Provider value={{
          count,
          setCount,
          openProductDetail,
          closeProductDetail,
          isProductDetailOpen,
          productToShow, 
          setProductToShow,
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
          setSearchByTitle,
          filteredItems,
          setFilteredItems,
          searchByCategory,
          setSearchByCategory
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}

//useEffect( () => {
  //if (searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory))
  //if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
  //if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
  //if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
//}, [items, searchByTitle, searchByCategory])