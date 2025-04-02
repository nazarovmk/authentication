import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../hook/useLogin";
import Loader from "./Loader";

function Login() {
  const { login, isPending } = useLogin();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    login(email, password);
  };

  return (
    <section className="min-h-screen flex items-center justify-center flex-col bg-gradient-to-b from-[#f1f4f9] to-[#dff1ff] overflow-hidden font-sans">
      <div className="absolute top-[-350px] w-[660px] h-[660px] bg-[#ff35b9] blur-[150px]"></div>
      <div className="absolute bottom-[-150px] left-[100px] w-[500px] h-[500px] bg-[#fffd87] blur-[150px]"></div>
      <div className="absolute bottom-[50px] right-[100px] w-[300px] h-[300px] bg-[#00d2ff] blur-[150px]"></div>

      <div className="relative">
        <div
          className="absolute top-[-50px] right-[-60px] w-[100px] h-[100px] bg-white/10 backdrop-blur-sm shadow-2xl border border-white/50 rounded-xl animate-float"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute bottom-[50px] right-[-60px] w-[80px] h-[80px] bg-white/10 backdrop-blur-sm shadow-2xl border border-white/50 rounded-xl animate-float z-[2]"
          style={{ animationDelay: "-1s" }}
        ></div>
        <div
          className="absolute top-[150px] left-[-100px] w-[120px] h-[120px] bg-white/10 backdrop-blur-sm shadow-2xl border border-white/50 rounded-xl animate-float z-[2]"
          style={{ animationDelay: "-2s" }}
        ></div>
        <div
          className="absolute bottom-[-80px] left-[100px] w-[50px] h-[50px] bg-white/10 backdrop-blur-sm shadow-2xl border border-white/50 rounded-xl animate-float"
          style={{ animationDelay: "-3s" }}
        ></div>
        <div
          className="absolute top-[-80px] left-[140px] w-[60px] h-[60px] bg-white/10 backdrop-blur-sm carpet-2xl border border-white/50 rounded-xl animate-float"
          style={{ animationDelay: "-4s" }}
        ></div>

        <div className="relative w-[400px] min-h-[400px] bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-2xl border border-white/50">
          <div className="w-full h-full pt-10 pl-10 pr-10 pb-5">
            <h2 className="text-white text-2xl font-semibold tracking-wider mb-10 relative after:content-[''] after:absolute after:left-0 after:bottom-[-10px] after:w-20 after:h-1 after:bg-white">
              Login Form
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col w-full mt-5 gap-1">
                <span className="text-white pl-2">Email</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Type here"
                  className="w-full bg-white/20 border-none p-3 rounded-full text-white placeholder-white text-base tracking-wide shadow-md focus:outline-none"
                  required
                />
              </div>
              <div className="flex flex-col w-full mt-5 gap-1">
                <span className="text-white pl-2">Password</span>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                    className="w-full bg-white/20 border-none p-3 rounded-full text-white placeholder-white text-base tracking-wide shadow-md focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white focus:outline-none"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.418 0-8-3.582-8-8s3.582-8 8-8a10.05 10.05 0 011.875.175M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3l18 18"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="mt-5 mb-5">
                {isPending ? (
                  <button
                    disabled
                    className="w-full bg-white text-gray-600 p-2 rounded-full font-semibold cursor-not-allowed shadow-md"
                  >
                    <Loader />
                  </button>
                ) : (
                  <button className="w-full bg-white text-gray-600 p-2 rounded-full font-semibold cursor-pointer shadow-md">
                    Login
                  </button>
                )}
              </div>
              <div className="mt-5 mb-10">
                <button
                  type="button"
                  className="w-full btn bg-white text-gray-600 border-[#e5e5e5] rounded-full p-5"
                >
                  <svg
                    aria-label="Google logo"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <path d="m0 0H512V512H0" fill="#fff"></path>
                      <path
                        fill="#34a853"
                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                      ></path>
                      <path
                        fill="#4285f4"
                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                      ></path>
                      <path
                        fill="#fbbc02"
                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                      ></path>
                      <path
                        fill="#ea4335"
                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                      ></path>
                    </g>
                  </svg>
                  Login with Google
                </button>
              </div>
            </form>
            <p className="text-gray-400 items-center justify-center flex">
              If you don't have an account, please{" "}
              <NavLink className="text-blue-400 underline" to="/register">
                Register
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
