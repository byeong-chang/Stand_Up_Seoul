import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MyPage() {
    const [newNickname, setNewNickname] = useState("");
    const [newPhoneNumber, setNewPhoneNumber] = useState("");
    const [newAddress, setNewAddress] = useState("");

    const navigate = useNavigate();

    const handlePasswordReset = () => {
        // 비밀번호 재설정 기능 구현
        // 비밀번호 재설정 후 필요한 처리를 진행하고, 마이페이지로 돌아올 수 있도록 리다이렉트
        navigate("/mypage");
    };

    const handleNicknameChange = () => {
        // 닉네임 변경 기능 구현
        // 새로운 닉네임을 서버에 전달하고, 변경된 정보를 반영하여 마이페이지를 다시 렌더링
        setNewNickname("");
    };

    const handlePhoneNumberChange = () => {
        // 전화번호 변경 기능 구현
        // 새로운 전화번호를 서버에 전달하고, 변경된 정보를 반영하여 마이페이지를 다시 렌더링
        setNewPhoneNumber("");
    };

    const handleAddressChange = () => {
        // 주소 변경 기능 구현
        // 새로운 주소를 서버에 전달하고, 변경된 정보를 반영하여 마이페이지를 다시 렌더링
        setNewAddress("");
    };

    const handleWithdrawal = () => {
        // 회원 탈퇴 기능 구현
        // 회원 탈퇴 처리를 진행하고, 로그인 페이지로 리다이렉트
        navigate("/login");
    };

    return (
        <div className='sign_box' style={{ textAlign: 'center' }}>
            <h1>마이페이지</h1>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">비밀번호 찾기</h5>
                    <button className="btn btn-primary" onClick={handlePasswordReset}>
                        비밀번호 재설정
                    </button>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">닉네임 변경</h5>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="새로운 닉네임"
                            value={newNickname}
                            onChange={(e) => setNewNickname(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={handleNicknameChange}>
                            변경
                        </button>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">전화번호 변경</h5>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="새로운 전화번호"
                            value={newPhoneNumber}
                            onChange={(e) => setNewPhoneNumber(e.target.value)}
                        />
                        <button
                            className="btn btn-primary"
                            onClick={handlePhoneNumberChange}
                        >
                            변경
                        </button>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">주소 변경</h5>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="새로운 주소"
                            value={newAddress}
                            onChange={(e) => setNewAddress(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={handleAddressChange}>
                            변경
                        </button>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">회원 탈퇴</h5>
                    <button className="btn btn-danger" onClick={handleWithdrawal}>
                        회원 탈퇴
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MyPage;
