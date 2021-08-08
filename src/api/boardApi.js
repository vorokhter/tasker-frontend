import axios from "axios";
import { handleError } from "./handleError";

export const boardApi = {
  getBoard: async (boardId) => {
    return axios
      .post("/api/board/get-board.php", { boardId })
      .then((response) => ({ success: true, data: response.data }))
      .catch(handleError);
  },
  addTask: async (boardId, task) => {
    return axios
      .post("/api/board/add-task.php", { boardId, task })
      .then((response) => ({ success: true, data: response.data }))
      .catch(handleError);
  },
  editBoard: async (board) => {
    return axios
      .post("/api/board/edit-board.php", { board })
      .then((response) => ({ success: true, data: response.data }))
      .catch(handleError);
  },
  deleteBoard: async (boardId) => {
    return axios
      .post("/api/board/delete-board.php", { boardId })
      .then((response) => ({ success: true, data: response.data }))
      .catch(handleError);
  },
};
