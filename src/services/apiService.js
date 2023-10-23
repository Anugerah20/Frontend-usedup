import axios from "axios";

const apiService = axios.create({
     baseURL: "http://localhost:3000/api",
     timeout: 1000,
});

export const useApiPost = async (url, userData) => {
     try {
          const res = await apiService.post(url, userData);
          return res;
     } catch (error) {
          console.error("Register Failed", error);
          throw error
     }
}

export default apiService;