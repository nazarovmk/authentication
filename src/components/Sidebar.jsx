import { useSelector } from "react-redux";
import Avatar from "./Avatar";
import { RxDashboard } from "react-icons/rx";
import { MdCreateNewFolder } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Sidebar() {
  const { user } = useSelector((store) => store.user);
  const [active, setActive] = useState("dashboard");

  useEffect(() => {
    AOS.init({
      duration: 600, // Animatsiya tezligi
      easing: "ease-out-cubic", // Animatsiya tarzi
      once: true, // Faqat bir marta ishlashini xohlasangiz
    });
  }, []);

  return (
    <div className="bg-[oklch(0.673_0.182_276.935)] col-start-1 col-end-3">
      <div className="flex items-start justify-center pt-10 px-4 mb-15 cursor-pointer">
        <figure data-aos="flip-up" data-aos-duration="1000">
          <Avatar user={user} />
        </figure>
      </div>
      <div className="flex flex-col items-end gap-3">
        <div
          className={`flex items-center gap-2 py-2 px-4 w-40 rounded-l-2xl cursor-pointer ${
            active === "dashboard"
              ? "bg-gray-600 text-white"
              : "bg-[oklch(0.673_0.182_276.935)]"
          }`}
          onClick={() => setActive("dashboard")}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <RxDashboard />
          <span className="whitespace-nowrap">Dashboard</span>
        </div>
        <div
          className={`flex items-center gap-2 py-2 px-4 w-40 rounded-l-2xl cursor-pointer ${
            active === "Create"
              ? "bg-gray-600 text-white"
              : "bg-[oklch(0.673_0.182_276.935)]"
          }`}
          onClick={() => setActive("Create")}
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <MdCreateNewFolder />
          <span className="whitespace-nowrap">Create</span>
        </div>
        <div
          className={`flex items-center gap-2 py-2 px-4 w-40 rounded-l-2xl cursor-pointer ${
            active === "Settings"
              ? "bg-gray-600 text-white"
              : "bg-[oklch(0.673_0.182_276.935)]"
          }`}
          onClick={() => setActive("Settings")}
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <IoIosSettings />
          <span className="whitespace-nowrap">Settings</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
