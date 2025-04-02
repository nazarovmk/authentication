import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useCollection } from "../hook/useCollection";

function OnLineUser() {
  const { data } = useCollection("users");
  const OnlineUsers = data ? data.filter((u) => u.isOnline).length : 0;
  const OflineUsers = data ? data.filter((u) => !u.isOnline).length : 0;

  useEffect(() => {
    AOS.init({
      duration: 600, // Animatsiyaning tezligi
      easing: "ease-out-cubic", // Animatsiyaning vaqtni taqsimlash
      once: true, // Faqat bir marta ishlashini xohlasangiz
    });
    AOS.refresh();
  }, [data]);

  return (
    <div className="bg-[oklch(0.673_0.182_276.935)] col-start-11 col-end-13 flex flex-col pt-10 px-4">
      <div className="flex flex-col gap-1 mb-5">
        <h2 data-aos="fade-right">
          Users Online: <span className="text-green-700">({OnlineUsers})</span>
        </h2>
        <h2 data-aos="fade-left">
          Users Ofline: {""}
          <span className="text-red-600">({OflineUsers})</span>
        </h2>
      </div>
      {data &&
        data.map((u) => {
          if (u.isOnline) {
            return (
              <figure key={u.id} data-aos="zoom-in-up" data-aos-duration="500">
                <div className="avatar flex items-center gap-3 text-black border rounded-lg p-2 mb-3">
                  <div className="w-10 rounded-[50%] bg-gray-100">
                    <img
                      className="w-full h-full object-cover"
                      src={u.photoURL}
                    />
                  </div>
                  <h3 className="text-md font-medium text-center">
                    {u.displayName}
                  </h3>
                  <span className="bg-green-600 p-1 rounded-[50%] ml-auto"></span>
                </div>
              </figure>
            );
          } else {
            return (
              <figure
                key={u.id}
                data-aos="zoom-in-down"
                data-aos-duration="500"
              >
                <div className="avatar flex items-center gap-3 text-black border rounded-lg p-2 mb-3">
                  <div className="w-10 rounded-[50%] bg-gray-100">
                    <img
                      className="w-full h-full object-cover"
                      src={u.photoURL}
                    />
                  </div>
                  <h3 className="text-md font-medium text-center">
                    {u.displayName}
                  </h3>
                  <span className="bg-red-600 p-1 rounded-[50%] ml-auto"></span>
                </div>
              </figure>
            );
          }
        })}
    </div>
  );
}

export default OnLineUser;
