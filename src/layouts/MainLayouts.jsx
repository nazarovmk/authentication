import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import OnLineUser from "../components/OnLineUser";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useSignOut } from "../hook/useLogout"; // Hook to‘g‘ri import qilingan

function MainLayouts() {
  const { signout, isPending } = useSignOut(); // Hookdan signout va isPending olinmoqda
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [onlineUsersOpen, setOnlineUsersOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Mobile Navbar */}
      <header className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-40">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <h1 className="text-xl font-semibold text-primary">Dashboard</h1>

        {/* Sign Out va Online Users yonma-yon */}
        <div className="flex items-center space-x-2">
          {/* Sign Out Button */}
          <button
            onClick={signout}
            disabled={isPending}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {isPending ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
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
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            )}
          </button>

          {/* Online Users Button */}
          <button
            onClick={() => setOnlineUsersOpen(!onlineUsersOpen)}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
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
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Sidebar - Mobile & Desktop */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        bg-gradient-to-b from-blue-600 to-indigo-700 text-white`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 lg:p-6">
        {/* Desktop Navbar */}
        <nav className="hidden lg:block bg-white shadow-sm rounded-lg p-4 mb-6">
          <Navbar />
        </nav>
        <Outlet />
      </main>

      {/* Online Users - Mobile & Desktop */}
      <aside
        className={`fixed lg:static inset-y-0 right-0 z-30 w-64 transform transition-transform duration-300
        ${
          onlineUsersOpen
            ? "translate-x-0"
            : "translate-x-full lg:translate-x-0"
        }
        bg-gradient-to-b from-blue-600 to-indigo-700 text-white overflow-y-auto`}
      >
        <OnLineUser onClose={() => setOnlineUsersOpen(false)} />
      </aside>

      {/* Mobile Overlays */}
      {(sidebarOpen || onlineUsersOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => {
            setSidebarOpen(false);
            setOnlineUsersOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default MainLayouts;
