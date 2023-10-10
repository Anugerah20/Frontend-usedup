import { Button } from "flowbite-react"
import CardProduct from "../components/CardProduct"
import DataDummy from "../Data/DataDummy"

export const Home = () => {

    return (
        <div className="max-w-6xl mx-auto">
            <h2 className="font-bold text-xl md:text-2xl mb-4">
                Jangan sampai keduluan
            </h2>
            {/* Card */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {DataDummy.map((item) => (
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
