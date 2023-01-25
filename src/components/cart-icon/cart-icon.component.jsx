import { useContext } from 'react'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { CartContext } from '../../context/cart.context'
import './cart-icon.style.scss'

const CartIcon = () => {
  const { setIsCartOpen, cartCount } = useContext(CartContext)

  return (
    <div className='cart-icon-container' onClick={setIsCartOpen} >
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{cartCount}</span>
    </div>
  )
}

export default CartIcon