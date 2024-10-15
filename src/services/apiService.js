import axios from "axios";
// import { useNavigate } from "react-router-dom"

// const navigation = useNavigate();

// dev
const dev = "http://localhost:3000/api";

// prod
const prod = "https://api-usedup-production.up.railway.app/api";

const apiService = axios.create({
  // baseURL: prod,
  baseURL: prod,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("useToken")}`,
  },
});

// Register
export const useApiPost = async (url, userData) => {
  try {
    const res = await apiService.post(url, userData);
    return res;
  } catch (error) {
    console.error("Register Failed", error);
    throw error;
  }
};

// Get Data User
export const useApiGet = async (url) => {
  try {
    const res = await apiService.get(url);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Edit Data User
export const useApiPut = async (url, data) => {
  try {
    const res = await apiService.put(url, data);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Delete Api
export const useApiDelete = async (url) => {
  try {
    const res = await apiService.delete(url);
    return res.data;
  } catch (error) {
    throw error;
  }
}

// User Logout
export const userLogout = () => {
  try {
    localStorage.removeItem("useToken");
    localStorage.removeItem("userId");
    window.location.replace("/login");
  } catch (error) {
    console.error("Error logout", error);
  }
};

export default apiService;
