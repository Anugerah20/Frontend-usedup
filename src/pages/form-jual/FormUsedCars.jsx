import { FaPlus } from "react-icons/fa"
import { useForm } from "react-hook-form"

const FormUsedCars = () => {
     const {
          register,
          handleSubmit,
          formState: { errors },
     } = useForm()

     const onSubmit = (data) => {
          console.log(data);
     }

     return (
          <div className="max-w-4xl mx-auto md:py-0 px-5">
               <div className="bg-primary p-6 text-white-breadcrumb">
                    <h1 className="text-2xl font-bold mb-2">KAMU INGIN MENJUAL MOBIL</h1>
                    <p className="text-md">Kategori: <span className="text-blue-link font-bold">Mobil Bekas</span></p>
               </div>
               <p className="my-4 font-medium text-xs">SILAHKAN ISI FORM DIBAWAH INI DENGAN BENAR</p>

               <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-wrap">
                    <div className="w-full sm:w-1/2">
                         <div className="mb-2">
                              <label htmlFor="merk" className="font-bold">Judul Iklan *</label>
                              <input
                                   type="merk"
                                   id="merk"
                                   className="flex border-2 w-[260px] h-[35px] outline-none mt-2"
                                   {...register("title", { required: true, minLength: 10 })}
                              />
                              {errors.title && errors.title.type === "required" && <span className="text-sm text-red-error">Title required</span>}
                              {errors.title && errors.title.type === "minLength" && <span className="text-sm text-red-error">Title min 10 character</span>}
                         </div>
                         <div className="mb-2">
                              <label htmlFor="deksripsiIklan" className="font-bold">Deskripsi Iklan *</label>
                              <textarea
                                   id="deksripsiIklan"
                                   cols="0" rows="4"
                                   className="flex border-2 border-gray-200 outline-none focus:border-2 mt-2 w-[260px] p-0 rounded-none"
                                   {...register("description", { required: true, minLength: 30 })}
                              >
                              </textarea>
                              {errors.description && errors.description.type === "required" && <span className="text-sm text-red-error">Description required</span>}
                              {errors.description && errors.description.type === "minLength" && <span className="text-sm text-red-error"> Description min 30 character</span>}
                         </div>
                         <hr className="w-[260px] mt-5" />
                         <h3 className="font-bold my-4">PASANG HARGA</h3>
                         <div className="mb-2">
                              <label htmlFor="harga" className="font-bold">Harga *</label>
                              <input
                                   type="harga"
                                   id="harga"
                                   className="flex border-2 w-[260px] h-[35px] outline-none mt-2"
                                   {...register("price", { required: true, minLength: 5 })}
                              />
                              {errors.price && errors.price.type === "required" && <span className="text-sm text-red-error">Price required</span>}
                              {errors.price && errors.price.type === "minLength" && <span className="text-sm text-red-error"> Price min 5 number </span>}
                         </div>
                         <hr className="w-[260px] mt-5" />
                    </div>

                    <div className="w-1/2">
                         <div className="mb-2">
                              <label htmlFor="foto" className="font-bold">UNGGAH FOTO</label>
                              <div className="grid grid-cols-3 mr-0 sm:mr-60 mt-2 gap-4">
                                   {Array.from({ length: 6 }).map((_, index) => (
                                        <label key={index} htmlFor={`fileInput-${index}`} className="relative p-5 cursor-pointer border-2 border-black">
                                             <input
                                                  type="file"
                                                  id={`fileInput-${index}`}
                                                  className="hidden"
                                                  {...register("photo", { required: true })}
                                             />
                                             <FaPlus className="text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black" />
                                        </label>
                                   ))}
                              </div>
                              {errors.photo && errors.photo.type === "required" && <span className="text-sm text-red-error">Photo required</span>}
                              <div className="mt-6">
                                   <button type="submit" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium text-sm px-5 py-2.5 mr-2 mb-2">JUAL SEKARANG</button>
                              </div>
                         </div>
                    </div>
               </form>
          </div >
     )
}

export default FormUsedCars