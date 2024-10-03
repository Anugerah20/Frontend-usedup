/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useRef } from 'react'
import { Alert, Avatar, Tabs, Tooltip } from 'flowbite-react'
import { AiFillHeart, AiFillHome, AiFillWarning } from 'react-icons/ai'
import { BiChevronRight } from 'react-icons/bi'
import { HiBadgeCheck, HiInformationCircle, HiLocationMarker } from 'react-icons/hi'
import { Link, redirect, useNavigate, useParams } from 'react-router-dom'
import Profile from '../assets/profile-user.png'
import { useApiDelete, useApiGet, useApiPost } from '../services/apiService'
import { Swiper, SwiperSlide } from 'swiper/react';
import { toast } from 'react-toastify';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import { formatToIDR } from '../utils/FormatRupiah'
import { IoWarning } from 'react-icons/io5'
import { animated } from '@cloudinary/url-gen/qualifiers/flag'

export const DetailProduct = () => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    let { id } = useParams();
    const [adverts, setAdverts] = useState([]);
    const [isNoTelpVisible, setIsNoTelpVisible] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [idLike, setIdLike] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_TOKEN_MAPBOX;

    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    // Check button isLogin into favorit produk
    useEffect(() => {
        setIsLogin(!!userId);
    }, [])

    // Fungsi untuk reverse geocoding
    const fetchAddress = async (lng, lat) => {
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_ACCESS_TOKEN}`);
        const data = await response.json();
        if (data?.features?.length) {
            return data.features[0].place_name;
        }
        return 'Address not found';
    };

    useEffect(() => {
        // Set token Mapbox
        mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

        // Inisialisasi Mapbox
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            zoom: 13
        });

        markerRef.current = new mapboxgl.Marker()
            .setLngLat([longitude, latitude])
            .addTo(mapRef.current);

    }, [longitude, latitude]);


    // Function add favorite Produk
    const addFavoriteAdvert = async (advertId) => {
        try {
            if (!isLogin) {
                return navigate('/login');
            }

            const userId = localStorage.getItem('userId');
            // Get userId & AdvertId
            if (isFavorite) {
                await useApiDelete(`/likeAdvert/deleteLikeAdvert/${idLike}`)
                setIsFavorite(false);
                toast.success('Berhasil dihapus dari favorit', {
                    hideProgressBar: true,
                    autoClose: 1000,
                });
                setIdLike(null);
            } else {
                const reqLike = await useApiPost('/likeAdvert/likeAdvert', { userId, advertId: id });
                setIsFavorite(true);
                toast.success('Berhasil ditambahkan ke favorit', {
                    hideProgressBar: true,
                    autoClose: 1000,
                });
                setIdLike(reqLike.data.response.id);
            }

        } catch (error) {
            console.log('Error Add Favorite Advert: ', error);
        }
    }

    const getDetailAdvert = async () => {
        try {
            const response = await useApiGet(`/advert/getDetailAdvert/${id}`);
            setAdverts(response.data.detailAdvert)

            if (userId !== null) {
                response.data.detailAdvert.likes.map((item) => {
                    if (item.userId === userId) {
                        setIsFavorite(true);
                        setIdLike(item.id);
                    } else {
                        setIsFavorite(false);
                    }
                });
            }

            setLongitude(response.data.detailAdvert.longitude);
            setLatitude(response.data.detailAdvert.latitude);

            fetchAddress(response.data.detailAdvert.longitude, response.data.detailAdvert.latitude).then((address) => {
                mapRef.current.flyTo({
                    center: [response.data.detailAdvert.longitude, response.data.detailAdvert.latitude],
                    zoom: 14,
                    essential: true
                });
                // createMarker(response.data.detailAdvert.longitude, response.data.detailAdvert.latitude);
                // setAddress(address);
            });

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
        <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-y-4 gap-x-0 md:gap-x-2'>
            <div className="left space-y-4 col-span-2">
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
                        <div className="whitespace-normal">
                            <p className='break-words'>
                                {adverts?.description}
                            </p>
                        </div>
                    </Tabs.Item>
                </Tabs.Group>
            </div>
            <div className="right w-full lg:w-5/6 ml-auto mt-9 space-y-6">
                <h1
                    className='font-bold text-2xl md:text-3xl'
                >
                    Info Penjual
                </h1>
                <div className="card space-y-4 px-5 py-4">
                    {adverts?.user?.isVerified === false && (
                        <Alert color="failure" icon={IoWarning}>
                            Hati - hati dengan penjual yang belum terverifikasi
                        </Alert>
                    )}

                    <div className="flex items-center space-x-4">
                        <Avatar img={adverts?.user?.foto} alt="profile-img" size='lg' />
                        <div className="flex flex-col space-y-1">
                            <div className="penjual-name flex items-center space-x-1">
                                <h2 className='font-semibold'>{adverts?.user?.fullname}</h2>
                                {adverts?.user?.isVerified ? (
                                    <Tooltip content="Penjual sudah ter-verifikasi">
                                        <div className="verified_badge">
                                            <HiBadgeCheck className='text-xl text-blue-link' />
                                        </div>
                                    </Tooltip>
                                ) : (
                                    <Tooltip content="Penjual belum ter-verifikasi">
                                        <div className="verified_badge">
                                            <IoWarning className='text-xl text-red-500' />
                                        </div>
                                    </Tooltip>
                                )}
                            </div>
                            <Link to={`/profile/${adverts?.user?.id}`} className="underline text-blue-link">
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
                <button className={`card w-full py-3 group flex items-center font-semibold ${isFavorite ? 'bg-red-400 text-white hover:bg-red-500' : 'bg-white'} hover:bg-gray-50 active:bg-gray-100 justify-center transition`} onClick={() => addFavoriteAdvert(adverts?.likes[0]?.id)}>
                    <AiFillHeart className={`mr-2 ${isFavorite ? 'text-white' : 'text-red-500'} transition`}
                    />
                    {isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
                </button>
                <div className="map space-y-2">
                    <h1
                        className='font-bold text-2xl md:text-xl'
                    >
                        Lokasi Barang/Unit
                    </h1>
                    <div ref={mapContainerRef} className="w-full h-56"></div>
                </div>
            </div>
        </div>
    )
}
