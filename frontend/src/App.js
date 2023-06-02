import { MantineProvider, Skeleton } from "@mantine/core";
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
  RolesAndAccess,
  Sales,
  SharedDocuments,
  UserManagement,
} from "./pages";
import { Route, Routes } from "react-router-dom";
import { Components, Login, UserInfo } from "./components";

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/component" element={<Components />} />
        <Route path="/home" element={<Home />}>
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
          <Route path="roles-and-access" element={<RolesAndAccess />} />
          <Route path="authentications" element={<Authentication />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </MantineProvider>
  );
}
