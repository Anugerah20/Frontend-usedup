import { useForm } from "react-hook-form"
import { useApiPost } from "../services/apiService";
import { ToastContainer } from "react-toastify";
import { toastError, toastSuccess } from "../services/toatsService";

const RegisterCard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const registerData = {
        fullname: data.nameRequired,
        email: data.emailRequired,
        password: data.passwordRequired,
      };

      const res = await useApiPost('/user/register', registerData)

      if (res) {
        toastSuccess("Registration Successful");
        reset();
      }

      console.log("Data registrasi:", registerData)

      const { user, token } = res.data;

      console.log("Register Success:", user);
      console.log("Token JWT:", token);

    } catch (error) {
      console.log("Register Failed", error)
      toastError("Email already registered, use another email address");
      reset();
    }
  }

  return (
    <>
      <form onClick={handleSubmit(onSubmit)} className="card card-register">
        <div className="mb-5">
          <p className="text-[30px] font-bold">REGISTER</p>
          <p className="text-[14px] text-btn-grey">
            Register untuk menjual, menambahkan ke favorit dan masih banyak lagi!
          </p>
        </div>
        <div>
          <div className="my-[20px]">
            <label htmlFor="Nama" className="text-sm font-semibold">
              Nama Lengkap
            </label>
            <input
              type="text"
              className="w-full h-[41px] border border-shadow mt-2"
              id="Nama"
              {...register("nameRequired", { required: true })}
            />
            {errors.nameRequired && <span className="text-sm text-red">Name required</span>}
          </div>
          <div className="my-[20px]">
            <label htmlFor="Email" className="text-sm font-semibold">
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
            <label htmlFor="Password" className="text-sm font-semibold">
              Password
            </label>
            <input
              type="password"
              className="w-full h-[41px] border border-shadow my-2"
              id="Password"
              {...register("passwordRequired", { required: true, minLength: 6 })}
            />
            {errors.passwordRequired && errors.passwordRequired.type === "required" && <span className="text-sm text-red">Password required</span>}
            {errors.passwordRequired && errors.passwordRequired.type === "minLength" && <span className="text-sm text-red">Password min 6 character</span>}
          </div>
          <div className="my-[20px]">
            <label
              htmlFor="ConfirmPassword"
              className="text-sm font-semibold"
            >
              Konfirmasi Password
            </label>
            <input
              type="password"
              className="w-full h-[41px] border border-shadow my-2"
              id="ConfirmPassword"
              {...register("ConfirmPasswordRequired", { required: true, minLength: 6 })}
            />
          </div>
          {errors.ConfirmPasswordRequired && errors.ConfirmPasswordRequired.type === "required" && <span className="text-sm text-red">Confirm Password required</span>}
          {errors.ConfirmPasswordRequired && errors.ConfirmPasswordRequired.type === "minLength" && <span className="text-sm text-red">Confirm Password min 6 character</span>}
          <button className="mt-10 mb-5 w-full h-[38px] bg-black text-white font-semibold">
            REGISTER
          </button>
        </div>
        <div className="text-center">
          <span className="text-black">
            Sudah memiliki akun?{" "}
            <a href="#" className="text-blue-link underline">
              Login disini
            </a>
          </span>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default RegisterCard;
