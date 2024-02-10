/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { formatToIDR } from "../utils/FormatRupiah";
import { useApiPost, useApiDelete, useApiGet } from "../services/apiService";
import { toast } from "react-toastify";

const CardProduct = ({ id, title, image, price, location, isLiked }) => {
    const [isFavorite, setIsFavorite] = useState(isLiked);
    const [idLiked, setIdLiked] = useState('')

    // Function add favorite Produk
    const addFavoriteAdvert = async () => {
        try {
            const userId = localStorage.getItem('userId');
            // Get userId & AdvertId
            if (isFavorite) {
                await useApiDelete(`/likeAdvert/deleteLikeAdvert/${idLiked}`)
                setIsFavorite(false);
                toast.error('Berhasil dihapus ke favorit');
            } else {
                await useApiPost('/likeAdvert/likeAdvert', { userId, advertId: id });
                setIsFavorite(true);
                toast.success('Berhasil ditambahkan ke favorit');
            }

        } catch (error) {
            console.log('Error Add Favorite Advert: ', error);
        }
    }

    const getDetailAdvert = async () => {
        try {
            const response = await useApiGet(`/advert/getDetailAdvert/${id}`);
            setIdLiked(response.data?.detailAdvert?.likes[0]?.id)
            if (response.data.detailAdvert.likes.length === 0) {
                setIsFavorite(false)
            } else {
                setIsFavorite(true)
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDetailAdvert();
    }, [isFavorite]);

    return (
        <div className="card relative rounded w-full">
            <Link to={`/detail/${id}`} >
                <div className="px-2 pt-3">
                    <img src={image} alt={title} className='max-w-full h-32 object-contain mx-auto' />
                </div>
                <div className="px-4 md:px-6 py-2">
                    <div className="font-bold text-base md:text-lg mb-1 line-clamp-1">{title}</div>
                    <p className="text-blue-link font-bold text-base md:text-xl">{formatToIDR(price)}</p>
                    <p className="text-secondary text-right mt-4 text-xs uppercase md:text-sm">{location}</p>
                </div>
            </Link>
            <button
                className="absolute top-0 right-0 flex items-center justify-center m-2 bg-white hover:bg-gray-50 active:bg-gray-200 shadow-lg rounded-full w-8 h-8 hover:cursor-pointer transition"
                onClick={() => addFavoriteAdvert()}
            >
                <AiFillHeart
                    className={`text-xl ${isFavorite ? 'text-red-500' : 'text-gray-300'}`}
                />
            </button>
        </div>
    );
};

export default CardProduct;
