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
function App() {
    let navigate = useNavigate();
  return (
    <div className="App">
        <Header></Header>
        <Routes>
					<Route path="/" element={<Home />}></Route>
            <Route path="/predict/*" element={<Predict />}></Route>
          <Route path="/live/*" element={<Live />}></Route>
          <Route path="/livedetail/*" element={<LiveDetail />}></Route>
          <Route path="/restaurantpage/*" element={<RestaurantPage />}></Route>
            <Route path="/axiostest/*" element={<AxiosTest />}></Route>
            <Route path="/login/*" element={<Login />}></Route>
					{/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
		   </Routes>
    </div>
  )
}


export default App;
