import React, { useEffect, useReducer, useState } from "react";
import "../components/Users.css";

const initalState = {
  usersList: [],
  users: "",
};
const renderFunction = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { usersList: [...state.usersList], users: action.val };
  }
  if (action.type === "ADD_USER") {
    return {
      usersList: [
        ...state.usersList,

        {
          id: Math.floor(Math.random() * 992828),
          name: state.users,
        },
      ],
    };
  }
  if (action.type === "EMPTY") {
    return { usersList: [...state.usersList], users: action.val };
  }
  return initalState;
};
function Users(props) {
  const [usersList, setUsersList] = useState([]);
  const [userName, dispatchUsers] = useReducer(renderFunction, initalState);

  const setUserHandler = (e) => {
    dispatchUsers({ type: "USER_INPUT", val: e.target.value });
    // props.sendUsers(userName.usersList);
  };

  const handleOnClick = () => {
    if (!userName.users) {
      return;
    }
    dispatchUsers({ type: "ADD_USER" });
    dispatchUsers({ type: "EMPTY", val: "" });
  };
  useEffect(() => {
    setUsersList([...userName.usersList]);
  }, [userName.usersList]);

  useEffect(() => {
    props.sendUsers(usersList);
  }, [props, usersList]);

  return (
    <div style={{ padding: 20 }}>
      <label htmlFor="user">User Name :</label>
      <input type="text" value={userName.users} onChange={setUserHandler} />
      <button
        type="submit"
        onClick={handleOnClick}
        className="add-new-user-btn"
      >
        Add new user
      </button>
    </div>
  );
}

export default Users;
