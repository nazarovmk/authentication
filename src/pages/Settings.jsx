import { useEffect } from "react";
import toast from "react-hot-toast";

function Settings() {
  useEffect(() => {
    toast.success("Welcome Settings");
  });
  return (
    <div className="px-5 pt-5">
      <h2 className="text-3xl font-medium">Settings</h2>
      <div className="p-5 text-center">
        <h2 className="text-xl font-semibold">Hozircha hech narsa yo'q</h2>
        <p className="mt-2 text-gray-500">
          Settings sahifasi hozirda bo'sh. Iltimos, keyinchalik qayta tekshirib
          ko'ring!
        </p>
        <h3 className="text-gray-500">Empty State</h3>
      </div>
    </div>
  );
}

export default Settings;
