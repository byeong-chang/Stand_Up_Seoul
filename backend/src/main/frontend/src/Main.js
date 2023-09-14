import Image from "./static/배너사진1.jpg";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { FaUtensils } from 'react-icons/fa';
import { GiBowlOfRice, GiCoffeeCup, GiHamburger, GiNoodles, GiWorld, GiBeerStein, GiSushis, GiForkKnifeSpoon } from 'react-icons/gi'
import { BsArrowRightShort } from "react-icons/bs";



function Main (props){

    const [location, setLocation] = useState([]);

    const navigate = useNavigate();

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchLocation = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const storedLocation = localStorage.getItem('location');
                    if (!storedLocation) {
                        setLocation({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        });
                        localStorage.setItem('location', JSON.stringify({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        }));
                    }
                },
                (error) => console.log(error)
            );
        };

        fetchLocation();
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

    return(

        <div className="d-flex flex-column h-100">
        <main className="flex-shrink-0">
            <header className="bg-dark py-5"  style={{ backgroundImage: `url(${Image})`, backgroundRepeat: 'no-repeat',
                backgroundPosition: 'top-center',
                backgroundSize: '100% 100%'}}>
                <div className="container px-5">
                    <div className="row gx-5 align-items-left justify-left-left">
                        <div className="col-lg-8 col-xl-7 col-xxl-6">
                            <div className="my-5 text-center text-xl-start">
                                <h1 className="display-5 fw-bolder text-white mb-2">A Bootstrap 5 template for modern
                                    businesses</h1>
                                {Object.keys(data).map(key => (
                                <p key={key} onClick={()=>{
                                    navigate(`/live/detail/${data[key].place.id}`)
                                }} className="lead fw-normal text-white-50 mb-4">{data[key].place.areaName}</p>
                                ))}
                                <div
                                    className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                                    <a className="btn btn-primary btn-lg px-4 me-sm-3" href="#features">Get Started</a>
                                    <a className="btn btn-outline-light btn-lg px-4" href="#!">Learn More</a>
                                </div>
                            </div>
                        </div>
                        {/*<div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center">*/}
                        {/*    <img*/}
                        {/*    className="img-fluid rounded-3 my-5" src="https://dummyimage.com/600x400/343a40/6c757d"*/}
                        {/*    alt="..."/>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </header>
            <section className="py-5" id="features">
                <div className="container px-5 my-5">
                    <div className="row gx-5">
                        <div className="col-lg-4 mb-5 mb-lg-0"><h2 className="fw-bolder mb-0">A better way to start
                            building.</h2></div>
                        <div className="col-lg-8">
                            <div className="row gx-5 row-cols-1 row-cols-md-2">
                                <div style={{backgroundImage: `url(${data && data[0]?.restaurantList && data[0]?.restaurantList[0]?.fileName})`,   backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'top-center',
                                    backgroundSize: '100% 100%', border: '5px solid white'
                                    }}>
                                <div className="col mb-5 h-100" >
                                    <div className="feature text-white rounded-3 mt-3 mb-3">
                                        {data && data[0]?.restaurantList && data[0]?.restaurantList[0]?.restaurantCategory === '양식' ? (
                                            <FaUtensils size={30} />
                                        ) : data && data[0]?.restaurantList && data[0]?.restaurantList[0]?.restaurantCategory === '한식' ? (
                                            <GiBowlOfRice size={30} />
                                        ) : data && data[0]?.restaurantList && data[0]?.restaurantList[0]?.restaurantCategory === '카페/베이커리' ? (
                                            <GiCoffeeCup size={30} />
                                        ) : data && data[0]?.restaurantList && data[0]?.restaurantList[0]?.restaurantCategory === '세계음식' ? (
                                            <GiHamburger size={30} />
                                        ) : data && data[0]?.restaurantList && data[0]?.restaurantList[0]?.restaurantCategory === '중식' ? (
                                            <GiNoodles size={30} />
                                        ) : data && data[0]?.restaurantList && data[0]?.restaurantList[0]?.restaurantCategory === '뷔페' ? (
                                            <GiWorld size={30} />
                                        ) : data && data[0]?.restaurantList && data[0]?.restaurantList[0]?.restaurantCategory === '일식' ? (
                                            <GiSushis size={30} />
                                        ) : data && data[0]?.restaurantList && data[0]?.restaurantList[0]?.restaurantCategory === '치킨/주점' ? (
                                            <GiBeerStein size={30} />
                                        ) : (
                                            <GiForkKnifeSpoon size={30} />
                                        )}
                                    </div>
                                    <h2 className="h3 text-white fw-bolder" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>{data && data[0]?.restaurantList && data[0]?.restaurantList[0]?.title}</h2>
                                    <p className="mb-0 text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>{data && data[0]?.restaurantList && data[0]?.restaurantList[0]?.newAddress}</p>
                                </div>
                                </div>
                                <div style={{backgroundImage: `url(${data && data[1]?.restaurantList && data[1]?.restaurantList[0]?.fileName})`,   backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'top-center',
                                    backgroundSize: '100% 100%', border: '5px solid white'
                                }}>
                                    <div className="col mb-5 h-100" >
                                        <div className="feature text-white rounded-3 mt-3 mb-3">{data && data[0]?.restaurantList && data[0]?.restaurantList[0]?.category === '양식' ? (
                                            <FaUtensils size={30} />
                                        ) : data && data[1]?.restaurantList && data[1]?.restaurantList[0]?.restaurantCategory === '한식' ? (
                                            <GiBowlOfRice size={30} />
                                        ) : data && data[1]?.restaurantList && data[1]?.restaurantList[0]?.restaurantCategory === '카페/베이커리' ? (
                                            <GiCoffeeCup size={30} />
                                        ) : data && data[1]?.restaurantList && data[1]?.restaurantList[0]?.restaurantCategory === '세계음식' ? (
                                            <GiHamburger size={30} />
                                        ) : data && data[1]?.restaurantList && data[1]?.restaurantList[0]?.restaurantCategory === '중식' ? (
                                            <GiNoodles size={30} />
                                        ) : data && data[1]?.restaurantList && data[1]?.restaurantList[0]?.restaurantCategory === '뷔페' ? (
                                            <GiWorld size={30} />
                                        ) : data && data[1]?.restaurantList && data[1]?.restaurantList[0]?.restaurantCategory === '일식' ? (
                                            <GiSushis size={30} />
                                        ) : data && data[1]?.restaurantList && data[1]?.restaurantList[0]?.restaurantCategory === '치킨/주점' ? (
                                            <GiBeerStein size={30} />
                                        ) : (
                                            <GiForkKnifeSpoon size={30} />
                                        )}</div>
                                        <h2 className="h3 text-white fw-bolder" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>{data && data[1]?.restaurantList && data[1]?.restaurantList[0]?.title}</h2>
                                        <p className="mb-0 text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>{data && data[1]?.restaurantList && data[1]?.restaurantList[0]?.newAddress}</p>
                                    </div>
                                </div>
                                <div style={{backgroundImage: `url(${data && data[2]?.restaurantList && data[2]?.restaurantList[0]?.fileName})`,   backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'top-center',
                                    backgroundSize: '100% 100%', border: '5px solid white'
                                }}>
                                    <div className="col mb-5 h-100" >
                                        <div className="feature text-white rounded-3 mt-3 mb-3">{data && data[0]?.restaurantList && data[0]?.restaurantList[0]?.category === '양식' ? (
                                            <FaUtensils size={30} />
                                        ) : data && data[2]?.restaurantList && data[2]?.restaurantList[0]?.restaurantCategory === '한식' ? (
                                            <GiBowlOfRice size={30} />
                                        ) : data && data[2]?.restaurantList && data[2]?.restaurantList[0]?.restaurantCategory === '카페/베이커리' ? (
                                            <GiCoffeeCup size={30} />
                                        ) : data && data[2]?.restaurantList && data[2]?.restaurantList[0]?.restaurantCategory === '세계음식' ? (
                                            <GiHamburger size={30} />
                                        ) : data && data[2]?.restaurantList && data[2]?.restaurantList[0]?.restaurantCategory === '중식' ? (
                                            <GiNoodles size={30} />
                                        ) : data && data[2]?.restaurantList && data[2]?.restaurantList[0]?.restaurantCategory === '뷔페' ? (
                                            <GiWorld size={30} />
                                        ) : data && data[2]?.restaurantList && data[2]?.restaurantList[0]?.restaurantCategory === '일식' ? (
                                            <GiSushis size={30} />
                                        ) : data && data[2]?.restaurantList && data[2]?.restaurantList[0]?.restaurantCategory === '치킨/주점' ? (
                                            <GiBeerStein size={30} />
                                        ) : (
                                            <GiForkKnifeSpoon size={30} />
                                        )}</div>
                                        <h2 className="h3 text-white fw-bolder" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>{data && data[2]?.restaurantList && data[2]?.restaurantList[0]?.title}</h2>
                                        <p className="mb-0 text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>{data && data[1]?.restaurantList && data[1]?.restaurantList[0]?.newAddress}</p>
                                    </div>
                                </div>
                                <div style={{backgroundImage: `url(${data && data[3]?.restaurantList && data[3]?.restaurantList[0]?.fileName})`,   backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'top-center',
                                    backgroundSize: '100% 100%', border: '5px solid white'
                                }}>
                                    <div className="col mb-5 h-100" >
                                        <div className="feature text-white rounded-3 mt-3 mb-3">{data && data[0]?.restaurantList && data[0]?.restaurantList[0]?.category === '양식' ? (
                                            <FaUtensils size={30} />
                                        ) : data && data[3]?.restaurantList && data[3]?.restaurantList[0]?.restaurantCategory === '한식' ? (
                                            <GiBowlOfRice size={30} />
                                        ) : data && data[3]?.restaurantList && data[3]?.restaurantList[0]?.restaurantCategory === '카페/베이커리' ? (
                                            <GiCoffeeCup size={30} />
                                        ) : data && data[3]?.restaurantList && data[3]?.restaurantList[0]?.restaurantCategory === '세계음식' ? (
                                            <GiHamburger size={30} />
                                        ) : data && data[3]?.restaurantList && data[3]?.restaurantList[0]?.restaurantCategory === '중식' ? (
                                            <GiNoodles size={30} />
                                        ) : data && data[3]?.restaurantList && data[3]?.restaurantList[0]?.restaurantCategory === '뷔페' ? (
                                            <GiWorld size={30} />
                                        ) : data && data[3]?.restaurantList && data[3]?.restaurantList[0]?.restaurantCategory === '일식' ? (
                                            <GiSushis size={30} />
                                        ) : data && data[3]?.restaurantList && data[3]?.restaurantList[0]?.restaurantCategory === '치킨/주점' ? (
                                            <GiBeerStein size={30} />
                                        ) : (
                                            <GiForkKnifeSpoon size={30} />
                                        )}</div>
                                        <h2 className="h3 text-white fw-bolder" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>{data && data[3]?.restaurantList && data[3]?.restaurantList[0]?.title}</h2>
                                        <p className="mb-0 text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>{data && data[1]?.restaurantList && data[1]?.restaurantList[0]?.newAddress}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-5 border-bottom" id="features">
                <div className="container px-5 my-5">
                    <div className="row gx-5">
                        <div className="col-lg-0 mb-5 mb-lg-5"><h2 className="fw-bolder mb-0">A better way to start
                            building.</h2></div>
                        <div className="col-lg-3 mb-5 mb-lg-0" style={{backgroundImage: `url(${data && data[0]?.hotplacesList && data[0]?.hotplacesList[0]?.fileName})`,   backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'top-center',
                            backgroundSize: '100% 100%', border: '5px solid white'
                        }}>
                            <div className="feature text-white fw-bolder mt-3 mb-3" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>{data && data[0]?.hotplacesList && data[0]?.hotplacesList[0]?.subway}역</div>
                            <h2 className="h3 text-white fw-bolder mt-3 mb-3" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>{data && data[0]?.hotplacesList && data[0]?.hotplacesList[0]?.title}</h2>
                            <p className="mb-0 text-white mt-3 mb-3" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>{data && data[0]?.hotplacesList && data[0]?.hotplacesList[0]?.address}</p>
                            <a className="text-white mt-3 mb-3" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }} href="#!">
                                더보기
                                <BsArrowRightShort size={50} />
                            </a>
                        </div>
                        <div className="col-lg-3 mb-5 mb-lg-0" style={{backgroundImage: `url(${data && data[1]?.hotplacesList && data[1]?.hotplacesList[0]?.fileName})`,   backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'top-center',
                            backgroundSize: '100% 100%', border: '5px solid white'
                        }}>
                            <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i
                                className="bi bi-collection"></i></div>
                            <h2 className="h3 text-white fw-bolder" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>{data && data[1]?.hotplacesList && data[1]?.hotplacesList[0]?.title}</h2>
                            <p className="mb-0 text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>{data && data[1]?.hotplacesList && data[1]?.hotplacesList[0]?.address}</p>
                            <a className="text-decoration-none" href="#!">
                                Call to action
                                <i className="bi bi-arrow-right"></i>
                            </a>
                        </div>
                        <div className="col-lg-3 mb-5 mb-lg-0" style={{backgroundImage: `url(${data && data[2]?.hotplacesList && data[2]?.hotplacesList[0]?.fileName})`,   backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'top-center',
                            backgroundSize: '100% 100%', border: '5px solid white'
                        }}>
                            <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i
                                className="bi bi-collection"></i></div>
                            <h2 className="h3 text-white fw-bolder" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>{data && data[2]?.hotplacesList && data[2]?.hotplacesList[0]?.title}</h2>
                            <p className="mb-0 text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>{data && data[2]?.hotplacesList && data[2]?.hotplacesList[0]?.address}</p>
                            <a className="text-decoration-none" href="#!">
                                Call to action
                                <i className="bi bi-arrow-right"></i>
                            </a>
                        </div>
                        <div className="col-lg-3 mb-5 mb-lg-0" style={{backgroundImage: `url(${data && data[3]?.hotplacesList && data[3]?.hotplacesList[0]?.fileName})`,   backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'top-center',
                            backgroundSize: '100% 100%', border: '5px solid white'
                        }}>
                            <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i
                                className="bi bi-collection"></i></div>
                            <h2 className="h3 text-white fw-bolder" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>{data && data[3]?.hotplacesList && data[3]?.hotplacesList[0]?.title}</h2>
                            <p className="mb-0 text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>{data && data[3]?.hotplacesList && data[3]?.hotplacesList[0]?.address}</p>
                            <a className="text-decoration-none" href="#!">
                                Call to action
                                <i className="bi bi-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-5">
                <div className="container px-5 my-5">
                    <div className="row gx-5 justify-content-center">
                        <div className="col-lg-8 col-xl-6">
                            <div className="text-center">
                                <h2 className="fw-bolder">From our blog</h2>
                                <p className="lead fw-normal text-muted mb-5">Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Eaque fugit ratione dicta mollitia. Officiis ad.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row gx-5">
                        <div className="col-lg-4 mb-5">
                            <div className="card h-100 shadow border-0">
                                <img className="card-img-top" src="https://dummyimage.com/600x350/ced4da/6c757d"
                                     alt="..."/>
                                <div className="card-body p-4">
                                    <div className="badge bg-primary bg-gradient rounded-pill mb-2">News</div>
                                    <a className="text-decoration-none link-dark stretched-link" href="#!"><h5
                                        className="card-title mb-3">Blog post title</h5></a>
                                    <p className="card-text mb-0">Some quick example text to build on the card title and
                                        make up the bulk of the card's content.</p>
                                </div>
                                <div className="card-footer p-4 pt-0 bg-transparent border-top-0">
                                    <div className="d-flex align-items-end justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <img className="rounded-circle me-3"
                                                 src="https://dummyimage.com/40x40/ced4da/6c757d" alt="..."/>
                                            <div className="small">
                                                <div className="fw-bold">Kelly Rowan</div>
                                                <div className="text-muted">March 12, 2023 &middot; 6 min read</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-5">
                            <div className="card h-100 shadow border-0">
                                <img className="card-img-top" src="https://dummyimage.com/600x350/adb5bd/495057"
                                     alt="..."/>
                                <div className="card-body p-4">
                                    <div className="badge bg-primary bg-gradient rounded-pill mb-2">Media</div>
                                    <a className="text-decoration-none link-dark stretched-link" href="#!"><h5
                                        className="card-title mb-3">Another blog post title</h5></a>
                                    <p className="card-text mb-0">This text is a bit longer to illustrate the adaptive
                                        height of each card. Some quick example text to build on the card title and make
                                        up the bulk of the card's content.</p>
                                </div>
                                <div className="card-footer p-4 pt-0 bg-transparent border-top-0">
                                    <div className="d-flex align-items-end justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <img className="rounded-circle me-3"
                                                 src="https://dummyimage.com/40x40/ced4da/6c757d" alt="..."/>
                                            <div className="small">
                                                <div className="fw-bold">Josiah Barclay</div>
                                                <div className="text-muted">March 23, 2023 &middot; 4 min read</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-5">
                            <div className="card h-100 shadow border-0">
                                <img className="card-img-top" src="https://dummyimage.com/600x350/6c757d/343a40"
                                     alt="..."/>
                                <div className="card-body p-4">
                                    <div className="badge bg-primary bg-gradient rounded-pill mb-2">News</div>
                                    <a className="text-decoration-none link-dark stretched-link" href="#!"><h5
                                        className="card-title mb-3">The last blog post title is a little bit longer than
                                        the others</h5></a>
                                    <p className="card-text mb-0">Some more quick example text to build on the card
                                        title and make up the bulk of the card's content.</p>
                                </div>
                                <div className="card-footer p-4 pt-0 bg-transparent border-top-0">
                                    <div className="d-flex align-items-end justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <img className="rounded-circle me-3"
                                                 src="https://dummyimage.com/40x40/ced4da/6c757d" alt="..."/>
                                            <div className="small">
                                                <div className="fw-bold">Evelyn Martinez</div>
                                                <div className="text-muted">April 2, 2023 &middot; 10 min read</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <aside className="bg-primary bg-gradient rounded-3 p-4 p-sm-5 mt-5">
                        <div
                            className="d-flex align-items-center justify-content-between flex-column flex-xl-row text-center text-xl-start">
                            <div className="mb-4 mb-xl-0">
                                <div className="fs-3 fw-bold text-white">New products, delivered to you.</div>
                                <div className="text-white-50">Sign up for our newsletter for the latest updates.</div>
                            </div>
                            <div className="ms-xl-4">
                                <div className="input-group mb-2">
                                    <input className="form-control" type="text" placeholder="Email address..."
                                           aria-label="Email address..." aria-describedby="button-newsletter"/>
                                    <button className="btn btn-outline-light" id="button-newsletter" type="button">Sign
                                        up
                                    </button>
                                </div>
                                <div className="small text-white-50">We care about privacy, and will never share your
                                    data.
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
        <script src="js/scripts.js"></script>
        </div>

    )
}

export default Main;