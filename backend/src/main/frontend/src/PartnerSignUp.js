import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Header from "./Header";

const PartnerSignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [birth, setBirth] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [sex, setSex] = useState('');

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

    const handleSexChange = (e) => {
        setSex(e.target.value);
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
                sex: sex,
            })
            .then((response) => {
                // 회원가입 성공 시 처리
                console.log(response.data);
                // 원하는 동작 수행
                navigate('/');
            })
            .catch((error) => {
                // 회원가입 실패 시 처리
                console.log(error);
                setError(true);
                setErrorMessage('회원가입에 실패했습니다1');
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
        navigate('/');
    };

    return (
        <div>
            <Header loggedInUser={loggedInUser} handleLogout={handleLogout}></Header>
            <div className='sign_box' style={{ textAlign: 'center'}}>
                <h1 style={{ marginBottom: '50px' }}>파트너 회원가입</h1>
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
                    <div>
                        <p>성별을 선택하세요</p>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={sex === "male"}
                                onChange={handleSexChange}
                            />
                            남성
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={sex === "female"}
                                onChange={handleSexChange}
                            />
                            여성
                        </label>
                    </div>
                    {error && <p style={{ color: 'orange' }}>{errorMessage}</p>}
                    <Button type='submit' className='sign_btn'>
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

export default PartnerSignUp;