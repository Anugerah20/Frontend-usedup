/* eslint-disable react-hooks/rules-of-hooks */
import ProfileUser from "../assets/profile-user.png"
import { Avatar, Badge, Dropdown } from "flowbite-react"
import { useEffect, useState } from "react";
import { FaBullhorn, FaEdit, FaHeart, FaHistory, FaSignOutAlt, FaStar } from "react-icons/fa";
import { useApiGet, userLogout } from "../services/apiService";
import { Link } from "react-router-dom";
import { RiEditBoxFill, RiFileList2Fill } from "react-icons/ri";

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

     return (
          <div className="flex">
               <Dropdown
                    arrowIcon={true}
                    inline
                    className="mt-2 shadow-sm z-20"
                    label={<Avatar alt="user" img={userData?.foto} className="w-full rounded-full" />}
               >
                    <Dropdown.Header>
                         <div className={`bg-red-200 text-red-500 p-3 font-normal rounded-md ${isComplete ? 'hidden' : 'visible'}`}>Lengkapi profil di edit profil</div>
                         <div className="flex items-start my-2 space-x-2">
                              <Avatar img={userData?.foto} alt="Profile User" className="w-12 h-12 rounded-full" />
                              <span className="text-sm text-primary ml-2">
                                   <p className="pt-1 text-primary"> Halo, <span className="font-bold">{userData?.fullname}</span></p>
                                   <table>
                                        <tr>
                                             <td className="text-slate-400 text-xs font-normal">Kuota Iklan</td>
                                             <td className="text-slate-400 text-xs font-normal">:</td>
                                             <td className="text-slate-400 text-xs font-bold">{userData?.kuota_iklan}</td>
                                        </tr>
                                        <tr>
                                             <td className="text-slate-400 text-xs font-normal">Kuota Sorot</td>
                                             <td className="text-slate-400 text-xs font-normal">:</td>
                                             <td className="text-slate-400 text-xs font-bold">{userData?.kuota_sorot}</td>
                                        </tr>
                                   </table>
                              </span>
                         </div>
                    </Dropdown.Header>
                    <Dropdown.Item>
                         <Link to='/edit-profile' className="text-base font-normal py-1 text-gray-600 flex items-center w-full text-left">
                              <RiEditBoxFill className='mr-2' />
                              Edit Profile
                         </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                         <Link to='/iklan' className="text-base font-normal py-1 text-gray-600 flex items-center w-full text-left">
                              <FaBullhorn className='mr-2' />
                              Iklan Saya
                         </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                         <Link to='/favorit' className="text-base font-normal py-1 text-gray-600 flex items-center w-full text-left">
                              <FaHeart className='mr-2' />
                              Favorit Saya
                         </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                         <Link to='/riwayat-pembelian' className="text-base font-normal py-1 text-gray-600 flex items-center w-full text-left">
                              <FaHistory className='mr-2' />
                              Riwayat Pembelian
                         </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                         <Link to='/beli-paket' className="text-base font-normal py-1 text-gray-600 flex items-center w-full text-left">
                              <RiFileList2Fill className='mr-2' />
                              Beli Paket Bisnis
                              <Badge color="success" className="ml-2">Baru!</Badge>
                         </Link>
                    </Dropdown.Item>
                    {/* Paket Premium */}
                    <Dropdown.Item>
                         <Link to='/beli-paket-premium' className="text-base font-normal py-1 text-gray-600 flex items-center w-full text-left">
                              <RiFileList2Fill className='mr-2' />
                              Beli Paket Premium
                              <Badge color="indigo" className="ml-2">Baru!</Badge>
                         </Link>
                    </Dropdown.Item>
                    {/* <Dropdown.Item>
                    </Dropdown.Item> */}
                    <Link to='/favorit' className="text-base justify-center bg-gradient-to-br from-sky-100 via-cyan-300 to-sky-300 font-medium py-2 text-cyan-800 flex items-center w-full text-left">
                         <FaStar className='mr-2' />
                         Menjadi Premium!
                    </Link>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                         <span className="text-base font-normal py-1 text-gray-600 flex items-center w-full text-left" onClick={userLogout}>
                              <FaSignOutAlt className='mr-2' />
                              Logout
                         </span>
                    </Dropdown.Item>
               </Dropdown>
          </div>
     )
}

export default DropdownNav
