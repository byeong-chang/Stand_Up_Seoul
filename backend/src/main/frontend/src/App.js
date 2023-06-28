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
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import Main from "./Main";
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
            <Navbar bg="dark" expand="lg" variant="dark" className="navbar navbar-expand-lg navbar-dark bg-dark">
                <img
                    src={image}
                    alt="로고 이미지"
                    onClick={handleButtonClickStandUpSeoul}
                    className="navbar-brand"
                    style={{ transform: 'scale(1.6)', width: '100px', marginTop: '-50px', marginBottom: '-80px', marginLeft: '50px' }}
                />
                <Navbar.Toggle aria-controls="navbarSupportedContent" style={{ marginRight: '30px' }}/>
                <Navbar.Collapse id="navbarSupportedContent" style={{ marginRight: '30px' }}>
                    <Nav className="ms-auto mb-2 mb-lg-0">
                        {loggedInUser && (
                        <Nav.Link onClick={handleMypage} style={{ marginLeft: '10px' }}>{localStorage.getItem('nickname')}님</Nav.Link>
                            )}
                        {loggedInUser ? (
                        <Nav.Link onClick={handleLogout} style={{ marginLeft: '10px' }}>로그아웃</Nav.Link>
                        ) : (
                        <Nav.Link onClick={handleLogin} style={{ marginLeft: '10px' }}>로그인</Nav.Link>
                        )}
                        <Nav.Link onClick={handleSignin} style={{ marginLeft: '10px' }}>회원가입</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Routes>
                <Route path="/" element={<Face/>}></Route>
                <Route path="/main/*" element={<Main/>}></Route>
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
            <footer className="bg-dark py-3 mt-auto">
                <div className="container px-5">
                    <div className="row align-items-center justify-content-between flex-column flex-sm-row">
                        <div className="col-auto">
                            <div className="small m-0 text-white">Copyright &copy; Your Website 2023</div>
                        </div>
                        <div className="col-auto">
                            <a className="link-light small" href="#!">Privacy</a>
                            <span className="text-white mx-1">&middot;</span>
                            <a className="link-light small" href="#!">Terms</a>
                            <span className="text-white mx-1">&middot;</span>
                            <a className="link-light small" href="#!">Contact</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}


export default App;
