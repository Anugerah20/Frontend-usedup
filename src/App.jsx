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
import Chat from "./pages/Chat";
import PageCategory from "./pages/PageCategory";
import SuksesVerif from "./pages/profile-page/SuksesVerif";
import { Fragment } from "react";

function App() {
  const pathname = useLocation().pathname;

  // regex untuk mengecek url khusus halaman utama
  const regex = new RegExp("^/$");

  const isUrlContainSlash = regex.test(pathname);

  return (
    <Fragment>
      <ToastContainer />
      <div className="flex flex-col h-screen justify-between">
        <Navigation />

          <img
            src={Banner}
            alt="banner"
            className={`${isUrlContainSlash ? "md:block hidden " : "hidden"}`}
          />

        <div className="App px-4 sm:my-10 my-5 grow">
          {/* Tampilkan banner hanya di halaman utama */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* protect route-route yang hanya bisa diakses ketika sudah login */}
            <Route element={<ProtectPath />}>
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/pilih-kategori" element={<PageKategori />} />
              <Route path="/favorit" element={<FavoriteProduct />} />
              <Route path="/iklan" element={<MyAdvertisement />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/form-jual" element={<FormlMobilBekas />} />
              <Route path="/chats" element={<Chat />} />
              <Route path="/verifikasi/:token" element={<SuksesVerif />} />
            </Route>

            {/* ketika sudah login maka tidak bisa akses route login dan register sebelum logout */}
            <Route element={<AlreadyLogin />}>
              <Route path="/login" element={<LoginCard />} />
              <Route path="/register" element={<RegisterCard />} />
            </Route>

            <Route path="/kategori/:id" element={<PageCategory />} />
            <Route path="/detail/:id" element={<DetailProduct />} />
            <Route path="/search-product" element={<SearchProduct />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <FooterComponent />
      </div>
    </Fragment>
  );
}

export default App;
