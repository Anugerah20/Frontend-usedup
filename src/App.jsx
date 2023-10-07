import EditProfile from './pages/EditProfile'
import LoginCard from "./components/LoginCard";
import RegisterCard from "./components/RegisterCard";
import Navigation from "./components/Navigation";
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';

function App() {
  return (
    <>
      <Navigation />
      <div className='App px-4 sm:my-10 my-5'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginCard />} />
          <Route path='/register' element={<RegisterCard />} />
          <Route path='/edit-profile' element={<EditProfile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
