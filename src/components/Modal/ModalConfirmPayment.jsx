import { Fragment, useEffect, useState } from "react";
import { formatToIDR } from "../../utils/FormatRupiah";
import { useApiPost } from "../../services/apiService";
import { toast } from "react-toastify";
import { Alert, Button, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsInfoCircleFill } from "react-icons/bs";

function ModalConfirmPayment({ handleModal }) {
    const [linkPembayaran, setLinkPembayaran] = useState("");
    const [loading, setLoading] = useState(false);
    const getKeranjang = JSON.parse(localStorage.getItem("currentPaket"));
    const getUser = localStorage.getItem("userId")

    const handleBeliPaket = async () => {
        try {
            setLoading(true);
            const currentPaket = JSON.parse(localStorage.getItem("currentPaket"));

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

    useEffect(() => {
        setLinkPembayaran("");
    }, [])

    const handleModalKeranjang = () => {
        handleModal();
        setLinkPembayaran("");
    }

    return (
        <div className="modal-keranjang fixed bg-white z-50 w-full h-full top-0 left-0 flex items-center justify-center">
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
                                <td>{getKeranjang?.name}</td>
                            </tr>
                            <tr>
                                <td>Harga</td>
                                <td className="px-2">:</td>
                                <td>{formatToIDR(getKeranjang?.price)}</td>
                            </tr>
                            <tr>
                                <td>Deskripsi</td>
                                <td className="px-2">:</td>
                                <td>{getKeranjang?.description?.description}</td>
                            </tr>
                        </table>
                        <hr className="mt-4 w-full" />
                        <h2 className="mt-4 font-bold">
                            Detail Harga
                        </h2>
                        <table className="border-collapse">
                            <tr>
                                <td>Harga</td>
                                <td className="px-2">:</td>
                                <td>{formatToIDR(getKeranjang?.price)}</td>
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
                                {formatToIDR(getKeranjang?.price)}
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
                                        Bayar {formatToIDR(getKeranjang?.price)}
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
                                    :
                                    <Button
                                        color="dark"
                                        className="btn w-full"
                                        onClick={() => handleBeliPaket()}
                                    >
                                        Buat Pembayaran
                                    </Button>
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
    )
}

export default ModalConfirmPayment