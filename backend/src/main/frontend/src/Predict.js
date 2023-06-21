import * as React from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './App.css'

function SwiperLive() {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={4}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            // scrollbar={{ draggable: true }}
            className='container px-5'
        >
            <SwiperSlide><div className="card h-100">
                {/* <!-- Product image--> */}
                <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
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
                    <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">상세보기</a></div>
                </div>
            </div></SwiperSlide>
            <SwiperSlide><div className="card h-100">
                {/* <!-- Product image--> */}
                <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
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
                    <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">상세보기</a></div>
                </div>
            </div></SwiperSlide>
            <SwiperSlide><div className="card h-100">
                {/* <!-- Product image--> */}
                <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
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
                    <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">상세보기</a></div>
                </div>
            </div></SwiperSlide>
            <SwiperSlide><div className="card h-100">
                {/* <!-- Product image--> */}
                <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
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
                    <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">상세보기</a></div>
                </div>
            </div></SwiperSlide>
            <SwiperSlide><div className="card h-100">
                {/* <!-- Product image--> */}
                <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
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
                    <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">상세보기</a></div>
                </div>
            </div></SwiperSlide>
        </Swiper>
    )
};

function Dashboard() {

    const placeId = 15 // 백엔드에서 받아온 placeId 삽입
    const dashboardUrl = `http://15.165.110.156:8088/superset/dashboard/4/?placeid=${placeId}&standalone=2&show_filters=0&expand_filters=0`;

    return (
        <iframe
            title="Dashboard"
            src={dashboardUrl}
            // src="http://15.165.110.156:8088/superset/dashboard/1/"
            width='100%'
            height="450px"
            sandbox="allow-same-origin allow-scripts"
            onClick={(e) => e.preventDefault()} // 클릭 이벤트를 무시합니다.
        ></iframe>
    )
}

function DateTimePickerViews() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
                components={['DateTimePicker', 'DateTimePicker', 'DateTimePicker']}
            >
                <DemoItem label={''}>
                    <DateTimePicker views={['day', 'hours']} />
                </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
    );
}

function Predict() {
    return (
        <div className="d-flex flex-column">
            <main className="flex-shrink-0">
                {/* <!-- Navigation--> */}
                {/* <!-- Header--> */}
                <header className="py-6">
                    <div className="container px-5">
                        <div className="row justify-content-left">
                            <div className="col-lg-8 col-xxl-6">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <h2 className="fw-bolder" style={{ marginLeft: '0px', marginRight: '30px', marginBottom: '0', whiteSpace: 'nowrap' }}>언제 어디로 가실건가요?</h2>
                                    <p className="lead fw-normal text-muted mb-0" style={{ fontSize: '14px', minWidth: '250px', marginRight: '30px' }}><DateTimePickerViews></DateTimePickerViews></p>
                                    <Form.Select aria-label="Default select example" style={{ minWidth: '200px', height: '57px', marginTop: '9.5px', marginRight: '30px' }}>
                                        <option value="1">DMC(디지털미디어시티)</option>
                                        <option value="2">가로수길</option>
                                        <option value="3">가산디지털단지역</option>
                                        <option value="4">강남 MICE 관광특구</option>
                                        <option value="5">강남역</option>
                                        <option value="6">건대입구역</option>
                                        <option value="7">경복궁·서촌마을</option>
                                        <option value="8">고속터미널역</option>
                                        <option value="9">광화문·덕수궁</option>
                                        <option value="10">교대역</option>
                                        <option value="11">구로디지털단지역</option>
                                        <option value="12">국립중앙박물관·용산가족공원</option>
                                        <option value="13">낙산공원·이화마을</option>
                                        <option value="14">남산공원</option>
                                        <option value="15">동대문 관광특구</option>
                                        <option value="16">뚝섬한강공원</option>
                                        <option value="17">망원한강공원</option>
                                        <option value="18">명동 관광특구</option>
                                        <option value="19">반포한강공원</option>
                                        <option value="20">북서울꿈의숲</option>
                                        <option value="21">북촌한옥마을</option>
                                        <option value="22">서울숲공원</option>
                                        <option value="23">서울역</option>
                                        <option value="24">선릉역</option>
                                        <option value="25">성수카페거리</option>
                                        <option value="26">수유리 먹자골목</option>
                                        <option value="27">신도림역</option>
                                        <option value="28">신림역</option>
                                        <option value="29">신촌·이대역</option>
                                        <option value="30">쌍문동 맛집거리</option>
                                        <option value="31">압구정로데오거리</option>
                                        <option value="32">여의도</option>
                                        <option value="33">역삼역</option>
                                        <option value="34">연신내역</option>
                                        <option value="35">영등포 타임스퀘어</option>
                                        <option value="36">왕십리역</option>
                                        <option value="37">용산역</option>
                                        <option value="38">월드컵공원</option>
                                        <option value="39">이촌한강공원</option>
                                        <option value="40">이태원 관광특구</option>
                                        <option value="41">인사동·익선동</option>
                                        <option value="42">잠실 관광특구</option>
                                        <option value="43">잠실종합운동장</option>
                                        <option value="44">잠실한강공원</option>
                                        <option value="45">종로·청계 관광특구</option>
                                        <option value="46">창덕궁·종묘</option>
                                        <option value="47">창동 신경제 중심지</option>
                                        <option value="48">홍대 관광특구</option>
                                    </Form.Select>
                                    <Button variant="primary" style={{ marginLeft: '-10px', minWidth: '100px', height: '58px', marginTop: '9.5px' }}>예측하기</Button>
                                </div>
                            </div>
                        </div>
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
                        <h1 className="display-6 fw-bolder" style={{ fontSize: '30px', marginLeft: '-530px', marginBottom: '50px' }}>근처맛집</h1>
                        <SwiperLive></SwiperLive>
                    </div>
                    <div className="row gx-4 gx-lg-5" style={{marginBottom: '50px' }}>
                        <h1 className="display-6 fw-bolder" style={{ fontSize: '30px', marginLeft: '-530px', marginBottom: '50px' }}>근처명소</h1>
                        <SwiperLive></SwiperLive>
                    </div>
                </div>
                {/* <!-- Team members section--> */}
                {/* <section className="py-5 bg-light">
                    <div className="container px-5 my-5">
                        <div className="text-center">
                            <h2 className="fw-bolder">근처맛집</h2>
                            <p className="lead fw-normal text-muted mb-5">**역 근처 맛집을 알려드립니다.</p>
                        </div>
                        <div className="row gx-5 row-cols-1 row-cols-sm-2 row-cols-xl-4 justify-content-center">
                            <div className="col mb-5 mb-5 mb-xl-0">
                                <div className="text-center">
                                    <img className="img-fluid rounded-circle mb-4 px-4" src="https://dummyimage.com/150x150/ced4da/6c757d" alt="..." />
                                    <h5 className="fw-bolder">병창이네</h5>
                                    <div className="fst-italic text-muted">고깃집</div>
                                </div>
                            </div>
                            <div className="col mb-5 mb-5 mb-xl-0">
                                <div className="text-center">
                                    <img className="img-fluid rounded-circle mb-4 px-4" src="https://dummyimage.com/150x150/ced4da/6c757d" alt="..." />
                                    <h5 className="fw-bolder">상욱이네</h5>
                                    <div className="fst-italic text-muted">카페</div>
                                </div>
                            </div>
                            <div className="col mb-5 mb-5 mb-sm-0">
                                <div className="text-center">
                                    <img className="img-fluid rounded-circle mb-4 px-4" src="https://dummyimage.com/150x150/ced4da/6c757d" alt="..." />
                                    <h5 className="fw-bolder">호영이네</h5>
                                    <div className="fst-italic text-muted">술집</div>
                                </div>
                            </div>
                            <div className="col mb-5">
                                <div className="text-center">
                                    <img className="img-fluid rounded-circle mb-4 px-4" src="https://dummyimage.com/150x150/ced4da/6c757d" alt="..." />
                                    <h5 className="fw-bolder">민수네</h5>
                                    <div className="fst-italic text-muted">양식</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
            </main>
            {/* <!-- Footer--> */}
            <footer className="bg-dark py-4 mt-auto">
                <div className="container px-5">
                    <div className="row align-items-center justify-content-between flex-column flex-sm-row">
                        <div className="col-auto"><div className="small m-0 text-white">Copyright &copy; Your Website 2023</div></div>
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

export default Predict;