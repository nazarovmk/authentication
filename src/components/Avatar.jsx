function Avatar({ user }) {
  const { displayName, photoURL } = user;
  return (
    <div className="avatar flex flex-col items-center gap-5 text-black">
      <div className="w-24 rounded-[50%] bg-gray-100">
        <img src={photoURL} />
      </div>
      <h3 className="text-xl font-medium text-center">Hello, {displayName}</h3>
    </div>
  );
}

export default Avatar;
