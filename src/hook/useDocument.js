import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export const useDocument = (c, id) => {
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, c, id), (doc) => {
      setData({ id: doc.id, ...doc.data() });
    });

    return () => unsub();
  }, [c, id]);

  return { data, isPending };
};
