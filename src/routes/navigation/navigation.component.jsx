import { useContext } from "react"
import { Outlet } from "react-router-dom"

import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"
import { ReactComponent as CrwLogo } from '../../assets/crown.svg'
import { UserContext } from "../../context/user.context"
import { CartContext } from "../../context/cart.context"

import { signOutUser } from '../../../src/utils/firebase/firebase.utils'
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles.jsx'

const Navigation = () => {
  const { currentUser } = useContext(UserContext)
  const { isCartOpen } = useContext(CartContext)

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
            <span className="nav-link" onClick={signOutUser} >SIGN OUT</span>
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