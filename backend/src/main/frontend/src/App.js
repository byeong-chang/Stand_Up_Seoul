import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
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
import Face from "./Face";
import PartnerLogin from "./PartnerLogin";
import PartnerSignUp from "./PartnerSignUp";
import CulturePage from "./CulturePage";
import image from "./static/제목을 입력해주세요_-001 (4).png";
import MyPage from "./MyPage";
function App() {
    let [lat, setLet] = useState(0);
    let [lng, setLng] = useState(0);

    const [loggedInUser, setLoggedInUser] = useState(null); // 로그인한 사용자

    const navigate = useNavigate();

    useEffect(() => {
        checkLoggedInUser(); // 사용자가 이미 로그인되어 있는지 확인
    }, []);

    const checkLoggedInUser = () => {
        const token = localStorage.getItem('token');

        if (token) {
            // 사용자가 로그인되어 있는 경우
            const nickname = localStorage.getItem('nickname'); // 로컬 스토리지 또는 서버에서 사용자 ID 가져오기
            setLoggedInUser({ nickname: nickname }); // 사용자 ID를 loggedInUser 상태에 설정
        } else {
            // 사용자가 로그인되어 있지 않은 경우
            setLoggedInUser(null);
        }
    };

    const handleLogout = () => {
        // 로그인된 사용자 데이터 지우기
        setLoggedInUser(null);

        // 로컬 스토리지에서 토큰 제거
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('location');

        // 원하는 페이지로 이동
        navigate('/');
        window.location.reload();
    };

    const handleLogin = () => {
        // 원하는 페이지로 이동
        navigate('/login');
    };

    const handleSignin = () => {
        // 원하는 페이지로 이동
        navigate('/signup');
    };

    const handleMypage = () => {
        // 원하는 페이지로 이동
        navigate('/mypage');
    };

    const handleButtonClickStandUpSeoul = () => {
        if (loggedInUser) {
            // 사용자가 로그인된 경우
            navigate("/"); // 원래 경로로 이동
        } else {
            // 사용자가 로그인되지 않은 경우
            navigate("/"); // 로그인 페이지로 이동
        }
    };

    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container px-5">
                    {/*<img src={image} alt="로고 이미지" />*/}
                    <img
                        src={image}
                        alt="로고 이미지"
                        onClick={handleButtonClickStandUpSeoul}
                        className="navbar-brand"
                        style={{ transform: 'scale(1.6)', width: '100px', marginTop: '-50px', marginBottom: '-80px' }}
                    />
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {loggedInUser && (
                                <li className="nav-item">
                  <span className="nav-link" onClick={handleMypage}>
                    {localStorage.getItem('nickname')}님
                  </span>
                                </li>
                            )}
                            {loggedInUser ? (
                                // 로그인된 사용자인 경우
                                <React.Fragment>
                                    <li className="nav-item">
                    <span className="nav-link" onClick={handleLogout}>
                      로그아웃
                    </span>
                                    </li>
                                </React.Fragment>
                            ) : (
                                // 로그인되지 않은 사용자인 경우
                                <li className="nav-item">
                  <span className="nav-link" onClick={handleLogin}>
                    로그인
                  </span>
                                </li>
                            )}
                            <li className="nav-item">
                <span className="nav-link" onClick={handleSignin}>
                  회원가입
                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Routes>
                <Route path="/" element={<Face/>}></Route>
                <Route path="/predict/*" element={<Predict/>}></Route>
                <Route path="/live/*" element={<Live/>}></Route>
                <Route path="/live/detail/:id" element={<LiveDetail/>}></Route>
                <Route path="/restaurant/:id" element={<RestaurantPage/>}></Route>
                <Route path="/hotplace/:id" element={<HotplacePage/>}></Route>
                <Route path="/culture/:id" element={<CulturePage/>}></Route>
                <Route path="/axiostest/*" element={<AxiosTest/>}></Route>
                <Route path="/home/*" element={<Home lat={lat} lng={lng}/>}></Route>
                <Route path="/signup/*" element={<SignUp/>}></Route>
                <Route path="/test/*" element={<Test setLet={setLet} setLng={setLng}/>}></Route>
                <Route path="/face/*" element={<Face/>}></Route>
                {/*<Route path="/partnerlogin/*" element={<PartnerLogin/>}></Route>*/}
                {/*<Route path="/partnersignup/*" element={<PartnerSignUp/>}></Route>*/}
                <Route path="/login/*" element={<Login/>}></Route>
                <Route path="/signup/*" element={<SignUp/>}></Route>
                <Route path="/mypage/*" element={<MyPage/>}></Route>
                {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
            </Routes>

            <footer className="py-3 bg-dark">
                <div className="container"><p className="m-0 text-center text-white">Copyright &copy; Your Website
                    2023</p>
                </div>
            </footer>
        </div>
    )
}


export default App;
