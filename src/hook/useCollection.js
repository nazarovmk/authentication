import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase/config";

export const useCollection = (c, w) => {
  const [data, setData] = useState(null);
  const _w = useRef(w).current;
  let q;
  useEffect(() => {
    if (_w) {
      q = query(collection(db, c), where(..._w));
    } else {
      q = collection(db, c);
    }
    const unsubscribe = onSnapshot(q, (snapshot) => {
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
  }, [c, _w]);

  return { data };
};
