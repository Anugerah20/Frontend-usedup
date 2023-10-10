import { Button } from "flowbite-react"
import CardProduct from "../components/CardProduct"
import DataDummy from "../Data/DataDummy"
import { Link } from "react-router-dom"

export const Home = () => {

    return (
        <div className="max-w-6xl mx-auto">
            <h2 className="font-bold text-xl md:text-2xl mb-4">
                Jangan sampai keduluan
            </h2>
            {/* Card */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {DataDummy.map((item) => (
                    <Link key={item.id} to={`/detail`} className="hover:cursor-pointer">
                        <CardProduct
                            image={item.image}
                            name={item.name}
                            price={item.price}
                            location={item.location}
                        />
                    </Link>
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
