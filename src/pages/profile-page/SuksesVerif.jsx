import React, { useEffect, useState } from 'react'
import { useApiPut } from '../../services/apiService'
import { useParams } from 'react-router-dom'
import { toastError, toastSuccess } from '../../services/toatsService'
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

const SuksesVerif = () => {
    const params = useParams()
    const [respons, setRespons] = useState([]);

    const sendConfirmVerif = async () => {
        try {
            const res = await useApiPut(`/user/confirmVerifAccount/${params.token}`)
            setRespons(res.data)

            if (res.status === 'success') {
                toastSuccess("BERHASIL")
            }

        } catch (error) {
            toastError(error)
        }
    }

    useEffect(() => {
        sendConfirmVerif()
    }, [])


    return (
        <div className='flex justify-center'>
            <div className='flex items-center border-2 border-black max-w-sm px-5 py-8 rounded space-x-2'>
                <p className='font-semibold'>{respons.message}</p>
                {respons.status === 'success' ? (<FaCheckCircle size={20} className='text-check-green' />) : (<IoIosCloseCircle size={20} className='text-check-red' />)}

            </div>
        </div>
    )
}

export default SuksesVerif