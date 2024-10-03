/* eslint-disable react-hooks/rules-of-hooks */
import { Button, List } from "flowbite-react"
import { Fragment, useEffect, useState } from "react"
import { BsCheck } from "react-icons/bs"
import { FaBullhorn } from "react-icons/fa"
import { useApiGet } from "../services/apiService"
import { formatToIDR } from "../utils/FormatRupiah"
import { MdHighlight } from "react-icons/md";
import ModalConfirmPayment from "../components/Modal/ModalConfirmPayment"

function BeliPaket() {
    const [paket, setPaket] = useState([]);
    const [showModalKeranjang, setShowModalKeranjang] = useState(false);
    const [loadingPaket, setLoadingPaket] = useState(false);

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
    }

    useEffect(() => {
        getPaket();
    }, [])

    const filterForIklan = paket
        .filter(p => p.type === "IKLAN")
        .sort((a, b) => a.price - b.price);

    const filterForSorot = paket
        .filter(p => p.type === "SOROT")
        .sort((a, b) => a.price - b.price);

    return (
        <Fragment>
            {showModalKeranjang &&
                <ModalConfirmPayment handleModal={handleModalKeranjang} />
            }
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
                        <div className="title-paket mb-4 space-y-1">
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
                        <div className="title-paket mb-4 space-y-1">
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