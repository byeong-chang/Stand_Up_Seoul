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
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            className='container px-5 py-5'
        >
            <SwiperSlide>
                <div className="card h-100 py-2">
                    <div className="card-body">
                        <h2 className="card-title">Card One</h2>
                        <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem magni quas ex numquam, maxime minus quam molestias corporis quod, ea minima accusamus.</p>
                    </div>
                    <div className="card-footer"><a className="btn btn-primary btn-sm" href="#!">More Info</a></div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="card h-100 py-2">
                    <div className="card-body">
                        <h2 className="card-title">Card One</h2>
                        <img className="card-img-top" src="https://standupseoul.s3.ap-northeast-2.amazonaws.com/place/%EB%82%A8%EC%82%B0%EA%B3%B5%EC%9B%90.jpg" alt="..." />
                    </div>
                    <div className="card-footer"><a className="btn btn-primary btn-sm" href="#!">More Info</a></div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="card h-100 py-2">
                    <div className="card-body">
                        <h2 className="card-title">Card One</h2>
                        <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem magni quas ex numquam, maxime minus quam molestias corporis quod, ea minima accusamus.</p>
                    </div>
                    <div className="card-footer"><a className="btn btn-primary btn-sm" href="#!">More Info</a></div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="card h-100 py-2">
                    <div className="card-body">
                        <h2 className="card-title">Card One</h2>
                        <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem magni quas ex numquam, maxime minus quam molestias corporis quod, ea minima accusamus.</p>
                    </div>
                    <div className="card-footer"><a className="btn btn-primary btn-sm" href="#!">More Info</a></div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="card h-100 py-2">
                    <div className="card-body">
                        <h2 className="card-title">Card One</h2>
                        <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem magni quas ex numquam, maxime minus quam molestias corporis quod, ea minima accusamus.</p>
                    </div>
                    <div className="card-footer"><a className="btn btn-primary btn-sm" href="#!">More Info</a></div>
                </div>
            </SwiperSlide>
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
            width='1220px'
            height="308px"
            sandbox="allow-same-origin allow-scripts"
            onClick={(e) => e.preventDefault()} // 클릭 이벤트를 무시합니다.
        ></iframe>
    )
}

function LiveDetail() {
    return (
        <div>
            {/* <!-- Responsive navbar--> */}
            {/* <!-- Page Content--> */}
            <div className="container px-4 px-lg-5">
                {/* <!-- Heading Row--> */}
                <div className="row gx-4 gx-lg-5 align-items-center my-5">
                    {/* <div className="col-lg-5"></div> */}
                    <h1 className="font-weight-light">**의 실시간 정보를 보여드립니다</h1>
                    <p>i have a pen i have a apple Uh! applepen i have a pen i have a pineapple Uh! penpineapple i have a penpineapple i have a applepen Uh! penpineappleapplepen</p>
                    {/* <a className="btn btn-primary" href="#!">Call to Action!</a> */}

                    <div className="col-lg-7">
                        <Dashboard></Dashboard>
                    </div>
                </div>
                {/* <!-- Call to Action--> */}
                <div className="card text-white bg-secondary my-5 py-4 text-center">
                    <div className="card-body"><p className="text-white m-0">This call to action card is a great place to showcase some important information or display a clever tagline!</p></div>
                </div>
                {/* <!-- Content Row--> */}
                <div className="row gx-4 gx-lg-5">
                    <h1 className="display-6 fw-bolder" style={{ fontSize: '30px', marginLeft: '-530px', marginBottom: '0px' }}>근처맛집</h1>
                    <SwiperLive></SwiperLive>
                </div>
                <div className="row gx-4 gx-lg-5">
                    <h1 className="display-6 fw-bolder" style={{ fontSize: '30px', marginLeft: '-530px', marginBottom: '0px' }}>근처명소</h1>
                    <SwiperLive></SwiperLive>
                </div>
            </div>
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

export default LiveDetail;