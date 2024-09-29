import { Fragment, useEffect, useState } from "react";
import { useApiGet } from "../services/apiService";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CardSkeleton from "../components/CardSkeleton";
import CardProduct from "../components/CardProduct";
import { FaBoxOpen } from "react-icons/fa";

const PageCategory = () => {
  let { id } = useParams();
  const [adverts, setAdverts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');

  const getAdvertByCategory = async () => {
    try {
      setLoading(true);
      const response = await useApiGet(`/advert/getAdvertByCategory?categoryId=${id}`);
      setAdverts(response.data.data.adverts)
      setTitle(response.data.data.name)

      if (response.data.status === "failed") {
        setLoading(false);
        toast.error('Something went wrong');
      }

      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    getAdvertByCategory()
  }, [id])

  return (
    <div className="max-w-6xl mx-auto">
      {loading ?
        <div className="h-6 w-60 mb-4 animate-pulse rounded-lg bg-gray-200"></div>
        :
        <h1 className="font-bold text-primary text-xl md:text-2xl mb-4">{title}</h1>
      }
      {loading ? (
        <CardSkeleton />
      ) :
        <Fragment>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 justify-between'>
            {adverts.map((advert) => (
              <CardProduct
                key={advert.id}
                image={advert.image[0]}
                id={advert.id}
                title={advert.title}
                price={advert.price}
                location={advert.location}
                isLiked={advert.likes}
              />
            ))}
          </div>
          {adverts.length === 0 &&
            <div className='flex justify-center items-center flex-col h-96'>
              <FaBoxOpen className='text-9xl text-gray-400' />
              <p className='text-gray-400'>Iklan tidak tersedia</p>
            </div>
          }
        </Fragment>
      }
    </div>
  )
}

export default PageCategory