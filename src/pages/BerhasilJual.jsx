import { Link } from 'react-router-dom';
import SuccessIklan from '../assets/success_iklan.svg';

function BerhasilJual() {
    return (
        <div className='flex flex-col items-center justify-start space-y-8 h-screen'>
            <img src={SuccessIklan} alt="Group-1" border="0" className='md:w-1/6 w-1/2' />
            <div className="text-center space-y-2">
                <h1 className='text-black text-2xl font-bold'>
                    Iklan Berhasil Dibuat
                </h1>
                <p className='text-gray-400'>
                    Iklan anda sudah berhasil dibuat dan akan segera tayang.
                </p>
            </div>
            <Link to='/iklan' className='text-black underline px-4 rounded-md'>
                Lihat Iklan Saya
            </Link>
        </div>
    )
}

export default BerhasilJual