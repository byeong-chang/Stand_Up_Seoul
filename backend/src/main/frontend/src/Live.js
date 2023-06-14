import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from "react-router-dom";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './App.css'

function SwiperLive() {
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={4}
            navigation
            pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            className='container px-5'
        >
            <SwiperSlide><div className="card h-100">
                {/* <!-- Product image--> */}
                <img className="card-img-top" src="https://standupseoul.s3.ap-northeast-2.amazonaws.com/place/%EA%B1%B4%EB%8C%80%EC%9E%85%EA%B5%AC%EC%97%AD.jpg" alt="..." />
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
                    <div className="text-center"><Link to="/livedetail" className="btn btn-outline-dark mt-auto">상세보기</Link></div>
                </div>
            </div></SwiperSlide>
            <SwiperSlide><div className="card h-100">
                {/* <!-- Product image--> */}
                <img className="card-img-top" src="https://standupseoul.s3.ap-northeast-2.amazonaws.com/place/%EA%B0%95%EB%82%A8%EC%97%AD.jpg" alt="..." />
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
                <img className="card-img-top" src="https://standupseoul.s3.ap-northeast-2.amazonaws.com/place/%EA%B2%BD%EB%B3%B5%EA%B6%81%C2%B7%EC%84%9C%EC%B4%8C%EB%A7%88%EC%9D%84.jpg" alt="..." />
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
                <img className="card-img-top" src="https://standupseoul.s3.ap-northeast-2.amazonaws.com/place/%EA%B5%AD%EB%A6%BD%EC%A4%91%EC%95%99%EB%B0%95%EB%AC%BC%EA%B4%80%C2%B7%EC%9A%A9%EC%82%B0%EA%B0%80%EC%A1%B1%EA%B3%B5%EC%9B%90.jpg" alt="..." />
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
                <img className="card-img-top" src="https://standupseoul.s3.ap-northeast-2.amazonaws.com/place/%EB%82%A8%EC%82%B0%EA%B3%B5%EC%9B%90.jpg" alt="..." />
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

function Live() {
    return (
        <div>
            {/* <!-- Navigation--> */}
            {/* <!-- Header--> */}
            <header className="bg-dark py-1">
                    <div className="container px-5">
                        <div className="row gx-5 align-items-center justify-content-center">
                            <div className="col-lg-8 col-xl-7 col-xxl-6">
                                <div className="my-5 text-center text-xl-start">
                                    <h1 className="display-5 fw-bolder text-white mb-4">실시간 혼잡도 낮은 지역</h1>
                                    <p className="lead fw-normal text-white-50 mb-4"><a className="nav-link" href="index.html">가산디지털단지역</a></p>
                                    <p className="lead fw-normal text-white-50 mb-4"><a className="nav-link" href="index.html">구로역</a></p>
                                    <p className="lead fw-normal text-white-50 mb-4">독산역</p>
                                    <p className="lead fw-normal text-white-50 mb-4">신도림역</p>
                                    <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                                        <Link to="/predict" className="btn btn-primary btn-lg px-4 me-sm-3">미래 혼잡도 예측하러가기</Link>
                                        <Link to="/live" className="btn btn-outline-light btn-lg px-4" href="#!">상세정보</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center"><img className="img-fluid rounded-3 my-5" src="https://standupseoul.s3.ap-northeast-2.amazonaws.com/place/%EA%B0%80%EB%A1%9C%EC%88%98%EA%B8%B8.jpg" alt="..." /></div>
                        </div>
                    </div>
                </header>
            {/* <!-- Section--> */}
            <section className="py-5" style={{ textAlign: 'left'   /* other inner styles */ }}>
                <div className="container px-4 px-lg-5 mt-5">
                    <h1 className="display-6 fw-bolder" style={{ fontSize: '24px', marginLeft: '40px', marginBottom: '20px' }}>원활</h1>
                    <SwiperLive></SwiperLive>
                </div>
                <div className="container px-4 px-lg-5 mt-5">
                    <h1 className="display-6 fw-bolder" style={{ fontSize: '24px', marginLeft: '40px', marginBottom: '20px' }}>보통</h1>
                    <SwiperLive></SwiperLive>
                </div>
                <div className="container px-4 px-lg-5 mt-5">
                    <h1 className="display-6 fw-bolder" style={{ fontSize: '24px', marginLeft: '40px', marginBottom: '20px' }}>약간붐빔</h1>
                    <SwiperLive></SwiperLive>
                </div>
                <div className="container px-4 px-lg-5 mt-5">
                    <h1 className="display-6 fw-bolder" style={{ fontSize: '24px', marginLeft: '40px', marginBottom: '20px' }}>붐빔</h1>
                    <SwiperLive></SwiperLive>
                </div>
            </section>
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

export default Live;