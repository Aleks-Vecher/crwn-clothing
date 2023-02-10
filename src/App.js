import { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { checkUserSession } from './store/user/user.acton'
import Spinner from "./components/spinner/spinner.component";
import { GlobalStyle } from "./global.styles";

const Home = lazy(() => import('./routes/home/home.component'))
const Authentication = lazy(() => import('./routes/authentication/authentication.component'))
const Navigation = lazy(() => import('./routes/navigation/navigation.component'))
const Shop = lazy(() => import('./routes/shop/shop.component'))
const Checkout = lazy(() => import('./routes/checkout/checkout.component'))

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // const unsubscribe = onAuthStateChangedListener((user) => {
    //   if (user) {
    //     createUserDocumentFromAuth(user);
    //   }

    //   dispatch(setCurrentUser(user));
    // });

    // return unsubscribe;
    dispatch(checkUserSession())
  }, [dispatch]);

  return (
    <Suspense fallback={<Spinner />}>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Navigation />} >
          <Route index element={<Home />} />
          <Route path='shop/*' element={<Shop />} />
          <Route path='auth' element={<Authentication />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
