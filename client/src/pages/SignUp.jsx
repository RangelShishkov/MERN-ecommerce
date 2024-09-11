import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  const navigate = useNavigate()

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataApi = await dataResponse.json();

      if(dataApi.success){
        toast.success(dataApi.message)
        navigate('/login')
      }
      if(dataApi.error){
        toast.error(dataApi.message)
      }

    } else {
      toast.error("Passwords doesn't match!")
    }
  };

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-2 w-full max-w-md mx-auto rounded">
          <form
            method="POST"
            className="p-3 flex flex-col gap-3"
            onSubmit={onSubmitHandler}
          >
            <div className="grid">
              <label htmlFor="username">Username:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="name"
                  placeholder="Enter username.."
                  name="name"
                  value={data.name}
                  onChange={onChangeHandler}
                  required
                  className="w-full h-full outline-none bg-transparent "
                />
              </div>
            </div>

            <div className="grid">
              <label htmlFor="email">Email:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Enter email.."
                  name="email"
                  value={data.email}
                  onChange={onChangeHandler}
                  required
                  className="w-full h-full outline-none bg-transparent "
                />
              </div>
            </div>

            <div>
              <label htmlFor="password">Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password.."
                  name="password"
                  value={data.password}
                  onChange={onChangeHandler}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />

                <div
                  className="cursor-pointer text-lg"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <IoMdEye />}</span>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password">Confirm Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password.."
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={onChangeHandler}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />

                <div
                  className="cursor-pointer text-lg"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <IoMdEye />}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button className="text-white bg-cyan-300 w-full px-5 py-2 max-w-[100px] rounded-full hover:scale-110 hover:bg-cyan-400 transition-all mx-auto block">
                Sign Up
              </button>
              <p className="pt-4 pb-2">
                <Link
                  to={"/login"}
                  className="block w-fit mr-auto text-sm hover:underline hover:text-cyan-400"
                >
                  Already have an account?
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
