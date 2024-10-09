import { Fragment, useEffect, useState } from "react";
import { formatToIDR } from "../../utils/FormatRupiah";
import { useApiGet, useApiPost, useApiPut } from "../../services/apiService";
import { toast } from "react-toastify";
import { Alert, Button, List, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsInfoCircleFill } from "react-icons/bs";

function ModalConfirmSorot({ handleModal }) {
    const [linkPembayaran, setLinkPembayaran] = useState("");
    const [loading, setLoading] = useState(false);
    const [kuota, setKuota] = useState([]);
    const [loadingKuota, setLoadingKuota] = useState(false);
    const [sorotSuccess, setSorotSuccess] = useState(false);
    const [dataSorot, setDataSorot] = useState([]);
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

    const handleCreatePaketSorot = async () => {
        try {
            setLoading(true);
            const id = JSON.parse(localStorage.getItem("currentIklan")).id;

            const response = await useApiPut(`/paket/sorot`, { id, userId: getUser });

            if (response.data.status === "success") {
                toast.success("Berhasil menambahkan paket sorot",
                    {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    }
                );
                setSorotSuccess(true);
                setDataSorot(response.data.data);
            } else {
                toast.error("Gagal menambahkan paket sorot",
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
            setLoading(false);
            console.log(error)
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

    const formatDate = (date) => {
        const d = new Date(date);

        // Opsi format tanggal
        const options = { day: 'numeric', month: 'long', year: 'numeric' };

        // Format tanggal menjadi "11 Maret 2024"
        const formattedDate = d.toLocaleDateString('id-ID', options);

        return formattedDate;
    }

    return (
        <div className="modal-keranjang fixed bg-white z-50 w-full h-full top-0 left-0 flex items-center justify-center">
            <div className="modal-content md:w-1/3 mx-auto flex flex-col justify-start items-start border p-10 max-h-[80vh] overflow-y-auto">
                {sorotSuccess ?
                    <div className="w-full">
                        <div className="modal-header w-full text-center">
                            <h1 className="font-bold text-2xl">
                                Iklan Berhasil Disorot!
                            </h1>
                            <p className="text-secondary text-sm">
                                Iklan kamu mendapatkan sorotan dan keuntungan lainnya
                            </p>
                            <div className="detail mt-4">
                                Iklan anda di sorot sampai dengan <br /> <span className="font-semibold"> {formatDate(dataSorot?.highlightExpiry)} </span>
                            </div>
                            <p
                                className="text-center underline text-sm mt-4 hover:cursor-pointer hover:text-secondary transition w-fit mx-auto"
                                onClick={() => handleModalKeranjang()}
                            >
                                Tutup
                            </p>
                        </div>
                    </div>
                    :
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
                        <div className={`info-biaya space-y-2 ${kuota === 0 ? 'hidden' : 'block'}`}>
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
                        <div className={`modal-footer w-full ${kuota === 0 ? 'mt-0' : 'mt-16'}`}>
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
                                    {loading ? (
                                        <div className="flex flex-col justify-center items-center">
                                            <Spinner color="info" className="w-full mr-2" />
                                            <p>Mohon tunggu...</p>
                                        </div>
                                    ) : (
                                        getCurrentIklan?.isHighlighted === true ? (
                                            <Alert color="warning" className="w-full mb-3" icon={BsInfoCircleFill}>
                                                Selamat! Iklan ini sudah di sorot.
                                            </Alert>
                                        ) : (
                                            kuota === 0 ? (
                                                <Alert color="red" className="w-full mb-3" icon={BsInfoCircleFill}>
                                                    Oopss, kuota sorot kamu sudah habis.
                                                </Alert>
                                            ) : (
                                                <Button
                                                    color="dark"
                                                    className="btn w-full"
                                                    onClick={() => handleCreatePaketSorot()}
                                                >
                                                    Setuju dan Lanjutkan
                                                </Button>
                                            )
                                        )
                                    )}
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
                }

            </div>
        </div>
    )
}

export default ModalConfirmSorot