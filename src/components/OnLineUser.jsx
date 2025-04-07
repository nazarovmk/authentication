import { useCollection } from "../hook/useCollection";
import { FiX } from "react-icons/fi";

function OnLineUser({ onClose }) {
  const { data } = useCollection("users");
  const OnlineUsers = data ? data.filter((u) => u.isOnline) : [];
  const OfflineUsers = data ? data.filter((u) => !u.isOnline) : [];

  return (
    <div className="h-full flex flex-col p-4">
      {/* Close button for mobile */}
      <div className="lg:hidden flex justify-end">
        <button
          onClick={onClose}
          className="p-1 rounded-md text-white hover:bg-indigo-800 transition-colors"
        >
          <FiX size={24} />
        </button>
      </div>

      <div className="flex flex-col gap-1 mb-5 mt-4">
        <h2 className="text-lg font-semibold">
          Online Users:{" "}
          <span className="text-green-300">({OnlineUsers.length})</span>
        </h2>
        <h2 className="text-lg font-semibold">
          Offline Users:{" "}
          <span className="text-red-300">({OfflineUsers.length})</span>
        </h2>
      </div>

      <div className="overflow-y-auto flex-1">
        {/* Online Users */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-indigo-200 mb-2">
            ACTIVE NOW
          </h3>
          {OnlineUsers.map((u) => (
            <div
              key={u.id}
              className="flex items-center gap-3 text-white p-2 rounded-lg hover:bg-indigo-800 transition-colors"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={u.photoURL}
                    alt={u.displayName}
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-indigo-700"></span>
              </div>
              <div>
                <h3 className="font-medium">{u.displayName}</h3>
                <p className="text-xs text-indigo-200">Online</p>
              </div>
            </div>
          ))}
        </div>

        {/* Offline Users */}
        <div>
          <h3 className="text-sm font-medium text-indigo-200 mb-2">OFFLINE</h3>
          {OfflineUsers.map((u) => (
            <div
              key={u.id}
              className="flex items-center gap-3 text-white p-2 rounded-lg hover:bg-indigo-800 transition-colors opacity-70"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={u.photoURL}
                    alt={u.displayName}
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-gray-500 rounded-full border-2 border-indigo-700"></span>
              </div>
              <div>
                <h3 className="font-medium">{u.displayName}</h3>
                <p className="text-xs text-indigo-200">Offline</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OnLineUser;
