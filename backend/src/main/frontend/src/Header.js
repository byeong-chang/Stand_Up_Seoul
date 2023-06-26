
import './App.css';
import React, {useEffect, useState} from "react";
import Home from "./Home";

import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import './App.css';

function Header(props) {

    const [loggedInUser, setLoggedInUser] = useState(null); // 로그인한 사용자
    const navigate = useNavigate();
    useEffect(() => {
        checkLoggedInUser(); // 사용자가 이미 로그인되어 있는지 확인
    }, []);

    const checkLoggedInUser = () => {
        const token = localStorage.getItem('token');

        if (token) {
            // 사용자가 로그인되어 있는 경우
            const username = localStorage.getItem('username'); // 로컬 스토리지 또는 서버에서 사용자 ID 가져오기
            setLoggedInUser({ username: username }); // 사용자 ID를 loggedInUser 상태에 설정
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

        // 원하는 페이지로 이동
        navigate('/home');
    };

    const handleButtonClickStandUpSeoul = () => {
        if (loggedInUser) {
            // 사용자가 로그인된 경우
            navigate("/home"); // 원래 경로로 이동
        } else {
            // 사용자가 로그인되지 않은 경우
            navigate("/"); // 로그인 페이지로 이동
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container px-5">
                <button onClick={handleButtonClickStandUpSeoul} className="navbar-brand" style={{ background: 'none', border: 'none' }}>스탠드업서울</button>
                {/*<button className="btn btn-secondary btn-lg" onClick={handleButtonClickStandUpSeoul}>시작하기</button>*/}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {props.loggedInUser ? (
                            // 로그인된 사용자인 경우
                            <div>
                                {/*<li className="nav-item"><span onClick={props.handleLogout}>로그아웃</span></li>*/}
                                <li className="nav-item" onClick={handleLogout}><Link to={handleLogout} className="nav-link">로그아웃</Link></li>
                                {/*{props.loggedInUser.username} /*/}
                            </div>
                        ) : (
                            // 로그인되지 않은 사용자인 경우
                            <li className="nav-item"><Link to="/login" className="nav-link">로그인</Link></li>
                        )}
                        <li className="nav-item"><Link to="/signup" className="nav-link">회원가입</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
