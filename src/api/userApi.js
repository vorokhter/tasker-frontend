import axios from "axios";
import { handleError } from "./handleError";

export const userApi = {
  login: async (email, password) => {
    return axios
      .post("/api/user/login.php", { email, password })
      .then((response) => ({ success: true, data: response.data }))
      .catch((error) => ({
        success: false,
        message: error.response.data.message,
      }));
  },
  registration: async (name, email, password, passwordConfirm) => {
    return axios
      .post("/api/user/register.php", {
        name,
        email,
        password,
        passwordConfirm,
      })
      .then((response) => ({ success: true, data: response.data }))
      .catch(handleError);
  },
  getCurrentUser: async () => {
    return axios
      .post("/api/user/get-current-user.php")
      .then((response) => ({ success: true, data: response.data }))
      .catch(handleError);
  },
  getAllUsers: async () => {
    return axios
      .post("/api/user/get-all-users.php")
      .then((response) => ({ success: true, data: response.data }))
      .catch(handleError);
  },
  addUser: async (roomId, userId) => {
    return axios
      .post("/api/user/add-user.php", { roomId, userId })
      .then((response) => ({ success: true, data: response.data }))
      .catch(handleError);
  },
  kickUser: async (roomId, userId) => {
    return axios
      .post("/api/user/kick-user.php", { roomId, userId })
      .then((response) => ({ success: true, data: response.data }))
      .catch(handleError);
  },
};
