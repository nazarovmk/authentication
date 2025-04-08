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
        comments: [...(data?.comments || []), comment],
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
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Comments</h2>
          <div className="space-y-4 mb-8">
            {data?.comments?.length > 0 ? (
              data.comments.map((comment, index) => {
                const commentDate =
                  comment.createdAt?.toDate?.() || new Date(comment.createdAt);
                const isValidDate = isValid(commentDate);
                const isCurrentUser = comment.author.uid === user.uid;

                return (
                  <div
                    key={index}
                    className={`chat ${
                      isCurrentUser ? "chat-end" : "chat-start"
                    }`}
                  >
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        {comment.author.photoURL ? (
                          <img
                            src={comment.author.photoURL}
                            alt={comment.author.displayName}
                          />
                        ) : (
                          <div className="bg-gray-300 w-full h-full flex items-center justify-center text-white text-lg font-bold">
                            {comment.author.displayName?.charAt(0) || "U"}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="chat-header">
                      <time className="text-xs opacity-50 ml-2">
                        {isValidDate
                          ? format(commentDate, "h:mm a")
                          : "Unknown time"}
                      </time>
                    </div>
                    <div className="chat-bubble">{comment.content}</div>
                    <div className="text-[11px]">
                      {comment.author.displayName}
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
