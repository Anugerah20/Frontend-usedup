/* eslint-disable react-hooks/rules-of-hooks */
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { toastError, toastSuccess } from "../services/toatsService";
import { useApiPost } from "../services/apiService";
import { Fragment, useEffect } from "react";
import { Button } from "flowbite-react";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";

const LoginCard = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const loginData = {
        email: data.emailRequired,
        password: data.passwordRequired,
      };

      const response = await useApiPost('/user/login', loginData);
      if (response) {
        localStorage.setItem("useToken", response.data.token);
        localStorage.setItem("userId", response.data.checkUser.id);
        toastSuccess("Login Successful");

        const redirectUrl = localStorage.getItem('redirectAfterLogin') || '/';

        setTimeout(() => {
          window.location.href = redirectUrl;
          localStorage.removeItem('redirectAfterLogin');
        }, 1000);
        reset();
      }
    } catch (error) {
      console.log('Login error', error);

      if (error.response && error.response.data && error.response.data.error) {
        toastError(`Login Failed: ${error.response.data.error}`);
      } else {
        toastError("Internal server error");
      }
      reset();
    }
  };

  // Login with Google
  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: "",
      });
    };
    gapi.load('client:auth2', start);
  }, []);

  const onSuccess = async (res) => {
    const { profileObj } = res;

    try {
      // Send data login with google to backend
      const res = await useApiPost('/user/login-google', {
        fullname: profileObj?.name,
        email: profileObj?.email,
        foto: profileObj?.imageUrl,
      });

      // Save token JWT to local storage
      localStorage.setItem('useToken', res.data.token);
      localStorage.setItem('userId', res.data.data.id);
      toastSuccess('Login Google Berhasil');

      // Redirect to home page
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);

    } catch (error) {
      console.log('Login Google error', error);
    }
  };

  const onError = (error) => {
    toastError('Login Google Gagal!', error);
    console.log('Login Google Faield!');
  };

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
              {...register("emailRequired", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
            />
            {errors.emailRequired && errors.emailRequired.type === "required" && (
              <span className="text-sm text-red-error">Email required</span>
            )}
            {errors.emailRequired && errors.emailRequired.type === "pattern" && (
              <span className="text-sm text-red-error">Invalid Email</span>
            )}
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
            {errors.passwordRequired && errors.passwordRequired.type === "required" && (
              <span className="text-sm text-red-error">Password required</span>
            )}
            {errors.passwordRequired && errors.passwordRequired.type === "minLength" && (
              <span className="text-sm text-red-error">Password min 6 characters</span>
            )}
          </div>
          <div className="text-end">
            <Link to="/forgot-password" className=" text-blue-link underline">
              Lupa Password?
            </Link>
          </div>
        </div>
        <Button type="submit" color="dark" className="btn w-full p-1 my-6">
          LOGIN
        </Button>
        <div className="flex items-center text-center gap-3">
          <hr className="flex-grow border-gray-300" />
          <span className="text-black">atau</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <GoogleLogin
          clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
          buttonText="Login Dengan Google"
          onSuccess={onSuccess}
          onError={onError}
          cookiePolicy={'single_host_origin'}
          className="google-btn"
        />
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
