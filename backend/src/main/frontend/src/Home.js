import {Link} from "react-router-dom";
import {Autoplay, Navigation, Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import axios from 'axios'
import {useNavigate} from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './App.css'
import React, {useEffect, useState} from "react";
import Banner from "./Banner";
import Form from 'react-bootstrap/Form';


function SwiperLiveFood({ data }) {

    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={3}
            // pagination={{ clickable: true }}
            // navigation={true}
            className="container px-5"
            style={{ width: "130%", paddingBottom: '20px'  }}
            autoplay={{ delay: 2300, disableOnInteraction: false }}
        >
            {Object.keys(data).map((key) =>
                data[key].restaurantList.map((restaurant, index) => (
                    <SwiperSlide key={`${key}-${index}`} style={{minWidth:"300px"}}>
                        <Link to={`/restaurant/${restaurant.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                            <div className="col mb-6 h-100 rounded-3" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'}}>
                                <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"></div>
                                <div className="image-container">
                                    <img className="img-fluid rounded-3 my-6" src={restaurant.fileName} alt="..." />
                                </div>
                                <h5 className="fw-bolder mt-3" style={{ paddingLeft: '20px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{restaurant.title}</h5>
                                <p className="card-text mb-0" style={{ paddingLeft: '20px' }}>{restaurant.restaurantCategory}</p>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))
            )}
        </Swiper>
    );
}

function SwiperLive({ data }) {
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
            // pagination={{ clickable: true }}
            className="container px-5"
            style={{ width: '130%', paddingBottom: '20px' }}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
        >
            {uniqueData.map((hotplace) => (
                <SwiperSlide style={{minWidth:"300px"}}>
                    <Link to={`/hotplace/${hotplace.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                        <div className="col mb-6 h-100 rounded-3" key={hotplace.id} style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
                            <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"></div>
                            <div className="image-container">
                                <img className="img-fluid rounded-3 my-6" src={hotplace.fileName} alt="..." />
                            </div>
                            <h5 className="fw-bolder mt-3" style={{ paddingLeft: '20px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{hotplace.title}</h5>
                            <p className="card-footer mb-0" style={{ paddingLeft: '20px' }}>{hotplace.contentType}</p>
                        </div>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}


function SwiperLive2({data}) {

    const maxLength = 33;

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
                    <SwiperSlide style={{minWidth:"300px"}}>
                        <div className="card h-100 shadow border-3" key={`${key}-${index}`} style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
                            <img className="card-img-top" src={culturalEvent.mainImage} alt="..."
                                 style={{ objectFit: "cover", height: "350px", width: "100%" }}/>
                            <div className="card-body p-2">
                                <div className="badge bg-info bg-gradient rounded-pill mb-2">
                                    {culturalEvent.place.length <= maxLength ? culturalEvent.place : culturalEvent.place.slice(0, maxLength) + '...'}
                                </div>
                                <Link to={`/culture/${culturalEvent.id}`} className="text-decoration-none link-dark stretched-link">
                                    <h5 className="card-title mb-3" style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{culturalEvent.title}</h5>
                                </Link>
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


function Home(props) {

    const [location, setLocation] = useState([]);

    const navigate = useNavigate();

    const [data, setData] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => console.log(error)
        );
    }, []);

    useEffect(() => {
        async function getData() {
            // console.log(localStorage.getItem('token'));
            try {
                const result = await axios.get("/live/home", {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                });
                setData(result.data);
                console.log(result.data);
            } catch (err) {
                console.log(err);
            }
        }

        getData();
    }, []);

    useEffect(() => {
                setLocation({
                    latitude: props.lat,
                    longitude: props.lng,
                });
    }, []);

    useEffect(() => {
        if (location.latitude && location.longitude) {
            // 스프링 부트 API 엔드포인트
            const apiUrl = '/live/home/post';
            console.log(props.lng)
            // 위치 데이터를 스프링 부트로 전송하는 POST 요청
            axios
                .post(apiUrl, location, {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                })
                .then((response) => {
                    console.log('위치 데이터가 성공적으로 전송되었습니다.');
                    console.log(location);
                })
                .catch((error) => {
                    console.error('위치 데이터 전송 중 오류가 발생했습니다:', error);

                });
        }
    }, [location]);

    return (
        <div className="d-flex flex-column h-100">
            <main className="flex-shrink-0">
                {/* <!-- Header--> */}
               <Banner livedata={data}></Banner>
                {/* <!-- Features section--> */}
                <section className="py-0 mb-0" id="features">
                    <div className="container px-5 my-5 mx-auto">
                        <div className="row gx-2 align-items-center">
                            {/*<div className="mb-5 mb-lg-0 col text-start"> /!* 수정된 부분: text-center -> text-start, col 추가 *!/*/}
                            {/*    /!*<h4 className="fw-bolder mt-3">주변맛집</h4>*!/*/}
                            {/*</div>*/}
                            {/*<div className="mb-lg-0 d-flex justify-content-center">*/}
                            {/*    /!*<SwiperLiveFood data={data}></SwiperLiveFood>*!/*/}
                            {/*</div>*/}
                            {/*<div id="map" ref={mapContainer} style={{width:'100%', height:'360px', display:'block'}}></div>*/}
                        </div>
                    </div>
                </section>
                <section className="py-0 mb-0" id="features">
                    <div className="container px-5 my-5 mx-auto">
                        <div className="row gx-5 align-items-center">
                            <div className="mb-5 mb-lg-0 col text-start"> {/* 수정된 부분: text-center -> text-start, col 추가 */}
                                <h4 className="fw-bolder mt-3">주변맛집</h4>
                            </div>
                            <div className="mb-lg-0 d-flex justify-content-center">
                                <SwiperLiveFood data={data}></SwiperLiveFood>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-0 mb-0 h-100" id="features">
                    <div className="container px-5 my-5 mx-auto">
                        <div className="row gx-5 align-items-center"> {/* 수정된 부분: align-items-center 추가 */}
                            <div className="mb-5 mb-lg-0 col text-start"> {/* 수정된 부분: text-center -> text-start, col 추가 */}
                                <h4 className="fw-bolder mt-3">주변명소</h4>
                            </div>
                            <div className="mb-lg-0 d-flex justify-content-center">
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
            {/* <!-- Bootstrap core JS--> */}
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
            {/* <!-- Core theme JS--> */}
            <script src="js/scripts.js"></script>
        </div>
    )
}

export default Home;