import { Fragment } from "react";
import { useForm } from "react-hook-form"
import { Button } from "flowbite-react";
import { ToastContainer } from "react-toastify";
// import { toastError, toastSuccess } from "../services/toatsService";

const ResetPassword = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const password = watch("password", "");

    const onSubmit = async () => {

    }

    return (
        <>
            <Fragment>
                <form onSubmit={handleSubmit(onSubmit)} className="card card-login">
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
                            {errors.confirmPassword && errors.confirmPassword.type === "validate" && <span className="text-sm text-red-error">Confirm Password required</span>}
                        </div>
                    </div>
                    <Button type="submit" color="dark" className="btn w-full p-1 my-6">
                        Reset Password
                    </Button>
                    <ToastContainer />
                </form>
            </Fragment>
        </>
    )
}

export default ResetPassword;