import {Link} from "react-router-dom";
import {Autoplay, Navigation, Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import axios from 'axios'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './App.css'
import React, {useEffect, useState} from "react";
import restaurantPage from "./RestaurantPage";

function SwiperLiveFood({data}) {
    // const [data, setData] = useState([]);
    //
    // useEffect(() => {
    //     async function getData() {
    //         try {
    //             const result = await axios.get("/live/home");
    //             setData(result.data);
    //             console.log("여기1");
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }
    //     getData();
    // }, []);

    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={3}
            pagination={{clickable: true}}
            className="container px-5"
            style={{width: "130%"}}
            autoplay={{delay: 2300, disableOnInteraction: false}}
        >
            {Object.keys(data).map((key) =>
                data[key].restaurantList.map((restaurant, index) => (
                    <SwiperSlide key={key}>
                        <Link to={`/restaurant/${restaurant.id}`} style={{textDecoration: 'none', color: 'black'}}>
                            <div className="col mb-6 h-100" key={`${key}-${index}`}>
                                <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"></div>
                                <div className="image-container">
                                    <img className="img-fluid rounded-3 my-6" src={restaurant.fileName} alt="..."/>
                                </div>
                                <h2 className="h5 mb-5 text-dark">{restaurant.title}</h2>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))
            )}
        </Swiper>
    );
}

function SwiperLive({data}) {
    // const [data, setData] = useState([]);
    //
    // useEffect(() => {
    //     async function getData() {
    //         try {
    //             const result = await axios.get('/live/home');
    //             setData(result.data);
    //             console.log("여기2");
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }
    //     // 데이터가 비어있을 때만 요청하도록 변경
    //     if (data.length === 0) {
    //         getData();
    //     }
    // }, [data]); // 의존성 배열에 data 추가

    // 중복 슬라이드를 제거하는 함수
    const removeDuplicates = (arr, prop) => {
        return arr.reduce((uniqueArr, item) => {
            const isDuplicate = uniqueArr.some((uniqueItem) => uniqueItem[prop] === item[prop]);
            if (!isDuplicate) {
                uniqueArr.push(item);
            }
            return uniqueArr;
        }, []);
    };

    const uniqueData = removeDuplicates(
        Object.keys(data).flatMap((key) => data[key].hotplacesList),
        'id'
    );

    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={3}
            pagination={{clickable: true}}
            className="container px-5"
            style={{width: '130%'}}
            autoplay={{delay: 2000, disableOnInteraction: false}}
        >
            {uniqueData.map((hotplace) => (
                <SwiperSlide key={hotplace.id}>
                    <Link to={`/restaurant/${hotplace.id}`} style={{textDecoration: 'none', color: 'black'}}>
                        <div className="col mb-6 h-100">
                            <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"></div>
                            <div className="image-container">
                                <img className="img-fluid rounded-3 my-6" src={hotplace.fileName} alt="..."/>
                            </div>
                            <h2 className="h5 mb-5">{hotplace.title}</h2>
                        </div>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}


function SwiperLive2({data}) {

    // const [data, setData] = useState([]);
    //
    // useEffect(() => {
    //     async function getData() {
    //         try {
    //             const result = await axios.get("/live/home");
    //             setData(result.data);
    //             console.log("여기3");
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }
    //     getData();
    // }, []);

    return (
        <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={3}
            navigation
            pagination={{clickable: true}}
            className='container px-5 py-5'
            // scrollbar={{ draggable: true }}
        >
            {Object.keys(data).map((key) =>
                data[key].culturalEventList.map((culturalEvent, index) => (
                    <SwiperSlide>
                        <div className="card h-100shadow border-0" key={`${key}-${index}`}>
                            <img className="card-img-top" src={culturalEvent.mainImage} alt="..."
                                 style={{objectFit: "cover", height: "400px"}}/>
                            <div className="card-body p-4">
                                <div className="badge bg-info bg-gradient rounded-pill mb-2">{culturalEvent.place}</div>
                                <a className="text-decoration-none link-dark stretched-link" href="#!"><h5
                                    className="card-title mb-3">{culturalEvent.title}</h5></a>
                                <p className="card-text mb-0">{culturalEvent.codeName}</p>
                            </div>
                            <div className="card-footer p-4 pt-0 bg-transparent border-top-0">
                                <div className="d-flex align-items-end justify-content-between">
                                    <div className="d-flex align-items-center">
                                        {/*<img className="rounded-circle me-3" src="https://dummyimage.com/40x40/ced4da/6c757d" alt="..." />*/}
                                        <div className="small mt-0">
                                            <div className="fw-bold">기간</div>
                                            <div
                                                className="text-muted">{culturalEvent.startDate.substring(0, 10)} ~ {culturalEvent.endDate.substring(0, 10)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))
            )}
        </Swiper>
    )
};


function Home() {

    const [loggedInUser, setLoggedInUser] = useState(null); // 로그인한 사용자

    useEffect(() => {
        checkLoggedInUser(); // 사용자가 이미 로그인되어 있는지 확인
    }, []);

    const checkLoggedInUser = () => {
        const token = localStorage.getItem('token');

        if (token) {
            // 사용자가 로그인되어 있는 경우
            const userId = localStorage.getItem('userId'); // 로컬 스토리지 또는 서버에서 사용자 ID 가져오기
            setLoggedInUser({username: userId}); // 사용자 ID를 loggedInUser 상태에 설정
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

        // 원하는 페이지로 이동
        window.location.href = '/**';
    };

    const [data, setData] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                const result = await axios.get("/live/home");
                setData(result.data);
            } catch (err) {
                console.log(err);
            }
        }

        getData();
    }, []);

    return (
        <div className="d-flex flex-column h-100">
            <main className="flex-shrink-0">
                {/* <!-- Navigation--> */}
                {/* <!-- Header--> */}
                <header className="bg-dark py-1">
                    <div className="container px-5">
                        <div className="row gx-5 align-items-center justify-content-center">
                            <div className="col-lg-8 col-xl-7 col-xxl-6">
                                <div className="my-5 text-center text-xl-start">
                                    <h1 className="display-5 fw-bolder text-white mb-4">실시간 혼잡도 낮은 지역</h1>
                                    {Object.keys(data).map(key => (
                                        <p className="lead fw-normal text-white-50 mb-4" key={key}><a
                                            className="nav-link" href="index.html">{data[key].place.areaName}</a></p>
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
                {/* <!-- Features section--> */}
                <section className="py-0 mb-0" id="features">
                    <div className="container px-5 my-5 mx-0">
                        <div className="row gx-5">
                            <div className="col-lg-4 mb-5 mb-lg-0"><h2 className="fw-bolder mt-3">근처맛집</h2></div>
                            <div className="col-lg-8">
                                <SwiperLiveFood data={data}></SwiperLiveFood>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-0 mb-0" id="features">
                    <div className="container px-5 my-5 mx-0">
                        <div className="row gx-5">
                            <div className="col-lg-4 mb-5 mb-lg-0"><h2 className="fw-bolder mt-3">근처명소</h2></div>
                            <div className="col-lg-8">
                                <SwiperLive data={data}></SwiperLive>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- Testimonial section--> */}
                {/* <!-- Blog preview section--> */}
                <section className="py-0 mt-0">
                    <div className="container px-5 my-5">
                        <div className="row gx-5 justify-content-center">
                            <div className="col-lg-8 col-xl-6">
                                <div className="text-center">
                                    <h2 className="fw-bolder">서울시 문화행사</h2>
                                    <p className="lead fw-normal text-muted mb-5">서울시에서 진행중인 축제와 문화행사 등을 알려드립니다.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row gx-5">
                            <SwiperLive2 data={data}></SwiperLive2>
                        </div>
                        {/* <!-- Call to action--> */}
                    </div>
                </section>
            </main>
            {/* <!-- Footer--> */}
            <footer className="bg-dark py-4 mt-auto">
                <div className="container px-5">
                    <div className="row align-items-center justify-content-between flex-column flex-sm-row">
                        <div className="col-auto">
                            <div className="small m-0 text-white">Copyright &copy; Your Website 2023</div>
                        </div>
                        <div className="col-auto">
                            <a className="link-light small" href="#!">Privacy</a>
                            <span className="text-white mx-1">&middot;</span>
                            <a className="link-light small" href="#!">Terms</a>
                            <span className="text-white mx-1">&middot;</span>
                            <a className="link-light small" href="#!">Contact</a>
                        </div>
                    </div>
                </div>
            </footer>
            {/* <!-- Bootstrap core JS--> */}
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
            {/* <!-- Core theme JS--> */}
            <script src="js/scripts.js"></script>
        </div>
    )
}

export default Home;