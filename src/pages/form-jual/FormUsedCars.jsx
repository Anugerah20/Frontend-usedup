/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, Fragment } from "react"
import { FaPlus, FaTimes } from "react-icons/fa"
import { set, useForm } from "react-hook-form"
import ImageUploading from "react-images-uploading"
import Modal from "react-modal"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import { toastSuccess, toastError } from "../../services/toatsService"
import { Spinner } from "flowbite-react"
import { useApiGet, useApiPost } from "../../services/apiService"
import { BsEyeFill } from "react-icons/bs"
import { MdSell } from "react-icons/md";

import Map from "../../map/Map";

const FormUsedCars = () => {
     const {
          register,
          handleSubmit,
          formState: { errors },
          reset
     } = useForm()

     const [images, setImages] = useState([])
     const [modalIsOpen, setModalIsOpen] = useState(false)
     const [selectedImage, setSelectedImage] = useState(null)
     const [categories, setCategories] = useState([])
     const [provinces, setProvinces] = useState([])
     const [loading, setLoading] = useState(false)
     const [location, setLocation] = useState({ latitude: '', longitude: '' })
     const [quotaExhausted, setQuotaExhausted] = useState(false)
     const maxNumber = 6


     let urlImageUploaded = []

     const userId = localStorage.getItem('userId')

     // Function update location & get latitude and longitude
     const handleLocationChange = (lat, lng) => {
          setLocation({ latitude: lat, longitude: lng });
     }

     const fetchCategory = async () => {
          try {
               const res = await useApiGet('/additional/category');
               setCategories(res.data?.data);
          } catch (error) {
               console.log('error my category:', error);
          }
     }

     const fetchProvince = async () => {
          try {
               const res = await useApiGet('/additional/province');
               setProvinces(res.data?.data);
          } catch (error) {
               console.log('error while fetch province:', error);
          }
     }

     useEffect(() => {
          fetchCategory()
          fetchProvince()
     }, [])


     /* Buat ENV */
     const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
     const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY
     const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME

     const uploadImage = async (imageFile) => {
          const formData = new FormData()
          formData.append('file', imageFile)
          formData.append("upload_preset", uploadPreset);
          formData.append("api_key", apiKey);

          try {
               const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData)
               urlImageUploaded.push(response.data.secure_url)
          } catch (e) {
               alert(e)
          }
     }

     const onChange = (imageList) => {
          setImages(imageList);
     };

     const openModal = (index) => {
          setSelectedImage(index);
          setModalIsOpen(true);
     };

     const closeModal = () => {
          setSelectedImage(null);
          setModalIsOpen(false);
     };

     // if the advertising quota runs out, there will be a notification
     const checkQuota = async () => {
          try {
               setLoading(true);
               const userId = localStorage.getItem("userId");
               const res = await useApiGet(`/user/${userId}`);

               if (res.data.kuota_iklan > 0) {
                    return true;
               } else {
                    return false;
               }
          } catch (error) {
               console.log('error check quota:', error);
               return false;
          } finally {
               setLoading(false);
          }
     }


     const submitForm = async (data) => {
          try {
               setLoading(true)

               const dataForm = {
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    categoryId: data.category,
                    image: urlImageUploaded,
                    userId,
                    provinceId: data.provinsi,
                    address: data.address,
                    longitude: location.longitude,
                    latitude: location.latitude
               }

               console.log('dataForm:', dataForm);

               await useApiPost('/advert/advert', dataForm);

               reset()
               setImages([])
               toastSuccess('Iklan sukses dibuat')
               urlImageUploaded = []
               window.location.href = '/berhasil-jual'
          } catch (error) {
               console.error(error);
               toastError('Iklan gagal dibuat!')
          } finally {
               setLoading(false)
          }
     }

     const onSubmit = async (data) => {
          try {
               setLoading(true)
               setQuotaExhausted(false)

               // check quota
               const isQuotaAvailable = await checkQuota();

               if (!isQuotaAvailable) {
                    setQuotaExhausted(true);
                    toast.info('Kuota iklan anda habis, silahkan beli kuota iklan terlebih dahulu');
                    reset();
                    return;
               }

               if (images.length === 0 || images.length > maxNumber) {
                    throw Error('Tolong minimal 1 gambar dan maksimal 6 gambar')
               }

               const uploadedImage = await Promise.all(
                    images.map((image) => uploadImage(image.file))
               )

               await submitForm({
                    ...data,
                    photos: uploadedImage,
               })
               setLoading(false)

          } catch (error) {
               console.error(error);
               toastError('Iklan gagal dibuat!')
               setLoading(false)
          } finally {
               setLoading(false)
          }
     };

     return (
          <Fragment>
               {loading &&
                    <div className="fixed w-full h-full top-0 left-0 bg-black/30 z-50">
                         <div className="flex justify-center items-center w-full h-full">
                              <div className="flex flex-col items-center justify-center space-y-4">
                                   <Spinner size='xl' />
                                   <p className="text-white text-center">
                                        Iklan sedang diproses...
                                   </p>
                              </div>
                         </div>
                    </div>
               }
               <div className="max-w-5xl h-auto mx-auto md:py-0 px-5">
                    <div className="bg-primary p-6 text-white-breadcrumb">
                         <h1 className="text-2xl font-bold mb-2">FORM JUAL</h1>
                    </div>
                    <p className="my-4 font-medium text-xs">
                         SILAHKAN ISI FORM DIBAWAH INI DENGAN BENAR
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-wrap">
                         <div className="w-full sm:w-1/2">

                              <div className="mb-2">
                                   <label htmlFor="category" className="font-bold">
                                        Kategori <span className="text-red-500">*</span>
                                   </label>
                                   <select
                                        id="category"
                                        className="mt-2 border disabled:cursor-not-allowed"
                                        {...register("category", { required: true })}
                                        disabled={loading}
                                   >
                                        <option value="" selected disabled>-- Pilih Kategori --</option>
                                        {categories?.map((category) => (
                                             <option key={category.id} value={category.id}>{category.name}</option>
                                        ))}
                                   </select>
                                   {errors.category && errors.category.type === "required" && (
                                        <span className="flex text-sm text-red-error">Category required</span>
                                   )}
                              </div>

                              <div className="mb-2">
                                   <label htmlFor="provinsi" className="font-bold">
                                        Provinsi <span className="text-red-500">*</span>
                                   </label>
                                   <select
                                        id="category"
                                        className="mt-2 border disabled:cursor-not-allowed"
                                        {...register("provinsi", { required: true })}
                                        disabled={loading}
                                   >
                                        <option value="" selected disabled>-- Pilih Provinsi --</option>
                                        {provinces?.map((province) => (
                                             <option key={province.id} value={province.id}>{province.name}</option>
                                        ))}
                                   </select>
                                   {errors.provinsi && errors.provinsi.type === "required" && (
                                        <span className="flex text-sm text-red-error">Provinsi required</span>
                                   )}
                              </div>

                              <div className="mb-2">
                                   <label htmlFor="merk" className="font-bold">
                                        Judul Iklan <span className="text-red-500">*</span>
                                   </label>
                                   <input
                                        type="text"
                                        id="merk"
                                        className="mt-2 border disabled:cursor-not-allowed"
                                        style={{ borderWidth: "1px" }}
                                        disabled={loading}
                                        {...register("title", { required: true, minLength: 10 })}
                                   />
                                   {errors.title && errors.title.type === "required" && (
                                        <span className="text-sm text-red-error">Title required</span>
                                   )}
                                   {errors.title && errors.title.type === "minLength" && (
                                        <span className="text-sm text-red-error">
                                             Title min 10 characters
                                        </span>
                                   )}
                              </div>
                              <div className="mb-2">
                                   <label htmlFor="deskripsiIklan" className="font-bold">
                                        Deskripsi Iklan <span className="text-red-500">*</span>
                                   </label>
                                   <textarea
                                        id="deskripsiIklan"
                                        cols="0"
                                        rows="4"
                                        className="mt-2 border disabled:cursor-not-allowed"
                                        disabled={loading}
                                        {...register("description", { required: true, minLength: 30 })}
                                   ></textarea>
                                   {errors.description && errors.description.type === "required" && (
                                        <span className="text-sm text-red-error">
                                             Description required
                                        </span>
                                   )}
                                   {errors.description && errors.description.type === "minLength" && (
                                        <span className="text-sm text-red-error">
                                             Description min 30 characters
                                        </span>
                                   )}
                              </div>

                              <hr className="w-[260px] mt-5" />
                              <h3 className="font-bold mt-4 mb-2">PASANG HARGA</h3>
                              <div className="mb-2">
                                   <label htmlFor="harga" className="font-bold">
                                        Harga <span className="text-red-500">*</span>
                                   </label>
                                   <input
                                        type="number"
                                        id="harga"
                                        className="mt-2 border disabled:cursor-not-allowed"
                                        style={{ borderWidth: "1px" }}
                                        disabled={loading}
                                        {...register("price", { required: true, minLength: 5 })}
                                   />
                                   {errors.price && errors.price.type === "required" && (
                                        <span className="text-sm text-red-error">Price required</span>
                                   )}
                                   {errors.price && errors.price.type === "minLength" && (
                                        <span className="text-sm text-red-error">
                                             Price min 5 numbers
                                        </span>
                                   )}
                              </div>
                              <hr className="w-[260px] mt-5" />
                         </div>

                         <div className="md:w-1/2 w-full">
                              <div className="mb-2 sm:mx-8 md:mx-8 lg:mx-8">
                                   <label htmlFor="detailAddress" className="font-bold">
                                        Alamat Lengkap <span className="text-red-500">*</span>
                                   </label>
                                   <textarea
                                        id="detailAddress"
                                        cols="0"
                                        rows="4"
                                        className="mt-2 border disabled:cursor-not-allowed"
                                        disabled={loading}
                                        {...register("address", { required: true, minLength: 30 })}
                                   ></textarea>
                                   {errors.address && errors.address.type === "required" && (
                                        <span className="text-sm text-red-error">
                                             Address required
                                        </span>
                                   )}
                                   {errors.address && errors.address.type === "minLength" && (
                                        <span className="text-sm text-red-error">
                                             Address min 30 characters
                                        </span>
                                   )}
                              </div>


                              <div className="mb-2 sm:mx-8 md:mx-8 lg:mx-8">
                                   <div className="flex flex-col">
                                        <label htmlFor="location" className="font-bold">
                                             Lokasi Anda
                                        </label>
                                        <label className="text-xs mt-2 text-gray-400">
                                             Klik atau search lokasi untuk menentukan lokasi iklan
                                        </label>
                                   </div>
                                   <div className="mt-2">
                                        <Map onLocationChange={handleLocationChange} />
                                   </div>
                              </div>

                              <div className="mb-2 mt-4 sm:mx-8 md:mx-8 lg:mx-8">
                                   <div className="flex flex-col">
                                        <label htmlFor="foto" className="font-bold">
                                             UNGGAH FOTO
                                        </label>
                                        <label>
                                             <span className="text-xs text-gray-400">
                                                  Foto pertama akan menjadi cover iklan
                                             </span>
                                        </label>
                                   </div>
                                   <ImageUploading
                                        multiple
                                        value={images}
                                        onChange={onChange}
                                        dataURLKey="dataURL"
                                        acceptType={["png", "jpg", "jpeg", "webp"]}
                                   >
                                        {({ imageList, onImageUpload, onImageRemove }) => (
                                             <div className="grid md:grid-cols-3 grid-cols-2 place-items-stretch mt-2 gap-4">
                                                  {imageList?.map((image, index) => (
                                                       <div
                                                            key={index}
                                                            className="relative cursor-pointer rounded-lg group transition"
                                                       >
                                                            <div
                                                                 className="absolute invisible group-hover:visible bg-black/20 w-full h-full rounded-lg flex justify-center items-center"
                                                                 onClick={() => openModal(index)}
                                                            >
                                                                 <BsEyeFill className="text-white" />
                                                            </div>

                                                            <img
                                                                 src={image.dataURL}
                                                                 alt={`Preview-${index}`}
                                                                 className="object-cover h-28 w-36 flex justify-center items-center rounded-lg"
                                                            />

                                                            <div className="flex justify-center items-center">
                                                                 <span
                                                                      className="text-red-500 bg-white transition hover:bg-gray-100 active:bg-gray-200 shadow-lg rounded-full absolute -right-2 -top-2 sm:-right-2 sm:-top-2 md:-right-2 md:-top-2 flex justify-center items-center w-5 h-5"
                                                                      title="Hapus"
                                                                      onClick={() => onImageRemove(index)}
                                                                 >
                                                                      <FaTimes />
                                                                 </span>
                                                            </div>
                                                       </div>
                                                  ))}
                                                  {imageList.length === 6 ? null : (
                                                       <label
                                                            onClick={onImageUpload}
                                                            className="relative p-5 cursor-pointer border border-gray-300 rounded-lg h-28 w-auto"
                                                            {...register("photo", { required: imageList.length === 0 })}
                                                       >
                                                            <FaPlus className="text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black" />
                                                       </label>
                                                  )}

                                             </div>
                                        )}
                                   </ImageUploading>
                                   {errors.photo && errors.photo.type === "required" && (
                                        <span className="text-sm text-red-error">Photo required</span>
                                   )}
                                   <div className="mt-6">
                                        {loading ?
                                             <Spinner />
                                             :
                                             <button
                                                  type="submit"
                                                  className="text-white w-full bg-gray-800 hover:bg-gray-900 active:bg-gray-950 focus:outline-none font-medium text-sm px-3 py-2.5 mr-2 mb-2 transition"
                                                  disabled={quotaExhausted}
                                             >
                                                  {/* menjalankan kuota iklan habis button disable */}
                                                  <span className="flex items-center justify-center py-1 text-base">
                                                       {
                                                            quotaExhausted ? 'KUOTA IKLAN HABIS' : 'JUAL SEKARANG'
                                                       }
                                                       <MdSell className="ml-2" />
                                                  </span>
                                             </button>
                                        }
                                   </div>

                                   <Modal
                                        isOpen={modalIsOpen}
                                        onRequestClose={closeModal}
                                        contentLabel="Gambar Detail"
                                   >
                                        <div className="flex justify-end">
                                             <span onClick={closeModal} className="flex cursor-pointer">
                                                  <FaTimes title="Close" />
                                             </span>
                                        </div>
                                        {selectedImage !== null && (
                                             <img
                                                  src={images[selectedImage].dataURL}
                                                  alt={`Detail-${selectedImage}`}
                                                  className="mx-auto w-full h-full object-contain"
                                             />
                                        )}
                                   </Modal>

                              </div>
                         </div>
                         <ToastContainer />
                    </form>
               </div>
          </Fragment>
     );
};

export default FormUsedCars
