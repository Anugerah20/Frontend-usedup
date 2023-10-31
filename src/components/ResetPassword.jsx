/* eslint-disable react-hooks/rules-of-hooks */
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { Button } from "flowbite-react";
import { ToastContainer } from "react-toastify";
import { useApiGet, useApiPost } from "../services/apiService";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { BsFillCheckCircleFill } from "react-icons/bs";
// import { toastError, toastSuccess } from "../services/toatsService";

const ResetPassword = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const password = watch("password", "");

    const location = useLocation()

    const params = new URLSearchParams(location.search)

    const token = params.get('token')

    const decoded = jwtDecode(token);

    const userId = decoded.userId

    const navigate = useNavigate()


    const checkToken = async () => {
        const data = {
            token
        }
        try {
            const response = await useApiGet('/user/check-token', data)

            if (response.data.status === false) {
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = async (data) => {
        const newPassword = {
            password: data.password,
            token,
            userId
        }

        try {
            setLoading(true)
            const response = await useApiPost('/user/update-password', newPassword)

            if (response.status === 200 && response.data.status === true) {
                setSuccess(true)
            }

            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        document.title = "Reset Password - UsedUp"

        checkToken()
    }, [])

    return (
        <Fragment>
            {success &&
                <div className="h-screen flex flex-col items-center justify-start">
                    <div className="card flex flex-col items-center space-y-2 p-6">
                        <BsFillCheckCircleFill className="text-6xl text-green-400" />
                        <div className="text-center">
                            <h2 className="font-semibold">Password berhasil diubah</h2>
                            <p className="text-gray-500">
                                Silahkan login dengan password baru kamu
                            </p>
                            <Link to="/login">
                                <Button color="dark" className="w-full my-6">
                                    Login
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            }
            <form onSubmit={handleSubmit(onSubmit)} className={`card card-login ${success ? 'hidden' : 'block'}`}>
                <div className="mb-5">
                    <p className="text-[30px] font-bold">Reset Password</p>
                    <p className="text-[14px] text-btn-grey">
                        Masukkan password baru kamu
                    </p>
                </div>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="Password" className="text-sm font-semibold">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full border border-shadow mt-2"
                            id="Password"
                            {...register("password", {
                                required: true,
                                minLength: 6,
                            })}
                        />
                        {errors.password && errors.password.type === "required" && <span className="text-sm text-red-error">Password required</span>}
                        {errors.password && errors.password.type === "minLength" && <span className="text-sm text-red-error">Password min 6 character</span>}
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="text-sm font-semibold">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            className="w-full border border-shadow mt-2"
                            id="confirmPassword"
                            {...register("confirmPassword", {
                                required: true,
                                validate: (value) => value === password
                            })}
                        />
                        {errors.confirmPassword && errors.confirmPassword.type === "validate" && <span className="text-sm text-red-error">
                            Password not match
                        </span>}
                        {errors.confirmPassword && errors.confirmPassword.type === "required" && <span className="text-sm text-red-error">Confirm Password required</span>}
                    </div>
                </div>
                <Button type="submit" color="dark" isProcessing={loading} disabled={loading} className="btn w-full p-1 my-6 disabled:bg-gray-500">
                    {!loading ? "Reset Password" : "Please Wait..."}
                </Button>
                <ToastContainer />
            </form>
        </Fragment >
    )
}

export default ResetPassword;