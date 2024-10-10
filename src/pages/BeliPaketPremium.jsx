/* eslint-disable react-hooks/rules-of-hooks */
import { Fragment, useEffect, useState } from "react";
import { Alert, Button, Modal, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import { useApiGet, useApiPost } from "../services/apiService";
import { formatToIDR } from "../utils/FormatRupiah";
import { toast } from "react-toastify";
import { BsInfoCircleFill } from "react-icons/bs";
import {  FaStar } from "react-icons/fa";

const BeliPaketPremium = () => {
     const [paket, setPaket] = useState([]);
     const [showModalKeranjang, setShowModalKeranjang] = useState(false);
     const [linkPembayaran, setLinkPembayaran] = useState("");
     const [loading, setLoading] = useState(false);
     const [loadingPaket, setLoadingPaket] = useState(false);
     const [openModal, setOpenModal] = useState(false)
     const [currentPaket, setCurrentPaket] = useState({})
     const [isPremium, setIsPremium] = useState(false)
     const getUser = localStorage.getItem("userId");

     const checkPremium = async () => {
          try {
               setLoadingPaket(true);
               const response = await useApiGet(`/user/${getUser}`);
               console.log(response.data);
               setIsPremium(response.data.isPremium);
               setLoadingPaket(false);
          } catch (error) {
               setLoadingPaket(false);
               console.log(error);
          }
     }

     const getPaket = async () => {
          try {
               setLoadingPaket(true);
               const response = await useApiGet(`/paket`);
               console.log(response.data.data);

               setPaket(response.data.data);
               setLoadingPaket(false);
          } catch (error) {
               setLoadingPaket(false);
               console.log(error);
          }
     }

     const handleModalKeranjang = () => {
          setShowModalKeranjang(!showModalKeranjang);
          setLinkPembayaran("");
     }

     const handlePilihPaket = (paket) => {
          setCurrentPaket(paket)
          setShowModalKeranjang(!showModalKeranjang);
     }


     const handleBeliPaket = async () => {
          try {
               setLoading(true);

               const data = {
                    id_user: getUser,
                    id_paket: currentPaket.id,
                    price: currentPaket.price
               }

               const postToTransaksi = await useApiPost(`/transaksi`, data);
               if (postToTransaksi.data.status === "success") {
                    setLinkPembayaran(postToTransaksi.data.data.payment_url);
                    toast.success("Berhasil membuat pembayaran",
                         {
                              position: "top-right",
                              autoClose: 2000,
                              hideProgressBar: true,
                              pauseOnHover: false,
                              draggable: true,
                              progress: undefined,
                         }
                    );
               }
               setLoading(false);
          } catch (error) {
               toast.error("Gagal Membuat Pembayaran",
                    {
                         position: "top-right",
                         autoClose: 1000,
                         hideProgressBar: true,
                         pauseOnHover: false,
                         draggable: true,
                         progress: undefined,
                    }
               );
               console.log(error);
               setLoading(false);
          }
     }

     const convertToBulan = (hari) => {
          return Math.floor(hari / 30);
     }

     const handleConfirmPay = (p) => {
          setCurrentPaket(p)
          setOpenModal(!openModal)
     }

     useEffect(() => {
          getPaket();
          setLinkPembayaran("");
          checkPremium();
     }, []);

     const filterForPremium = paket
          .filter(p => p.type === "PREMIUM")
          .sort((a, b) => a.price - b.price);

     return (
          <Fragment>
               <div className="modal">
                    <Modal show={openModal} position="center" onClose={() => handleConfirmPay()}>
                         <Modal.Header>Konfirmasi Pembelian Paket Premium</Modal.Header>
                         <Modal.Body>
                              <div className="space-y-2">
                                   <table className="border-collapse">
                                        <tr>
                                             <td className="whitespace-nowrap">Nama Paket</td>
                                             <td className="px-2">:</td>
                                             <td className="font-semibold">{currentPaket?.name}</td>
                                        </tr>
                                        <tr>
                                             <td className="whitespace-nowrap">Harga</td>
                                             <td className="px-2">:</td>
                                             <td className="font-semibold">{formatToIDR(currentPaket?.price)}</td>
                                        </tr>
                                        <tr>
                                             <td className="whitespace-nowrap">Durasi</td>
                                             <td className="px-2">:</td>
                                             <td className="font-semibold">{convertToBulan(currentPaket?.duration)} Bulan</td>
                                        </tr>
                                        {/* <tr>
                                             <td className="whitespace-nowrap">Deskripsi</td>
                                             <td className="px-2">:</td>
                                             <td className="font-semibold">{currentPaket?.description?.description}</td>
                                        </tr> */}
                                   </table>
                                   <div className="py-4">
                                        <hr className="w-full" />
                                   </div>
                                   <h2 className="font-bold">
                                        Detail Harga
                                   </h2>
                                   <table className="border-collapse">
                                        <tr>
                                             <td>Harga</td>
                                             <td className="px-2">:</td>
                                             <td>{formatToIDR(currentPaket?.price)}</td>
                                        </tr>
                                        <tr>
                                             <td>Diskon</td>
                                             <td className="px-2">:</td>
                                             <td>-Rp 0</td>
                                        </tr>
                                   </table>
                              </div>
                         </Modal.Body>
                         <Modal.Footer>
                              <div className="flex justify-end w-full space-x-2">
                                   <Button color="dark" onClick={() => setOpenModal(false)}>Buat Pembayaran</Button>
                                   <Button color="gray" onClick={() => setOpenModal(false)}>
                                        Batal
                                   </Button>
                              </div>
                         </Modal.Footer>
                    </Modal>
               </div>
               <div className={`modal-keranjang fixed bg-white z-50 w-full h-full top-0 left-0 flex items-center justify-center ${showModalKeranjang ? 'block' : 'invisible'}`}>
                    <div className="modal-content md:w-1/3 mx-auto flex justify-center flex-col items-start border p-10">
                         <div className="w-full">
                              <div className="modal-header w-full">
                                   <h1 className="font-bold text-2xl">
                                        Konfirmasi Paket
                                   </h1>
                                   <p className="text-secondary text-sm">
                                        Silahkan cek kembali paket yang anda pilih.
                                   </p>
                                   <hr className="mt-4 w-full" />
                              </div>
                              <div className="modal-body my-4 w-full">
                                   <table className="border-collapse">
                                        <tr>
                                             <td>Nama Paket</td>
                                             <td className="px-2">:</td>
                                             <td>{currentPaket?.name}</td>
                                        </tr>
                                        <tr>
                                             <td>Harga</td>
                                             <td className="px-2">:</td>
                                             <td>{formatToIDR(currentPaket?.price)}</td>
                                        </tr>
                                        <tr>
                                             <td className="whitespace-nowrap">Durasi</td>
                                             <td className="px-2">:</td>
                                             <td>{convertToBulan(currentPaket?.duration)} Bulan</td>
                                        </tr>
                                        {/* <tr>
                                             <td>Deskripsi</td>
                                             <td className="px-2">:</td>
                                             <td>{currentPaket?.description?.description}</td>
                                        </tr> */}
                                   </table>
                                   <hr className="mt-4 w-full" />
                                   <h2 className="mt-4 font-bold">
                                        Detail Harga
                                   </h2>
                                   <table className="border-collapse">
                                        <tr>
                                             <td>Harga</td>
                                             <td className="px-2">:</td>
                                             <td>{formatToIDR(currentPaket?.price)}</td>
                                        </tr>
                                        <tr>
                                             <td>Diskon</td>
                                             <td className="px-2">:</td>
                                             <td>-Rp 0</td>
                                        </tr>
                                   </table>
                                   <hr className="mt-4 w-full" />
                                   <div className="flex justify-between mt-4">
                                        <h1 className="font-bold">
                                             Total Harga
                                        </h1>
                                        <p>
                                             {formatToIDR(currentPaket?.price)}
                                        </p>
                                   </div>
                              </div>
                              <div className="modal-footer w-full mt-16">
                                   {linkPembayaran !== "" ?
                                        <Fragment>
                                             <Alert color="success" className="w-full mb-3" icon={BsInfoCircleFill}>
                                                  Silahkan lanjutkan pembayaran dengan klik tombol dibawah.
                                             </Alert>
                                             <Link
                                                  to={linkPembayaran}
                                                  className="btn w-full"
                                                  target="_blank"
                                             >
                                                  <Button color="blue" className="btn w-full">
                                                       Bayar {formatToIDR(currentPaket?.price)}
                                                  </Button>
                                             </Link>
                                        </Fragment>
                                        :
                                        <Fragment>
                                             {loading ?
                                                  <div className="flex flex-col justify-center items-center">
                                                       <Spinner color="info" className="w-full mr-2" />
                                                       <p>
                                                            Sedang membuat pembayaran...
                                                       </p>
                                                  </div>
                                                  : (
                                                       isPremium ? (
                                                            <Alert color="warning" className="w-full mb-3" icon={BsInfoCircleFill}>
                                                                 Wow! Kamu sudah berlangganan paket premium, silahkan cek di halaman <Link to="/riwayat-pembelian" className="underline">Riwayat Pembelian</Link>
                                                            </Alert>  
                                                       ) : (
                                                            <Button
                                                                 color="dark"
                                                                 className="btn w-full"
                                                                 onClick={() => handleBeliPaket()}
                                                            >
                                                                 Buat Pembayaran
                                                            </Button>
                                                       )
                                                  )
                                             }
                                        </Fragment>
                                   }
                              </div>
                              {linkPembayaran !== "" &&
                                   <p className="text-xs text-secondary mt-2 w-fit">
                                        * Pembayaran anda sudah tersimpan di halaman Riwayat Pembelian
                                   </p>
                              }
                              {loading === false &&
                                   <p
                                        className="text-center underline text-sm mt-4 hover:cursor-pointer hover:text-secondary transition w-fit mx-auto"
                                        onClick={() => handleModalKeranjang()}
                                   >Tutup</p>
                              }
                         </div>
                    </div>
               </div>
               <div className="md:h-screen space-y-4 max-w-6xl mx-auto">
                    <div className="welcome-message space-y-4 text-center rounded-md shadow bg-gradient-to-br from-sky-300 via-cyan-300 to-sky-400 px-2 py-10">
                         <div className="flex items-center justify-center space-x-2 text-white">
                              <FaStar className="text-2xl bg-cyan-500 rounded-full p-2 h-10 w-10" />
                              <h1 className="font-bold text-3xl text-cyan-600">
                                   Premium
                              </h1>
                         </div>
                         <p className="text-base text-cyan-600">
                              Sistem keanggotaan dengan berbagai fitur eksklusif yang dapat meningkatkan reputasi toko, visibilitas akun, dan kepercayaan pembeli, sehingga dapat meningkatkan penjualan. Tingkatkan akun Anda ke Profil Premium sekarang dan dapatkan semua keuntungannya.
                         </p>
                    </div>

                    <section className="paket-wrapper space-y-10 pt-10">
                         <div className="paket-row">
                              <div className="pilih-paket grid md:grid-cols-3 grid-cols-1 gap-4">
                                   {loadingPaket ?
                                        <Fragment>
                                             <div className="paket border p-4 bg-white shadow-sm rounded-lg">
                                                  <div className="paket-header space-y-3">
                                                       <h2 className="text-primary font-bold text-lg">
                                                            <div className="w-full bg-gray-200 animate-pulse h-4 rounded-lg"></div>
                                                       </h2>
                                                       <p className="text-primary text-2xl">
                                                            <div className="w-full bg-gray-200 animate-pulse h-4 rounded-lg"></div>
                                                       </p>
                                                       <div className="benefit mt-2">
                                                            <hr className="my-4" />
                                                            <div className="w-full bg-gray-200 animate-pulse h-4 rounded-lg"></div>
                                                       </div>
                                                  </div>
                                                  <Button
                                                       color="dark"
                                                       className="btn mt-4 w-full"
                                                       disabled
                                                  >
                                                       Beli Paket
                                                  </Button>
                                             </div>
                                             <div className="paket border p-4 bg-white shadow-sm rounded-lg">
                                                  <div className="paket-header space-y-3">
                                                       <h2 className="text-primary font-bold text-lg">
                                                            <div className="w-full bg-gray-200 animate-pulse h-4 rounded-lg"></div>
                                                       </h2>
                                                       <p className="text-primary text-2xl">
                                                            <div className="w-full bg-gray-200 animate-pulse h-4 rounded-lg"></div>
                                                       </p>
                                                       <div className="benefit mt-2">
                                                            <hr className="my-4" />
                                                            <div className="w-full bg-gray-200 animate-pulse h-4 rounded-lg"></div>
                                                       </div>
                                                  </div>
                                                  <Button
                                                       color="dark"
                                                       className="btn mt-4 w-full"
                                                       disabled
                                                  >
                                                       Beli Paket
                                                  </Button>
                                             </div>
                                             <div className="paket border p-4 bg-white shadow-sm rounded-lg">
                                                  <div className="paket-header space-y-3">
                                                       <h2 className="text-primary font-bold text-lg">
                                                            <div className="w-full bg-gray-200 animate-pulse h-4 rounded-lg"></div>
                                                       </h2>
                                                       <p className="text-primary text-2xl">
                                                            <div className="w-full bg-gray-200 animate-pulse h-4 rounded-lg"></div>
                                                       </p>
                                                       <div className="benefit mt-2">
                                                            <hr className="my-4" />
                                                            <div className="w-full bg-gray-200 animate-pulse h-4 rounded-lg"></div>
                                                       </div>
                                                  </div>
                                                  <Button
                                                       color="dark"
                                                       className="btn mt-4 w-full"
                                                       disabled
                                                  >
                                                       Beli Paket
                                                  </Button>
                                             </div>

                                        </Fragment>
                                        :
                                        (
                                             <Fragment>
                                                  {filterForPremium?.map((p, i) =>
                                                       <div key={i} className="paket border p-4 bg-white shadow-sm rounded-lg">
                                                            <div className="paket-header">
                                                                 <h2 className="text-primary font-bold text-lg">{p?.name}</h2>
                                                                 <p className="text-primary text-2xl">
                                                                      {formatToIDR(p?.price)} / <span className="text-sm text-secondary"> {convertToBulan(p?.duration)} bulan </span>
                                                                 </p>
                                                                 <div className="benefit mt-2">
                                                                      <hr className="my-4" />
                                                                      {/* <List.Item icon={BsCheck} className="text-secondary">Aktif selama 30 hari</List.Item> */}
                                                                      <p className="text-secondary text-base">{p?.description?.description}</p>
                                                                 </div>
                                                            </div>
                                                            <Button
                                                                 color="dark"
                                                                 className="btn mt-4 w-full"
                                                                 onClick={() => handlePilihPaket(p)}
                                                            >
                                                                 Pilih Paket
                                                            </Button>
                                                       </div>
                                                  )}
                                             </Fragment>
                                        )
                                   }
                              </div>
                         </div>
                         <hr className="text-gray-100" />
                    </section >
                    <section className="keuntungan pt-4">
                         <div className="keuntungan-wrapper space-y-4">
                              <div className="keuntungan-header space-y-1">
                                   <h1 className="font-bold text-2xl text-primary">
                                        Keuntungan Yang Anda Dapatkan
                                   </h1>
                                   <p className="text-secondary text-sm">
                                        Berikut adalah keuntungan yang akan anda dapatkan ketika anda membeli paket premium
                                   </p>
                              </div>
                              <div className="keuntungan-body grid md:grid-cols-4 gap-4">
                                   <div className="keuntungan-card border p-4 bg-white space-y-1 rounded-lg">
                                        <div className="flex items-center space-x-2">
                                             <h1 className="font-bold text-lg text-primary">
                                                  Profil Menjadi Lebih Terpercaya
                                             </h1>
                                        </div>
                                        <p className="text-secondary">
                                             Profil anda akan menjadi lebih terpercaya di mata pembeli
                                        </p>
                                   </div>
                                   <div className="keuntungan-card border p-4 bg-white space-y-1 rounded-lg">
                                        <div className="flex items-center space-x-2">
                                             <h1 className="font-bold text-lg text-primary">
                                                  Badge Khusus Di Profil
                                             </h1>
                                        </div>
                                        <p className="text-secondary">
                                             Badge akan tampil di halaman profil kamu dan di halaman iklan kamu!
                                        </p>
                                   </div>
                                   <div className="keuntungan-card border p-4 bg-white space-y-1 rounded-lg">
                                        <div className="flex items-center space-x-2">
                                             <h1 className="font-bold text-lg text-primary">
                                                  Gratis Kuota Iklan
                                             </h1>
                                        </div>
                                        <p className="text-secondary">
                                             Kamu dapat free <span className="font-bold text-gray-400"> 100 kuota iklan </span> berlaku secara permanen
                                        </p>
                                   </div>
                                   <div className="keuntungan-card border p-4 bg-white space-y-1 rounded-lg">
                                        <div className="flex items-center space-x-2">
                                             <h1 className="font-bold text-lg text-primary">
                                                  Gratis Kuota Sorot
                                             </h1>
                                        </div>
                                        <p className="text-secondary">
                                             Kamu dapat free <span className="font-bold text-gray-400"> 100 kuota sorot </span> berlaku secara permanen
                                        </p>
                                   </div>
                              </div>
                              <p className="text-center pt-6 font-semibold">
                                   ✨ Langganan Sekarang dan Nikmati Keuntungannya! ✨
                              </p>
                         </div>
                    </section>
               </div >
          </Fragment >
     );
};

export default BeliPaketPremium;