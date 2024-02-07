/* eslint-disable no-unused-vars */
import { useContext} from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCartContext} from '../../Context'
import { XMarkIcon } from '@heroicons/react/24/solid'
import OrderCard from '../OrderCard'
import { totalPrice } from '../../Utils'
import './styles.css'

const CheckoutSideMenu = () => {
    const context = useContext(ShoppingCartContext)

    const handleDelete = (id) => {
        const filteredProducts = context.carProducts.filter((product) => product.id != id)
        context.setCartProducts(filteredProducts)
    }

    const handleCheckout = () => {
        const orderToAdd = {
            data: '01.02.23',
            products: context.cartProducts,
            totalProducts: context.cartProducts.length,
            totalPrice: totalPrice(context.cartProducts)
        }

        context.setOrder([...context.order, orderToAdd])
        context.setCartProducts([])
        context.setSearchByTitle(null)
    }

    return (
        <aside
         className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} checkout-side-menu flex-col fixed right-0 border border-black rounded-lg bg-white`}>
            <div className='flex justify-between items-center p-6'>
                <h2 className='font-medium text-xl'>My Order</h2>
                <button onClick={() => context.closeCheckoutSideMenu()}>
                  <XMarkIcon className='h-6 w-6 text-black-500 cursor-pointer' />  
                </button>
            </div>
            <div className='px-6 overflow-y-scroll flex-1'>
              {
                context.cartProducts.map((product) => {
                    <OrderCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    imageUrl={product.image}
                    price={product.price}
                    handleDelete={handleDelete}
                    />
                })
              }
            </div>
            <div
                className='px-6 mb-6'>
                <p className='flex justify-between items-center mb-2'>
                   <span className='font-light'>Total:</span>
                   <span className='font-medium text-2xl'>${totalPrice(context.carProducts)}</span>
                </p>
                <link to='/my-orders/last'> 
                       <button className='w-full bg-black py-3 text-white rounded-lg' 
                            onClick={() => handleCheckout()}> Checkout
                       </button>
                </link>
                   
            </div>
            

        </aside>
    )
}

export default CheckoutSideMenu