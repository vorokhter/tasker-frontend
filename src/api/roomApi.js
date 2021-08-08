import axios from "axios";
import { handleError } from "./handleError";

export const roomApi = {
  getRooms: async () => {
    return axios
      .post("/api/room/get-rooms.php")
      .then((response) => ({ success: true, data: response.data }))
      .catch(handleError);
  },
  getRoom: async (roomId) => {
    return axios
      .post("/api/room/get-room.php", { roomId })
      .then((response) => ({ success: true, data: response.data }))
      .catch(handleError);
  },
  createRoom: async (room) => {
    return axios
      .post("/api/room/create-room.php", { room })
      .then((response) => ({ success: true, data: response.data }))
      .catch(handleError);
  },
  editRoom: async (room) => {
    return axios
      .post("/api/room/edit-room.php", { room })
      .then((response) => ({ success: true, data: response.data }))
      .catch(handleError);
  },
  addBoard: async (roomId, board) => {
    return axios
      .post("/api/room/add-board.php", { roomId, board })
      .then((response) => ({ success: true, data: response.data }))
      .catch(handleError);
  },
  deleteRoom: async (id) => {
    return axios
      .post("/api/room/delete-room.php", { id })
      .then((response) => ({ success: true, data: response.data }))
      .catch(handleError);
  },
};
