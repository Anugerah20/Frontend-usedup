import EditProfile from './pages/EditProfile'
import LoginCard from "./components/LoginCard";
import RegisterCard from "./components/RegisterCard";
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';

function App() {
  return (
    <div className='App flex justify-start items-center h-screen'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginCard />} />
        <Route path='/register' element={<RegisterCard />} />
        <Route path='/edit-profile' element={<EditProfile />} />
      </Routes>
    </div>
  );
}

export default App;
