import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export  const toastSuccess = (message) => {
     toast.success(message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
     });
}

export const toastError = (message) => {
     toast.error(message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
     });
}
