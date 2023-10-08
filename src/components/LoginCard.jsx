import { Link } from "react-router-dom";

const LoginCard = () => {
  return (
    <>
      <div className="card card-login">
        <div className="mb-5">
          <p className="text-[30px] font-bold">LOGIN</p>
          <p className="text-[14px] text-btn-grey">
            Ingin mencari sesuatu? banyak barang bagus loh!
          </p>
        </div>
        <form>
          <div className="my-[20px]">
            <label htmlFor="Email" className="text-[12px] font-semibold">
              Email
            </label>
            <input
              type="email"
              className="w-full h-[41px] border border-shadow mt-2"
              id="Email"
              required
            />
          </div>
          <div className="my-[20px]">
            <label htmlFor="Password" className="text-[12px] font-semibold">
              Password
            </label>
            <input
              type="password"
              className="w-full h-[41px] border border-shadow my-2"
              id="Password"
              required
            />
          </div>
          <div className="text-end">
            <a href="#" className=" text-blue-link underline">
              Lupa Password?
            </a>
          </div>
          <button className="mt-10 mb-5 w-full h-[38px] bg-black text-white font-semibold">
            LOGIN
          </button>
        </form>
        <div className="text-center">
          <span className="text-black">
            Belum punya akun?{" "}
            <Link to="/register" className="text-blue-link underline">
              Register disini
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default LoginCard;
