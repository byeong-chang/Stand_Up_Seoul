import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const SignUp = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [birth, setBirth] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword1Change = (e) => {
        setPassword(e.target.value);
    };

    const handlePassword2Change = (e) => {
        setPasswordCheck(e.target.value);
    };

    const handleBirthdayChange = (e) => {
        setBirth(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
    };

    const handleAddressChange = (e) => {
        setUserAddress(e.target.value);
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        // 회원가입 처리 로직 작성
        // 예시로 axios를 사용하여 회원가입 요청을 보내는 코드를 작성했습니다.
        axios
            .post('/auth/signup', {
                email : email,
                password: password,
                passwordCheck: passwordCheck,
                birth: birth,
                phoneNumber: phoneNumber,
                userAddress: userAddress,
                nickname : nickname,
            })
            .then((response) => {
                // 회원가입 성공 시 처리
                console.log(response.data);
                // 원하는 동작 수행
                navigate('/login');
            })
            .catch((error) => {
                // 회원가입 실패 시 처리
                console.log(error);
                setError(true);
                setErrorMessage('회원가입에 실패했습니다1');
            });
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container px-5">
                    <Link to="/" className="navbar-brand">스탠드업서울</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item"><Link to="/" className="nav-link">가고싶은곳</Link></li>
                            <li className="nav-item"><Link to="/about" className="nav-link">미래 혼잡도 보기</Link></li>
                            <li className="nav-item"><Link to="/login" className="nav-link">로그인</Link></li>
                            <li className="nav-item"><Link to="/signup" className="nav-link">회원가입</Link></li>
                            <li className="nav-item"><Link to="/" className="nav-link">**</Link></li>
                            <li className="nav-item dropdown">
                                <Link to="/" className="nav-link dropdown-toggle" id="navbarDropdownBlog" role="button" data-bs-toggle="dropdown" aria-expanded="false">**</Link>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownBlog">
                                    <li><Link to="/" className="dropdown-item">**</Link></li>
                                    <li><Link to="/" className="dropdown-item">**</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link to="/" className="nav-link dropdown-toggle" id="navbarDropdownPortfolio" role="button" data-bs-toggle="dropdown" aria-expanded="false">**</Link>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownPortfolio">
                                    <li><Link to="/" className="dropdown-item">**</Link></li>
                                    <li><Link to="/" className="dropdown-item">**</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        <div className='login_box' style={{ textAlign: 'center' }}>
            <h1 style={{ marginBottom: '50px' }}>회원가입</h1>
            <form onSubmit={handleSignUp}>
                <div>
                    <label htmlFor='email'></label>
                    <input
                        type='email'
                        id='email'
                        placeholder='이메일를 입력해주세요'
                        className='login_input idpw_id'
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div>
                    <label htmlFor='password1'></label>
                    <input
                        type='password'
                        id='password1'
                        placeholder='비밀번호를 입력해주세요'
                        className='login_input idpw_pw'
                        value={password}
                        onChange={handlePassword1Change}
                    />
                </div>
                <div>
                    <label htmlFor='password2'></label>
                    <input
                        type='password'
                        id='password2'
                        placeholder='비밀번호 확인'
                        className='login_input idpw_pw'
                        value={passwordCheck}
                        onChange={handlePassword2Change}
                    />
                </div>
                <div>
                    <p>생년월일을 입력하세요</p>
                    <label htmlFor='birthdate'></label>
                    <input
                        type='date'
                        id='birthdate'
                        className='login_input idpw_pw'
                        value={birth}
                        onChange={handleBirthdayChange}
                    />
                </div>
                <div>
                    <label htmlFor='phoneNumber'></label>
                    <input
                        type='tel'
                        id='phoneNumber'
                        placeholder='핸드폰번호를 입력해주세요'
                        className='login_input idpw_pw'
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                    />
                </div>
                <div>
                    <label htmlFor='nickname'></label>
                    <input
                        type='text'
                        id='nickname'
                        placeholder='닉네임 입력해주세요'
                        className='login_input idpw_pw'
                        value={nickname}
                        onChange={handleNicknameChange}
                    />
                </div>
                <div>
                    <label htmlFor='address'></label>
                    <input
                        type='text'
                        id='address'
                        placeholder='주소를 입력해주세요'
                        className='login_input idpw_pw'
                        value={userAddress}
                        onChange={handleAddressChange}
                    />
                </div>
                {error && <p style={{ color: 'orange' }}>{errorMessage}</p>}
                <Button type='submit' className='login_btn'>
                    가입하기
                </Button>
            </form>
            <div style={{ width: '60%', margin: 'auto' }}>
                <Link to='/find-id' style={{ color: 'gray', borderRight: '1px solid gray', padding: '0 10px' }}>
                    아이디 찾기
                </Link>
                <Link to='/find-password' className='Link' style={{ color: 'gray', padding: '0 10px' }}>
                    비밀번호 찾기
                </Link>
            </div>
        </div>
        </div>
    );
};

export default SignUp;