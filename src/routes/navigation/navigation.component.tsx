import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectIsCartOpen } from '../../store/cart/cart.selector'
import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"
import { ReactComponent as CrwLogo } from '../../assets/crown.svg'
import { selectCurrentUser } from '../../store/user/user.selector'

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles'
import { signOutStart } from '../../store/user/user.acton'
import { useDispatch } from "react-redux"

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser)
  const isCartOpen = useSelector(selectIsCartOpen)
  const dispatch = useDispatch()
  const signOutUser = () => dispatch(signOutStart())

  return (
    <>
      <NavigationContainer>
        <LogoContainer to='/' >
          <CrwLogo className='logo' />
        </LogoContainer>
        <NavLinks >
          <NavLink to='/shop' >
            SHOP
          </NavLink>
          {currentUser ? (
            <NavLink as='span' onClick={signOutUser} >SIGN OUT</NavLink>
          ) : (<NavLink to='/auth' >
            SIGN IN
          </NavLink>)
          }
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  )
}

export default Navigation