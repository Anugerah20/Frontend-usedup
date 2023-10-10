/* eslint-disable react/prop-types */
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";

const CardProduct = ({ name, image, price, location }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <div className="card rounded overflow-hidden relative">
            <img src={image} alt={name} className='max-w-full object-contain mx-auto' />
            <div className="px-4 md:px-6 py-4">
                <div className="font-bold text-base md:text-lg mb-1 line-clamp-1">{name}</div>
                <p className="text-blue-link font-bold text-base md:text-xl">{price}</p>
                <p className="text-secondary text-right mt-4 text-xs uppercase md:text-sm">{location}</p>
            </div>
            <button
                className="absolute top-0 right-0 flex items-center justify-center m-2 bg-white hover:bg-gray-50 active:bg-gray-200 shadow-lg rounded-full w-8 h-8 hover:cursor-pointer transition"
                onClick={() => setIsFavorite(!isFavorite)}
            >
                <AiFillHeart
                    className={`text-xl ${isFavorite ? 'text-red-500' : 'text-gray-300'}`}
                />
            </button>
        </div>
    );
};

export default CardProduct;
