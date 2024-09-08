import React from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa6";
import { PiShoppingCartSimple } from "react-icons/pi";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import SummaryApi from "../common";
import {toast} from "react-toastify"
import { setUserDetails } from "../store/userSlice";

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()

  const logoutHandler = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    })

    const data = await fetchData.json()

    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
    }
    if(data.error){
      toast.error(data.message)
    }
  }
  return (
    <header className="h-16 shadow-md bg-white">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className=" ">
          <Link to={'/'}>
          <Logo width={160} height={60} />
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-sm focus-within:border-1 focus-within:border-black pl-3">
          <input
            type="text"
            placeholder="Search..."
            className="w-full outline-none"
          />
          <div className="text-lg min-w-[50px] h-8 flex items-center justify-center rounded-r-full bg-cyan-300 text-white">
            <GrSearch />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="text-2xl cursor-pointer">
            <PiShoppingCartSimple />
          </div>

          <div className="text-xl cursor-pointer">
            <FaRegUser />
          </div>

          <div>
            {
              user?._id ? (
                <button onClick={logoutHandler} className="px-2 py-1 rounded-full text-white bg-cyan-300 hover:bg-cyan-500">Logout</button>
              )
              :
              (<Link to={"/login"} className="px-2 py-1 rounded-full text-white bg-cyan-300 hover:bg-cyan-500">Login</Link>)
            }
            
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
