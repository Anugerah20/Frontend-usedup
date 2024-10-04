import React from "react";
import { Button, List } from "flowbite-react";

const BeliPaketPremium = () => {
     // Dummy Data (buat sementara)
     const dataPaketPremium = [
          {
               id: Math.random(),
               nama_paket: "Paket Kantong Pelajar",
               harga: 25000,
               deskripsi: "Cocok sekali buat anda yang masih minim budget tapi mau berlangganan"
          },
          {
               id: Math.random(),
               nama_paket: "Paket Kantong Tebal",
               harga: 100000,
               deskripsi: "Cocok sekali buat anda yang sudah ada budget lebih untuk berlangganan"
          },
          {
               id: Math.random(),
               nama_paket: "Paket Kantong Sultan",
               harga: 200000,
               deskripsi: "Cocok sekali buat anda yang sudah menjalani perusahaan untuk berlangganan premium"
          },
     ];

     return (
          <div className="max-w-6xl mx-auto px-4 py-8">
               <div className="welcome-message space-y-4 text-center mb-8">
                    <h1 className="text-primary font-bold text-2xl">
                         Silahkan Pilih Paket Premium Anda!
                    </h1>
                    <p className="text-sm text-secondary">
                         Ada berbagai pilihan paket premium yang bisa anda pilih sesuai kebutuhan anda.
                    </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {dataPaketPremium.map((data) => (
                         <div key={data.id} className="paket border p-6 bg-white shadow-sm rounded-lg flex flex-col justify-between">
                              <div className="paket-header space-y-3">
                                   <h2 className="text-primary text-xl">
                                        {data.nama_paket}
                                   </h2>
                                   <p className="text-primary text-2xl font-bold">
                                        Rp {data.harga.toLocaleString()}
                                   </p>
                                   <hr className="my-4" />
                                   <div className="benefit text-sm">
                                        <List className="border-0 space-y-2">
                                             {data.deskripsi}
                                        </List>
                                   </div>
                              </div>
                              <Button
                                   color="dark"
                                   className="mt-6 w-full"
                              >
                                   Beli Paket
                              </Button>
                         </div>
                    ))}
               </div>
          </div>
     );
};

export default BeliPaketPremium;