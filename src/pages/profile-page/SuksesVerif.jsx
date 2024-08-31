import React, { useEffect } from 'react'
import { useApiPut } from '../../services/apiService'
import { useParams } from 'react-router-dom'
import { toastError, toastSuccess } from '../../services/toatsService'

const SuksesVerif = () => {
    const params = useParams()

    const sendConfirmVerif = async () => {
        try {
            const res = await useApiPut(`/user/confirmVerifAccount/${params.token}`)

            if (res.statis === 'success') {
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
        <div className='text-2xl font-semibold'>SuksesVerif</div>
    )
}

export default SuksesVerif