import { Link } from "react-router-dom";
import { useCollection } from "../hook/useCollection";
import { useSelector } from "react-redux";
import "aos/dist/aos.css";
import toast from "react-hot-toast";
import { useEffect } from "react";

function Home() {
  const { user } = useSelector((store) => store.user);
  const { data } = useCollection("tasks");

  useEffect(() => {
    if (!data) {
      toast.success(`Welcome back ${user?.displayName || "User"}!`);
    }
  }, [data]);

  return (
    <div className="px-4 py-6 lg:px-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-primary">
          Dashboard
        </h2>
        <Link
          to="/create"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Create Task
        </Link>
      </div>

      <div className="grid gap-6">
        {data && data.length > 0 ? (
          data.map((task) => (
            <div
              data-aos="fade-up"
              data-aos-duration="300"
              key={task.id}
              className="bg-white shadow-md rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <Link to={`/task/${task.id}`} className="block">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {task.title}
                  </h2>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {task.dueTo}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {task.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden mr-2">
                      {task.creator?.photoURL ? (
                        <img
                          src={task.creator.photoURL}
                          alt={task.creator.displayName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm text-gray-600">
                          {task.creator?.displayName?.charAt(0) || "A"}
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-gray-600">
                      {task.creator?.displayName || "Anonymous"}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {task.comments?.length || 0} comments
                  </span>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="bg-white shadow-md rounded-xl p-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No Tasks Yet
            </h3>
            <p className="text-gray-500 mb-4">
              Create your first task to get started
            </p>
            <Link
              to="/create"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Create Task
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
