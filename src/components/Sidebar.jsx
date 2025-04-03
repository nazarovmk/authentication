import { useSelector } from "react-redux";
import Avatar from "./Avatar";
import { RxDashboard } from "react-icons/rx";
import { MdCreateNewFolder } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const { user, displayName } = useSelector((store) => store.user);
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-out-cubic",
      once: true,
    });
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 col-start-1 col-end-3">
      <div className="flex items-start justify-center pt-10 px-4 mb-15 cursor-pointer">
        <figure data-aos="flip-up" data-aos-duration="1000">
          <Avatar user={user} />
          <h3 className="text-xl font-medium text-center">
            Hello, {user.displayName}
          </h3>
        </figure>
      </div>
      <div className="flex flex-col items-end gap-3">
        <Link
          to="/"
          className={`flex items-center gap-2 py-2 px-4 w-40 rounded-l-2xl cursor-pointer ${
            location.pathname === "/"
              ? "bg-gray-600 text-white"
              : "bg-gradient-to-r from-blue-500 to-indigo-600"
          }`}
        >
          <RxDashboard />
          <span className="whitespace-nowrap">Dashboard</span>
        </Link>
        <Link
          to="/create"
          className={`flex items-center gap-2 py-2 px-4 w-40 rounded-l-2xl cursor-pointer ${
            location.pathname === "/create"
              ? "bg-gray-600 text-white"
              : "bg-gradient-to-r from-blue-500 to-indigo-600"
          }`}
        >
          <MdCreateNewFolder />
          <span className="whitespace-nowrap">Create</span>
        </Link>
        <Link
          to="/settings"
          className={`flex items-center gap-2 py-2 px-4 w-40 rounded-l-2xl cursor-pointer ${
            location.pathname === "/settings"
              ? "bg-gray-600 text-white"
              : "bg-gradient-to-r from-blue-500 to-indigo-600"
          }`}
        >
          <IoIosSettings />
          <span className="whitespace-nowrap">Settings</span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
