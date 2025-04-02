import { useSignOut } from "../hook/useLogout";

function Navbar() {
  const { isPending, signout } = useSignOut();
  return (
    <div className="w-full flex justify-between items-center shadow-lg px-5 py-1">
      <div>
        <img
          className="rounded-lg cursor-pointer"
          src="https://static.vecteezy.com/system/resources/previews/021/919/677/non_2x/login-icon-in-trendy-flat-style-isolated-on-white-background-approach-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-flat-style-for-graphic-design-vector.jpg"
          width={50}
          height={50}
          alt=""
        />
      </div>
      <div className="p-3 bg-gray-200 rounded-lg cursor-pointer">
        <img
          src="https://static-00.iconduck.com/assets.00/login-icon-2048x2048-cafqaoiq.png"
          alt=""
          width={20}
          height={20}
          onClick={signout}
        />
      </div>
    </div>
  );
}

export default Navbar;
