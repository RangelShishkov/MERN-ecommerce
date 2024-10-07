import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa6";
import { PiShoppingCartSimple } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate()

  const logoutHandler = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  const searchHandler = (e) => {
    const { value } = e.target;

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }

  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className=" ">
          <Link to={"/"}>
            <Logo width={160} height={60} />
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-sm focus-within:border-1 focus-within:border-black pl-3">
          <input
            type="text"
            placeholder="Search..."
            className="w-full outline-none"
            onChange={searchHandler}
          />

          <div className="text-lg min-w-[50px] h-8 flex items-center justify-center rounded-r-full bg-cyan-500 text-white">
            <GrSearch />
          </div>
        </div>

        <div className="flex items-center gap-5">
          {user?._id && (
            <Link to={"/cart"} className="text-2xl relative cursor-pointer">
              <PiShoppingCartSimple />

              <div className="bg-cyan-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3 ">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          {user?._id && (
            <div
              className="text-xl cursor-pointer"
              onClick={() => setMenuDisplay((preve) => !preve)}
            >
              <FaRegUser />
            </div>
          )}
          <div className="relative flex justify-center">
            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-9 h-fit p-2 shadow-lg rounded">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                      onClick={() => setMenuDisplay((preve) => !preve)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          <div>
            {user?._id ? (
              <button
                onClick={logoutHandler}
                className="px-2 py-1 rounded-full text-white bg-cyan-500 hover:bg-cyan-600"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-2 py-1 rounded-full text-white bg-cyan-500 hover:bg-cyan-600"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
