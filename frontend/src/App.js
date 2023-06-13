import { MantineProvider } from "@mantine/core";
import axios from "axios";
import {
  AdminContact,
  Authentication,
  CRM,
  CheckOut,
  CreatePurchase,
  CreateUser,
  Home,
  LegalsAndAgreements,
  Members,
  Notifications,
  OptionPage,
  Profile,
  PurchaseOrder,
  Sales,
  SharedDocuments,
  Unauthorized,
  UserManagement,
} from "./pages";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login, UserInfo } from "./components";
import { useEffect, useState } from "react";
import { login } from "./api/auth";

export default function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      console.log("res in login: ", res);
      setUser(res);
    } catch (error) {
      console.log("error in handleSumit", error);
    }
  };

  const handleLogout = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      console.log("refreshToken in logout: ", userData.refreshToken);
      await axios.post("/logout", { token: userData.refreshToken });
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.log("error in handleLogout", error);
    }
  };

  useEffect(() => {
    setUser(() => {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    });
  }, []);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Routes>
        <Route
          exact
          path="/"
          element={
            user ? (
              <Navigate to={"/home/profile"} />
            ) : (
              <Login
                setEmail={setEmail}
                setPassword={setPassword}
                handleSubmit={handleSubmit}
              />
            )
          }
        />
        <Route
          path="/home"
          element={
            user ? (
              <Home handleLogout={handleLogout} />
            ) : (
              <Login
                setEmail={setEmail}
                setPassword={setPassword}
                handleSubmit={handleSubmit}
              />
            )
          }
        >
          <Route path="profile" element={<Profile />} />
          <Route path="crm" element={<CRM />} />
          <Route path="admin-contact" element={<AdminContact />}>
            <Route path="user-info" element={<UserInfo />} />
          </Route>
          <Route path="members" element={<Members />} />
          <Route path="check-out" element={<CheckOut />} />
          <Route path="option" element={<OptionPage />} />
          <Route path="create-purchase-order" element={<CreatePurchase />} />
          <Route path="purchase-order" element={<PurchaseOrder />} />
          <Route path="create-user" element={<CreateUser />} />
          <Route path="sales" element={<Sales />} />
          <Route path="legals-agreements" element={<LegalsAndAgreements />} />
          <Route path="shared-documents" element={<SharedDocuments />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="authentications" element={<Authentication />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="unauthorized" element={<Unauthorized />} />
        </Route>
      </Routes>
    </MantineProvider>
  );
}
