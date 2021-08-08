import React from "react";
import { userApi } from "../../api";
import { Modal } from "../Modal/Modal";
import { ArrowIcon } from "../../icons";
import "./UsersManageModal.css";

export function UsersManageModal({ room, open, setOpen, users, fetchUsers }) {
  const usersOfThisRoom = users.filter((user) =>
    user.roomIds.includes(room.id)
  );
  const restUsers = users.filter((user) => !user.roomIds.includes(room.id));

  const addUser = async (userId) => {
    const userResponse = await userApi.addUser(room.id, userId);
    if (userResponse.success) {
      await fetchUsers();
    }
  };

  const kickUser = async (userId) => {
    const userResponse = await userApi.kickUser(room.id, userId);
    if (userResponse.success) {
      await fetchUsers();
    }
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="users-manage">
        <div className="users-manage__tab">
          <span className="users-manage__tab__title">Все пользователи</span>

          <div className="users-manage__items">
            {restUsers.map((user) => (
              <div className="users-manage__item">
                <div className="users-manage__item__title">{user.name}</div>
                <div
                  className="users-manage__item__control"
                  onClick={() => addUser(user.id)}
                >
                  <ArrowIcon />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="users-manage__tab">
          <span className="users-manage__tab__title">
            Участники комнаты "{room.title}"
          </span>

          <div className="users-manage__items">
            {usersOfThisRoom.map((user) => (
              <div className="users-manage__item">
                <div
                  className="users-manage__item__control kick-user"
                  onClick={() => kickUser(user.id)}
                >
                  <ArrowIcon />
                </div>
                <div className="users-manage__item__title">{user.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
