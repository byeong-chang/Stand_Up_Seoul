import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from "react-router-dom";
import axios from "axios";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './App.css'
import {useEffect, useState} from "react";
import Banner from "./Banner";

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
                <SwiperSlide key={`crowded-${item.id}-${index}`}>
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
                                <Link to="/livedetail" className="btn btn-outline-dark mt-auto">상세보기</Link>
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
                <SwiperSlide key={`little-${item.id}-${index}`}>
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
                                <Link to="/livedetail" className="btn btn-outline-dark mt-auto">상세보기</Link>
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
                <SwiperSlide key={`usually-${item.id}-${index}`}>
                    <div className="card h-100" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
                        {/* <!--image--> */}
                        <img className="card-img-top" src={item.placeImage} alt="..." />
                        {/* <!--details--> */}
                        <div className="card-body p-4">
                            <div className="text-center">
                                {/* <!--name--> */}
                                <h5 className="fw-bolder">{item.place}</h5>
                            </div>
                        </div>
                        {/* <!--actions--> */}
                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div className="text-center">
                                <Link to="/livedetail" className="btn btn-outline-dark mt-auto">상세보기</Link>
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
                <SwiperSlide key={`free-${item.id}-${index}`}>
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
                                <Link to={`/livedetail/${item.id}`} style={{ textDecoration: 'none', color: 'black' }} className="btn btn-outline-dark mt-auto">상세보기</Link>
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
                const Detailresult = await axios.get("/live/detail");
                setData(Detailresult.data);

                const Homeresult = await axios.get("/live/home");
                setlivedata(Homeresult.data);
            } catch (err) {
                console.log(err);
            }
        }

        getData();
    }, []);





    return (
        <div>
            {/* <!-- Navigation--> */}
            {/* <!-- Header--> */}
            {/*<header className="bg-dark py-1">*/}
            {/*        <div className="container px-5">*/}
            {/*            <div className="row gx-5 align-items-center justify-content-center">*/}
            {/*                <div className="col-lg-8 col-xl-7 col-xxl-6">*/}
            {/*                    <div className="my-5 text-center text-xl-start">*/}
            {/*                        <h1 className="display-5 fw-bolder text-white mb-4">실시간 혼잡도 낮은 지역</h1>*/}
            {/*                        <p className="lead fw-normal text-white-50 mb-4"><a className="nav-link" href="index.html">가산디지털단지역</a></p>*/}
            {/*                        <p className="lead fw-normal text-white-50 mb-4"><a className="nav-link" href="index.html">구로역</a></p>*/}
            {/*                        <p className="lead fw-normal text-white-50 mb-4">독산역</p>*/}
            {/*                        <p className="lead fw-normal text-white-50 mb-4">신도림역</p>*/}
            {/*                        <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">*/}
            {/*                            <Link to="/predict" className="btn btn-primary btn-lg px-4 me-sm-3">미래 혼잡도 예측하러가기</Link>*/}
            {/*                            <Link to="/live" className="btn btn-outline-light btn-lg px-4" href="#!">상세정보</Link>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center"><img className="img-fluid rounded-3 my-5" src="https://standupseoul.s3.ap-northeast-2.amazonaws.com/place/%EA%B0%80%EB%A1%9C%EC%88%98%EA%B8%B8.jpg" alt="..." /></div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </header>*/}
            {/* <!-- Section--> */}
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
            {/* <!-- Footer--> */}
            <footer className="bg-dark py-4 mt-auto">
                <div className="container px-5">
                    <div className="row align-items-center justify-content-between flex-column flex-sm-row">
                        <div className="col-auto"><div className="small m-0 text-white">Copyright &copy; Your Website 2023</div></div>
                        <div className="col-auto">
                            <p className="link-light small" href="#!">Privacy</p>
                            <span className="text-white mx-1">&middot;</span>
                            <p className="link-light small" href="#!">Terms</p>
                            <span className="text-white mx-1">&middot;</span>
                            <p className="link-light small" href="#!">Contact</p>
                        </div>
                    </div>
                </div>
            </footer>
            {/*/!* <!-- Bootstrap core JS--> *!/*/}
            {/*<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>*/}
            {/*/!* <!-- Core theme JS--> *!/*/}
            {/*<script src="js/scripts.js"></script>*/}
        </div>
    )
}

export default Live;