/* eslint-disable react-hooks/rules-of-hooks */
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form"
import { Alert, Button } from "flowbite-react";
import { ToastContainer } from "react-toastify";
import { useApiPost } from "../services/apiService";
// import { toastError, toastSuccess } from "../services/toatsService";

const ForgotPassword = () => {
     const [loading, setLoading] = useState(false)
     const [isSuccess, setIsSuccess] = useState(false)
     const [isError, setIsError] = useState(false)

     const {
          register,
          handleSubmit,
          formState: { errors },
     } = useForm()

     const onSubmit = async (data) => {
          const datas = {
               email: data.email
          }
          try {
               setLoading(true)
               const response = await useApiPost("/user/forgot-password", datas);

               if (response.status === 200 && response.data.status === true) {
                    setIsSuccess(true)
               }

               setLoading(false)
          } catch (error) {
               console.log(error)
               if (error.response.status === 400) {
                    setIsError(true)
               }

               setLoading(false)
          }
     }
     return (
          <>
               <Fragment>
                    <form onSubmit={handleSubmit(onSubmit)} className="card card-login space-y-4">
                         <div>
                              <p className="text-[30px] font-bold">Lupa Password</p>
                              <p className="text-[14px] text-btn-grey">
                                   Masukkan email terdaftar kamu
                              </p>
                         </div>
                         {isSuccess &&
                              <div className="alert">
                                   <Alert
                                        color="success"
                                        onDismiss={() => setIsSuccess(false)}
                                   >
                                        <span>
                                             <p>
                                                  Link reset password telah dikirim ke email, silahkan cek email kamu.
                                             </p>
                                        </span>
                                   </Alert>
                              </div>
                         }
                         {isError &&
                              <div className="alert">
                                   <Alert
                                        color="failure"
                                        onDismiss={() => setIsError(false)}
                                   >
                                        <span>
                                             <p>
                                                  Email yang kamu masukkan tidak terdaftar.
                                             </p>
                                        </span>
                                   </Alert>
                              </div>
                         }
                         <div className="space-y-4">
                              <div>
                                   <label htmlFor="Email" className="text-sm font-semibold">
                                        Email
                                   </label>
                                   <input
                                        type="email"
                                        className="w-full border border-shadow mt-2"
                                        id="Email"
                                        {...register("email", {
                                             required: true,
                                             pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
                                        })}
                                   />
                                   {errors.email && errors.email.type === "required" && <span className="text-sm text-red-error">Email required</span>}
                                   {errors.email && errors.email.type === "pattern" && <span className="text-sm text-red-error">Invalid Email</span>}
                              </div>
                         </div>
                         <Button type="submit" color="dark" isProcessing={loading} disabled={loading} className={`btn w-full p-1 my-6 disabled:bg-gray-500`}>
                              {!loading ? "Send Reset Password Link" : "Please Wait..."}
                         </Button>
                         <ToastContainer />
                    </form>
               </Fragment>
          </>
     )
}

export default ForgotPassword;