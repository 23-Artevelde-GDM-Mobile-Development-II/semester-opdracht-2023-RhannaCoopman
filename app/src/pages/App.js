import { Route, Routes } from "react-router-dom";
import AuthContainer from "../contexts/AuthContainer";
import Header from "../Components/Global/header/header";

import Home from "./home/home";
import Login from "./Login/Login";
import Register from "./Register/Register";
import TestTest from "./TestTest/TestTest";
import Detail from "./Detail/Detail";
import Contact from "./Contact/Contact";
import Dashboard from "./Dashboard/Dashboard";
import GlobalProfile from "./GlobalProfile/GlobalProfile";
import UpdateHouse from "./MakelaarDashboard/UpdateHouse/UpdateHouse";
import CreateHouse from "./MakelaarDashboard/CreateHouse/CreateHouse";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import EditUser from "./AdminDashboard/EditUser/EditUser";
import EditBuilding from "./AdminDashboard/EditBuilding/EditBuilding";
import EditAgencies from "./AdminDashboard/EditAgencies/EditAgencies";
import MakelaarDashboard from "./MakelaarDashboard/MakelaarDashboard";

const App = () => {
  return (
    <AuthContainer>
      <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/house/:id/*" element={<Detail />} />

          <Route path="/contact/:id" element={<Contact />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/myprofile" element={<Dashboard />} />
          <Route path="/profile/:id" element={<GlobalProfile />} />

          <Route path="/makelaar/dashboard" element={<MakelaarDashboard />} />
          <Route path="/makelaar/createhouse" element={<CreateHouse />} />
          <Route path="/makelaar/updatehouse/:id" element={<UpdateHouse />} />

          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/edituser/:id" element={<EditUser />} />
          <Route path="/admin/editbuilding/:id" element={<EditBuilding />} />
          <Route path="/admin/editagency/:id" element={<EditAgencies />} />


          <Route path="/test" element={<TestTest />} />

        </Routes>

    </AuthContainer>
  );
};

export default App;
