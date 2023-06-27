import * as React from 'react';
import {DemoContainer, DemoItem} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {Form, Button} from 'react-bootstrap';
import {Autoplay, Navigation, Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import {useEffect, useState} from "react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './App.css'
import Banner from "./Banner";
import axios from "axios";
import {Link} from "react-router-dom";
import Header from "./Header";
import {useNavigate} from "react-router-dom";

function SwiperLiveHotPlace({predictdata}) {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={4}
            navigation
            pagination={{clickable: true}}
            autoplay={{delay: 2000, disableOnInteraction: false}}
            // scrollbar={{ draggable: true }}
            className='container px-5'
        >
            {predictdata && predictdata.hotplaces && predictdata.hotplaces.map((hotplace) => (
                <SwiperSlide key={hotplace.id} className="swiper-slide">
                    <div className="col mb-5" style={{boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'}}>
                        <div className="card h-100">
                            {/*// <!-- Product image-->*/}
                            <div className="image-container">
                                <img className="card-img-top" src={hotplace.file_name}
                                     alt="..."/>
                            </div>
                            {/*// <!-- Product details-->*/}
                            <div className="card-body p-2">
                                <div className="text-center">
                                    {/*// <!-- Product name-->*/}
                                    <h5 className="fw-bolder" style={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>{hotplace.title}</h5>
                                    {/*// <!-- Product price-->*/}
                                    {hotplace.subway_nm}역
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

function SwiperLiveRestaurant({predictdata}) {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={4}
            navigation
            pagination={{clickable: true}}
            autoplay={{delay: 2000, disableOnInteraction: false}}
            // scrollbar={{ draggable: true }}
            className='container px-5'
        >
            {predictdata.restaurant && predictdata.restaurant.map((restaurant) => (
                <SwiperSlide key={restaurant.id} className="swiper-slide">
                    <div className="col mb-5" style={{boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'}}>
                        <div className="card h-100">
                            {/*// <!-- Product image-->*/}
                            <div className="image-container">
                                <img className="card-img-top" src={restaurant.file_name}
                                     alt="..."/>
                            </div>
                            {/*// <!-- Product details-->*/}
                            <div className="card-body p-2">
                                <div className="text-center">
                                    {/*// <!-- Product name-->*/}
                                    <h5 className="fw-bolder" style={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>{restaurant.title}</h5>
                                    {/*// <!-- Product price-->*/}
                                    {restaurant.subway_nm}역
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

function SwiperLiveAnother({predictdata}) {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={4}
            navigation
            pagination={{clickable: true}}
            autoplay={{delay: 2000, disableOnInteraction: false}}
            // scrollbar={{ draggable: true }}
            className='container px-5'
        >
            {predictdata.another_place && predictdata.another_place.map((another_place) => (
                <SwiperSlide key={another_place.id} className="swiper-slide">
                    <div className="col mb-5" style={{boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'}}>
                        <div className="card h-100">
                            {/*// <!-- Product image-->*/}
                            <div className="image-container">
                                <img className="card-img-top" src={another_place.place_image}
                                     alt="..."/>
                            </div>
                            {/*// <!-- Product details-->*/}
                            <div className="card-body p-2">
                                <div className="text-center">
                                    {/*// <!-- Product name-->*/}
                                    <h5 className="fw-bolder" style={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>{another_place.area_nm}</h5>
                                    {/*// <!-- Product price-->*/}
                                    {another_place.predict_value}
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

function Predict() {

    const [date, setDate] = useState(new Date());
    const [location, setLocation] = useState('강남역');
    const [hour, setHour] = useState(6);
    const [year, setYear] = useState(2023);
    const [month, setMonth] = useState(6);
    const [day, setDay] = useState(25);
    const [selectedValues, setSelectedValues] = useState([]);
    const [selectedPlaceValues, setSelectedPlaceValues] = useState([]);
    const navigate = useNavigate();

    const handleHourChange = (e) => {
        setHour(e.target.value);
    };

    const handleYearChange = (e) => {
        setYear(e.target.value);
    };

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
    };

    const handleDayChange = (e) => {
        setDay(e.target.value);
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const [predictdata, Setpredictdata] = useState([]);

    const handleCheckboxChange = (event) => {
        const value = event.target.value;

        if (event.target.checked) {
            setSelectedValues([...selectedValues, value]);
        } else {
            setSelectedValues(selectedValues.filter((item) => item !== value));
        }
    };

    const handleCheckboxPlaceChange = (event) => {
        const value = event.target.value;

        if (event.target.checked) {
            setSelectedPlaceValues([...selectedPlaceValues, value]);
        } else {
            setSelectedPlaceValues(selectedPlaceValues.filter((item) => item !== value));
        }
    };

    const sendData = (e) => {

        e.preventDefault();

        const data = JSON.stringify({
            "user_id": localStorage.getItem('nickname'),
            "area_nm": location,
            "year": year,
            "month": month,
            "day": day,
            'hour': hour,
            "restaurant_category_list": selectedValues,
            "hotplaces_category_list": selectedPlaceValues
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://3.39.156.163:8000/predict',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        };


        axios.request(config)
            .then(response => {
                Setpredictdata(response.data);
                console.log(predictdata.another_place[0].restaurant)
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div>
            <div className="d-flex flex-column">
                <main className="flex-shrink-0">
                    {/* <!-- Navigation--> */}
                    {/* <!-- Header--> */}
                    <header className="py-6">
                    </header>
                    {/* <!-- About section one--> */}
                    <section className="py-5 bg-light" id="scroll-target">
                        <div className="container px-5">
                            <h2 className="fw-bolder mb-4">시간과 장소를 선택하여 혼잡도를 예측해 보세요</h2>
                            <Form onSubmit={sendData} className="d-flex gap-3">
                                <Form.Group controlId="year">
                                    <Form.Label>년도:</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="1900"
                                        max="9999"
                                        placeholder="년도 입력"
                                        value={year}
                                        onChange={handleYearChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="month">
                                    <Form.Label>월:</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="1"
                                        max="12"
                                        placeholder="월 입력"
                                        value={month}
                                        onChange={handleMonthChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="day">
                                    <Form.Label>일:</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="1"
                                        max="31"
                                        placeholder="일 입력"
                                        value={day}
                                        onChange={handleDayChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="hour">
                                    <Form.Label>시간:</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="0"
                                        max="23"
                                        placeholder="0-23"
                                        value={hour}
                                        onChange={handleHourChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="location">
                                    <Form.Label>장소:</Form.Label>
                                    <Form.Select value={location} onChange={handleLocationChange}>
                                        <option value="">장소 선택</option>
                                        <option value="DMC(디지털미디어시티)">DMC(디지털미디어시티)</option>
                                        <option value="가로수길">가로수길</option>
                                        <option value="가산디지털단지역">가산디지털단지역</option>
                                        <option value="강남 MICE 관광특구">강남 MICE 관광특구</option>
                                        <option value="강남역">강남역</option>
                                        <option value="건대입구역">건대입구역</option>
                                        <option value="경복궁·서촌마을">경복궁·서촌마을</option>
                                        <option value="고속터미널역">고속터미널역</option>
                                        <option value="광화문·덕수궁">광화문·덕수궁</option>
                                        <option value="교대역">교대역</option>
                                        <option value="구로디지털단지역">구로디지털단지역</option>
                                        <option value="국립중앙박물관·용산가족공원">국립중앙박물관·용산가족공원</option>
                                        <option value="낙산공원·이화마을">낙산공원·이화마을</option>
                                        <option value="남산공원">남산공원</option>
                                        <option value="동대문 관광특구">동대문 관광특구</option>
                                        <option value="뚝섬한강공원">뚝섬한강공원</option>
                                        <option value="망원한강공원">망원한강공원</option>
                                        <option value="명동 관광특구">명동 관광특구</option>
                                        <option value="반포한강공원">반포한강공원</option>
                                        <option value="북서울꿈의숲">북서울꿈의숲</option>
                                        <option value="북촌한옥마을">북촌한옥마을</option>
                                        <option value="서울숲공원">서울숲공원</option>
                                        <option value="서울역">서울역</option>
                                        <option value="선릉역">선릉역</option>
                                        <option value="성수카페거리">성수카페거리</option>
                                        <option value="수유리 먹자골목">수유리 먹자골목</option>
                                        <option value="신도림역">신도림역</option>
                                        <option value="신림역">신림역</option>
                                        <option value="신촌·이대역">신촌·이대역</option>
                                        <option value="쌍문동 맛집거리">쌍문동 맛집거리</option>
                                        <option value="압구정로데오거리">압구정로데오거리</option>
                                        <option value="여의도">여의도</option>
                                        <option value="역삼역">역삼역</option>
                                        <option value="연신내역">연신내역</option>
                                        <option value="영등포 타임스퀘어">영등포 타임스퀘어</option>
                                        <option value="왕십리역">왕십리역</option>
                                        <option value="용산역">용산역</option>
                                        <option value="월드컵공원">월드컵공원</option>
                                        <option value="이촌한강공원">이촌한강공원</option>
                                        <option value="이태원 관광특구">이태원 관광특구</option>
                                        <option value="인사동·익선동">인사동·익선동</option>
                                        <option value="잠실 관광특구">잠실 관광특구</option>
                                        <option value="잠실종합운동장">잠실종합운동장</option>
                                        <option value="잠실한강공원">잠실한강공원</option>
                                        <option value="종로·청계 관광특구">종로·청계 관광특구</option>
                                        <option value="창덕궁·종묘">창덕궁·종묘</option>
                                        <option value="창동 신경제 중심지">창동 신경제 중심지</option>
                                        <option value="홍대 관광특구">홍대 관광특구</option>
                                        {/* 추가적인 장소 옵션을 여기에 추가 */}
                                    </Form.Select>
                                </Form.Group>
                                <Button type="submit">전송</Button>
                            </Form>
                            <p className="lead fw-bolder text-black-100 mt-3">{location}의 주변 맛집들을 알려드립니다</p>
                            <Form>
                                {['checkbox'].map((type) => (
                                    <div key={`inline-${type}`} className="mb-3">
                                        <Form.Check
                                            inline
                                            label="기타"
                                            name="group1"
                                            value={"기타"}
                                            type={type}
                                            id={`inline-${type}-1`}
                                            onChange={handleCheckboxChange}
                                        />
                                        <Form.Check
                                            inline
                                            label="양식"
                                            name="group1"
                                            value={"양식"}
                                            type={type}
                                            id={`inline-${type}-2`}
                                            onChange={handleCheckboxChange}
                                        />
                                        <Form.Check
                                            inline
                                            // disabled
                                            label="한식"
                                            name="group1"
                                            value={"한식"}
                                            type={type}
                                            id={`inline-${type}-3`}
                                            onChange={handleCheckboxChange}
                                        />
                                        <Form.Check
                                            inline
                                            // disabled
                                            label="카페/베이커리"
                                            name="group1"
                                            value={"카페/베이커리"}
                                            type={type}
                                            id={`inline-${type}-3`}
                                            onChange={handleCheckboxChange}
                                        />
                                        <Form.Check
                                            inline
                                            // disabled
                                            label="세계음식"
                                            name="group1"
                                            value={"세계음식"}
                                            type={type}
                                            id={`inline-${type}-3`}
                                            onChange={handleCheckboxChange}
                                        />
                                        <Form.Check
                                            inline
                                            // disabled
                                            label="중식"
                                            name="group1"
                                            value={"중식"}
                                            type={type}
                                            id={`inline-${type}-3`}
                                            onChange={handleCheckboxChange}
                                        />
                                        <Form.Check
                                            inline
                                            // disabled
                                            label="뷔페"
                                            name="group1"
                                            value={"뷔페"}
                                            type={type}
                                            id={`inline-${type}-3`}
                                            onChange={handleCheckboxChange}
                                        />
                                        <Form.Check
                                            inline
                                            // disabled
                                            label="일식"
                                            name="group1"
                                            value={"일식"}
                                            type={type}
                                            id={`inline-${type}-3`}
                                            onChange={handleCheckboxChange}
                                        />
                                        <Form.Check
                                            inline
                                            // disabled
                                            label="치킨/주점"
                                            name="group1"
                                            value={"치킨/주점"}
                                            type={type}
                                            id={`inline-${type}-3`}
                                            onChange={handleCheckboxChange}
                                        />
                                    </div>
                                ))}
                            </Form>
                            <Form>
                                {['checkbox'].map((type) => (
                                    <div key={`inline-${type}`} className="mb-3">
                                        <Form.Check
                                            inline
                                            label="관광지"
                                            name="group1"
                                            value={"관광지"}
                                            type={type}
                                            id={`inline-${type}-1`}
                                            onChange={handleCheckboxPlaceChange}
                                        />
                                        <Form.Check
                                            inline
                                            label="문화시설"
                                            name="group1"
                                            value={"문화시설"}
                                            type={type}
                                            id={`inline-${type}-2`}
                                            onChange={handleCheckboxPlaceChange}
                                        />
                                    </div>
                                ))}
                            </Form>
                        </div>
                        <div className="container px-5 my-6">
                            <div className="row gx-5 align-items-center">
                                {/* <img className="img-fluid rounded mb-5 mb-lg-0" src="https://dummyimage.com/600x400/343a40/6c757d" alt="..." /> */}
                                <p className="lead fw-bolder text-black-100 mb-0">그때의 {location}은(는)
                                    '{predictdata.place_congest}'으로 예상됩니다</p>
                            </div>
                            {/* <div className="col-lg-6">
                            <p className="lead fw-bolder text-black-100" style={{marginBottom: '160px'}}>근처의 다른 역을 추천해드립니다</p>
                           <SwiperLive></SwiperLive>
                        </div> */}
                        </div>
                    </section>
                    {/* <!-- Team members section--> */}
                    {(predictdata.place_congest === "약간 붐빔" || predictdata.place_congest === "붐빔") && (
                        <section className="py-6">
                            <div className="container px-4 px-lg-1 mt-5">
                                <h2 className="fw-bolder mb-4">AI가 예측한 다른 지역입니다</h2>
                                <div
                                    className="row gx-2 gx-lg-3 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                                    {predictdata.another_place && predictdata.another_place.map((another_place) => (
                                        <div className="col mb-2" key={another_place.id}
                                             style={{boxShadow: '0 0 10px rgba(0, 0, 0, 0.05)'}}>
                                            <div className="card h-100">
                                                <img className="card-img-top" src={another_place.place_image} alt="..."
                                                     style={{objectFit: 'cover', height: '200px'}}/>
                                                <div className="card-body p-4">
                                                    <div className="text-center">
                                                        <h5 className="fw-bolder" style={{
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis'
                                                        }}>{another_place.area_nm}</h5>
                                                        {another_place.predict_value}
                                                    </div>
                                                </div>
                                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent mt-0">
                                                    <div className="text-center"> <span onClick={() => {
                                                        navigate(`/live/detail/${another_place.id}`)
                                                    }} className="btn btn-outline-dark mt-auto">상세보기</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                    {(predictdata.place_congest === "약간 붐빔" || predictdata.place_congest === "붐빔") && (
                        <section className="py-6">
                            <div className="container px-4 px-lg-1 mt-5">
                                <h2 className="fw-bolder mb-4">주변맛집</h2>
                                <div className="row gx-2 gx-lg-3 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                                    {predictdata.another_place && predictdata.another_place.length > 0 ? (
                                        predictdata.another_place.map((place) => (
                                            place.restaurant.map((restaurant) => (
                                                <div className="col mb-2" key={restaurant.id} style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.05)' }}>
                                                    <div className="card h-100">
                                                        <img className="card-img-top" src={restaurant.file_name} alt="..." style={{ objectFit: 'cover', height: '200px' }} />
                                                        <div className="card-body p-4">
                                                            <div className="text-center">
                                                                <h5 className="fw-bolder" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{restaurant.title}</h5>
                                                                {restaurant.category}
                                                            </div>
                                                        </div>
                                                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent mt-0">
                                                            <div className="text-center">
                      <span
                          onClick={() => {
                              navigate(`/restaurant/${restaurant.id}`);
                          }}
                          className="btn btn-outline-dark mt-auto"
                      >
                        상세보기
                      </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ))
                                    ) : (
                                        <div>주변 맛집 정보가 없습니다.</div>
                                    )}
                                </div>
                            </div>
                        </section>
                    )}

                    {(predictdata.place_congest === "약간 붐빔" || predictdata.place_congest === "붐빔") && (
                        <section className="py-6">
                            <div className="container px-4 px-lg-1 mt-5">
                                <h2 className="fw-bolder mb-4">주변명소</h2>
                                <div className="row gx-2 gx-lg-3 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                                    {predictdata.another_place && predictdata.another_place.length > 0 ? (
                                        predictdata.another_place.map((place) => (
                                            place.hotplaces.map((hotplace) => (
                                                <div className="col mb-2" key={hotplace.id} style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.05)' }}>
                                                    <div className="card h-100">
                                                        <img className="card-img-top" src={hotplace.file_name} alt="..." style={{ objectFit: 'cover', height: '200px' }} />
                                                        <div className="card-body p-4">
                                                            <div className="text-center">
                                                                <h5 className="fw-bolder" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{hotplace.title}</h5>
                                                                {hotplace.category}
                                                            </div>
                                                        </div>
                                                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent mt-0">
                                                            <div className="text-center">
                      <span
                          onClick={() => {
                              navigate(`/hotplace/${hotplace.id}`);
                          }}
                          className="btn btn-outline-dark mt-auto"
                      >
                        상세보기
                      </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ))
                                    ) : (
                                        <div>주변 맛집 정보가 없습니다.</div>
                                    )}
                                </div>
                            </div>
                        </section>
                    )}

                    {(predictdata.place_congest !== "붐빔" && predictdata.place_congest !== "약간 붐빔") && (
                        <section className="py-6">
                            <div className="container px-4 px-lg-1 mt-5">
                                <h2 className="fw-bolder mb-4">주변맛집</h2>
                                <div className="row gx-2 gx-lg-3 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                                    {predictdata.restaurant && predictdata.restaurant.map((restaurant) => (
                                        <div className="col mb-2" key={restaurant.id} style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.05)' }}>
                                            <div className="card h-100">
                                                <img className="card-img-top" src={restaurant.file_name} alt="..." style={{ objectFit: 'cover', height: '200px' }} />
                                                <div className="card-body p-4">
                                                    <div className="text-center">
                                                        <h5 className="fw-bolder" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{restaurant.title}</h5>
                                                        {restaurant.restaurantCategory}
                                                    </div>
                                                </div>
                                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent mt-0">
                                                    <div className="text-center">
                  <span onClick={() => {
                      navigate(`/restaurant/${restaurant.id}`);
                  }} className="btn btn-outline-dark mt-auto">
                    상세보기
                  </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {(predictdata.place_congest !== "붐빔" && predictdata.place_congest !== "약간 붐빔") && (
                    <section className="py-6">
                        <div className="container px-4 px-lg-1 mt-5">
                            <h2 className="fw-bolder mb-4">주변명소</h2>
                            <div
                                className="row gx-2 gx-lg-3 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                                {predictdata && predictdata.hotplaces && predictdata.hotplaces.map((hotplace) => (
                                    <div className="col mb-2" key={hotplace.id}
                                         style={{boxShadow: '0 0 10px rgba(0, 0, 0, 0.05)'}}>
                                        <div className="card h-100">
                                            <img className="card-img-top" src={hotplace.file_name} alt="..."
                                                 style={{objectFit: 'cover', height: '200px'}}/>
                                            <div className="card-body p-4">
                                                <div className="text-center">
                                                    <h5 className="fw-bolder" style={{
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                    }}>{hotplace.title}</h5>
                                                    {hotplace.restaurantCategory}
                                                </div>
                                            </div>
                                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent mt-0">
                                                <div className="text-center"> <span onClick={() => {
                                                    navigate(`/hotplace/${hotplace.id}`)
                                                }} className="btn btn-outline-dark mt-auto">상세보기</span></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    )}
                </main>
                {/*/!* <!-- Bootstrap core JS--> *!/*/}
                {/*<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>*/}
                {/*/!* <!-- Core theme JS--> *!/*/}
                {/*<script src="js/scripts.js"></script>*/}
            </div>
        </div>
    )
}

export default Predict;