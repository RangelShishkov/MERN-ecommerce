import React, { useState } from "react";
import ROLE from "../common/role";
import { MdClose } from "react-icons/md";

const ChangeUserRole = ({ name, email, role, onClose }) => {
  const [userRole, setUserRole] = useState(role);

  const onChangeSelectHandler = (e) => {
    setUserRole(e.target.value);
  };
  const updateUserRole = async () => {};
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
        <button className="block ml-auto" onClick={onClose}>
          <MdClose />
        </button>
        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <div className="flex items-center my-4">
          <p className="mr-1">Role: </p>
          <select
            className="border px-4 py-1 focus:outline-none"
            value={userRole}
            onChange={onChangeSelectHandler}
          >
            {Object.values(ROLE).map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>
        <button
          className="w-fit mx-auto block bg-cyan-500 text-white border py-1 px-3 rounded-full hover:bg-cyan-700"
          onClick={updateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
