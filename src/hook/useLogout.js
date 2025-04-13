import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { toast } from "react-hot-toast";
import { useFireStore } from "./useFireStore";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../app/features/UserSlice";

export const useSignOut = () => {
  const [isPending, setIsPending] = useState(false);
  const { updateDocument } = useFireStore("users");
  const dispatch = useDispatch();

  const signout = async () => {
    setIsPending(true);
    const user = auth.currentUser;

    if (!user) {
      toast.error("User not found!");
      setIsPending(false);
      return;
    }

    try {
      await updateDocument(user.uid, { isOnline: false });

      await signOut(auth);

      dispatch(logOut());

      toast.success(`See you soon ${user.displayName || "Anonymous"} 🖐`);
    } catch (error) {
      toast.error(error.message || "Xatolik yuz berdi!");
    } finally {
      setIsPending(false);
    }
  };

  return { signout, isPending };
};
