/*eslint-disable*/
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import './App.css';

const LoginPage = (props) => {
    let navigate = useNavigate();

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

                // 토큰을 로컬 스토리지에 저장
                localStorage.setItem('token', token);

                // 원하는 페이지로 리다이렉트
                navigate('/');
            })
            .catch((error) => {
                // 로그인 에러 처리
                console.log(error);
                setError(true);
                setErrorMessage('아이디나 비밀번호가 잘못 입력되었습니다');
            });
    };

    return (
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
                <Button type='submit' className='login_btn'>
                    로그인
                </Button>
            </form>
            <div style={{ width: '60%', margin: 'auto' }}>
                <Link to='/forgot-password' style={{ color: 'gray', borderRight: '1px solid gray', padding: '0 10px' }}>
                    아이디 찾기
                </Link>
                <Link to='/signup' className='Link' style={{ color: 'gray', padding: '0 10px' }}>
                    회원 가입
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;