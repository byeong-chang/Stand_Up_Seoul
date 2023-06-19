import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
const SignUp = () => {
    const [email, setId] = useState('');
    const [password, setPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [nickname, setNickname] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleEmailChange = (e) => {
        setId(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleBirthdayChange = (e) => {
        setBirthdate(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        // 회원가입 처리 로직 작성
        // ...

        // 예시로 axios를 사용하여 회원가입 요청을 보내는 코드를 작성했습니다.
        axios
            .post('http://localhost:8081/api/user/signup', {
                email,
                password,
                birthdate,
                phoneNumber,
                nickname,
                address,
            })
            .then((response) => {
                // 회원가입 성공 시 처리
                console.log(response.data);
                // 원하는 동작 수행
            })
            .catch((error) => {
                // 회원가입 실패 시 처리
                console.log(error);
                setError(true);
                setErrorMessage('회원가입에 실패했습니다');
            });
    };

    return (
        <div className='login_box' style={{textAlign: "center"}}>
            <h1 style={{ marginBottom: '50px' }}>회원가입</h1>
            <form onSubmit={handleSignUp}>
                <div>
                    <label htmlFor='id'></label>
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
                <div>
                    <p>생년월일을 입력하세요</p>
                    <label htmlFor='birthdate'></label>
                    <input
                        type='date'
                        id='birthdate'
                        className='login_input idpw_pw'
                        value={birthdate}
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
                        value={address}
                        onChange={handleAddressChange}
                    />
                </div>
                {error && <p style={{ color: 'orange' }}>{errorMessage}</p>}
                <Button type='submit' className='login_btn'>
                    가입하기
                </Button>
            </form>
            <div style={{ width: '60%', margin: 'auto' }}>
                <Link to='/**' style={{ color: 'gray', borderRight: '1px solid gray', padding: '0 10px' }}>
                    아이디 찾기
                </Link>
                <Link to='/**' className='Link' style={{ color: 'gray', padding: '0 10px' }}>
                    비밀번호 찾기
                </Link>
            </div>
        </div>
    );
};

export default SignUp;
