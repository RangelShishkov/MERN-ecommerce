import React from "react";
import { useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa6";
import { Link, Outlet } from "react-router-dom";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  return (
    <div className="min-h-[calc(100vh-120px)] flex">
      <aside className="bg-white min-h-full w-full max-w-60 customShadow">
        <div className="h-32 bg-cyan-500 flex justify-center items-center flex-col">
          <div className="text-3xl cursor-pointer flex justify-center">
            <FaRegUser />
          </div>
          <p>
            Hello,{" "}
            <span className="capitalize font-semibold">{user?.name} </span>{" "}
          </p>
          <p className="text-sm">{user?.role}</p>
        </div>
        {/***navigation */}
        <div>
          <nav className="grid p-4">
            <Link to={"all-users"} className="px-2 py-1 hover:bg-slate-100">
              All Users
            </Link>
            <Link to={"all-products"} className="px-2 py-1 hover:bg-slate-100">
              All Products
            </Link>
          </nav>
        </div>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default AdminPanel;
