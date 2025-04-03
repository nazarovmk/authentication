import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import toast from "react-hot-toast";

export const useDocument = (c, id) => {
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState(false);

  useEffect(() => {
    const getDocument = async () => {
      const docRef = doc(db, c, id);
      setIsPending(true);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        toast.error("No such document");
      }
      setIsPending(false);
    };
    getDocument();
  }, [c, id]);

  return { data, isPending };
};
