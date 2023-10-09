import FooterComponent from "./components/FooterComponent";
import EditProfile from './pages/EditProfile'
import LoginCard from "./components/LoginCard";
import RegisterCard from "./components/RegisterCard";
import Navigation from "./components/Navigation";
import { Route, Routes, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import Banner from './assets/banner.webp'

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
        </Routes>
      </div>
      <FooterComponent />
    </>
  );
}

export default App;
