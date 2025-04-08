import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export const useDocument = (c, id) => {
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!c || !id) return;

    setIsPending(true);

    const unsub = onSnapshot(
      doc(db, c, id),
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          setData({ id: docSnapshot.id, ...docSnapshot.data() });
        } else {
          setData(null); // hujjat topilmasa
        }
        setIsPending(false);
      },
      (error) => {
        console.error("Firestore snapshot error:", error);
        setIsPending(false);
      }
    );

    return () => unsub();
  }, [c, id]);

  return { data, isPending };
};
