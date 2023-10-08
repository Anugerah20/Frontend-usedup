import { Footer } from "flowbite-react"
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';

const FooterComponent = () => {
     return (
          <>
               <Footer>
                    <div className="w-full px-4 bg-black">
                         <div className="grid text-left max-w-6xl mx-auto grid-cols-2 gap-8 py-8 md:grid-cols-4">
                              <div>
                                   <Footer.Title title="Kategori Lainnya" className="text-white-breadcrumb font-bold" />
                                   <Footer.LinkGroup col={true} className="text-white-breadcrumb">
                                        <Footer.Link href="#">
                                             Hobi & Olahraga
                                        </Footer.Link>
                                        <Footer.Link href="#">
                                             Furniture
                                        </Footer.Link>
                                        <Footer.Link href="#">
                                             Perlengkapan Bayi & Anak
                                        </Footer.Link>
                                   </Footer.LinkGroup>
                              </div>
                              <div>
                                   <Footer.Title title="UsedUp Links" className="text-white-breadcrumb font-bold" />
                                   <Footer.LinkGroup col={true} className="text-white-breadcrumb">
                                        <Footer.Link href="#">
                                             Pusat Bantuan
                                        </Footer.Link>
                                        <Footer.Link href="#">
                                             Tentang UsedUp
                                        </Footer.Link>
                                        <Footer.Link href="#">
                                             Tips Aman
                                        </Footer.Link>
                                   </Footer.LinkGroup>
                              </div>
                              <div className="flex flex-col">
                                   <Footer.Title title="Ikuti Kami" className="text-white-breadcrumb font-bold" />
                                   <div className="flex gap-4">
                                        <Footer.Icon
                                             href="https://facebook.com/"
                                             target="_blank"
                                             icon={BsFacebook}
                                             className="text-white-breadcrumb"
                                        />
                                        <Footer.Icon
                                             href="https://instagram.com/"
                                             target="_blank"
                                             icon={BsInstagram}
                                             className="text-white-breadcrumb icon-size"
                                        />
                                        <Footer.Icon
                                             href="https://twitter.com/"
                                             target="_blank"
                                             icon={BsTwitter}
                                             className="text-white-breadcrumb icon-size"
                                        />
                                   </div>
                              </div>
                         </div>
                         <div className="w-full flex justify-center items-center mb-0 sm:mb-5 p-4">
                              <Footer.Copyright
                                   by="UsedUp"
                                   year={2023}
                                   className="text-white-breadcrumb"
                              />
                         </div>
                    </div>
               </Footer >
          </>
     )
}

export default FooterComponent
