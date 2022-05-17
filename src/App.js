import "./index.css";
import { Home, Login, Signup, Notification, Profile } from "./pages";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { SideNav } from "./components/SideNav";
import { useDispatch, useSelector } from "react-redux";
import { getUserTokenFromLocalStorage, verifyUser } from "./features/authSlice";
import { useEffect } from "react";

function App() {
  const token = getUserTokenFromLocalStorage();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(verifyUser());
    }
  }, [dispatch, token]);

  return (
    <>
      {/* <Header />
      <SideNav /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
