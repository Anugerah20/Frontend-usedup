import Logo from "../assets/Logo.svg"
import { FaSistrix } from "react-icons/fa"
import { Button, Navbar, TextInput } from "flowbite-react"
import DropdownNav from "./DropdownNav"
import Categories from "./Categories"
import { Link } from "react-router-dom"

const Navigation = () => {

     const userLogin = true;
     return (
          <div>
               <Navbar
                    fluid
                    rounded
                    className="lg:mx-3 md:mx-3 sm:mx-3 lg:my-2 md:my-2 sm:my-2 m-2"
               >
                    <Navbar.Brand href="/">
                         <img src={Logo} alt="used up" />
                    </Navbar.Brand>
                    {/* Dropdown Mobile */}
                    <div className="flex">
                         {userLogin ? (
                              <div className="md:invisible sm:visible">
                                   <DropdownNav />
                              </div>
                         ) : null}
                         <Navbar.Toggle />
                    </div>
                    <Navbar.Collapse>
                         <form className="relative">
                              <div className="relative">
                                   <TextInput
                                        className="input-search"
                                        sizing="md"
                                        id="search"
                                        name="search"
                                        placeholder="Cari mobil, motor, handphone, dan lainnya..."
                                        required
                                        autoComplete="off"
                                        color="off"
                                   />
                              </div>
                              <Button type="submit" color="off" className="btn-search absolute inset-y-0 right-0 items-center hover:cursor-pointer rounded-r-lg transition-all bg-btn-search hover:bg-btn-grey rounded-l-none duration-300 ease-out">
                                   <FaSistrix className="text-xl" />
                              </Button>
                         </form>
                         <div className="flex items-center justify-center space-x-4 sm:mt-0 mt-4">
                              {userLogin ? (
                                   <>
                                        <Button outline color="dark" className="btn-nav">
                                             Jual
                                        </Button>
                                        {/* Dropdown Desktop */}
                                        <div className="sm:visible invisible">
                                             <DropdownNav />
                                        </div>
                                   </>
                              ) : (
                                   <>
                                        <Button color="dark" className="btn-nav">
                                             <Link to='/login'>
                                                  Login
                                             </Link>
                                        </Button>
                                        <Button outline color="dark" className="btn-nav">
                                             <Link to='/login'>
                                                  Jual
                                             </Link>
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
