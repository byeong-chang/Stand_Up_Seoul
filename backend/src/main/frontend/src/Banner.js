import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Live from "./Live";
import image from "./static/배너사진1.jpg"
import {useNavigate} from "react-router-dom";
import Image from "./static/배너사진1.jpg";

function Banner(props) {
    const livedata = props.livedata;

    const [imageUrl, setImageUrl] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        handleRedirect(); // 컴포넌트가 마운트될 때 초기 이미지 설정을 위해 호출
    }, []);

    const handleRedirect = () => {
        const images = [
            // 'https://rare-gallery.com/uploads/posts/340444-Aespa-Kpop-K-pop-Girl-Group-Girls-Karina-Yoo-Ji-Min-.jpg',
            'https://sojoong.joins.com/wp-content/uploads/sites/4/2019/10/bulkkot-3.jpg',
            `${Image}`,
            // `${image2}`
            // 다른 이미지 URL을 추가하세요.
        ];

        const getRandomImage = () => {
            const randomIndex = Math.floor(Math.random() * images.length);
            return images[randomIndex];
        };

        const newImageUrl = getRandomImage();
        setImageUrl(newImageUrl);
    };

    return (
        <div>
            <header className="bg-dark py-5"  style={{ backgroundImage: `url(${imageUrl})`, backgroundRepeat: 'no-repeat',
                backgroundPosition: 'top-center',
                backgroundSize: '100% 100%'}}>
                <div className="container px-5">
                    <div className="row gx-5 align-items-left justify-left-left">
                        <div className="col-lg-8 col-xl-7 col-xxl-6">
                            <div className="my-5 text-center text-xl-start">
                                <h1 className="display-5 fw-bolder text-white mb-4" style={{ cursor: 'pointer', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>실시간 혼잡도 낮은 지역</h1>
                                {Object.keys(livedata).map(key => (
                                    <p key={key} onClick={()=>{
                                        navigate(`/live/detail/${livedata[key].place.id}`)
                                    }} style={{ cursor: 'pointer', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}} className="lead fw-normal text-white-50 mb-4">{livedata[key].place.areaName}</p>
                                ))}
                                <div
                                    className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                                    <Link to="/predict" className="btn btn-outline-light btn-lg px-4 me-sm-3">미래 혼잡도 예측하러가기</Link>
                                    <Link to="/live" className="btn btn-outline-light btn-lg px-4">실시간정보</Link>
                                    <Link to="/test" className="btn btn-outline-light btn-lg px-4">지도</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Banner;