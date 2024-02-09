/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useRef } from 'react'
import { Tabs, Tooltip } from 'flowbite-react'
import { AiFillHeart, AiFillHome, AiFillWarning } from 'react-icons/ai'
import { BiChevronRight } from 'react-icons/bi'
import { HiBadgeCheck, HiLocationMarker } from 'react-icons/hi'
import { Link, useParams } from 'react-router-dom'
import Profile from '../assets/profile-user.png'
import { useApiGet } from '../services/apiService'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import { formatToIDR } from '../utils/FormatRupiah'

export const DetailProduct = () => {
    let { id } = useParams();
    const [adverts, setAdverts] = useState([]);
    const [isNoTelpVisible, setIsNoTelpVisible] = useState(false);

    const getDetailAdvert = async () => {
        try {
            const response = await useApiGet(`/advert/getDetailAdvert/${id}`);
            setAdverts(response.data.detailAdvert)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDetailAdvert()
    }, [])

    const [zoomStyle, setZoomStyle] = useState({ transform: 'scale(1)' });
    const imgRef = useRef(null);

    const handleMouseMove = (e) => {
        const img = imgRef.current;
        const x = e.clientX - img.offsetLeft;
        const y = e.clientY - img.offsetTop;

        if (window.innerWidth > 1023) {
            setZoomStyle({
                transformOrigin: `${x}px ${y}px`,
                transform: 'scale(2)',
            });
        }

    };

    const handleMouseLeave = () => {
        setZoomStyle({ transform: 'scale(1)' });
    };
    return (
        <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-0 md:gap-x-6'>
            <div className="left space-y-4">
                <div className="breadcrumb flex items-center space-x-1">
                    <Link to="/" className='text-secondary font-semibold'>
                        <AiFillHome className='text-secondary' />
                    </Link>
                    <BiChevronRight className='text-secondary' />
                    <span className='text-secondary font-semibold whitespace-nowrap'>{adverts?.category?.name}</span>
                    <BiChevronRight className='text-secondary' />
                    <p className='text-blue-link font-semibold line-clamp-1'>{adverts?.title}</p>
                </div>
                <div className="image-swiper relative w-full">
                    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                        {adverts?.image?.map((image, index) => ( // Added parentheses and an index
                            <SwiperSlide key={index}> {/* Assuming you have unique keys for each slide */}
                                <div className="img-detail overflow-hidden bg-black"
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                    ref={imgRef}>
                                    <img
                                        src={image} alt='carousel-image'
                                        className='max-w-full h-56 sm:h-64 xl:h-80 2xl:h-96 object-contain mx-auto'
                                        style={zoomStyle} />
                                </div>

                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>
                <div className="location space-x-2 w-fit px-3 py-2 md:text-base shadow-sm text-secondary text-sm flex items-center">
                    <HiLocationMarker />
                    <p className='uppercase font-semibold break-words'>
                        {adverts?.province?.name}
                    </p>
                </div>
                <div className="title">
                    <h2 className='font-bold text-2xl md:text-3xl break-words'>
                        {adverts.title}
                    </h2>
                </div>
                <div className="price">
                    <p className='text-blue-link font-bold text-xl break-words'>
                        {formatToIDR(adverts?.price)}
                    </p>
                </div>
                <Tabs.Group
                    aria-label="Tabs with underline"
                    // eslint-disable-next-line react/style-prop-object
                    style='underline'
                >
                    <Tabs.Item title="Catatan Penjual" >
                        <p className='whitespace-pre-line'>
                            {adverts?.description}
                        </p>
                    </Tabs.Item>
                </Tabs.Group>
            </div>
            <div className="right w-full lg:w-2/3 ml-auto mt-9 space-y-6">
                <h1
                    className='font-bold text-2xl md:text-3xl'
                >
                    Info Penjual
                </h1>
                <div className="card space-y-4 px-5 py-4">
                    <div className="flex items-center space-x-4">
                        <img src={Profile} alt="" />
                        <div className="flex flex-col space-y-1">
                            <div className="penjual-name flex items-center space-x-1">
                                <h2 className='font-semibold'>{adverts?.user?.fullname}</h2>
                                <Tooltip content="Penjual sudah ter-verifikasi">
                                    <div className="verified_badge">
                                        <HiBadgeCheck className='text-xl text-blue-link' />
                                    </div>
                                </Tooltip>
                            </div>
                            <Link className="underline text-blue-link">
                                Lihat Profile
                            </Link>
                        </div>
                    </div>
                    {/* <div className="alert">
                        <Alert
                            color="failure"
                            icon={AiFillWarning}
                        >
                            <p className='text-xs'>
                                Hati - hati dengan penjual yang belum terverifikasi
                            </p>
                        </Alert>
                    </div> */}
                </div>
                <div className="kontak card px-5 py-4">
                    <div className="card-header space-y-1">
                        <h2 className='font-semibold'>
                            Kontak Penjual
                        </h2>
                        <p>
                            {isNoTelpVisible ? adverts?.user?.no_telp : '************'}
                        </p>
                        <button
                            className='text-blue-link underline'
                            onClick={() => setIsNoTelpVisible(!isNoTelpVisible)}
                        >
                            {isNoTelpVisible ? 'Sembunyikan' : 'Tampilkan'}
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
