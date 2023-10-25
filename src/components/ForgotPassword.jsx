import { Fragment } from "react";
import { useForm } from "react-hook-form"
import { Button } from "flowbite-react";
import { ToastContainer } from "react-toastify";
// import { toastError, toastSuccess } from "../services/toatsService";

const ForgotPassword = () => {
     const {
          register,
          handleSubmit,
          formState: { errors },
     } = useForm()

     const onSubmit = (data) => { console.log(data) }
     return (
          <>
               <Fragment>
                    <form onSubmit={handleSubmit(onSubmit)} className="card card-login">
                         <div className="mb-5">
                              <p className="text-[30px] font-bold">Lupa Password</p>
                              <p className="text-[14px] text-btn-grey">
                                   Masukkan email terdaftar kamu
                              </p>
                         </div>
                         <div className="space-y-4">
                              <div>
                                   <label htmlFor="Email" className="text-sm font-semibold">
                                        Email
                                   </label>
                                   <input
                                        type="email"
                                        className="w-full border border-shadow mt-2"
                                        id="Email"
                                        {...register("emailRequired", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, })}
                                   />
                                   {errors.emailRequired && errors.emailRequired.type === "required" && <span className="text-sm text-red-error">Email required</span>}
                                   {errors.emailRequired && errors.emailRequired.type === "pattern" && <span className="text-sm text-red-error">Invalid Email</span>}
                              </div>
                         </div>
                         <Button type="submit" color="dark" className="btn w-full p-1 my-6">
                              Send Reset Password Link
                         </Button>
                         <ToastContainer />
                    </form>
               </Fragment>
          </>
     )
}

export default ForgotPassword;