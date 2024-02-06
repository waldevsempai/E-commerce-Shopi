/* eslint-disable no-unused-vars */
import { useRoutes, BrowserRouter } from 'react-router-dom'
import { ShoppingCartProvider } from '../../Context'
import Home from'../Home'
import MyAccount from'../MyAccount'
import MyOrder from'../MyOrder'
import MyOrders from'../MyOrders'
import NotFound from'../NotFound'
import SignIn from'../SignIn'
import Navbar from '../../Components/Navbar'
import CheckoutSideMenu from '../../Components/CheckoutSideMenu'

import './App.css'
import Layout from '../../Components/Layout'

const AppRoutes = () =>{
  let routes = useRoutes([
    { path: '/', element: <Home />},
    { path: '/my-account', element: <MyAccount />},
    { path: '/my-order', element: <MyOrder />},
    { path: '/my-orders', element: <MyOrders />},
    { path: '/my-orders/last', element: <MyOrders />},
    { path: '/my-orders/id', element: <MyOrders />},
    { path: '/sign-in', element: <SignIn />},
    { path: '/*', element: <NotFound />},
   
  ])
  return routes
} 

const App = () => {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <Navbar/>
        <checkoutSideMenu/>
        <Layout>
          <AppRoutes/>
        </Layout>
    </BrowserRouter>
    </ShoppingCartProvider>
  )
}

export default App
