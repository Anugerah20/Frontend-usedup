import React, { useState, useEffect } from 'react'
import { IoMdSend } from "react-icons/io";
import { Dropdown } from "flowbite-react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useApiPost } from '../../services/apiService';

const ChatComponent = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [messages, setMessages] = useState([]);
    const [penerimaChat, setPenerimaChat] = useState([]);

    const userLogin = localStorage.getItem('userId');

    const getRooms = async () => {
        const userId = localStorage.getItem('userId');
        const response = await useApiPost('/chat/getRoom', { userId });
        console.log('get room', response.data.rooms);
        setRooms(response.data.rooms);
    }

    const getMessages = async (room) => {
        const userId = localStorage.getItem('userId');
        const data = {
            userid: userId,
            room
        }
        const response = await useApiPost('/chat/getMessages', { data });
        console.log(response.data.roomMessages);
        setMessages(response.data.roomMessages.messages);
        setPenerimaChat(response.data.roomMessages.users);
    }

    useEffect(() => {
        getRooms();
        getMessages();
    }, [])

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
                        {rooms.map((room) => (
                            <div key={room.id} className='flex items-center gap-5 cursor-pointer' onClick={() => getMessages(room)}>
                                <div>
                                    <div>
                                        <img className='w-[60px] h-[60px] rounded-full' src={room.users[0].foto} alt="" />
                                    </div>
                                </div>
                                <div className='col-span-4'>
                                    <p className='font-semibold'>{room.users[0].fullname}</p>
                                    <p className='text-sm truncate-text'>{room.users[0].messages[0].content.length >= 50 ? room.users[0].messages[0].content.slice(0, 50) + '...' : room.users[0].messages[0].content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='kanan flex flex-col space-y-4 overflow-scroll'>
                    <div className='flex p-3 h-16 items-center border-b-2 border-slate-200 space-x-5 sticky top-0 z-10 bg-slate-50'>
                        {penerimaChat.map(receiver => (
                            <div key={receiver.id} className='flex justify-between items-center w-full'>
                                <div className='flex items-center gap-4'>
                                    <div >
                                        <img className='w-[40px] h-[40px] rounded-full' src={receiver.foto} alt="" />
                                    </div>
                                    <div>
                                        <p className='font-semibold'>{receiver.fullname}</p>
                                    </div>
                                </div>
                                <div className='relative'>
                                    <BsThreeDotsVertical className='cursor-pointer' size={20} onClick={() => setShowDropdown(!showDropdown)} />
                                    <div className={`${showDropdown ? 'visible' : 'hidden'} absolute bg-white left-[-55px] rounded border-2 border-slate-200 p-1 px-3 space-y-1 font-semibold text-sm`}>
                                        <button>option</button>
                                        <button>option</button>
                                        <button>option</button>
                                    </div>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                    <div className='flex-1 flex flex-col justify-between'>
                        <div className='flex flex-col'>
                            {messages.map(message => (
                                <div key={message.id} className='px-[20px] mb-5'>
                                    <div className={`${message.senderId === userLogin ? 'flex-row-reverse' : ''} flex gap-3`}>
                                        <div>
                                            <img className='w-[30px] h-[30px] rounded-full' src={message.sender.foto} alt="" />
                                        </div>
                                        <div className='w-[70%] bg-slate-100 rounded p-2'>
                                            <p>{message.content}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='w-full bg-slate-200 px-2 py-3 gap-3 flex items-center sticky bottom-0 z-10'>
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