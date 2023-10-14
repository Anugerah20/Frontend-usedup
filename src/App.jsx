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

function App() {

  const pathname = useLocation().pathname

  // regex untuk mengecek url khusus halaman utama
  const regex = new RegExp('^/$')

  const isUrlContainSlash = regex.test(pathname)

  return (
    <>
      <Navigation />

      {/* Tampilkan banner hanya di halaman utama */}
      <img src={Banner} alt='banner' className={`${isUrlContainSlash ? 'md:block hidden ' : 'hidden'}`} />

      <div className='App px-4 sm:my-10 my-5'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginCard />} />
          <Route path='/register' element={<RegisterCard />} />
          <Route path='/edit-profile' element={<EditProfile />} />
          <Route path='/pilih-kategori' element={<PageKategori />} />
          <Route path='/search-product' element={<SearchProduct />} />
          <Route path='/favorite-product' element={<FavoriteProduct />} />
          <Route path='/detail' element={<DetailProduct />} />
          <Route path='/my-advertisement' element={<MyAdvertisement />} />

          <Route path='/profile' element={<Profile />} />
          <Route path='/jual-mobil-bekas' element={<FormlMobilBekas />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <FooterComponent />
    </>
  );
}

export default App;
