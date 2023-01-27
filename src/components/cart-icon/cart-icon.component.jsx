import { useContext } from 'react'
import { CartContext } from '../../context/cart.context'
import { ItemCount, CartIconContainer, ShoppingIcon } from './cart-icon.style.jsx'

const CartIcon = () => {
  const { setIsCartOpen, cartCount } = useContext(CartContext)

  return (
    <CartIconContainer onClick={setIsCartOpen} >
      <ShoppingIcon className='shopping-icon' />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon