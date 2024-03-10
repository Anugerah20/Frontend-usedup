import { Button } from "flowbite-react"
import CardProduct from "../components/CardProduct"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { useApiGet } from "../services/apiService"

const SearchProduct = () => {
     const [currentPage, setCurrentPage] = useState(1);
     const [totalPages, setTotalPages] = useState(1);
     const { searchTerm } = useSelector((store) => store.product);
     const [filterProduct, setFilterProduct] = useState([]);

     const getDataAdvert = async () => {
          try {
               const getData = await useApiGet(`/advert/getAdvert?page=${currentPage}&pageSize=5&search=${searchTerm}`);
               setFilterProduct(getData.data.adverts);
               console.log("data filter", filterProduct)
          } catch (error) {
               console.log(error)
          }
     }

     useEffect(() => {
          getDataAdvert()

          window.scrollTo(0, 0);
     }, [currentPage, searchTerm])

     return (
          <div className="max-w-6xl mx-auto">
               <h2 className="font-bold text-primary text-xl md:text-2xl mb-4">
                    KAMU MENCARI:<span className="text-blue-link ml-2">{searchTerm}</span>
               </h2>
               {/* Card */}
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

               <Button
                    color="dark"
                    className="mx-auto font-bold mt-4"
               >
                    Tampilkan lainnya
               </Button>
          </div>
     )
}

export default SearchProduct