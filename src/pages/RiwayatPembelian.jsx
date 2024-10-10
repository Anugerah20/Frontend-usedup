import { Badge, Table, Tabs } from "flowbite-react"
import { Fragment, useEffect, useState } from "react"
import { useApiGet } from "../services/apiService"
import { LuExternalLink } from "react-icons/lu";
import { formatToIDR } from "../utils/FormatRupiah"
import { Link } from "react-router-dom"

function RiwayatPembelian() {
    const [riwayatPembelian, setRiwayatPembelian] = useState([])
    const [loading, setLoading] = useState(false)
    const userId = localStorage.getItem("userId")

    const fetchRiwayatPembelian = async () => {
        try {
            setLoading(true)
            const res = await useApiGet(`/transaksi/riwayat/${userId}`)
            setRiwayatPembelian(res.data.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        fetchRiwayatPembelian()
    }, [])

    return (
        <div className="max-w-6xl mx-auto">
            <div className="header space-y-1">
                <h1 className="text-2xl text-primary font-bold">
                    Riwayat Pembelian
                </h1>
                <p className="text-sm text-secondary">
                    Riwayat pembelian paket yang telah Anda beli.
                </p>
            </div>
            <Tabs aria-label="Tabs with underline" variant="underline">
                <Tabs.Item active title="Semua">
                    <div className="overflow-x-auto">
                        <Table>
                            <Table.Head>
                                <Table.HeadCell>Nama Paket</Table.HeadCell>
                                <Table.HeadCell>Deskripsi</Table.HeadCell>
                                <Table.HeadCell>Harga</Table.HeadCell>
                                <Table.HeadCell>Status</Table.HeadCell>
                                <Table.HeadCell>LINK PEMBAYARAN</Table.HeadCell>
                                <Table.HeadCell>TGL PEMBELIAN</Table.HeadCell>
                                <Table.HeadCell>
                                    <span className="sr-only">Edit</span>
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {loading ?
                                    <Fragment>

                                        <Table.Row>
                                            <Table.Cell className="text-center">
                                                <div className="w-full bg-gray-200 animate-pulse h-4 rounded-lg"></div>
                                            </Table.Cell>
                                            <Table.Cell className="text-center">
                                                <div className="w-full bg-gray-200 animate-pulse h-4 rounded-lg"></div>
                                            </Table.Cell>
                                            <Table.Cell className="text-center">
                                                <div className="w-full bg-gray-200 animate-pulse h-4 rounded-lg"></div>
                                            </Table.Cell>
                                            <Table.Cell className="text-center">
                                                <div className="w-full bg-gray-200 animate-pulse h-4 rounded-lg"></div>
                                            </Table.Cell>
                                            <Table.Cell className="text-center">
                                                <div className="w-full bg-gray-200 animate-pulse h-4 rounded-lg"></div>
                                            </Table.Cell>
                                            <Table.Cell className="text-center">
                                                <div className="w-full bg-gray-200 animate-pulse h-4 rounded-lg"></div>
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell className="text-center">
                                                <div className="w-full bg-gray-200 animate-pulse h-4 rounded-lg"></div>
                                            </Table.Cell>
                                            <Table.Cell className="text-center">
                                                <div className="w-full bg-gray-200 animate-pulse h-4 rounded-lg"></div>
                                            </Table.Cell>
                                            <Table.Cell className="text-center">
                                                <div className="w-full bg-gray-200 animate-pulse h-4 rounded-lg"></div>
                                            </Table.Cell>
                                            <Table.Cell className="text-center">
                                                <div className="w-full bg-gray-200 animate-pulse h-4 rounded-lg"></div>
                                            </Table.Cell>
                                            <Table.Cell className="text-center">
                                                <div className="w-full bg-gray-200 animate-pulse h-4 rounded-lg"></div>
                                            </Table.Cell>
                                            <Table.Cell className="text-center">
                                                <div className="w-full bg-gray-200 animate-pulse h-4 rounded-lg"></div>
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell className="text-center">
                                                <div className="w-full bg-gray-200 animate-pulse h-4 rounded-lg"></div>
                                            </Table.Cell>
                                            <Table.Cell className="text-center">
                                                <div className="w-full bg-gray-200 animate-pulse h-4 rounded-lg"></div>
                                            </Table.Cell>
                                            <Table.Cell className="text-center">
                                                <div className="w-full bg-gray-200 animate-pulse h-4 rounded-lg"></div>
                                            </Table.Cell>
                                            <Table.Cell className="text-center">
                                                <div className="w-full bg-gray-200 animate-pulse h-4 rounded-lg"></div>
                                            </Table.Cell>
                                            <Table.Cell className="text-center">
                                                <div className="w-full bg-gray-200 animate-pulse h-4 rounded-lg"></div>
                                            </Table.Cell>
                                            <Table.Cell className="text-center">
                                                <div className="w-full bg-gray-200 animate-pulse h-4 rounded-lg"></div>
                                            </Table.Cell>
                                        </Table.Row>
                                    </Fragment>
                                    :
                                    (
                                        <>
                                            {riwayatPembelian.length === 0 && (
                                                <Table.Row>
                                                    <Table.Cell colSpan="6" className="text-center">
                                                        <p className="text-gray-400 dark:text-gray-500">
                                                            Anda belum pernah melakukan pembelian.
                                                        </p>
                                                    </Table.Cell>
                                                </Table.Row>
                                            )}
                                            {riwayatPembelian.map((riwayat, index) =>
                                                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                        {riwayat.paket.name}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <div className="overflow-auto md:whitespace-normal whitespace-nowrap md:w-auto w-28">
                                                            {riwayat.paket.description.description}
                                                        </div>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {formatToIDR(riwayat.paket.price)}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <div className="w-fit">
                                                            {riwayat.status === 'SUCCESS' ?
                                                                <Badge color="success" className="text-center">
                                                                    Success
                                                                </Badge>
                                                                : riwayat.status === 'FAILED' ?
                                                                    <Badge color="failure" className="text-center">
                                                                        Failed
                                                                    </Badge>
                                                                    :
                                                                    <Badge color="warning" className="text-center">
                                                                        Pending
                                                                    </Badge>
                                                            }
                                                        </div>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <Link to={`${riwayat.payment_url}`} className="text-white bg-blue-500 w-fit px-2 text-xs rounded-sm py-1 hover:bg-blue-800 transition font-semibold flex items-center">
                                                            Lihat
                                                            <LuExternalLink className="ml-1" />
                                                        </Link>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {new Date(riwayat.createdAt).toLocaleDateString()}
                                                    </Table.Cell>
                                                </Table.Row>
                                            )}
                                        </>
                                    )
                                }

                            </Table.Body>
                        </Table>
                    </div>
                </Tabs.Item>
            </Tabs>
        </div>
    )
}

export default RiwayatPembelian