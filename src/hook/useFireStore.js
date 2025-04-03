import { doc, updateDoc, setDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useReducer, useState } from "react";
import { toast } from "react-hot-toast";

const initialState = {
  data: null,
  error: null,
  isPending: false,
  success: false,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "IS_PENDING":
      return { data: null, error: null, isPending: true, success: false };
    case "ERROR":
      return { data: null, error: payload, isPending: false, success: false };
    case "ADD_DATA":
      return { data: payload, error: null, isPending: false, success: true };
    default:
      return state;
  }
};

export function useFireStore(c) {
  const [isCanceled, setIsCanceled] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const dispatchIfNotCanceled = (action) => {
    if (!isCanceled) {
      dispatch(action);
    }
  };

  const addDocument = async (id, data) => {
    dispatchIfNotCanceled({ type: "IS_PENDING" });
    try {
      await setDoc(doc(db, c, id), data);
      dispatchIfNotCanceled({ type: "ADD_DATA", payload: data });
    } catch (error) {
      dispatchIfNotCanceled({ type: "ERROR", payload: error.message });
      toast.error("This didn't work!");
    }
  };

  const updateDocument = async (id, updates) => {
    const userRef = doc(db, c, id);
    dispatchIfNotCanceled({ type: "IS_PENDING" });
    try {
      await updateDoc(userRef, updates);
      dispatchIfNotCanceled({ type: "ADD_DATA", payload: updates });
    } catch (error) {
      dispatchIfNotCanceled({ type: "ERROR", payload: error.message });
      toast.error("This didn't work!");
    }
  };

  const addTask = async (data) => {
    dispatchIfNotCanceled({ type: "IS_PENDING" });
    try {
      await addDoc(collection(db, c), data);
      toast.success("Document Added");
      dispatchIfNotCanceled({ type: "ADD_DATA", payload: data });
    } catch (error) {
      dispatchIfNotCanceled({ type: "ERROR", payload: error.message });
      toast.error("This didn't work!");
    }
  };

  useEffect(() => {
    return () => setIsCanceled(true);
  }, []);

  return { ...state, addDocument, updateDocument, addTask };
}
