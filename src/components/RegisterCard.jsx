const RegisterCard = () => {
  return (
    <>
      <div className="card card-register">
        <div className="mb-5">
          <p className="text-[30px] font-bold">REGISTER</p>
          <p className="text-[14px] text-btn-grey">
            Register untuk menjual, menambahkan ke favorit dan masih banyak lagi!
          </p>
        </div>
        <form>
          <div className="my-[20px]">
            <label htmlFor="Nama" className="text-sm font-semibold">
              Nama Lengkap
            </label>
            <input
              type="text"
              className="w-full h-[41px] border border-shadow mt-2"
              id="Nama"
              required
            />
          </div>
          <div className="my-[20px]">
            <label htmlFor="Email" className="text-sm font-semibold">
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
            <label htmlFor="Password" className="text-sm font-semibold">
              Password
            </label>
            <input
              type="password"
              className="w-full h-[41px] border border-shadow my-2"
              id="Password"
              required
            />
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
              required
            />
          </div>
          <button className="mt-10 mb-5 w-full h-[38px] bg-black text-white font-semibold">
            REGISTER
          </button>
        </form>
        <div className="text-center">
          <span className="text-black">
            Sudah memiliki akun?{" "}
            <a href="#" className="text-blue-link underline">
              Login disini
            </a>
          </span>
        </div>
      </div>
    </>
  );
};

export default RegisterCard;
