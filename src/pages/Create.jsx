import { useSelector } from "react-redux";
import FormInput from "../components/FormInput";
import FormTextArea from "../components/FormTextArea";
import { useFireStore } from "../hook/useFireStore";
import { useNavigate } from "react-router-dom";
import "aos/dist/aos.css";
import toast from "react-hot-toast";

function Create() {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  const { addTask, isPending } = useFireStore("tasks");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const title = formData.get("title");
    const dueTo = formData.get("due-to");
    const description = formData.get("description");

    if (!title || !description) {
      toast.error("Please fill all required fields");
      return;
    }

    addTask({
      uid: user.uid,
      title,
      comments: [],
      dueTo,
      description,
      creator: {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL || null,
      },
    })
      .then(() => {
        toast.success("Task created successfully!");
        navigate("/");
      })
      .catch(() => {
        toast.error("Failed to create task");
      });
  };

  return (
    <div className="px-4 py-6 lg:px-6" data-aos="fade-up">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Create New Task
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            name="title"
            label="Title"
            type="text"
            placeholder="Enter task title"
            required
          />

          <FormInput
            name="due-to"
            label="Due Date"
            type="date"
            placeholder="Select due date"
          />

          <FormTextArea
            label="Description"
            name="description"
            placeholder="Enter task description..."
            required
          />

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className={`px-6 py-2 rounded-lg text-white transition-colors ${
                isPending
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isPending ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
