import { Button } from "flowbite-react"
import CardProduct from "../components/CardProduct"
import { useSelector } from "react-redux"

const SearchProduct = () => {
  const {product} = useSelector((store) => store.product);

     return (
          <div className="max-w-6xl mx-auto">
               <h2 className="font-bold text-primary text-xl md:text-2xl mb-4">
                    KAMU MENCARI:<span className="text-blue-link ml-2">HYUNDAI</span>
               </h2>
               {/* Card */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {product.map((item) => (
                         <CardProduct
                              key={item.id}
                              image={item.image}
                              name={item.name}
                              price={item.price}
                              location={item.location}
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
