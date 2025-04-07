import { useSelector } from "react-redux";
import { RxDashboard } from "react-icons/rx";
import { MdCreateNewFolder } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useLocation } from "react-router-dom";
import Avatar from "./Avatar";

function Sidebar({ onClose }) {
  const { user } = useSelector((store) => store.user);
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-out-cubic",
      once: true,
    });
  }, []);

  return (
    <div className="h-full flex flex-col">
      {/* Close button for mobile */}
      <div className="lg:hidden flex justify-end p-4">
        <button
          onClick={onClose}
          className="p-1 rounded-md text-white hover:bg-indigo-800 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Avatar section */}
      <div className="flex flex-col items-center pt-4 lg:pt-10 px-4 mb-8 lg:mb-12">
        <figure data-aos="flip-up" data-aos-duration="1000">
          <Avatar user={user} />
          <h3 className="text-xl font-medium text-center text-white mt-4">
            Hello, {user?.displayName || "User"}
          </h3>
        </figure>
      </div>

      {/* Navigation links */}
      <nav className="flex flex-col gap-2 px-4 flex-grow pb-8">
        <Link
          to="/"
          onClick={onClose}
          className={`flex items-center gap-3 py-3 px-4 rounded-lg text-white transition-colors ${
            location.pathname === "/" ? "bg-indigo-800" : "hover:bg-indigo-800"
          }`}
        >
          <RxDashboard size={20} />
          <span>Dashboard</span>
        </Link>
        <Link
          to="/create"
          onClick={onClose}
          className={`flex items-center gap-3 py-3 px-4 rounded-lg text-white transition-colors ${
            location.pathname === "/create"
              ? "bg-indigo-800"
              : "hover:bg-indigo-800"
          }`}
        >
          <MdCreateNewFolder size={20} />
          <span>Create</span>
        </Link>
        <Link
          to="/settings"
          onClick={onClose}
          className={`flex items-center gap-3 py-3 px-4 rounded-lg text-white transition-colors ${
            location.pathname === "/settings"
              ? "bg-indigo-800"
              : "hover:bg-indigo-800"
          }`}
        >
          <IoIosSettings size={20} />
          <span>Settings</span>
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
