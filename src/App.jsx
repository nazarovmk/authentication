import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import MainLayouts from "./layouts/MainLayouts";
import { Home, Create, Login, Register, Settings } from "./pages";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { authIsReady, login } from "./app/features/UserSlice";
import Task from "./pages/Task";

function App() {
  const dispatch = useDispatch();
  const { user, isAuthReady } = useSelector((store) => store.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(
          login({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
          })
        );
      } else {
        dispatch(login(null));
      }
      dispatch(authIsReady());
    });
    return () => unsubscribe();
  }, [dispatch]);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayouts />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/create",
          element: <Create />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
        {
          path: "task/:id",
          element: <Task />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
    },
  ]);

  // Faqat autentifikatsiya tayyor bo‘lganda router’ni render qilamiz
  return <>{isAuthReady && <RouterProvider router={routes} />}</>;
}

export default App;
