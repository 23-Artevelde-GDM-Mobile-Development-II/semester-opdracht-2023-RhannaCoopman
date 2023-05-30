// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ROUTES from '../../consts/routes';
// import Home from '../home/home';
// import style from "./authentication.module.css";
// import Header from "../../components/Global/header/header";
// import Footer from "../../components/Global/footer/footer";
// import NotFound from "../notFound/notFound";
// import "../../styles/main.css";
// import Detail from "../Detail/Detail";
// import Contact from "../Contact/Contact";
// import Login from "../Login/Login";
// import Register from "../Register/Register";

// const Authentication = () => {

//     return (
//         <div className={`${style.wrap}`}>
//             <Router>
//                 <Header />
                    
//                     <Routes>
//                         <Route path={ROUTES.home} element={<Home />}></Route>
//                         <Route path={ROUTES.detail.path} element={<Detail/>}></Route>

//                         <Route path={ROUTES.contact.path} element={<Contact/>}></Route>

//                         <Route path={ROUTES.login} element={<Login />}></Route>
//                         <Route path={ROUTES.register} element={<Register />}></Route>

//                         <Route path='*' element={<NotFound/>} />
//                     </Routes>

//                 <Footer />
//             </Router>
//         </div>
//     );
// };

// export default Authentication;