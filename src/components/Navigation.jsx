import Logo from "../assets/Logo.svg"
import { FaSistrix } from "react-icons/fa"
import { Button, Navbar, TextInput } from "flowbite-react"
import DropdownNav from "./DropdownNav"
import Categories from "./Categories"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchTerm } from "../features/liveSearchSlice";
import { IoChatbox } from "react-icons/io5";

const Navigation = () => {
     // Check Token User
     const useToken = localStorage.getItem("useToken");
     const userLogin = useToken ? true : false;

     // Live Search
     const dispatch = useDispatch();
     const { searchTerm } = useSelector((state) => state.product);

     const navigate = useNavigate();

     const handleSearchInputChange = (e) => {
          const value = e.target.value;
          dispatch(updateSearchTerm(value));

          if (value.trim() !== '') {
               navigate('/search-product');
          } else if (value.trim() === '') {
               navigate('/')
          }
     };

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
                    <div className="flex space-x-2">
                         {userLogin ? (
                              <div className="md:visible hidden">
                                   <DropdownNav />
                              </div>
                         ) : null}
                         <Navbar.Toggle />
                    </div>
                    <Navbar.Collapse>
                         <div className="md:w-96 w-full">
                              <form>
                                   <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300" required>Search</label>
                                   <div className="relative ">
                                        <input type="text" id="default-search" className="block pl-4 pr-8 md:w-96 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500 placeholder-gray-300" style={{borderWidth: "1px"}} placeholder="Cari mobil, motor, handphone, dan lainnya..." required="" onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }} onChange={handleSearchInputChange} />
                                        <div className="flex absolute inset-y-0 right-0 items-center px-3 bg-gray-200 hover:cursor-pointer rounded-r-lg transition-all active:bg-slate-300">
                                             {/* <Link to={`/search/${keyword}`} className='w-5 h-5'> */}
                                             <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                             {/* </Link> */}
                                        </div>
                                   </div>
                              </form>
                         </div>

                         <div className="flex items-center justify-end space-x-4 sm:mt-0 mt-4 ">
                              {userLogin ? (
                                   <>
                                        <Link to='/form-jual'>
                                             <Button outline color="dark" className="btn-nav group">
                                                  <svg className="w-4 h-4 mr-1 text-gray-800 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                       <path d="M18.045 3.007 12.31 3a1.965 1.965 0 0 0-1.4.585l-7.33 7.394a2 2 0 0 0 0 2.805l6.573 6.631a1.957 1.957 0 0 0 1.4.585 1.965 1.965 0 0 0 1.4-.585l7.409-7.477A2 2 0 0 0 21 11.479v-5.5a2.972 2.972 0 0 0-2.955-2.972Zm-2.452 6.438a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                                                  </svg>
                                                  Jual
                                             </Button>
                                        </Link>
                                        {/* <Link to='/chats' >
                                             <IoChatbox className="text-2xl" />
                                        </Link> */}
                                        {/* Dropdown Desktop */}
                                        <div className="xs:hidden">
                                             <DropdownNav />
                                        </div>
                                   </>
                              ) : (
                                   <>
                                        <Link to='/login'>
                                             <Button color="dark" className="btn-nav">
                                                  Login
                                             </Button>
                                        </Link>
                                        <Button outline color="dark" className="btn-nav">
                                             <Link to='/form-jual'>
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
