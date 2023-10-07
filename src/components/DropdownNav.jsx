import ProfileUser from "../assets/profile-user.png"
import { Avatar, Dropdown } from "flowbite-react"
const DropdownNav = () => {
     return (
          <div className="flex">
               <Dropdown
                    arrowIcon={true}
                    inline
                    className="mt-8"
                    label={<Avatar alt="user" img={ProfileUser} className="mt-4 ml-6" />}
               >
                    <Dropdown.Header>
                         <div className="bg-red-200 text-red-700 p-3 mx-2 my-4 rounded-md">Lengkapi profil di edit profil</div>
                         <div className="flex items-center">
                              <img src={ProfileUser} alt="Profile User" className="w-12 h-12 rounded-full" />
                              <span className="text-sm text-primary mt-2 ml-2">
                                   Halo, <p className="font-bold py-1 text-primary">Nabil Anugerah</p>
                                   <a href="#" className="underline text-primary font-normal">Edit Profile</a>
                              </span>
                         </div>
                    </Dropdown.Header>
                    <Dropdown.Item>
                         <span className="block text-sm text-primary">
                              Iklan Saya
                         </span>
                    </Dropdown.Item>
                    <Dropdown.Item>
                         <span className="block text-sm text-primary">
                              Favorit Saya
                         </span>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                         <span className="block text-sm text-primary">
                              Logout
                         </span>
                    </Dropdown.Item>
               </Dropdown>
          </div>
     )
}

export default DropdownNav
