import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"

const LoginCard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => console.log(data)

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="card card-login">
        <div className="mb-5">
          <p className="text-[30px] font-bold">LOGIN</p>
          <p className="text-[14px] text-btn-grey">
            Ingin mencari sesuatu? banyak barang bagus loh!
          </p>
        </div>
        <div>
          <div className="my-[20px]">
            <label htmlFor="Email" className="text-[12px] font-semibold">
              Email
            </label>
            <input
              type="email"
              className="w-full h-[41px] border border-shadow mt-2"
              id="Email"
              {...register("emailRequired", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, })}
            />
            {errors.emailRequired && errors.emailRequired.type === "required" && <span className="text-sm text-red">Email required</span>}
            {errors.emailRequired && errors.emailRequired.type === "pattern" && <span className="text-sm text-red">Invalid Email</span>}
          </div>
          <div className="my-[20px]">
            <label htmlFor="Password" className="text-[12px] font-semibold">
              Password
            </label>
            <input
              type="password"
              className="w-full h-[41px] border border-shadow mt-2"
              id="Password"
              {...register("passwordRequired", { required: true, minLength: 6 })}
            />
            {errors.passwordRequired && errors.passwordRequired.type === "required" && <span className="text-sm text-red">Password required</span>}
            {errors.passwordRequired && errors.passwordRequired.type === "minLength" && <span className="text-sm text-red">Password min 6 character</span>}
          </div>
          <div className="text-end">
            <a href="#" className=" text-blue-link underline">
              Lupa Password?
            </a>
          </div>
          <button type="submit" className="mt-10 mb-5 w-full h-[38px] bg-black text-white font-semibold">
            LOGIN
          </button>
        </div>
        <div className="text-center">
          <span className="text-black">
            Belum punya akun?{" "}
            <Link to="/register" className="text-blue-link underline">
              Register disini
            </Link>
          </span>
        </div>
      </form>
    </>
  );
};

export default LoginCard;
