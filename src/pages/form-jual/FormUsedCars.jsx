import { FaPlus } from "react-icons/fa"

const FormUsedCars = () => {
     return (
          <div className="max-w-4xl mx-auto md:py-0 px-5">
               <div className="bg-primary p-6 text-white">
                    <h1 className="text-2xl font-bold mb-2">KAMU INGIN MENJUAL MOBIL</h1>
                    <p className="text-md">Kategori : <span className="text-blue-link font-bold">Mobil Bekas</span></p>
               </div>
               <p className="my-4 font-medium text-xs">SILAHKAN ISI FORM DIBAWAH INI DENGAN BENAR</p>

               <form className="w-full flex flex-wrap">
                    <div className="w-full sm:w-1/2">
                         <div className="mb-2">
                              <label htmlFor="merk" className="font-bold">Merk *</label>
                              <input type="merk" name="merk" id="merk" className="flex border-2 w-[260px] h-[35px] outline-none mt-2" />
                         </div>
                         <div className="mb-2">
                              <label htmlFor="model" className="font-bold">Model *</label>
                              <input type="model" name="model" id="model" className="flex border-2 w-[260px] h-[35px] outline-none mt-2" />
                         </div>
                         <div className="mb-2">
                              <label htmlFor="tahun" className="font-bold">Tahun *</label>
                              <input type="tahun" name="tahun" id="tahun" className="flex border-2 w-[260px] h-[35px] outline-none mt-2" />
                         </div>
                         <div className="mb-2">
                              <label htmlFor="jarakTempuh" className="font-bold">Jarak Tempuh *</label>
                              <input type="jarakTempuh" name="jarakTempuh" id="jarakTempuh" className="flex border-2 w-[260px] h-[35px] outline-none mt-2" />
                         </div>
                         <div className="mb-2">
                              <label htmlFor="bahanBakar" className="font-bold mt-2">Tipe Bahan Bakar *</label>
                              <input type="bahanBakar" name="bahanBakar" id="bahanBakar" className="flex border-2 w-[260px] h-[35px] outline-none mt-2" />
                         </div>
                         <div className="mb-2">
                              <label htmlFor="kapasitasMesin" className="font-bold mt-2">Kapasitas Mesin CC *</label>
                              <input type="kapasitasMesin" name="kapasitasMesin" id="kapasitasMesin" className="flex border-2 w-[260px] h-[35px] outline-none mt-2" />
                         </div>
                         <div className="mt-4">
                              <button type="submit" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium text-sm px-5 py-2.5 mr-2 mb-2">JUAL SEKARANG</button>
                         </div>
                    </div>

                    <div className="w-1/2">
                         <div className="mb-2">
                              <label htmlFor="judulIklan" className="font-bold">Judul Iklan *</label>
                              <input type="judulIklan" name="judulIklan" id="judulIklan" className="flex border-2 w-[260px] h-[35px] outline-none mt-2" />
                         </div>
                         <div className="mb-2">
                              <label htmlFor="deksripsiIklan" className="font-bold">Deskripsi Iklan *</label>
                              <textarea name="deksripsiIklan" id="deksripsiIklan" cols="0" rows="4" className="flex border-2 border-gray-200 outline-none focus:border-2 mt-2 w-[260px]"></textarea>
                         </div>
                         <div className="mb-2">
                              <label htmlFor="harga" className="font-bold">Harga *</label>
                              <input type="harga" name="harga" id="harga" className="flex border-2 w-[260px] h-[35px] outline-none mt-2" />
                         </div>
                         <div className="mb-2">
                              <label htmlFor="foto" className="font-bold">Unggah Foto</label>
                              <div className="grid grid-cols-3 mr-0 sm:mr-60 mt-2 gap-4">
                                   {Array.from({ length: 6 }).map((_, index) => (
                                        <label htmlFor={`fileInput-${index}`} className="relative rounded-md p-5 cursor-pointer border-2 border-black">
                                             <input
                                                  type="file"
                                                  id={`fileInput-${index}`}
                                                  className="hidden"
                                             />
                                             <FaPlus className="text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black" />
                                        </label>
                                   ))}
                              </div>
                         </div>
                    </div>
               </form>
          </div>
     )
}

export default FormUsedCars