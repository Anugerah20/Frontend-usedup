import axios from "axios";
// import { useNavigate } from "react-router-dom"

// const navigation = useNavigate();

const apiService = axios.create({
     baseURL: "http://localhost:3000/api",
});

// Register
export const useApiPost = async (url, userData) => {
     try {
          const res = await apiService.post(url, userData);
          return res;
     } catch (error) {
          console.error("Register Failed", error);
          throw error
     }
}

// Get Data User
export const useApiGet = async (url) => {
     try {
          const res = await apiService.get(url);
          return res;
     } catch (error) {
          console.log(error);
          throw error;
     }
}

// User Logout
export const userLogout = () => {
     try {
          localStorage.removeItem("useToken")
          window.location.replace("/login");
     } catch (error) {
          console.error("Error logout", error);
     }
}

export default apiService;