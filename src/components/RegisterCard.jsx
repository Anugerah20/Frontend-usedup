/* eslint-disable react-hooks/rules-of-hooks */
import { useForm } from "react-hook-form"
import { useApiPost } from "../services/apiService";
import { ToastContainer } from "react-toastify";
import { toastError, toastSuccess } from "../services/toatsService";
import { Link } from "react-router-dom"
import { Fragment, useState } from "react";
import { Button } from "flowbite-react";

const RegisterCard = () => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm()

  const password = watch("passwordRequired", "");

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const registerData = {
        fullname: data.nameRequired,
        email: data.emailRequired,
        password: data.passwordRequired,
      };

      const response = await useApiPost('/user/register', registerData)
      console.log(response);

      if (response) {
        localStorage.setItem("useToken", response.data.token)
        localStorage.setItem("userId", response.data.user.id)
        toastSuccess("Registration Successful")

        window.location.href = '/'
        reset()
      }
      setLoading(false)
    } catch (error) {
      console.log('Login error', error);

      if (error.response && error.response.data && error.response.data.error) {
        toastError(`Login Failed: ${error.response.data.error}`)
      } else {
        toastError("Internal server error")
      }
      reset()
      setLoading(false)
    }
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)} className="card card-register">
        <div className="mb-5">
          <p className="text-[30px] font-bold">REGISTER</p>
          <p className="text-[14px] text-btn-grey">
            Register untuk menjual, menambahkan ke favorit dan masih banyak lagi!
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="Nama" className="text-sm font-semibold">
              Nama Lengkap
            </label>
            <input
              type="text"
              className="w-full border border-shadow mt-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
              id="Nama"
              disabled={loading}
              style={{ borderWidth: "1px" }}
              {...register("nameRequired", { required: true })}
            />
            {errors.nameRequired && <span className="text-sm text-red-error">Name required</span>}
          </div>
          <div>
            <label htmlFor="Email" className="text-sm font-semibold">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-shadow mt-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
              id="Email"
              disabled={loading}
              style={{ borderWidth: "1px" }}
              {...register("emailRequired", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, })}
            />
            {errors.emailRequired && errors.emailRequired.type === "required" && <span className="text-sm text-red-error">Email required</span>}
            {errors.emailRequired && errors.emailRequired.type === "pattern" && <span className="text-sm text-red-error">Invalid Email</span>}
          </div>
          <div>
            <label htmlFor="Password" className="text-sm font-semibold">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-shadow mt-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
              id="Password"
              disabled={loading}
              style={{ borderWidth: "1px" }}
              {...register("passwordRequired", { required: true, minLength: 6 })}
            />
            {errors.passwordRequired && errors.passwordRequired.type === "required" && <span className="text-sm text-red-error">Password required</span>}
            {errors.passwordRequired && errors.passwordRequired.type === "minLength" && <span className="text-sm text-red-error">Password min 6 character</span>}
          </div>
          <div>
            <label
              htmlFor="ConfirmPassword"
              className="text-sm font-semibold"
            >
              Konfirmasi Password
            </label>
            <input
              type="password"
              className="w-full border border-shadow mt-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
              id="ConfirmPassword"
              disabled={loading}
              style={{ borderWidth: "1px" }}
              {...register("ConfirmPasswordRequired", {
                required: true,
                validate: (value) => value === password
              })}
            />
            {errors.ConfirmPasswordRequired && errors.ConfirmPasswordRequired.type === "required" && <span className="text-sm text-red-error">Confirm Password required</span>}
            {errors.ConfirmPasswordRequired && errors.ConfirmPasswordRequired.type === "validate" && <span className="text-sm text-red-error">
              Password do not match
            </span>}
          </div>
        </div>
        {loading ?
          <Button type="submit" color="dark" disabled className="btn transition w-full p-1 my-6">
            Please wait...
          </Button>
          :
          <Button type="submit" color="dark" className="btn transition w-full p-1 my-6">
            REGISTER
          </Button>
        }
        <div className="text-center">
          <span className="text-black">
            Sudah memiliki akun?{" "}
            <Link to="/login" className="text-blue-link underline">
              Login disini
            </Link>
          </span>
        </div>
      </form>
      <ToastContainer />
    </Fragment>
  );
};

export default RegisterCard;
