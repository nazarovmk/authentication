import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useCollection } from "../hook/useCollection";

function OnLineUser() {
  const { data } = useCollection("users");
  const OnlineUsers = data ? data.filter((u) => u.isOnline) : [];
  const OflineUsers = data ? data.filter((u) => !u.isOnline) : [];

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-out-cubic",
      once: true,
    });
    AOS.refresh();
  }, [data]);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 col-start-11 col-end-13 flex flex-col pt-10 px-4">
      <div className="flex flex-col gap-1 mb-5">
        <h2 data-aos="fade-right">
          Users Online:{" "}
          <span className="text-green-700">({OnlineUsers.length})</span>
        </h2>
        <h2 data-aos="fade-left">
          Users Ofline: {""}
          <span className="text-red-600">({OflineUsers.length})</span>
        </h2>
      </div>
      {OnlineUsers.map((u) => (
        <figure key={u.id} data-aos="zoom-in-up" data-aos-duration="500">
          <div className="avatar flex items-center gap-3 text-white border rounded-lg p-2 mb-3">
            <div className="w-10 rounded-[50%] bg-gray-100">
              <img className="w-full h-full object-cover" src={u.photoURL} />
            </div>
            <h3 className="text-md font-medium text-center">{u.displayName}</h3>
            <span className="bg-green-600 p-1 rounded-[50%] ml-auto"></span>
          </div>
        </figure>
      ))}

      {OflineUsers.map((u) => (
        <figure key={u.id} data-aos="zoom-in-down" data-aos-duration="500">
          <div className="avatar flex items-center gap-3 text-white border rounded-lg p-2 mb-3">
            <div className="w-10 rounded-[50%] bg-gray-100">
              <img className="w-full h-full object-cover" src={u.photoURL} />
            </div>
            <h3 className="text-md font-medium text-center">{u.displayName}</h3>
            <span className="bg-red-600 p-1 rounded-[50%] ml-auto"></span>
          </div>
        </figure>
      ))}
    </div>
  );
}

export default OnLineUser;
