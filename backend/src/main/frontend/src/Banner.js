import React, {useState} from "react";
import {Link, useParams} from "react-router-dom";
import Live from "./Live";
import image from "./static/배너사진1.jpg"
import {useNavigate} from "react-router-dom";

function Banner(props) {
    const livedata = props.livedata;

    const navigate = useNavigate();

    return (
        <div>
        <header className="bg-dark py-1" style={{ backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            minHeight:'30vh',
            alignItems:'center',
            backgroundPosition:'center'}}>
            <div className="container px-5">
                <div className="row gx-5 align-items-center justify-content-center">
                    <div className="col-lg-8 col-xl-7 col-xxl-6">
                        <div className="my-5 text-center text-xl-start">
                            <h1 className="display-5 fw-bolder text-white mb-4">실시간 혼잡도 낮은 지역</h1>
                            {Object.keys(livedata).map(key => (
                                <span className="lead fw-normal text-white-50 mb-4 nav-link" key={key} ><p
                                    onClick={()=>{
                                        navigate(`/live/detail/${livedata[key].place.id}`)
                                    }} style={{ cursor: 'pointer'}}>{livedata[key].place.areaName}</p></span>
                            ))}
                            {/*<p className="lead fw-normal text-white-50 mb-4"><a className="nav-link" href="index.html">{message[key].place.areaName}</a></p>*/}
                            {/*<p className="lead fw-normal text-white-50 mb-4">{message[key].place.areaName}</p>*/}
                            {/*<p className="lead fw-normal text-white-50 mb-4">{message[key].place.areaName}</p>*/}
                            <div
                                className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                                <Link to="/predict" className="btn btn-info text-light btn-lg px-4 me-sm-3">미래 혼잡도 예측하러가기</Link>
                                <Link to="/live" className="btn btn-outline-light btn-lg px-4">상세정보</Link>
                                <Link to="/test" className="btn btn-outline-light btn-lg px-4">지도</Link>
                            </div>
                        </div>
                    </div>
                    {/*<div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center"><img*/}
                    {/*    className="img-fluid rounded-3 my-5"*/}
                    {/*    src="https://standupseoul.s3.ap-northeast-2.amazonaws.com/place/%EA%B0%80%EB%A1%9C%EC%88%98%EA%B8%B8.jpg"*/}
                    {/*    alt="..."/></div>*/}
                </div>
            </div>
        </header>
        </div>
    )
}

export default Banner;