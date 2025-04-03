import { Link } from "react-router-dom";
import { useCollection } from "../hook/useCollection";
import { useSelector } from "react-redux";
import "aos/dist/aos.css";
import toast from "react-hot-toast";

function Home() {
  const { user } = useSelector((store) => store.user);
  const { data } = useCollection("tasks", ["uid", "==", user.uid]);

  if (!data) {
    toast.success("Welcome Dashboard");
  }
  return (
    <div className="px-5 pt-5">
      <h2 className="text-3xl font-medium mb-10">Dashboard</h2>
      {data &&
        data.map((u) => {
          return (
            <div
              data-aos="zoom-in"
              data-aos-duration="500"
              key={u.id}
              className="bg-white shadow-lg rounded-lg p-5 border border-gray-200 mb-5 last:mb-0"
            >
              <Link to={`/task/${u.id}`}>
                <h2 className="text-xl font-semibold text-gray-800">
                  {u.title}
                </h2>
                <p className="text-gray-600 mt-2">{u.description}</p>
                <h3 className="text-sm text-gray-500 mt-4">📅 {u.dueTo}</h3>
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export default Home;
