import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import { useContext } from 'react'
import { CartContext } from '../../context/cart.context'
import { useNavigate } from 'react-router-dom'
import { CartItems, CartDropdownContiner, EmptyMessage } from './cart-dropdown.style'

const CartDropdown = () => {

  const { cartItems } = useContext(CartContext)
  const navigate = useNavigate()

  const goToCheckouHandler = () => {
    navigate('/checkout')
  }

  return (
    <CartDropdownContiner>
      <CartItems>
        {
          cartItems.length
            ? (cartItems.map(item => <CartItem key={item.id} cartItem={item} />))
            : (<EmptyMessage>Your cart is empty</EmptyMessage>)
        }
      </CartItems>
      <Button onClick={goToCheckouHandler} >GO TO CHECKOUT</Button>
    </CartDropdownContiner>
  )
}

export default CartDropdown