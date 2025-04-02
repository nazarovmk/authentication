import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import OnLineUser from "../components/OnLineUser";
import Navbar from "../components/Navbar";

function MainLayouts() {
  return (
    <div className="grid grid-cols-12 h-screen">
      <Sidebar />
      <main className="bg-white text-black col-start-3 col-end-11 overflow-x-auto">
        <Navbar />
        <Outlet />
      </main>
      <OnLineUser />
    </div>
  );
}

export default MainLayouts;
