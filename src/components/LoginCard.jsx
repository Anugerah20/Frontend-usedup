/* eslint-disable react-hooks/rules-of-hooks */
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { ToastContainer } from "react-toastify";
import { toastError, toastSuccess } from "../services/toatsService";
import { useApiPost } from "../services/apiService";
import { Fragment } from "react";
import { Button } from "flowbite-react";

const LoginCard = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const loginData = {
        email: data.emailRequired,
        password: data.passwordRequired,
      };

      const res = await useApiPost('/user/login', loginData)
      if (res) {
        localStorage.setItem("useToken", res.data.token)
        localStorage.setItem("userId", res.data.checkUser.id)
        toastSuccess("Login Successful")

        setTimeout(() => {
          window.location.href = '/'
        }, 1000)
        reset()
      }
    } catch (error) {
      console.error('Login error', error)
      toastError("Wrong email or password");
      reset();
    }
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)} className="card card-login">
        <div className="mb-5">
          <p className="text-[30px] font-bold">LOGIN</p>
          <p className="text-[14px] text-btn-grey">
            Ingin mencari sesuatu? banyak barang bagus loh!
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
          <div>
            <label htmlFor="Password" className="text-sm font-semibold">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-shadow mt-2"
              id="Password"
              {...register("passwordRequired", { required: true, minLength: 6 })}
            />
            {errors.passwordRequired && errors.passwordRequired.type === "required" && <span className="text-sm text-red-error">Password required</span>}
            {errors.passwordRequired && errors.passwordRequired.type === "minLength" && <span className="text-sm text-red-error">Password min 6 character</span>}
          </div>
          <div className="text-end">
            <Link to="/forgot-password" className=" text-blue-link underline">Lupa Password?</Link>
          </div>
        </div>
        <Button type="submit" color="dark" className="btn w-full p-1 my-6">
          LOGIN
        </Button>
        <div className="text-center">
          <span className="text-black">
            Belum punya akun?{" "}
            <Link to="/register" className="text-blue-link underline">
              Register disini
            </Link>
          </span>
        </div>
        <ToastContainer />
      </form>
    </Fragment>
  );
};

export default LoginCard;
