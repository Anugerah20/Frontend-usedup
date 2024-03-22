import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApiGet, useApiDelete } from '../services/apiService';
import { toastSuccess } from '../services/toatsService';

const MyAdvertisement = () => {
     const [dataAdvert, setDataAdvert] = useState([]);
     const userId = localStorage.getItem("userId");

     // Menampilkan Iklan yang dibuat oleh user
     const getDataAdvert = async () => {
          try {
               const getData = await useApiGet(`/user/${userId}`);
               setDataAdvert(getData.data.advert);
          } catch (error) {
               console.log("Show Data Advert", error);
          }
     }

     console.log(dataAdvert)

     useEffect(() => {
          getDataAdvert();
     }, []);

     // Menghapus Iklan yang dibuat oleh user
     const deleteAdvert = async (id) => {
          try {
               await useApiDelete(`/advert/deleteAdvert/${id}`);
               getDataAdvert();
               toastSuccess("Iklan saya berhasil dihapus");

          } catch (error) {
               console.log("Delete Data Advert", error);
          }
     }

     return (
          <div className="max-w-6xl mx-auto">
               <h2 className="font-bold text-primary text-xl md:text-2xl mb-4">
                    Iklan Saya
               </h2>
               <p className="text-sm text-gray-breadcrumb-secondary">Dibawah ini merupakan iklan yang tersedia</p>
               <hr className="w-[295px] mt-3" />

               {dataAdvert.map((item, index) => (
                    <div key={item.id} className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 my-5">
                         <div className="flex gap-10">
                              <div className="text-sm font-bold text-primary">
                                   {index + 1}.
                              </div>
                              <img src={item.image[0]} alt="Mobil" className="w-60 h-32 md:w-48 md:h-32 xl:w-60 xl:h-40 object-cover rounded row-start-2" />
                         </div>
                         <div className="ml-12 md:ml-5 lg:ml-0">
                              <h5 className="text-primary text-xl font-bold">{item.title}</h5>
                              <p className="text-sm mt-2 text-gray-breadcrumb">
                                   {item.id}
                              </p>
                              <div className="flex flex-wrap my-5 gap-4">
                                   <Link to={`/detail/${item.id}`} className="text-md text-blue-link underline">Lihat Iklan</Link>
                                   {/* <p className="text-md text-gray-breadcrumb">Dilihat 10 Kali</p> */}
                              </div>
                         </div>
                         <div className="ml-12 md:ml-10 lg:ml-0 flex sm:justify-start md:justify-end lg:justify-end">
                              <button onClick={() => deleteAdvert(item.id)} className="flex justify-center items-center text-sm w-28 h-10 bg-red-500 hover:bg-red-600 text-white transition rounded">Hapus Iklan</button>
                         </div>
                    </div>
               ))}
          </div>
     )
}

export default MyAdvertisement;
