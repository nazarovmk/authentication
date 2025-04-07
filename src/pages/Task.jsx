import { useParams } from "react-router-dom";
import { useDocument } from "../hook/useDocument";
import Loader from "./Loader";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import "aos/dist/aos.css";
import FormTextArea from "../components/FormTextArea";
import { useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { format, isValid } from "date-fns";

function Task() {
  const { user } = useSelector((store) => store.user);
  const { id } = useParams();
  const { isPending, data } = useDocument("tasks", id);
  const hasWelcome = useRef(false);

  useEffect(() => {
    if (!isPending && data && !hasWelcome.current) {
      toast.success(`Viewing task: ${data.title}`);
      hasWelcome.current = true;
    }
  }, [isPending, data]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const content = formData.get("message");

    if (!content.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    const comment = {
      content: content.trim(),
      createdAt: new Date(),
      author: {
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
      },
    };

    try {
      const commentRef = doc(db, "tasks", id);
      await updateDoc(commentRef, {
        comments: [...(data.comments || []), comment],
      });
      e.target.reset();
      toast.success("Comment added!");
    } catch (error) {
      toast.error("Failed to add comment");
    }
  };

  return (
    <div className="px-4 py-6 lg:px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Task Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {data.title}
          </h1>

          <div className="flex items-center text-sm text-gray-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Due:{" "}
            {data.dueTo && isValid(new Date(data.dueTo))
              ? format(new Date(data.dueTo), "MMM dd, yyyy")
              : "No due date"}
          </div>

          <p className="text-gray-600 whitespace-pre-line">
            {data.description}
          </p>
        </div>

        {/* Comments Section */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Comments</h2>

          <div className="space-y-4 mb-8">
            {(data.comments || []).length > 0 ? (
              data.comments.map((comment, index) => {
                const commentDate =
                  comment.createdAt?.toDate?.() || new Date(comment.createdAt);
                const isValidDate = isValid(commentDate);

                return (
                  <div
                    key={index}
                    className={`flex gap-3 ${
                      comment.author.uid === user.uid ? "justify-end" : ""
                    }`}
                  >
                    {comment.author.uid !== user.uid && (
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                          {comment.author.photoURL ? (
                            <img
                              src={comment.author.photoURL}
                              alt={comment.author.displayName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-600">
                              {comment.author.displayName?.charAt(0) || "A"}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div
                      className={`max-w-xs lg:max-w-md rounded-lg p-3 ${
                        comment.author.uid === user.uid
                          ? "bg-indigo-100 text-gray-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium">
                          {comment.author.displayName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {isValidDate
                            ? format(commentDate, "MMM dd, h:mm a")
                            : "Unknown time"}
                        </span>
                      </div>
                      <p className="whitespace-pre-line">{comment.content}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-500">
                No comments yet. Be the first to comment!
              </div>
            )}
          </div>

          {/* Comment Form */}
          <form onSubmit={handleSubmit} className="mt-6">
            <FormTextArea
              label="Add a comment"
              name="message"
              placeholder="Write your comment here..."
              rows={3}
            />
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Post Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Task;
