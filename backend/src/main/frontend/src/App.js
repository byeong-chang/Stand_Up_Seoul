import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from 'react';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import Predict from './Predict';
import Home from './Home';
import Header from './Header';
import Live from './Live';
import LiveDetail from './LiveDetail';
import RestaurantPage from './RestaurantPage';
import AxiosTest from "./AxiosTest";
import Login from "./Login";
import Test from "./test";
import HotplacePage from "./HotplacePage";
import SignUp from "./SignUp";

function App() {
    // let navigate = useNavigate();
    // let restaurant = useState([]);
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/predict/*" element={<Predict/>}></Route>
                <Route path="/live/*" element={<Live/>}></Route>
                <Route path="/livedetail/:id" element={<LiveDetail/>}></Route>
                <Route path="/restaurant/:id" element={<RestaurantPage/>}></Route>
                <Route path="/hotplace/:id" element={<HotplacePage/>}></Route>
                <Route path="/axiostest/*" element={<AxiosTest/>}></Route>
                <Route path="/login/*" element={<Login/>}></Route>
                <Route path="/signup/*" element={<SignUp/>}></Route>
                <Route path="/test/*" element={<Test/>}></Route>
                {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
            </Routes>
        </div>
    )
}


export default App;
