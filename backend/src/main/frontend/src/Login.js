/*eslint-disable*/
import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import './App.css';
import Header from "./Header";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleIdChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // send login request

        axios
            .post('/auth/signin', {
                email: email, // 아이디를 "username"으로 변경
                password: password,
            })
            .then((response) => {
                // 로그인 성공 시 처리
                const token = response.data.token;
                const nickname = response.data.nickname;

                // 토큰을 로컬 스토리지에 저장
                localStorage.setItem('token', token);
                localStorage.setItem('nickname', nickname);

                // 원하는 페이지로 리다이렉트
                navigate('/');
                window.location.reload();
            })
            .catch((error) => {
                // 로그인 에러 처리
                console.log(error);
                setError(true);
                setErrorMessage('아이디나 비밀번호가 잘못 입력되었습니다');
            });
    };

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

    return (
        <div>
        <div className='login_box' style={{textAlign: "center"}}>
            <h1 style={{ marginBottom: '50px' }}>로그인</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='id'></label>
                    <input
                        type='email'
                        id='email'
                        placeholder='아이디를 입력해주세요'
                        className='login_input idpw_id'
                        value={email}
                        onChange={handleIdChange}
                    />
                </div>
                <div>
                    <label htmlFor='password'></label>
                    <input
                        type='password'
                        id='password'
                        placeholder='비밀번호를 입력해주세요'
                        className='login_input idpw_pw'
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                {error && <p style={{ color: 'orange' }}>{errorMessage}</p>}
                <Button type='submit' className='login_btn btn-secondary'>
                    로그인
                </Button>
            </form>
            <div style={{ width: '60%', margin: 'auto' }}>
                <Link to='/forgot-password' style={{ color: 'gray', borderRight: '1px solid gray', padding: '0 10px' }}>
                    아이디 찾기
                </Link>
                <Link to='/signup' className='Link' style={{ color: 'gray', padding: '0 10px', borderRight: '1px solid gray' }}>
                    회원 가입
                </Link>
                <Link to='/partnerlogin' className='Link' style={{ color: 'gray', padding: '0 10px' }}>
                    파트너계정
                </Link>
            </div>
        </div>
        </div>
    );
};

export default Login;