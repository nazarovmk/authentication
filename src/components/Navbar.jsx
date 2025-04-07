import { useSignOut } from "../hook/useLogout";
import { useSelector } from "react-redux";

function Navbar() {
  const { isPending, signout } = useSignOut();
  const { user } = useSelector((store) => store.user);

  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-primary">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        {user?.photoURL ? (
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-500">
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
            {user?.displayName?.charAt(0) || "U"}
          </div>
        )}

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
      </div>
    </div>
  );
}

export default Navbar;
