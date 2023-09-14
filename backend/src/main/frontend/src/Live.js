import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from "react-router-dom";
import axios from "axios";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './App.css'
import React, {useEffect, useState} from "react";
import Banner from "./Banner";
import Header from "./Header";
import {useNavigate} from "react-router-dom";

function SwiperLiveCrowded({data}) {
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={4}
            navigation
            // pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            className='container px-5'
        >
            {data.붐빔 && Array.isArray(data.붐빔) && data.붐빔.map((item, index) => (
                <SwiperSlide key={`crowded-${item.id}-${index}`} style={{minWidth:"300px"}}>
                    <div className="card h-100" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
                        {/* <!--image--> */}
                        <img className="card-img-top" src={item.placeImage} alt="..." />
                        {/* <!--details--> */}
                        <div className="card-body p-4">
                            <div className="text-center">
                                {/* <!--name--> */}
                                <h5 className="fw-bolder" style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{item.place}</h5>
                            </div>
                        </div>
                        {/* <!--actions--> */}
                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div className="text-center">
                                <Link to={`/live/detail/${item.placeId}`} className="btn btn-outline-dark mt-auto">상세보기</Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>

    )
};

function SwiperLiveLittle({data}) {
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={4}
            navigation
            // pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            className='container px-5'
        >
            {data["약간 붐빔"] && Array.isArray(data["약간 붐빔"]) && data["약간 붐빔"].map((item, index) => (
                <SwiperSlide key={`little-${item.id}-${index}`} style={{minWidth:"300px"}}>
                    <div className="card h-100" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
                        {/* <!--image--> */}
                        <img className="card-img-top" src={item.placeImage} alt="..." />
                        {/* <!--details--> */}
                        <div className="card-body p-4">
                            <div className="text-center">
                                {/* <!--name--> */}
                                <h5 className="fw-bolder" style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{item.place}</h5>
                            </div>
                        </div>
                        {/* <!--actions--> */}
                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div className="text-center">
                                <Link to={`/live/detail/${item.placeId}`} className="btn btn-outline-dark mt-auto">상세보기</Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>

    )
};

function SwiperLiveUsually({data}) {
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={4}
            navigation
            // pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            className='container px-5'
        >
            {data.보통 && Array.isArray(data.보통) && data.보통.map((item, index) => (
                <SwiperSlide key={`usually-${item.id}-${index}`} style={{minWidth:"300px"}}>
                    <div className="card h-100" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
                        {/* <!--image--> */}
                        <img className="card-img-top" src={item.placeImage} alt="..." />
                        {/* <!--details--> */}
                        <div className="card-body p-4">
                            <div className="text-center">
                                {/* <!--name--> */}
                                <h5 className="fw-bolder" style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{item.place}</h5>
                            </div>
                        </div>
                        {/* <!--actions--> */}
                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div className="text-center">
                                <Link to={`/live/detail/${item.placeId}`} className="btn btn-outline-dark mt-auto">상세보기</Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>

    )
};

function SwiperLiveFree({data}) {
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={4}
            navigation
            // pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            className='container px-5'
        >
            {data.여유 && Array.isArray(data.여유) && data.여유.map((item, index) => (
                <SwiperSlide key={`free-${item.id}-${index}`} style={{minWidth:"300px"}}>
                    <div className="card h-100" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
                        {/* <!--image--> */}
                        <img className="card-img-top" src={item.placeImage} alt="..." />
                        {/* <!--details--> */}
                        <div className="card-body p-4">
                            <div className="text-center">
                                {/* <!--name--> */}
                                <h5 className="fw-bolder" style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{item.place}</h5>
                            </div>
                        </div>
                        {/* <!--actions--> */}
                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div className="text-center">
                                <Link to={`/live/detail/${item.placeId}`} style={{ textDecoration: 'none', color: 'black' }} className="btn btn-outline-dark mt-auto">상세보기</Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

            ))}
        </Swiper>

    )
};

function Live() {

    const [data, setData] = useState([]);
    const [livedata, setlivedata] = useState([]);
    useEffect(() => {
        async function getData() {
            try {
                const Detailresult = await axios.get("/live/detail", {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                });
                setData(Detailresult.data);

                const Homeresult = await axios.get("/live/home", {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                });
                setlivedata(Homeresult.data);
            } catch (err) {
                console.log(err);
            }
        }

        getData();
    }, []);

    return (
        <div>
            <Banner livedata={livedata}></Banner>
            <section className="py-5" style={{ textAlign: 'left'   /* other inner styles */ }}>
                <div className="container px-4 px-lg-5 mt-5">
                    <h1 className="display-6 fw-bolder" style={{ fontSize: '24px', marginLeft: '40px', marginBottom: '20px' }}>여유</h1>
                    <SwiperLiveFree data={data}></SwiperLiveFree>
                </div>
                <div className="container px-4 px-lg-5 mt-5">
                    <h1 className="display-6 fw-bolder" style={{ fontSize: '24px', marginLeft: '40px', marginBottom: '20px' }}>보통</h1>
                    <SwiperLiveUsually data={data}></SwiperLiveUsually>
                </div>
                <div className="container px-4 px-lg-5 mt-5">
                    <h1 className="display-6 fw-bolder" style={{ fontSize: '24px', marginLeft: '40px', marginBottom: '20px' }}>약간붐빔</h1>
                    <SwiperLiveLittle data={data}></SwiperLiveLittle>
                </div>
                <div className="container px-4 px-lg-5 mt-5">
                    <h1 className="display-6 fw-bolder" style={{ fontSize: '24px', marginLeft: '40px', marginBottom: '20px' }}>붐빔</h1>
                    <SwiperLiveCrowded data={data}></SwiperLiveCrowded>
                </div>
            </section>
            {/*/!* <!-- Bootstrap core JS--> *!/*/}
            {/*<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>*/}
            {/*/!* <!-- Core theme JS--> *!/*/}
            {/*<script src="js/scripts.js"></script>*/}
        </div>
    )
}

export default Live;