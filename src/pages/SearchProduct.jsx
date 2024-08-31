import { Button } from "flowbite-react"
import CardProduct from "../components/CardProduct"
import { useSelector } from "react-redux"
import { useState, useEffect, Fragment } from "react"
import { useApiGet } from "../services/apiService"
import { useDebounce } from "@uidotdev/usehooks";
import CardSkeleton from "../components/CardSkeleton"
import { FaBoxOpen } from "react-icons/fa"

const SearchProduct = () => {
     const [currentPage, setCurrentPage] = useState(1);
     const [totalPages, setTotalPages] = useState(1);
     const { searchTerm } = useSelector((store) => store.product);
     const [filterProduct, setFilterProduct] = useState([]);
     const debouncedSearchTerm = useDebounce(searchTerm, 700);
     const [loading, setLoading] = useState(false);

     const getDataAdvert = async () => {
          try {
               setLoading(true);
               const getData = await useApiGet(`/advert/getAdvert?page=${currentPage}&pageSize=5&search=${debouncedSearchTerm}`);
               setFilterProduct(getData.data.adverts);
               console.log("data filter", filterProduct)
               setLoading(false);
          } catch (error) {
               setLoading(false);
               console.log(error)
          }
     }

     useEffect(() => {
          getDataAdvert()

          window.scrollTo(0, 0);
     }, [currentPage, debouncedSearchTerm])

     return (
          <div className="max-w-6xl mx-auto">
               <h2 className="font-bold text-primary text-xl md:text-2xl mb-4">
                    KAMU MENCARI:<span className="text-blue-link ml-2">{debouncedSearchTerm}</span>
               </h2>
               {/* Card */}
               {loading ?
                    <CardSkeleton />
                    :
                    <Fragment>

                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {filterProduct.map((item) => (
                                   <CardProduct
                                        key={item.id}
                                        image={item.image[0]}
                                        id={item.id}
                                        title={item.title}
                                        price={item.price}
                                        location={item.location}
                                        isLiked={item.likes.length === 0 ? false : true}
                                   />
                              ))}
                         </div>
                         {filterProduct.length === 0 && (
                              <div className="text-center mt-4 flex justify-center items-center flex-col">
                                   <FaBoxOpen className="text-9xl text-gray-300" />
                                   <p className="text-gray-500">Yang kamu cari tidak ditemukan</p>
                              </div>
                         )}
                    </Fragment>
               }
               {/* Not Found */}



               <Button
                    color="dark"
                    className={`mx-auto font-bold mt-4 ${filterProduct.length > 4 ? 'block' : 'hidden'}`}
               >
                    Tampilkan lainnya
               </Button>
          </div>
     )
}

export default SearchProduct