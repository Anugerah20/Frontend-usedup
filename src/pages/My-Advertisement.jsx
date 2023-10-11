import { Link } from 'react-router-dom';
import { Tabs } from 'flowbite-react';
import { TabItem } from 'flowbite-react/lib/esm/components/Tab/TabItem';
import DataDummy from '../Data/DataDummy';

const MyAdvertisement = () => {
     // Menampilkan 3 iklan
     const dataShow = DataDummy.slice(0, 3);
     return (
          <div className="max-w-6xl mx-auto">
               <h2 className="font-bold text-primary text-xl md:text-2xl mb-4">
                    Iklan Saya
               </h2>

               <Tabs.Group
                    aria-label="tabs"
                    className="text-primary"
               >
                    <TabItem
                         active
                         title="Aktif"
                    >
                    </TabItem>
                    <Tabs.Item
                         title="Tidak Aktif"
                    >
                    </Tabs.Item>
                    <Tabs.Item
                         title="Ditolak"
                    >
                    </Tabs.Item>
               </Tabs.Group >
               {dataShow.map((item, index) => (
                    <div key={item.id} className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 my-5">
                         <div className="flex gap-10">
                              <div className="text-sm font-bold text-primary">
                                   {index + 1}.
                              </div>
                              <img src={item.image} alt="Mobil" className="w-60 h-32 md:w-48 md:h-32 xl:w-60 xl:h-40 object-cover rounded row-start-2" />
                         </div>
                         <div className="ml-12 md:ml-5 lg:ml-0">
                              <h5 className="text-primary text-xl font-bold">{item.name}</h5>
                              <p className="text-sm mt-2 text-gray-breadcrumb">ID 21092109212</p>
                              <div className="flex flex-wrap my-5 gap-4">
                                   <Link to="/lihat-iklan" className="text-md text-blue-link underline">Lihat Iklan</Link>
                                   <p className="text-md text-gray-breadcrumb">Dilihat 10 Kali</p>
                              </div>
                         </div>
                         <div className="ml-12 md:ml-10 lg:ml-0 flex sm:justify-start md:justify-end lg:justify-end">
                              <button className="flex justify-center items-center text-sm w-28 h-10 bg-red-500 hover:bg-red-600 text-white transition rounded">Hapus Iklan</button>
                         </div>
                    </div>
               ))}
          </div >
     )
}

export default MyAdvertisement