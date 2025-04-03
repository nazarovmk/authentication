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
    addTask({
      uid: user.uid,
      title,
      dueTo,
      description,
      creator: {
        displayName: user.displayName,
        email: user.email,
      },
    }).then(() => navigate("/"));
  };
  return (
    <div className="p-5" data-aos="zoom-in">
      <h2 className="text-3xl font-medium mb-5">Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <FormInput name="title" label="Title" type="text" />
        <FormInput name="due-to" label="Due-to" type="date" />
        <FormTextArea label="Description" name="description" />
        <div>
          {!isPending && (
            <button className="btn btn-outline btn-info">Add</button>
          )}
          {isPending && (
            <button className="btn btn-outline btn-info" disabled>
              Loading...
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Create;
