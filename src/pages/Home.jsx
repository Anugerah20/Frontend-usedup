import { Pagination } from "flowbite-react"
import CardProduct from "../components/CardProduct"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { current } from "@reduxjs/toolkit"
import { useApiGet } from "../services/apiService"

export const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [dataAdvert, setDataAdvert] = useState([]);

    const getDataAdvert = async () => {
        try {
            const getData = await useApiGet(`/advert/getAdvert?page=${currentPage}&pageSize=5`);
            console.log(getData);

            setTotalPages(getData.data.totalPages);
            setDataAdvert(getData.data.showAdvert);

        } catch (error) {
            console.log("Get data advert", error);
        }
    }

    useEffect(() => {
        getDataAdvert()

        window.scrollTo(0, 0);
    }, [currentPage])

    const onPageChange = (page) => setCurrentPage(page);

    return (
        <div className="max-w-6xl mx-auto">
            <h2 className="font-bold text-xl md:text-2xl mb-4">
                Jangan sampai keduluan
            </h2>
            {/* Card */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {dataAdvert.map((item) => (
                    <Link key={item.id} to={`/detail/${item.id}`} className="hover:cursor-pointer">
                        <CardProduct
                            image={item.image[1]}
                            title={item.title}
                            price={item.price}
                            location={item.location}
                        />
                    </Link>
                ))}
            </div>

            <div className="flex justify-center items-center my-5">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} showIcons />
            </div>

        </div>
    )
}
