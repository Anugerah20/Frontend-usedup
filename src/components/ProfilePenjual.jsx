import React from 'react'
import { BiSolidUserCircle } from 'react-icons/bi';
import { BsFillShareFill } from 'react-icons/bs';
import { AiOutlineWarning } from 'react-icons/ai';
import CardProduct from './CardProduct';
import DataDummy from "../Data/DataDummy"



const ProfilePenjual = () => {
    return (
        <section>
            <div className='flex flex-col mx-auto max-w-6xl'>
                <div className='profile-penjual flex shadow p-4'>
                    <div className='me-3'>
                        <BiSolidUserCircle className='text-gray-breadcrumb' size={100} />
                    </div>
                    <div className='space-y-2'>
                        <p className='font-bold text-[32px]'>Elon Musk</p>
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
                        Ada <span className='text-blue-link'>1</span> item yang dijual sama <span className='text-blue-link'>Elon Musk</span>
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {DataDummy.map((item) => (
                            <CardProduct
                                key={item.id}
                                image={item.image}
                                name={item.name}
                                price={item.price}
                                location={item.location}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProfilePenjual