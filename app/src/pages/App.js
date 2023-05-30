import { Route, Routes } from "react-router-dom";
import AuthContainer from "../contexts/AuthContainer";
import Header from "../Components/Global/header/header";
import Detail from "./Detail/Detail";
import Home from "./home/home";
import Login from "./Login/Login";
import Register from "./Register/Register";
import TestTest from "./TestTest/TestTest";


const App = () => {
  return (
    <AuthContainer>
      <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/test" element={<TestTest />} />



        </Routes>

    </AuthContainer>
  );
};

export default App;
