import * as React from 'react';
import {DemoContainer, DemoItem} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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
function SwiperLive() {
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
            <SwiperSlide>
                <div className="card h-100">
                    {/* <!-- Product image--> */}
                    <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..."/>
                    {/* <!-- Product details--> */}
                    <div className="card-body p-4">
                        <div className="text-center">
                            {/* <!-- Product name--> */}
                            <h5 className="fw-bolder">가산디지털단지역</h5>
                            {/* <!-- Product price--> */}
                        </div>
                    </div>
                    {/* <!-- Product actions--> */}
                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div className="text-center"><p className="btn btn-outline-dark mt-auto" href="#">상세보기</p></div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="card h-100">
                    {/* <!-- Product image--> */}
                    <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..."/>
                    {/* <!-- Product details--> */}
                    <div className="card-body p-4">
                        <div className="text-center">
                            {/* <!-- Product name--> */}
                            <h5 className="fw-bolder">구로역</h5>
                            {/* <!-- Product price--> */}
                        </div>
                    </div>
                    {/* <!-- Product actions--> */}
                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div className="text-center"><p className="btn btn-outline-dark mt-auto" href="#">상세보기</p></div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="card h-100">
                    {/* <!-- Product image--> */}
                    <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..."/>
                    {/* <!-- Product details--> */}
                    <div className="card-body p-4">
                        <div className="text-center">
                            {/* <!-- Product name--> */}
                            <h5 className="fw-bolder">신도림역</h5>
                            {/* <!-- Product price--> */}
                        </div>
                    </div>
                    {/* <!-- Product actions--> */}
                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div className="text-center"><p className="btn btn-outline-dark mt-auto" href="#">상세보기</p></div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="card h-100">
                    {/* <!-- Product image--> */}
                    <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..."/>
                    {/* <!-- Product details--> */}
                    <div className="card-body p-4">
                        <div className="text-center">
                            {/* <!-- Product name--> */}
                            <h5 className="fw-bolder">독산역</h5>
                            {/* <!-- Product price--> */}
                        </div>
                    </div>
                    {/* <!-- Product actions--> */}
                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div className="text-center"><p className="btn btn-outline-dark mt-auto" href="#">상세보기</p></div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="card h-100">
                    {/* <!-- Product image--> */}
                    <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..."/>
                    {/* <!-- Product details--> */}
                    <div className="card-body p-4">
                        <div className="text-center">
                            {/* <!-- Product name--> */}
                            <h5 className="fw-bolder">홍대입구역</h5>
                            {/* <!-- Product price--> */}
                        </div>
                    </div>
                    {/* <!-- Product actions--> */}
                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div className="text-center"><p className="btn btn-outline-dark mt-auto" href="#">상세보기</p></div>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    )
};


// function DateTimePickerViews() {
//     return (
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DemoContainer
//                 components={['DateTimePicker', 'DateTimePicker', 'DateTimePicker']}
//             >
//                 <DemoItem label={''}>
//                     <DateTimePicker views={['day', 'hours']}/>
//                 </DemoItem>
//             </DemoContainer>
//         </LocalizationProvider>
//     );
// }

function Predict() {
    const [date, setDate] = useState(new Date());
    const [location, setLocation] = useState('');
    const [hour, setHour] = useState('');

    const handleDateChange = (e) => {
        const selectedDate = new Date(e.target.value);
        setDate(selectedDate);
    };

    const handleHourChange = (e) => {
        setHour(e.target.value);
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 입력된 값들을 이용하여 원하는 작업 수행
        // 예: 서버로 데이터 전송, 다른 컴포넌트와 상태 공유 등

        // 입력된 값들 출력
        console.log('Date:', date);
        console.log('Location:', location);

        // 값 초기화
        setDate(new Date());
        setLocation('');
    };

    const [livedata, setlivedata] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
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
                            <li className="nav-item"><Link to="/login" className="nav-link">로그인</Link></li>
                            <li className="nav-item"><Link to="/signup" className="nav-link">회원가입</Link></li>
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
        <div className="d-flex flex-column">
            <main className="flex-shrink-0">
                {/* <!-- Navigation--> */}
                {/* <!-- Header--> */}
                <header className="py-6">
                    <div className="container px-5">
                        <form onSubmit={handleSubmit} className="d-flex gap-3">
                            <div>
                                <label htmlFor="date">날짜:</label>
                                <input
                                    type="date"
                                    id="date"
                                    value={date.toISOString().split('T')[0]}
                                    onChange={handleDateChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="hour">시간:</label>
                                <input
                                    type="number"
                                    id="hour"
                                    min="0"
                                    max="23"
                                    placeholder="0-23"
                                    value={hour}
                                    onChange={handleHourChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="location">장소:</label>
                                <select id="location" value={location} onChange={handleLocationChange}>
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
                                    {/* 추가적인 장소 목록을 여기에 추가 */}
                                </select>
                            </div>
                            <button type="submit">전송</button>
                        </form>
                    </div>
                </header>
                {/* <!-- About section one--> */}
                <section className="py-5 bg-light" id="scroll-target">
                    <div className="container px-5 my-6">
                        <div className="row gx-5 align-items-center">

                            {/* <img className="img-fluid rounded mb-5 mb-lg-0" src="https://dummyimage.com/600x400/343a40/6c757d" alt="..." /> */}
                            <p className="lead fw-bolder text-black-100 mb-0">**은 '혼잡'으로 예상됩니다</p>

                        </div>
                        {/* <div className="col-lg-6">
                            <p className="lead fw-bolder text-black-100" style={{marginBottom: '160px'}}>근처의 다른 역을 추천해드립니다</p>
                           <SwiperLive></SwiperLive>
                        </div> */}

                    </div>
                </section>
                {/* <!-- About section two--> */}
                <div className="container px-4 px-lg-5">
                    {/* <!-- Content Row--> */}
                    <div className="row gx-4 gx-lg-5" style={{marginTop: '50px', marginBottom: '50px'}}>
                        <h1 className="display-6 fw-bolder"
                            style={{fontSize: '30px', marginLeft: '-530px', marginBottom: '50px'}}>근처맛집</h1>
                        <SwiperLive></SwiperLive>
                    </div>
                    <div className="row gx-4 gx-lg-5" style={{marginBottom: '50px'}}>
                        <h1 className="display-6 fw-bolder"
                            style={{fontSize: '30px', marginLeft: '-530px', marginBottom: '50px'}}>근처명소</h1>
                        <SwiperLive></SwiperLive>
                    </div>
                </div>
                {/* <!-- Team members section--> */}
                <section className="py-5 bg-light">
                    <div className="container px-5 my-5">
                        <div className="text-center">
                            <h2 className="fw-bolder">근처맛집</h2>
                            <p className="lead fw-normal text-muted mb-5">**역 근처 맛집을 알려드립니다.</p>
                        </div>
                        <div className="row gx-5 row-cols-1 row-cols-sm-2 row-cols-xl-4 justify-content-center">
                            <div className="col mb-5 mb-5 mb-xl-0">
                                <div className="text-center">
                                    <img className="img-fluid rounded-circle mb-4 px-4"
                                         src="https://dummyimage.com/150x150/ced4da/6c757d" alt="..."/>
                                    <h5 className="fw-bolder">병창이네</h5>
                                    <div className="fst-italic text-muted">고깃집</div>
                                </div>
                            </div>
                            <div className="col mb-5 mb-5 mb-xl-0">
                                <div className="text-center">
                                    <img className="img-fluid rounded-circle mb-4 px-4"
                                         src="https://dummyimage.com/150x150/ced4da/6c757d" alt="..."/>
                                    <h5 className="fw-bolder">상욱이네</h5>
                                    <div className="fst-italic text-muted">카페</div>
                                </div>
                            </div>
                            <div className="col mb-5 mb-5 mb-sm-0">
                                <div className="text-center">
                                    <img className="img-fluid rounded-circle mb-4 px-4"
                                         src="https://dummyimage.com/150x150/ced4da/6c757d" alt="..."/>
                                    <h5 className="fw-bolder">호영이네</h5>
                                    <div className="fst-italic text-muted">술집</div>
                                </div>
                            </div>
                            <div className="col mb-5">
                                <div className="text-center">
                                    <img className="img-fluid rounded-circle mb-4 px-4"
                                         src="https://dummyimage.com/150x150/ced4da/6c757d" alt="..."/>
                                    <h5 className="fw-bolder">민수네</h5>
                                    <div className="fst-italic text-muted">양식</div>
                                </div>
                            </div>
                        </div>
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
                            <p className="link-light small" href="#!">Privacy</p>
                            <span className="text-white mx-1">&middot;</span>
                            <p className="link-light small" href="#!">Terms</p>
                            <span className="text-white mx-1">&middot;</span>
                            <p className="link-light small" href="#!">Contact</p>
                        </div>
                    </div>
                </div>
            </footer>
            {/* <!-- Bootstrap core JS--> */}
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
            {/* <!-- Core theme JS--> */}
            <script src="js/scripts.js"></script>
        </div>
        </div>
    )
}

export default Predict;