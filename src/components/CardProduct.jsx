/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { formatToIDR } from "../utils/FormatRupiah";
import { useApiPost, useApiDelete, useApiGet } from "../services/apiService";
import { toast } from "react-toastify";
import { Tooltip } from "flowbite-react";

const CardProduct = ({ id, title, image, price, location, isLiked }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [idLike, setIdLike] = useState(null);
    const loggedInUser = localStorage.getItem('userId');

    useEffect(() => {
        if (loggedInUser) {
            isLiked?.map((item) => {
                if (item.userId === loggedInUser) {
                    setIsFavorite(true);
                    setIdLike(item.id);
                } else {
                    setIsFavorite(false);
                }
            });
        }
    }, []);


    // Function add favorite Produk
    const addFavoriteAdvert = async () => {
        try {
            const userId = localStorage.getItem('userId');
            // Get userId & AdvertId
            if (isFavorite) {
                await useApiDelete(`/likeAdvert/deleteLikeAdvert/${idLike}`)
                setIsFavorite(false);
                toast.success('Berhasil dihapus dari favorit', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                });
                setIdLike(null);
            } else {
                const reqLike = await useApiPost('/likeAdvert/likeAdvert', { userId, advertId: id });
                setIsFavorite(true);
                toast.success('Berhasil ditambahkan ke favorit', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                });
                setIdLike(reqLike.data.response.id);
            }

        } catch (error) {
            console.log('Error Add Favorite Advert: ', error);
        }
    }

    return (
        <div className="card relative rounded w-full">
            <div className="highlight absolute shadow">
                <h1>
                    BARANG BAGUS NIH!
                </h1>
            </div>
            <div className="absolute top-0 right-0 pt-2 pr-2">
                {loggedInUser && (
                    <Tooltip
                        content={`${isFavorite ? 'Hapus dari favorit' : 'Tambahkan ke favorit'}`}
                        animation="duration-300"
                        style='light'
                    >
                        <button
                            className="flex items-center justify-center m-2 bg-white hover:bg-gray-50 active:bg-gray-200 shadow-lg rounded-full w-8 h-8 hover:cursor-pointer transition"
                            onClick={() => addFavoriteAdvert()}
                        >
                            <AiFillHeart
                                className={`text-xl ${isFavorite ? 'text-red-500' : 'text-gray-300'}`}
                            />
                        </button>
                    </Tooltip>
                )}
            </div>
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
        </div>
    );
};

export default CardProduct;
