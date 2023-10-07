import Logo from "../assets/Logo.svg"
import { FaSistrix } from "react-icons/fa"
import { Button, Navbar, TextInput } from "flowbite-react"
import DropdownNav from "./DropdownNav"
import Categories from "./Categories"

const Navigation = () => {

     const userLogin = true;
     return (
          <div>
               <Navbar
                    fluid
                    rounded
                    className="lg:mx-3 md:mx-3 sm:mx-3 lg:my-2 md:my-2 sm:my-2"
               >
                    <Navbar.Brand href="/">
                         <img src={Logo} alt="used up" />
                    </Navbar.Brand>
                    {/* Dropdown Mobile */}
                    <div className="sm:invisible visible sm:ml-0 ml-44 mb-2">
                         <DropdownNav />
                    </div>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                         <form className="flex relative">
                              <div className="relative flex-1">
                                   <TextInput
                                        className="input-search"
                                        id="search"
                                        name="search"
                                        placeholder="Cari mobil, motor, handphone, dan lainnya..."
                                        required
                                        autoComplete="off"
                                        color="off"
                                   />
                              </div>
                              <div className="flex absolute inset-y-0 right-0 items-center hover:cursor-pointer rounded-r-lg transition-all">
                                   <Button type="submit" color="off" className="btn-search bg-btn-search hover:bg-btn-grey rounded-l-none duration-300 ease-out">
                                        <FaSistrix className="text-xl" />
                                   </Button>
                              </div>
                         </form>
                         <div className="flex gap-4">
                              {userLogin ? (
                                   <div className="flex gap-4">
                                        <div className="flex">
                                             <Button outline color="dark" className="btn-nav">
                                                  Jual
                                             </Button>
                                        </div>
                                        {/* Dropdown Desktop */}
                                        <div className="sm:visible invisible">
                                             <DropdownNav />
                                        </div>
                                   </div>
                              ) : (
                                   <>
                                        <Button color="dark" className="btn-nav">
                                             Login
                                        </Button>
                                        <Button outline color="dark" className="btn-nav">
                                             Jual
                                        </Button>
                                   </>
                              )}
                         </div>
                    </Navbar.Collapse>
               </Navbar>
               <Categories />
          </div >
     )
}

export default Navigation
