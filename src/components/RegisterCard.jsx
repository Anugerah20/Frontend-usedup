/* eslint-disable react-hooks/rules-of-hooks */
import { useForm } from "react-hook-form"
import { useApiPost } from "../services/apiService";
import { ToastContainer } from "react-toastify";
import { toastError, toastSuccess } from "../services/toatsService";
import { Link, useNavigate } from "react-router-dom"
import { Fragment } from "react";
import { Button } from "flowbite-react";

const RegisterCard = () => {
  const navigate = useNavigate();

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
      const registerData = {
        fullname: data.nameRequired,
        email: data.emailRequired,
        password: data.passwordRequired,
      };

      const res = await useApiPost('/user/register', registerData)

      if (res && res.data.token) {
        localStorage.setItem("useToken", res.data.token)
        toastSuccess("Registration Successful");

        setTimeout(() => {
          navigate("/");
        }, 1000)
        reset();
      }

      const { user, token } = res.data;

      console.log("Register Success:", user);
      console.log("Token JWT:", token);

    } catch (error) {
      if (error.message === "Network Error") {
        toastError("Internal server error!");
      }

      if (error.response && error.response.data) {
        const responseData = error.response.data

        if (responseData.error === "Email already registered") {
          toastError("Email already registered, use another email address");
          reset();
          return;
        }
      }
      // console.log("Register Failed", error)
      // toastError("Email already registered, use another email address");
      // reset();
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
              className="w-full border border-shadow mt-2"
              id="Nama"
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
          <div>
            <label
              htmlFor="ConfirmPassword"
              className="text-sm font-semibold"
            >
              Konfirmasi Password
            </label>
            <input
              type="password"
              className="w-full border border-shadow mt-2"
              id="ConfirmPassword"
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
        <Button type="submit" color="dark" className="btn w-full p-1 my-6">
          REGISTER
        </Button>
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
