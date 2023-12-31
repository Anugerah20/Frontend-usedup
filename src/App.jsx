import FooterComponent from "./components/FooterComponent";
import EditProfile from './pages/EditProfile'
import LoginCard from "./components/LoginCard";
import RegisterCard from "./components/RegisterCard";
import Navigation from "./components/Navigation";
import { Route, Routes, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import Banner from './assets/banner.webp'
import PageKategori from "./pages/PageCategory";
import SearchProduct from "./pages/SearchProduct";
import FavoriteProduct from "./pages/FavoriteProduct";
import NotFound from "./pages/NotFound";
import { DetailProduct } from "./pages/DetailProduct";
import MyAdvertisement from "./pages/My-Advertisement";
import Profile from "./pages/Profile";
import FormlMobilBekas from "./pages/form-jual/FormUsedCars";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import PrivateRoute from "./utils/PrivateRoute";

function App() {

  const pathname = useLocation().pathname

  // regex untuk mengecek url khusus halaman utama
  const regex = new RegExp('^/$')

  const isUrlContainSlash = regex.test(pathname)

  const isAuthenticated = () => {
    const userToken = localStorage.getItem('useToken');
    return !!userToken
  };


  return (
    <>
      <Navigation />

      {/* Tampilkan banner hanya di halaman utama */}
      <img src={Banner} alt='banner' className={`${isUrlContainSlash ? 'md:block hidden ' : 'hidden'}`} />

      <div className='App px-4 sm:my-10 my-5'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginCard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path='/register' element={<RegisterCard />} />
          <Route
            path='/edit-profile'
            element={
              <PrivateRoute
                authenticated={isAuthenticated()}
                path='/edit-profile'
                element={EditProfile}
              />
            }
          />
          <Route
            path='/pilih-kategori'
            element={
              <PrivateRoute
                authenticated={isAuthenticated()}
                path='/pilih-kategori'
                element={PageKategori}
              />
            }
          />
          <Route
            path='/favorite-product'
            element={
              <PrivateRoute
                authenticated={isAuthenticated()}
                path='/favorite-product'
                element={FavoriteProduct}
              />
            }
          />
          <Route
            path='/detail/:id'
            element={<DetailProduct />}
          />
          <Route
            path='/my-advertisement'
            element={
              <PrivateRoute
                authenticated={isAuthenticated()}
                path='/my-advertisement'
                element={MyAdvertisement}
              />
            }
          />
          <Route
            path='/profile'
            element={
              <PrivateRoute
                authenticated={isAuthenticated()}
                path='/profile'
                element={Profile}
              />
            }
          />
          <Route
            path='/form-jual'
            element={
              <PrivateRoute
                authenticated={isAuthenticated()}
                path='/form-jual'
                element={FormlMobilBekas}
              />
            }
          />
          <Route path='/search-product' element={<SearchProduct />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <FooterComponent />
    </>
  );
}

export default App;
