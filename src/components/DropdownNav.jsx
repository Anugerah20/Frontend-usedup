/* eslint-disable react-hooks/rules-of-hooks */
import ProfileUser from "../assets/profile-user.png"
import { Avatar, Dropdown } from "flowbite-react"
import { useEffect, useState } from "react";
import { FaBullhorn, FaHeart, FaSignOutAlt } from "react-icons/fa";
import { useApiGet, userLogout } from "../services/apiService";
import { Link } from "react-router-dom";
const DropdownNav = () => {
     const [userData, setUserData] = useState(null);
     const [isComplete, setIsComplete] = useState(false);
     // Get Data User
     useEffect(() => {
          const fetchUser = async () => {
               try {
                    const userId = localStorage.getItem("userId");
                    const res = await useApiGet(`/user/${userId}`);
                    setUserData(res.data);
                    if (res.data.fullname !== null && res.data.no_telp !== null && res.data.bio !== null) {
                         setIsComplete(true);
                    } else {
                         setIsComplete(false);
                    }
               } catch (error) {
                    console.log(error);
               }
          }
          fetchUser();
     }, []);

     console.log(isComplete)

     return (
          <div className="flex">
               <Dropdown
                    arrowIcon={true}
                    inline
                    className="mt-2 shadow-sm"
                    label={<Avatar alt="user" img={ProfileUser} />}
               >
                    <Dropdown.Header>
                         <div className={`bg-red-200 text-red-500 p-3 font-normal rounded-md ${isComplete ? 'hidden' : 'visible'}`}>Lengkapi profil di edit profil</div>
                         <div className="flex items-center my-2 space-x-2">
                              <img src={ProfileUser} alt="Profile User" className="w-12 h-12 rounded-full" />
                              <span className="text-sm text-primary mt-2 ml-2">
                                   <p className="py-1 text-primary"> Halo, <span className="font-bold">{userData?.fullname}</span></p>
                                   <Link to={`edit-profile`} className="underline text-secondary font-normal">Edit Profile</Link>
                              </span>
                         </div>
                    </Dropdown.Header>
                    <Dropdown.Item>
                         <Link to='/iklan' className="text-sm py-1 text-gray-600 flex items-center w-full text-left">
                              <FaBullhorn className='mr-2' />
                              Iklan Saya
                         </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                         <Link to='/favorit' className="text-sm py-1 text-gray-600 flex items-center w-full text-left">
                              <FaHeart className='mr-2' />
                              Favorit Saya
                         </Link>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                         <span className="text-sm py-1 text-gray-600 flex items-center w-full text-left" onClick={userLogout}>
                              <FaSignOutAlt className='mr-2' />
                              Logout
                         </span>
                    </Dropdown.Item>
               </Dropdown>
          </div>
     )
}

export default DropdownNav
