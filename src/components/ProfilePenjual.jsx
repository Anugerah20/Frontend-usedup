import React, { Fragment, useEffect, useState } from 'react'
import { BiSolidUserCircle, BiUser } from 'react-icons/bi';
import { BsFillShareFill } from 'react-icons/bs';
import { AiOutlineWarning } from 'react-icons/ai';
import CardProduct from './CardProduct';
import { useApiGet } from '../services/apiService';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { Avatar } from 'flowbite-react';
import CardSkeleton from './CardSkeleton';

const ProfilePenjual = () => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    // const userId = localStorage.getItem('userId')
    const params = useParams()
    const userId = params.id

    const getUser = async () => {
        try {
            setLoading(true)
            const { data, status } = await useApiGet(`/user/${userId}`)

            if (status !== 200) {
                return toast.error('Failed to get user info')
            }

            setData(data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <section>
            <div className='flex flex-col mx-auto max-w-6xl'>
                <div className='profile-penjual flex md:flex-row flex-col md:space-x-3 md:space-y-0 space-y-4 shadow p-4'>
                    {loading ? (
                        <div className="bg-gray-200 h-36 w-36 rounded-lg flex items-center justify-center animate-pulse">
                            <BiUser className='h-10 w-10 text-gray-500' />
                        </div>
                    ) : (
                        <Avatar alt='user' img={data?.foto} size='xl' className='justify-start md:w-1/4 w-full' />
                    )}
                    <div className='space-y-2'>
                        <div className="header">
                            {loading ? (
                                <Fragment>
                                    <div className='h-6 w-60 mb-4 animate-pulse rounded-lg bg-gray-200'></div>
                                    <div className='h-6 w-full mb-4 animate-pulse rounded-lg bg-gray-200'></div>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <h1 className='font-bold text-[32px]'>{data?.fullname}</h1>
                                    <p className='text-sm text-gray-500'>{data?.bio}</p>
                                </Fragment>
                            )}
                        </div>
                        <div className='flex'>
                            <button className='px-4 py-2 bg-slate-100 me-6 flex items-center rounded'>
                                <BsFillShareFill className='mr-3 text-blue-link' />
                                <span className='text-sm text-gray-breadcrumb'>
                                    Bagikan Profil
                                </span>
                            </button>
                            <button className='px-4 py-2 bg-slate-100 me-6 flex items-center rounded'>
                                <AiOutlineWarning className='mr-3 text-red-500' />
                                <span className='text-sm text-gray-breadcrumb'>
                                    Laporkan Profil
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='barang-penjualan'>
                    <p className='justify-start my-4 font-semibold'>
                        Ada <span className='text-blue-link'>{data?.advert?.length}</span> item yang dijual sama <span className='text-blue-link'>{data?.fullname}</span>
                    </p>
                    {loading ? (
                        <CardSkeleton />
                    ) : (
                        data?.advert?.length === 0 ? (
                            <p className='text-center my-10 text-gray-500'>
                                Penjual ini belum jual apapun
                            </p>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {data?.advert?.map((item) => (
                                    <CardProduct
                                        key={item.id}
                                        id={item.id}
                                        image={item.image[0]}
                                        title={item.title}
                                        price={item.price}
                                        location={item.province?.name}
                                        isLiked={item.likes}
                                    />
                                ))}
                            </div>
                        )
                    )}
                </div>
            </div>
        </section>
    )
}

export default ProfilePenjual