function Avatar({ user }) {
  if (!user) return null;
  const { photoURL } = user;
  return (
    <div className="avatar flex flex-col items-center text-black mb-3">
      <div className="w-24 rounded-[50%] bg-gray-100">
        <img src={photoURL} />
      </div>
    </div>
  );
}

export default Avatar;
