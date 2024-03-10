import { IoChatbox } from "react-icons/io5"

function Chat() {
    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold">Chats</h1>
            <div className="grid grid-cols-5 mt-8">
                <div className="list-user-chat border-r col-span-2">
                    <div className="user-chat flex items-center space-x-3 hover:bg-gray-50 transition hover:cursor-pointer p-4">
                        <div className="user-chat__image">
                            <img src="https://ui-avatars.com/api/?name=John+Doe" alt="user" className="rounded-full" width='50px' />
                        </div>
                        <div className="user-chat__content w-full">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold">John Doe</h3>
                                <p className="text-xs text-gray-400">20:00</p>
                            </div>
                            <p className="text-sm text-gray-500 line-clamp-1">
                                Hi, apakah barangnya masih ada?
                            </p>
                        </div>
                    </div>
                    <div className="user-chat flex items-center space-x-3 hover:bg-gray-50 transition hover:cursor-pointer p-4">
                        <div className="user-chat__image">
                            <img src="https://ui-avatars.com/api/?name=John+Doe" alt="user" className="rounded-full" width='50px' />
                        </div>
                        <div className="user-chat__content w-full">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold">John Doe</h3>
                                <p className="text-xs text-gray-400">20:00</p>
                            </div>
                            <p className="text-sm text-gray-500 line-clamp-1">
                                Hi, apakah barangnya masih ada?
                            </p>
                        </div>
                    </div>
                    <div className="user-chat flex items-center space-x-3 hover:bg-gray-50 transition hover:cursor-pointer p-4">
                        <div className="user-chat__image">
                            <img src="https://ui-avatars.com/api/?name=John+Doe" alt="user" className="rounded-full" width='50px' />
                        </div>
                        <div className="user-chat__content w-full">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold">John Doe</h3>
                                <p className="text-xs text-gray-400">20:00</p>
                            </div>
                            <p className="text-sm text-gray-500 line-clamp-1">
                                Hi, apakah barangnya masih ada?
                            </p>
                        </div>
                    </div>
                </div>
                <div className="introduce flex justify-center items-center col-span-3">
                    <div className="introduce">
                        <div className="introduce__content text-sm text-gray-400 text-center">
                            <p className="">Selamat Datang di fitur chat!</p>
                            silahkan lakukan tawar menawar sampai deal!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat