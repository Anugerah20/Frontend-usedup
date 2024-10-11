import { Button, Pagination } from "flowbite-react"
import CardProduct from "../components/CardProduct"
import { Fragment, useEffect, useState } from "react"
import { useApiGet } from "../services/apiService"
import CardSkeleton from "../components/CardSkeleton"

export const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [dataAdvert, setDataAdvert] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageSize, setPageSize] = useState(8);
    const loggedInUser = localStorage.getItem('userId');

    const getDataAdvert = async () => {
        try {
            // setLoading(true);
            const getData = await useApiGet(`/advert/getAdvert?page=${currentPage}&pageSize=${pageSize}`);

            setTotalPages(getData.data.totalPages);
            setDataAdvert(getData.data.adverts);
            // setLoading(false);
        } catch (error) {
            // setLoading(false);
            console.log("Get data advert", error);
        }
    }

    useEffect(() => {
        getDataAdvert()

        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        getDataAdvert()
    }, [pageSize])

    // const onPageChange = (page) => setCurrentPage(page);

    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="font-bold text-xl md:text-2xl mb-4">
                Jangan sampai keduluan
            </h2>
            {/* Card */}
            {dataAdvert?.length === 0 ? (
                <CardSkeleton />
            ) :
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {dataAdvert.map((item) => (
                        <CardProduct
                            key={item.id}
                            image={item.image[0]}
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            location={item.province.name}
                            isLiked={item.likes}
                            isHighlight={item.isHighlighted}
                        />
                    ))}
                </div>
            }

            <div className='flex justify-center my-6'>
                <Button color="dark" onClick={() => setPageSize(pageSize + 8)}>Tampilkan lainnya</Button>
            </div>
            {/* 

            <div className="flex justify-center overflow-x-auto items-center my-5">
                <Pagination layout="navigation" currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} showIcons />
            </div> */}

        </div>
    )
}