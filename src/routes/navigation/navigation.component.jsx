import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
import { signOutUser } from '../../utils/firebase/firebase.utils'
import { selectCurrentUser } from '../../store/user/user.selector'

import { ReactComponent as Logo } from '../../assets/crown.svg'
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles'
import { selectIsCartOpen } from '../../store/cart/cart.selector'

export default function Navigation() {
  const currentUser = useSelector(selectCurrentUser)
  const isCartOpen = useSelector(selectIsCartOpen)

  return (
    <Fragment>
      <NavigationContainer className="navigation">
        <LogoContainer className="logo-container" to="/">
          <Logo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}
