import {Navigation, Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Link, useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './App.css'
import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import Header from "./Header";

function Card({message}) {

    const navigate = useNavigate();

    return(
        <div>
        {message[0] && message[0].restaurantList.map((restaurant) => (
        <div class="card h-100" key={restaurant.id}>
            <img class="card-img-top" src={restaurant.fileName} alt="..." />
            <div class="card-body p-4">
                <div class="text-center">
                    <h5 class="fw-bolder">{restaurant.title}</h5>
                    {restaurant.restaurantCategory}
                </div>
            </div>
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center"> <span onClick={() => {
                    navigate(`/restaurant/${restaurant.id}`)
                }} className="btn btn-outline-dark mt-auto">상세보기</span></div>
            </div>
        </div>
            ))}
        </div>
    )
};
function SwiperLive({message}) {

    const navigate = useNavigate();

    return (
        <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={4}
            navigation
            pagination={{clickable: true}}
            // scrollbar={{ draggable: true }}
            className="swiper-wrapper"
        >
            {message[0] && message[0].restaurantList.map((restaurant) => (
                <SwiperSlide key={restaurant.id} className="swiper-slide" style={{minWidth:"300px"}}>
                    <div className="col mb-5" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
                        <div className="card h-100">
                            {/*// <!-- Product image-->*/}
                            <div className="image-container">
                            <img className="card-img-top" src={restaurant.fileName}
                                 alt="..."/>
                            </div>
                            {/*// <!-- Product details-->*/}
                            <div className="card-body p-2">
                                <div className="text-center">
                                    {/*// <!-- Product name-->*/}
                                    <h5 className="fw-bolder">{restaurant.title}</h5>
                                    {/*// <!-- Product price-->*/}
                                    {restaurant.restaurantCategory}
                                </div>
                            </div>
                            {/*// <!-- Product actions-->*/}
                            <div className="card-footer p-3 pt-0 border-top-0 bg-transparent">
                                <div className="text-center">
                                    <span onClick={() => {
                                        navigate(`/restaurant/${restaurant.id}`)
                                    }} className="btn btn-outline-dark mt-auto">상세보기</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
};

function SwiperLiveHotplace({message}) {
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={4}
            navigation
            pagination={{clickable: true}}
            // scrollbar={{ draggable: true }}
            className="swiper-wrapper"
        >
            {message[0] && message[0].hotplacesList.map((hotplaces) => (
                <SwiperSlide key={hotplaces.id} className="swiper-slide">
                    <div className="col mb-5" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
                        <div className="card h-100">
                            {/*// <!-- Product image-->*/}
                            <div className="image-container">
                            <img className="card-img-top" src={hotplaces.fileName}
                                 alt="..."/>
                            </div>
                            {/*// <!-- Product details-->*/}
                            <div className="card-body p-2">
                                <div className="text-center">
                                    {/*// <!-- Product name-->*/}
                                    <h5 className="fw-bolder" style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{hotplaces.title}</h5>
                                    {/*// <!-- Product price-->*/}
                                    {hotplaces.contentType}
                                </div>
                            </div>
                            {/*// <!-- Product actions-->*/}
                            <div className="card-footer p-3 pt-0 border-top-0 bg-transparent">
                                <div className="text-center">
                                    <Link to="#" className="btn btn-outline-dark mt-auto">상세보기</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
};


function Dashboard() {

    const {id} = useParams();

    // 백엔드에서 받아온 placeId 삽입
    const dashboardUrl = `http://15.165.110.156:8088/superset/dashboard/4/?placeid=${id}&standalone=2&show_filters=0&expand_filters=0`;

    return (
        <div style={{ width: '100%', height: '100vh', overflowX: 'auto' }}>
        <iframe
            title="Dashboard"
            src={dashboardUrl}
            // src="http://15.165.110.156:8088/superset/dashboard/1/"
            width='1220px'
            height="616px"
            sandbox="allow-same-origin allow-scripts"
            onClick={(e) => e.preventDefault()} // 클릭 이벤트를 무시합니다.
        ></iframe>
        </div>
    )
}

function LiveDetail() {
    const {id} = useParams();
    console.log(id);
    const [message, setMessage] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            try {
                const result = await axios.get(`${id}`, {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                });
                setMessage(result.data);
                console.log(result.data);
            } catch (err) {
                console.log(err);
            }
        }

        getData();
    }, []);

    return (
        <div>
            {/* <!-- Page Content--> */}
            <div className="container px-4 px-lg-5">
                {/* <!-- Heading Row--> */}
                <div className="row gx-4 gx-lg-5 align-items-center my-5">
                    {/* <div className="col-lg-5"></div> */}
                    <h1 className="font-weight-light">현재 {message[0] && message[0].population.areaCongest.areaCongestMessage}</h1>
                    <p>{message[0] && message[0].place.areaName}의 일주일 통계를 보여드립니다</p>
                    {/* <a className="btn btn-primary" href="#!">Call to Action!</a> */}
                    {/*<div className="col-lg-7">*/}
                        <Dashboard></Dashboard>
                    {/*</div>*/}
                </div>
                <section className="py-6">
                    <div className="container px-4 px-lg-1 mt-5">
                        <h2 className="fw-bolder mb-4">{message[0] && message[0].place.areaName}의 주변맛집</h2>
                        <div className="row gx-2 gx-lg-3 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                            {message[0] && message[0].restaurantList.map((restaurant) => (
                                <div className="col mb-2" key={restaurant.id} style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.05)' }}>
                                <div className="card h-100">
                                    <img className="card-img-top" src={restaurant.fileName} alt="..." style={{ objectFit: 'cover', height: '200px' }} />
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            <h5 className="fw-bolder" style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{restaurant.title}</h5>
                                            {restaurant.restaurantCategory}
                                        </div>
                                    </div>
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent mt-0">
                                        <div className="text-center"> <span onClick={() => {
                                            navigate(`/restaurant/${restaurant.id}`)
                                        }} className="btn btn-outline-dark mt-auto">상세보기</span></div>
                                    </div>
                                </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="py-6 mb-5">
                    <div className="container px-4 px-lg-1 mt-5">
                        <h2 className="fw-bolder mb-4">{message[0] && message[0].place.areaName}의 주변명소</h2>
                        <div className="row gx-2 gx-lg-3 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                            {message[0] && message[0].hotplacesList.map((hotplaces) => (
                                <div className="col mb-2" key={hotplaces.id} style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.05)' }}>
                                    <div className="card h-100">
                                        <img className="card-img-top" src={hotplaces.fileName} style={{ objectFit: 'cover', height: '200px' }} alt="..." />
                                        <div className="card-body p-4">
                                            <div className="text-center">
                                                <h5 className="fw-bolder" style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{hotplaces.title}</h5>
                                                {hotplaces.contentType}
                                            </div>
                                        </div>
                                        <div className="card-footer p-3 pt-0 border-top-0 bg-transparent mt-0">
                                            <div className="text-center"> <span onClick={() => {
                                                navigate(`/hotplace/${hotplaces.id}`)
                                            }} className="btn btn-outline-dark mt-auto">상세보기</span></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {/*<section className="py-6 bg-white">*/}
                {/*    <div className="container px-4 px-lg-0 mt-5">*/}
                {/*        <h2 className="fw-bolder mb-4">{message[0] && message[0].place.areaName}의 주변명소</h2>*/}
                {/*        /!*<div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">*!/*/}

                {/*        /!*</div>*!/*/}
                {/*    </div>*/}
                {/*    <SwiperLiveHotplace message={message}></SwiperLiveHotplace>*/}
                {/*</section>*/}
                {/* <!-- Bootstrap core JS--> */}
                {/*<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>*/}
                {/* <!-- Core theme JS--> */}
                {/*<script src="js/scripts.js"></script>*/}
                {/* <!-- Footer--> */}
            </div>
        </div>
    )
}

export default LiveDetail;