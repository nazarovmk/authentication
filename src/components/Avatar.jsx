function Avatar({ user }) {
  if (!user) return null;
  const { photoURL, displayName } = user;

  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-md">
        {photoURL ? (
          <img
            src={photoURL}
            alt={displayName || "User"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600 text-2xl font-semibold">
            {displayName?.charAt(0) || "U"}
          </div>
        )}
      </div>
    </div>
  );
}

export default Avatar;
