import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApiGet, useApiDelete } from '../services/apiService';
import { toastSuccess } from '../services/toatsService';
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const MyAdvertisement = () => {
     const [dataAdvert, setDataAdvert] = useState([]);
     const [openModal, setOpenModal] = useState(false);
     const [deleteItemId, setDeleteItemId] = useState(null);
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

     // Fungsi untuk menampilkan modal konfirmasi hapus iklan
     const openDeleteModal = (id) => {
          setDeleteItemId(id)
          setOpenModal(true);
     }

     // Fungsi untuk menutup modal konfirmasi hapus iklan
     const closeDeleteModal = () => {
          setOpenModal(false);
     }

     // Menghapus Iklan yang dibuat oleh user
     const deleteAdvert = async () => {
          try {
               if (deleteItemId) {
                    await useApiDelete(`/advert/deleteAdvert/${deleteItemId}`);
                    getDataAdvert();
                    toastSuccess("Iklan saya berhasil dihapus");
                    closeDeleteModal();
                    setDeleteItemId(null);
               } else {
                    console.log("ID iklan tidak valid");
               }

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
                              <button onClick={() => openDeleteModal(item.id)} className="flex justify-center items-center text-sm w-28 h-10 bg-red-500 hover:bg-red-600 text-white transition rounded">Hapus Iklan</button>
                         </div>
                    </div>
               ))}

               {/* Modal Konfirmasi Hapus Iklan */}
               <Modal show={openModal} size="md" onClose={closeDeleteModal} popup>
                    <Modal.Body>
                         <div className="text-center">
                              <HiOutlineExclamationCircle className="mx-auto my-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                   Apakah anda yakin mau menghapus iklan ini?
                              </h3>
                              <div className="flex justify-center gap-4">
                                   <Button color="failure" onClick={deleteAdvert}>
                                        Iya, hapus iklan
                                   </Button>
                                   <Button color="gray" onClick={closeDeleteModal}>
                                        Batal
                                   </Button>
                              </div>
                         </div>
                    </Modal.Body>
               </Modal>
          </div>
     )
}

export default MyAdvertisement;
