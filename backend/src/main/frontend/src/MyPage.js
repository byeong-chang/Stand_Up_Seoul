import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyPage() {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showPhoneModal, setShowPhoneModal] = useState(false);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [newNickname, setNewNickname] = useState("");
    const [newPhoneNumber, setNewPhoneNumber] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            try {
                const result = await axios.get(`/user/mypage`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setData(result.data);
                console.log(result.data);
            } catch (err) {
                console.log(err);
            }
        }
        getData();
    }, []);

    const handlePasswordReset = () => {
        navigate("/mypage");
    };

    const handleNicknameChange = () => {
        setNewNickname("");
        setShowModal(false);
        axios
            .post(
                `/user/mypage`,
                {
                    nickname: newNickname,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            )
            .then((response) => {
                // 원하는 페이지로 리다이렉트
                navigate(`/mypage`);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handlePhoneNumberChange = () => {
        setNewPhoneNumber("");
        setShowPhoneModal(false);
        axios
            .post(
                `/user/mypage`,
                {
                    phoneNumber: newPhoneNumber,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            )
            .then((response) => {
                // 원하는 페이지로 리다이렉트
                navigate(`/mypage`);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleAddressChange = () => {
        setNewAddress("");
        setShowAddressModal(false);
        axios
            .post(
                `/user/mypage`,
                {
                    userAddress: newAddress,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            )
            .then((response) => {
                // 원하는 페이지로 리다이렉트
                navigate(`/mypage`);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleWithdrawal = () => {
        navigate("/login");
    };

    const handleChange = () => {
        axios
            .post(
                `/user/mypage`,
                {
                    nickname: newNickname,
                    // // phoneNumber: newPhoneNumber,
                    // phoneNumber: data.phoneNumber,
                    // userAddress: data.userAddress,
                    // // userAddress: newAddress,
                    // password: data.password
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            )
            .then((response) => {
                // 원하는 페이지로 리다이렉트
                navigate(`/mypage`);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="sign_box" style={{ textAlign: "center" }}>
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
                        <div
                            type="text"
                            className="form-control">
                            {localStorage.getItem('nickname')}
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={() => setShowModal(true)}
                        >
                            변경
                        </button>
                    </div>
                </div>
            </div>
            {/* 모달 창 */}
            {showModal && (
                <div className="modal" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">닉네임 변경</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="새로운 닉네임"
                                        value={newNickname}
                                        onChange={(e) => setNewNickname(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleNicknameChange}
                                >
                                    변경하기
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    취소
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">전화번호 변경</h5>
                    <div className="input-group mb-3">
                        <div
                            type="text"
                            className="form-control">
                            {data.phoneNumber}
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={() => setShowPhoneModal(true)}
                        >
                            변경
                        </button>
                    </div>
                </div>
            </div>
            {/* 모달 창 */}
            {showPhoneModal && (
                <div className="modal" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">전화번호 변경</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowPhoneModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="새로운 전화번호"
                                        value={newPhoneNumber}
                                        onChange={(e) => setNewPhoneNumber(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handlePhoneNumberChange}
                                >
                                    변경하기
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowPhoneModal(false)}
                                >
                                    취소
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">주소 변경</h5>
                    <div className="input-group mb-3">
                        <div
                            type="text"
                            className="form-control">
                            {data.userAddress}
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={() => setShowAddressModal(true)}
                        >
                            변경
                        </button>
                    </div>
                </div>
            </div>
            {/* 모달 창 */}
            {showAddressModal && (
                <div className="modal" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">주소 변경</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowAddressModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="새로운 주소"
                                        value={newAddress}
                                        onChange={(e) => setNewAddress(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleAddressChange}
                                >
                                    변경하기
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowAddressModal(false)}
                                >
                                    취소
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
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
