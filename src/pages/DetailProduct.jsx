import { Alert, Tabs } from 'flowbite-react'
import { AiFillHeart, AiFillHome, AiFillWarning } from 'react-icons/ai'
import { BiChevronRight, BiUserCircle } from 'react-icons/bi'
import { FaMapMarker } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export const DetailProduct = () => {
    return (
        <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-0 md:gap-x-6'>
            <div className="left space-y-4 ">
                <div className="breadcrumb flex items-center">
                    <AiFillHome className='text-secondary' />
                    <BiChevronRight className='text-secondary' />
                    <span className='text-secondary'>Mobil Bekas</span>
                    <BiChevronRight className='text-secondary' />
                    <span className='text-blue-link'>Hyundai</span>
                </div>
                <div className="image-swiper relative w-fit">
                    <div className="absolute w-full h-full flex text-white items-center justify-center">
                        This Is Carousel Image
                    </div>
                    <img src="https://images.pexels.com/photos/11194510/pexels-photo-11194510.jpeg?auto=compress&cs=tinysrgb&w=600" alt="mobil" />
                </div>
                <div className="location space-x-2 w-fit p-4 md:text-base shadow text-secondary text-sm flex items-center">
                    <FaMapMarker />
                    <p className='uppercase font-semibold'>
                        Jakarta Selatan, DKI Jakarta
                    </p>
                </div>
                <div className="title">
                    <h2 className='font-bold text-2xl md:text-3xl'>
                        Hyundai Palisade
                    </h2>
                </div>
                <div className="price">
                    <p className='text-blue-link font-bold text-xl'>
                        Rp 120.000.000
                    </p>
                </div>
                <div className="tabs">
                    <Tabs.Group
                        aria-label="Tabs with underline"
                        style="underline"
                    >
                        <Tabs.Item
                            active
                            title="Catatan Penjual"
                        >
                            <p>
                                Catatan Penjual
                            </p>
                        </Tabs.Item>
                        <Tabs.Item
                            active
                            title="Spesiikasi"
                        >
                            <p>
                                Spesifikasi
                            </p>
                        </Tabs.Item>
                    </Tabs.Group>
                </div>
            </div>
            <div className="right md:w-full lg:w-2/3 ml-auto mt-9 space-y-6">
                <h1
                    className='font-bold text-2xl md:text-3xl'
                >
                    Info Penjual
                </h1>
                <div className="card space-y-4 px-5 py-4">
                    <div className="flex items-center space-x-4">
                        <BiUserCircle className='text-6xl' />
                        <div className="flex flex-col space-y-1">
                            <h2 className='font-semibold'>Hyundai Jakarta Selatan</h2>
                            <Link className="underline text-blue-link">
                                Lihat Profile
                            </Link>
                        </div>
                    </div>
                    <div className="alert">
                        <Alert
                            color="failure"
                            icon={AiFillWarning}
                        >
                            <p className='text-xs'>
                                Hati - hati dengan penjual yang belum terverifikasi
                            </p>
                        </Alert>
                    </div>
                </div>
                <div className="kontak card px-5 py-4">
                    <div className="card-header space-y-1">
                        <h2 className='font-semibold'>
                            Kontak Penjual
                        </h2>
                        <p>
                            *** **** ****
                        </p>
                        <button>
                            <p className='text-blue-link underline'>
                                Tampilkan
                            </p>
                        </button>
                    </div>
                </div>
                <button className="card w-full py-3 group flex items-center hover:bg-gray-50 active:bg-gray-100 justify-center transition">
                    <AiFillHeart className='mr-2 group-hover:text-red-500 text-secondary transition' />
                    Tambah ke Favorit
                </button>
            </div>
        </div>

    )
}
