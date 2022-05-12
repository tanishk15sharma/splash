import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { postLoginDetails } from "../features/authSlice";
import { validLogin } from "../utils/auth";
import { Link } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state);
  // console.log(userDetails);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loginErrors, setLoginErrors] = useState({
    username: "",
    password: "",
    others: "",
  });
  const inputHandler = (e) => {
    setLoginData((data) => ({ ...data, [e.target.name]: e.target.value }));
    setLoginErrors((loginErr) => ({ ...loginErr, [e.target.name]: "" }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { isValid, errors } = validLogin(loginData, loginErrors);
    if (!isValid) {
      setLoginErrors(errors);
      return;
    }
    // dispatch(postLoginDetails(loginData));
  };
  const testLoginHandler = () => {
    setLoginData({ username: "adarshbalika", password: "adarshBalika123" });
  };
  return (
    <div className=" grid grid-cols-2 h-screen gap-4 ">
      <div className="border-2 border-solid flex items-center justify-center  ">
        <h2>LET'S START IT !!</h2>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1>SPLASH</h1>
        <form onSubmit={handleLogin}>
          <label>
            <span className="block text-sm font-medium text-slate-700">
              userName
            </span>
            <input
              type="text"
              className=" border border-solid p-1 w-full "
              placeholder="Username"
              name="username"
              value={loginData.username}
              onChange={inputHandler}
            />
          </label>
          {loginErrors.username && (
            <span className="text-red text-xs flex">
              <span className="material-icons-outlined text-xs mr-1">
                error_outline
              </span>
              {loginErrors.username}
            </span>
          )}
          <label>
            <span className="block text-sm font-medium text-slate-700">
              Password
            </span>
            <input
              type="text"
              className=" border border-solid p-1 w-full "
              placeholder="**********"
              name="password"
              value={loginData.password}
              onChange={inputHandler}
            />
          </label>
          {loginErrors.password && (
            <span className="text-red text-xs flex">
              <span className="material-icons-outlined text-xs mr-1">
                error_outline
              </span>
              {loginErrors.password}
            </span>
          )}

          <button className="bg-gradient-to-r mt-5  w-full block ease-in-out duration-300 from-primary-400 to-primary-600 p-1 text-white hover:-translate-y-0.5 hover:shadow-md">
            LOGIN
          </button>
          <button
            onClick={testLoginHandler}
            className="border  ease-out duration-200 mt-3 border-primary-800 p-1 pr-5 pl-5 hover:-translate-y-0.5 hover:shadow-md"
          >
            Login with Test Credentials
          </button>
        </form>
        <h3 className="underline">OR</h3>
        <p>
          Don't have an account?{" "}
          <Link to="/signup">
            <span className="text-primary-800  font-semibold">Signup</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export { Login };