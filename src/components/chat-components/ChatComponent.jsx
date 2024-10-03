import React from 'react'
import { IoMdSend } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";

const ChatComponent = () => {

    const text = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur adipisicing elit.';

    const slicedtext = text.length >= 50 ? text.slice(0, 50) + '...' : text

    return (
        <div className='max-w-6xl mx-auto border-2 border-slate-200 rounded'>
            <div className='grid grid-cols-2 h-[90vh]'>
                <div className='kiri overflow-scroll'>
                    <div className='flex p-3 h-16 border-b-2 border-slate-200 items-center space-x-4 sticky top-0 z-10 bg-slate-50'>
                        <div>
                            <p className='text-xl font-bold'>Chat</p>
                        </div>
                        <div className='w-full'>
                            <input type="text" placeholder='cari percakapan...' />
                        </div>
                    </div>
                    <div className='p-2 space-y-5'>
                        <div className='flex items-center gap-5'>
                            <div>
                                <div className='w-[60px] h-[60px] bg-red-600 rounded-full'></div>
                            </div>
                            <div className='col-span-4'>
                                <p className='font-semibold'>adam pangeran feby</p>
                                <p className='text-sm truncate-text'>{slicedtext}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5'>
                            <div>
                                <div className='w-[60px] h-[60px] bg-blue-600 rounded-full'></div>
                            </div>
                            <div className='col-span-4'>
                                <p className='font-semibold'>nabil presiden usedup</p>
                                <p className='text-sm truncate-text'>{slicedtext}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5'>
                            <div>
                                <div className='w-[60px] h-[60px] bg-red-600 rounded-full'></div>
                            </div>
                            <div className='col-span-4'>
                                <p className='font-semibold'>adam pangeran feby</p>
                                <p className='text-sm truncate-text'>{slicedtext}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5'>
                            <div>
                                <div className='w-[60px] h-[60px] bg-blue-600 rounded-full'></div>
                            </div>
                            <div className='col-span-4'>
                                <p className='font-semibold'>nabil presiden usedup</p>
                                <p className='text-sm truncate-text'>{slicedtext}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5'>
                            <div>
                                <div className='w-[60px] h-[60px] bg-red-600 rounded-full'></div>
                            </div>
                            <div className='col-span-4'>
                                <p className='font-semibold'>adam pangeran feby</p>
                                <p className='text-sm truncate-text'>{slicedtext}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5'>
                            <div>
                                <div className='w-[60px] h-[60px] bg-blue-600 rounded-full'></div>
                            </div>
                            <div className='col-span-4'>
                                <p className='font-semibold'>nabil presiden usedup</p>
                                <p className='text-sm truncate-text'>{slicedtext}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5'>
                            <div>
                                <div className='w-[60px] h-[60px] bg-red-600 rounded-full'></div>
                            </div>
                            <div className='col-span-4'>
                                <p className='font-semibold'>adam pangeran feby</p>
                                <p className='text-sm truncate-text'>{slicedtext}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5'>
                            <div>
                                <div className='w-[60px] h-[60px] bg-blue-600 rounded-full'></div>
                            </div>
                            <div className='col-span-4'>
                                <p className='font-semibold'>nabil presiden usedup</p>
                                <p className='text-sm truncate-text'>{slicedtext}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='kanan space-y-4 overflow-scroll'>
                    <div className='flex p-3 h-16 items-center border-b-2 border-slate-200 space-x-5 sticky top-0 z-10 bg-slate-50'>
                        <div className='flex justify-between items-center w-full'>
                            <div className='flex items-center gap-4'>
                                <div className='w-[40px] h-[40px] bg-black rounded-full'></div>
                                <div>
                                    <p className='font-semibold'>Toko Fiktif</p>
                                </div>
                            </div>
                            <div>
                                <BsThreeDotsVertical size={20} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='px-[20px] space-y-6'>
                            <div className='flex gap-3'>
                                <div className='w-[30px] h-[30px] rounded-full bg-green-400'></div>
                                <div className='w-[70%] bg-slate-100 rounded p-2'>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, ipsa. Ab, ducimus delectus incidunt quos eveniet, quidem atque tempore quas totam quibusdam nisi accusamus distinctio maxime, deleniti aliquam unde repellendus!</p>
                                </div>
                            </div>
                            <div className='flex flex-row-reverse gap-3'>
                                <div className='w-[30px] h-[30px] rounded-full bg-green-400'></div>
                                <div className='w-[70%] bg-slate-100 rounded p-2'>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, ipsa. Ab, ducimus delectus!</p>
                                </div>
                            </div>
                            <div className='flex gap-3'>
                                <div className='w-[30px] h-[30px] rounded-full bg-green-400'></div>
                                <div className='w-[70%] bg-slate-100 rounded p-2'>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, ipsa. Ab, ducimus delectus incidunt quos eveniet, quidem atque tempore quas totam quibusdam nisi accusamus distinctio maxime, deleniti aliquam unde repellendus!</p>
                                </div>
                            </div>
                            <div className='flex flex-row-reverse gap-3'>
                                <div className='w-[30px] h-[30px] rounded-full bg-green-400'></div>
                                <div className='w-[70%] bg-slate-100 rounded p-2'>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, ipsa. Ab, ducimus delectus!</p>
                                </div>
                            </div>
                            <div className='flex gap-3'>
                                <div className='w-[30px] h-[30px] rounded-full bg-green-400'></div>
                                <div className='w-[70%] bg-slate-100 rounded p-2'>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, ipsa. Ab, ducimus delectus incidunt quos eveniet, quidem atque tempore quas totam quibusdam nisi accusamus distinctio maxime, deleniti aliquam unde repellendus!</p>
                                </div>
                            </div>
                            <div className='flex flex-row-reverse gap-3'>
                                <div className='w-[30px] h-[30px] rounded-full bg-green-400'></div>
                                <div className='w-[70%] bg-slate-100 rounded p-2'>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, ipsa. Ab, ducimus delectus!</p>
                                </div>
                            </div>
                            <div className='flex gap-3'>
                                <div className='w-[30px] h-[30px] rounded-full bg-green-400'></div>
                                <div className='w-[70%] bg-slate-100 rounded p-2'>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, ipsa. Ab, ducimus delectus incidunt quos eveniet, quidem atque tempore quas totam quibusdam nisi accusamus distinctio maxime, deleniti aliquam unde repellendus!</p>
                                </div>
                            </div>
                            <div className='flex flex-row-reverse gap-3'>
                                <div className='w-[30px] h-[30px] rounded-full bg-green-400'></div>
                                <div className='w-[70%] bg-slate-100 rounded p-2'>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, ipsa. Ab, ducimus delectus!</p>
                                </div>
                            </div>
                        </div>
                        <div className='self-end bg-slate-200 mt-5 px-2 py-3  gap-3 flex items-center sticky bottom-0 z-10'>
                            <input type="text" className='h-[35px]' placeholder='kirim pesan...' />
                            <IoMdSend size={30} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatComponent