import axios from "axios";
import { handleError } from "./handleError";

export const taskApi = {
  editTask: async (task) => {
    return axios
      .post("/api/task/edit-task.php", { task })
      .then((response) => ({ success: true, data: response.data }))
      .catch(handleError);
  },
  deleteTask: async (taskId) => {
    return axios
      .post("/api/task/delete-task.php", { taskId })
      .then((response) => ({ success: true, data: response.data }))
      .catch(handleError);
  },
  takeTask: async (taskId) => {
    return axios
      .post("/api/task/take-task.php", { taskId })
      .then((response) => ({ success: true, data: response.data }))
      .catch(handleError);
  },
};
