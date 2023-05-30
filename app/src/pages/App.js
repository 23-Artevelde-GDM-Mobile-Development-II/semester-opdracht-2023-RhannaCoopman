import { Route, Routes } from "react-router-dom";
import AuthContainer from "../contexts/AuthContainer";
import Header from "../Components/Global/header/header";

import Home from "./home/home";
import Login from "./Login/Login";
import Register from "./Register/Register";
import TestTest from "./TestTest/TestTest";
import Detail from "./Detail/Detail";
import Contact from "./Contact/Contact";


const App = () => {
  return (
    <AuthContainer>
      <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/house/:id" element={<Detail />} />

          <Route path="/contact/:id" element={<Contact />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/test" element={<TestTest />} />



        </Routes>

    </AuthContainer>
  );
};

export default App;
