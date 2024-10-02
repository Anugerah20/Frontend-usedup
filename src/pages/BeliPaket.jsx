import { Alert, Button, List, Spinner } from "flowbite-react"
import { Fragment, useEffect, useState } from "react"
import { BsCheck, BsInfoCircleFill, BsRocket, BsRocketTakeoffFill } from "react-icons/bs"
import { FaBullhorn } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useApiGet, useApiPost } from "../services/apiService"
import { formatToIDR } from "../utils/FormatRupiah"
import { toast } from "react-toastify"
import { MdHighlight } from "react-icons/md";

function BeliPaket() {
    const [paket, setPaket] = useState([]);
    const [showModalKeranjang, setShowModalKeranjang] = useState(false);
    const [linkPembayaran, setLinkPembayaran] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingPaket, setLoadingPaket] = useState(false);
    const getUser = localStorage.getItem("userId")

    const getPaket = async () => {
        try {
            setLoadingPaket(true);
            const res = await useApiGet(`/paket`);
            setPaket(res.data.data);
            setLoadingPaket(false);
        } catch (error) {
            setLoadingPaket(false);
            console.log(error);
        }
    }

    const handlePilihPaket = (paket) => {
        const parsePaket = JSON.stringify(paket);
        localStorage.setItem("currentPaket", parsePaket);
        setShowModalKeranjang(!showModalKeranjang);
    }

    const handleModalKeranjang = () => {
        setShowModalKeranjang(!showModalKeranjang);
        setLinkPembayaran("");
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
        getPaket();
        setLinkPembayaran("");
    }, [])

    const filterForIklan = paket
        .filter(p => p.type === "IKLAN")
        .sort((a, b) => a.price - b.price);

    const filterForSorot = paket
        .filter(p => p.type === "SOROT")
        .sort((a, b) => a.price - b.price);

    const getKeranjang = JSON.parse(localStorage.getItem("currentPaket"));

    return (
        <Fragment>
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
            <div className="md:h-screen space-y-4 max-w-6xl mx-auto">
                <div className="welcome-message space-y-1 text-center">
                    <h1 className="text-primary font-bold text-2xl">
                        Silahkan Pilih Paket Bisnis Anda!
                    </h1>
                    <p className="text-sm text-secondary">
                        Banyak berbagai pilihan paket yang bisa anda pilih sesuai kebutuhan bisnis anda.
                    </p>
                </div>

                <section className="paket-wrapper space-y-10 pt-10">
                    <div className="paket-row">
                        <div className="title-paket mb-4">
                            <h1 className="font-bold text-3xl flex items-center">
                                Paket Iklan
                                <FaBullhorn className="ml-2" />
                            </h1>
                            <p className="text-secondary">
                                Paket iklan ini akan membantu anda untuk mengiklankan lebih banyak.
                            </p>
                        </div>
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
                                                <List className="border-0">
                                                    <List.Item icon={BsCheck} className="text-secondary">
                                                        <div className="w-full bg-gray-200 animate-pulse h-4 rounded-lg"></div>
                                                    </List.Item>
                                                </List>
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
                                                <List className="border-0">
                                                    <List.Item icon={BsCheck} className="text-secondary">
                                                        <div className="w-full bg-gray-200 animate-pulse h-4 rounded-lg"></div>
                                                    </List.Item>
                                                </List>
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
                                                <List className="border-0">
                                                    <List.Item icon={BsCheck} className="text-secondary">
                                                        <div className="w-full bg-gray-200 animate-pulse h-4 rounded-lg"></div>
                                                    </List.Item>
                                                </List>
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
                                        {filterForIklan?.map((p, i) =>
                                            <div key={i} className="paket border p-4 bg-white shadow-sm rounded-lg">
                                                <div className="paket-header">
                                                    <h2 className="text-primary font-bold text-lg">{p?.name}</h2>
                                                    <p className="text-primary text-2xl">{formatToIDR(p?.price)}</p>
                                                    <div className="benefit mt-2">
                                                        <hr className="my-4" />
                                                        <List className="border-0">
                                                            {/* <List.Item icon={BsCheck} className="text-secondary">Aktif selama 30 hari</List.Item> */}
                                                            <List.Item icon={BsCheck} className="text-secondary">{p?.description?.description}</List.Item>
                                                        </List>
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

                    <div className="paket-row">
                        <div className="title-paket mb-4">
                            <h1 className="font-bold text-3xl flex items-center">
                                Paket Sorot
                                <MdHighlight className="ml-2" />
                            </h1>
                            <p className="text-secondary">
                                Buat iklan anda berada di halaman depan dan di posisi teratas.
                            </p>
                        </div>
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
                                                <List className="border-0">
                                                    <List.Item icon={BsCheck} className="text-secondary">
                                                        <div className="w-full bg-gray-200 animate-pulse h-4 rounded-lg"></div>
                                                    </List.Item>
                                                </List>
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
                                                <List className="border-0">
                                                    <List.Item icon={BsCheck} className="text-secondary">
                                                        <div className="w-full bg-gray-200 animate-pulse h-4 rounded-lg"></div>
                                                    </List.Item>
                                                </List>
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
                                                <List className="border-0">
                                                    <List.Item icon={BsCheck} className="text-secondary">
                                                        <div className="w-full bg-gray-200 animate-pulse h-4 rounded-lg"></div>
                                                    </List.Item>
                                                </List>
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
                                        {filterForSorot?.map((p, i) =>
                                            <div key={i} className="paket border p-4 bg-white shadow-sm rounded-lg">
                                                <div className="paket-header">
                                                    <h2 className="text-primary font-bold text-lg">{p?.name}</h2>
                                                    <p className="text-primary text-2xl">{formatToIDR(p?.price)}</p>
                                                    <div className="benefit mt-2">
                                                        <hr className="my-4" />
                                                        <List className="border-0">
                                                            {/* <List.Item icon={BsCheck} className="text-secondary">Aktif selama 30 hari</List.Item> */}
                                                            <List.Item icon={BsCheck} className="text-secondary">{p?.description?.description}</List.Item>
                                                        </List>
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
                </section>
            </div>
        </Fragment>

    )
}

export default BeliPaket