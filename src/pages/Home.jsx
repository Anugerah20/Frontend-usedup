import { Button } from "flowbite-react"
import CardProduct from "../components/CardProduct"

export const Home = () => {

    return (
        <div className="max-w-6xl mx-auto">
            <h2 className="font-bold text-xl md:text-2xl mb-4">
                Jangan sampai keduluan
            </h2>
            {/* Card */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <CardProduct
                    image="https://images.unsplash.com/photo-1542291026-6d0fccf4d411"
                    name="Product 1 adwd wa awdawodkawd awadawdw a wdaw"
                    price="Rp. 1.000.000"
                    location='Jakarta Selatan'
                />
                <CardProduct
                    image="https://images.unsplash.com/photo-1542291026-6d0fccf4d411"
                    name="Product 1"
                    price="Rp. 1.000.000"
                    location='Jakarta Selatan'
                />
                <CardProduct
                    image="https://images.unsplash.com/photo-1542291026-6d0fccf4d411"
                    name="Product 1"
                    price="Rp. 1.000.000"
                    location='Jakarta Selatan'
                />
                <CardProduct
                    image="https://images.unsplash.com/photo-1542291026-6d0fccf4d411"
                    name="Product 1"
                    price="Rp. 1.000.000"
                    location='Jakarta Selatan'
                />
                <CardProduct
                    image="https://images.unsplash.com/photo-1542291026-6d0fccf4d411"
                    name="Product 1 adwd wa awdawodkawd awadawdw a wdaw"
                    price="Rp. 1.000.000"
                    location='Jakarta Selatan'
                />
                <CardProduct
                    image="https://images.unsplash.com/photo-1542291026-6d0fccf4d411"
                    name="Product 1"
                    price="Rp. 1.000.000"
                    location='Jakarta Selatan'
                />
                <CardProduct
                    image="https://images.unsplash.com/photo-1542291026-6d0fccf4d411"
                    name="Product 1"
                    price="Rp. 1.000.000"
                    location='Jakarta Selatan'
                />
                <CardProduct
                    image="https://images.unsplash.com/photo-1542291026-6d0fccf4d411"
                    name="Product 1"
                    price="Rp. 1.000.000"
                    location='Jakarta Selatan'
                />
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
