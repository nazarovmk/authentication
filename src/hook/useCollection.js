import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export const useCollection = (c) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, c), (snapshot) => {
      const data = [];
      snapshot.forEach((d) => {
        data.push({
          id: d.id,
          ...d.data(),
        });
      });
      setData(data);
    });

    return () => unsubscribe();
  }, [c]);

  return { data };
};
