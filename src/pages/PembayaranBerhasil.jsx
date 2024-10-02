import { Link } from "react-router-dom"
import SuccessPayment from '../assets/success_payment.svg';

function PembayaranBerhasil() {
    return (
        <div className='flex flex-col items-center justify-start space-y-8 h-screen'>
            <img src={SuccessPayment} alt="Group-1" border="0" className='md:w-1/6 w-1/2' />
            <div className="text-center space-y-2">
                <h1 className='text-black text-2xl font-bold'>
                    Pembayaran Berhasil!
                </h1>
                <p className='text-gray-400'>
                    Terima kasih telah melakukan pembayaran, paket akan segera aktif.
                </p>
            </div>
            <Link to='/riwayat-pembelian' className='text-black underline px-4 rounded-md'>
                Riwayat Pembelian
            </Link>
        </div>
    )
}

export default PembayaranBerhasil