import FooterComponent from "./components/FooterComponent";
import EditProfile from "./pages/EditProfile";
import LoginCard from "./components/LoginCard";
import RegisterCard from "./components/RegisterCard";
import Navigation from "./components/Navigation";
import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import Banner from "./assets/banner.webp";
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
import { AlreadyLogin, ProtectPath } from "./utils/ProtectRoute";
import { ToastContainer } from "react-toastify";

function App() {
  const pathname = useLocation().pathname;

  // regex untuk mengecek url khusus halaman utama
  const regex = new RegExp("^/$");

  const isUrlContainSlash = regex.test(pathname);

  return (
    <>
      <ToastContainer />
      <Navigation />

      {/* Tampilkan banner hanya di halaman utama */}
      <img
        src={Banner}
        alt="banner"
        className={`${isUrlContainSlash ? "md:block hidden " : "hidden"}`}
      />

      <div className="App px-4 sm:my-10 my-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* protect route-route yang hanya bisa diakses ketika sudah login */}
          <Route element={<ProtectPath />}>
            <Route path="/edit-profile/:id" element={<EditProfile />} />
            <Route path="/pilih-kategori" element={<PageKategori />} />
            <Route path="/favorite-product/:id" element={<FavoriteProduct />} />
            <Route path="/my-advertisement" element={<MyAdvertisement />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/form-jual" element={<FormlMobilBekas />} />
          </Route>

          {/* ketika sudah login maka tidak bisa akses route login dan register sebelum logout */}
          <Route element={<AlreadyLogin />}>
            <Route path="/login" element={<LoginCard />} />
            <Route path="/register" element={<RegisterCard />} />
          </Route>

          <Route path="/detail/:id" element={<DetailProduct />} />
          <Route path="/search-product" element={<SearchProduct />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <FooterComponent />
    </>
  );
}

export default App;
