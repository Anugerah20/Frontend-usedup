import { Fragment, useEffect, useState } from "react";
import { formatToIDR } from "../../utils/FormatRupiah";
import { useApiGet, useApiPost } from "../../services/apiService";
import { toast } from "react-toastify";
import { Alert, Button, List, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsInfoCircleFill } from "react-icons/bs";

function ModalConfirmSorot({ handleModal }) {
    const [linkPembayaran, setLinkPembayaran] = useState("");
    const [loading, setLoading] = useState(false);
    const [kuota, setKuota] = useState([]);
    const [loadingKuota, setLoadingKuota] = useState(false);
    const getUser = localStorage.getItem("userId")
    const getCurrentIklan = JSON.parse(localStorage.getItem("currentIklan"));

    const handleGetKuota = async () => {
        try {
            setLoadingKuota(true);
            const response = await useApiGet(`/user/kuota/${getUser}`);

            if (response.data.status === "success") {
                setKuota(response.data.data.kuota_sorot);
            }
            setLoadingKuota(false);
        } catch (error) {
            console.log(error)
            setLoadingKuota(false);
        }
    }


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
        handleGetKuota();
        setLinkPembayaran("");
    }, [])

    const handleModalKeranjang = () => {
        handleModal();
        setLinkPembayaran("");
    }

    return (
        <div className="modal-keranjang fixed bg-white z-50 w-full h-full top-0 left-0 flex items-center justify-center">
    <div className="modal-content md:w-1/3 mx-auto flex flex-col justify-start items-start border p-10 max-h-[80vh] overflow-y-auto">
                <div className="w-full">
                    <div className="modal-header w-full">
                        <h1 className="font-bold text-2xl">
                            Konfirmasi Sorot Iklan
                        </h1>
                        <p className="text-secondary text-sm">
                            Pastikan informasi berikut sesuai sebelum melanjutkan
                        </p>
                    </div>
                    <div className="fitur-sorot w-full mt-4">
                        <h1 className="font-bold text-xl mb-2">
                            Fitur Sorot
                        </h1>
                        <List className="text-black">
                            <List.Item>Iklan Anda akan tampil di halaman depan</List.Item>
                            <List.Item>Posisi teratas dalam hasil pencarian</List.Item>
                            <List.Item>Badge {`"Highlight"`}</List.Item>
                            <List.Item>Durasi 30 hari</List.Item>
                        </List>
                        <hr className="mt-4 w-full" />
                    </div>
                    <div className="modal-body my-4 w-full">
                        <h1 className="text-xl font-bold mb-4">
                            Detail Iklan
                        </h1>
                        <img src={getCurrentIklan?.image[0]} alt="iklan-cover" className="w-40 mb-4" />
                        <table className="border-collapse">
                            <tr>
                                <td>Judul Iklan</td>
                                <td className="px-2">:</td>
                                <td className="font-semibold">{getCurrentIklan?.title}</td>
                            </tr>
                        </table>
                        <hr className="mt-4 w-full" />
                    </div>
                    <div className="info-biaya space-y-2">
                        <h1 className="text-xl font-bold mt-4">
                            Detail Biaya
                        </h1>
                        <table>
                            <tr>
                                <td>Harga</td>
                                <td className="px-2">:</td>
                                <td className="font-bold">
                                    1
                                    <span className="font-normal ml-2">Kuota Sorot</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Kuota Sorot Kamu</td>
                                <td className="px-2">:</td>
                                <td className="font-bold">
                                    {loadingKuota ?
                                        <Spinner color="info" className="w-fit" size="xs" />
                                        :
                                        kuota
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>Sisa Kuota Sorot</td>
                                <td className="px-2">:</td>
                                <td className="font-bold">
                                    {loadingKuota ?
                                        <Spinner color="info" className="w-fit" size="xs" />
                                        :
                                        kuota - 1
                                    }
                                </td>
                            </tr>
                        </table>
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
                                        Setuju dan Lanjutkan
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
                        >
                            Tutup
                        </p>
                    }
                </div>
            </div>
        </div>
    )
}

export default ModalConfirmSorot