import React, {useState} from "react";
import {Link} from "react-router-dom";
import Live from "./Live";

function Banner(props) {
    const livedata = props.livedata;

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

                        {props.loggedInUser ? (
                            // 로그인된 사용자인 경우
                            <div>
                                <li className="nav-item"> {props.loggedInUser.username} / <span onClick={props.handleLogout}>로그아웃</span></li>
                            </div>
                        ) : (
                            // 로그인되지 않은 사용자인 경우

                            <li className="nav-item"><Link to="/login" className="nav-link">로그인</Link></li>
                        )}
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
        <header className="bg-dark py-1">
            <div className="container px-5">
                <div className="row gx-5 align-items-center justify-content-center">
                    <div className="col-lg-8 col-xl-7 col-xxl-6">
                        <div className="my-5 text-center text-xl-start">
                            <h1 className="display-5 fw-bolder text-white mb-4">실시간 혼잡도 낮은 지역</h1>
                            {Object.keys(livedata).map(key => (
                                <p className="lead fw-normal text-white-50 mb-4" key={key}><a
                                    className="nav-link" href="index.html">{livedata[key].place.areaName}</a></p>
                            ))}
                            {/*<p className="lead fw-normal text-white-50 mb-4"><a className="nav-link" href="index.html">{message[key].place.areaName}</a></p>*/}
                            {/*<p className="lead fw-normal text-white-50 mb-4">{message[key].place.areaName}</p>*/}
                            {/*<p className="lead fw-normal text-white-50 mb-4">{message[key].place.areaName}</p>*/}
                            <div
                                className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                                <Link to="/predict" className="btn btn-info text-light btn-lg px-4 me-sm-3">미래
                                    혼잡도 예측하러가기</Link>
                                <Link to="/live" className="btn btn-outline-light btn-lg px-4"
                                      href="#!">상세정보</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center"><img
                        className="img-fluid rounded-3 my-5"
                        src="https://standupseoul.s3.ap-northeast-2.amazonaws.com/place/%EA%B0%80%EB%A1%9C%EC%88%98%EA%B8%B8.jpg"
                        alt="..."/></div>
                </div>
            </div>
        </header>
        </div>
    )
}

export default Banner;