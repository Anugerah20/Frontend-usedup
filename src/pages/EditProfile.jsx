/* eslint-disable react-hooks/rules-of-hooks */
import { BiChevronRight } from "react-icons/bi"
import { useEffect } from "react";
import { useApiGet, useApiPut } from "../services/apiService";
import { useForm } from "react-hook-form";
import { toastError, toastSuccess } from "../services/toatsService";

const EditProfile = () => {
     const {
          register,
          handleSubmit,
          setValue,
          formState: { errors },
     } = useForm();

     const userId = localStorage.getItem("userId");

     const fetchUser = async () => {
          try {
               const res = await useApiGet(`/user/${userId}`);
               setValue('fullname', res.data.fullname)
               setValue('no_telp', res.data.no_telp)
               setValue('bio', res.data.bio)
          } catch (error) {
               console.log(error);
          }
     }

     useEffect(() => {
          fetchUser();
     }, []);

     const onUpdate = async (data) => {
          try {
               const res = await useApiPut(`/user/edit-profile/${userId}`, data)
               console.log(res);
               toastSuccess(`sukses ${res.data.message}`)
          } catch (error) {
               toastError('gagal')
               console.log(error);
          }
     }

     return (
          <div className="my-14 mx-10">

               <div className="breadcrumb">
                    <span className="breadcrumb-no-active text-gray-breadcrumb"><a href="#">Profile</a></span>
                    <span className="breadcrumb-divider text-gray-breadcrumb"> <BiChevronRight /> </span>
                    <span className="breadcrumb-active text-blue-breadcrumb"><a href="#">Edit Profile</a></span>
               </div>

               <h1 className="text-3xl font-bold mt-10 black-breadcrumb">Edit Profil</h1>
               <p className="text-md mt-1 mb-5 text-gray-breadcrumb-secondary">Dibawah ini merupakan informasi yang bisa diubah</p>

               <form onSubmit={handleSubmit(onUpdate)}>
                    <div className="space-y-4 w-full md:w-1/2">
                         <div>
                              <label htmlFor="fullname">Nama lengkap</label>
                              <input type="text" className="" name="fullname" id="fullname"
                                   {...register('fullname', {
                                        required: true
                                   })}
                              />
                         </div>
                         <div>
                              <label htmlFor="no_telp">Nomor Telpon</label>
                              <input type="text" className="" name="no_telp" id="no_telp"
                                   {...register('no_telp', {
                                        required: true
                                   })}
                              />
                         </div>
                         <div>
                              <label htmlFor="bio">Tentang saya</label>
                              <textarea name="bio" id="bio" className=""
                                   {...register('bio', {
                                        required: true
                                   })}
                              ></textarea>
                         </div>
                         <button className="btn-profile bg-black-breadcrumb text-white-breadcrumb hover:bg-black-breadcrumb-secondary">simpan</button>
                         <div className="border-bottom text-input-gray"></div>
                    </div>
               </form >
          </div >
     )
}

export default EditProfile
