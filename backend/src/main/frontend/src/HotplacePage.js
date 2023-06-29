import {Link, useLocation, useParams} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import axios from 'axios'
import { Map, MapMarker, MapTypeId } from "react-kakao-maps-sdk";
import CommentHotplace from "./CommentHotplace";
import {IoHeartOutline, IoHeartSharp} from "react-icons/io5";
import Comment from "./Comment";


function HotplacePage(props) {
    const { id } = useParams();
    const [message, setMessage] = useState([]);
    const [liked, setLiked] = useState(false);
    const {kakao} = window;
    useEffect(() => {
        async function getData() {
            try {
                const result = await axios.get(`/board/hotplace/${id}`, {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                });
                setMessage(result.data);
                console.log(result.data);
            } catch (err) {
                console.log(err);
            }
        }
        getData();
    }, []);

    const handleLike = async () => {
        setLiked(!liked); // 좋아요 상태를 반전시킴
        try {
            if (liked) {
                await axios.get(`/board/hotplace/delete/${message.hotplaceLikeDto.id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
            } else {
                // 좋아요 추가 요청 처리
                await axios.get(`/board/hotplace/like/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
            }

            // 좋아요 요청 처리 후에 데이터를 다시 가져옴
            const result = await axios.get(`/board/hotplace/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setMessage(result.data);
            setLiked(!liked);
            console.log(result.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
    <div className="d-flex flex-column">
        <main className="flex-shrink-0">
            <section className="py-5">
                <div className="container px-5 my-5">
                    <div className="row gx-5">
                        <div className="col-lg-3">
                            <div className="d-flex align-items-center mt-lg-5 mb-4">
                                <img className="img-fluid rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg"
                                     alt="..."/>
                                <div className="ms-3">
                                    <div className="fw-bold">{localStorage.getItem('nickname')}</div>
                                    <div className="text-muted">일반회원</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <article>
                                <header className="mb-2 row">
                                    <div className="d-flex flex-wrap align-items-center">
                                        {message.hotplacesDto && message.hotplacesDto.title && (
                                            <h2 className="fw-bolder mb-1 me-3">{message.hotplacesDto.title}</h2>
                                        )}
                                        {/*{message.hotplacesDto && message.hotplacesDto.starRating && (*/}
                                        {/*    <h2 className="text-info fst-normal mb-2">{Math.round(message.restaurantDto.starRating * 100) / 100}</h2>*/}
                                        {/*)}*/}
                                    </div>
                                    <div className="d-flex flex-wrap align-items-center">
                                        {message.hotplacesDto && (
                                            <span className="text-decoration-none link-dark me-2" style={{ fontSize: '20px' }}>조회수: {message.hotplacesDto.clickCount}</span>
                                        )}
                                        <a className="badge link-info">{liked ? (
                                            <IoHeartSharp onClick={handleLike} style={{ fontSize: '30px' }} />
                                        ) : (
                                            <IoHeartOutline onClick={handleLike} style={{ fontSize: '30px' }} />
                                        )}</a>
                                    </div>
                                </header>
                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <div className="pb-100">
                                            <figure className="mb-0">
                                                {message.hotplacesDto && message.hotplacesDto.fileName && (
                                                    <img className="img-fluid rounded" style={{ objectFit: 'cover', width: '100%', height: '450px' }}
                                                         src={message.hotplacesDto.fileName} alt="..."/>
                                                )}
                                            </figure>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-4">
                                        <figure className="mb-0">
                                            {message && message.hotplacesDto && (
                                                <Map className="rounded" // 지도를 표시할 Container
                                                    center={{
                                                        // 지도의 중심좌표
                                                        lat: message.hotplacesDto.mapY,
                                                        lng: message.hotplacesDto.mapX,

                                                    }}
                                                    style={{
                                                        // 지도의 크기
                                                        width:'100%', height:'300px'
                                                    }}
                                                    level={4} // 지도의 확대 레벨
                                                >
                                                    <MapMarker // 마커를 생성합니다
                                                        position={{
                                                            // 마커가 표시될 위치입니다
                                                            lat: message.hotplacesDto.mapY,
                                                            lng: message.hotplacesDto.mapX,
                                                        }}
                                                    />
                                                </Map>
                                            )}
                                        </figure>
                                    </div>
                                </div>


                                <section className="mb-5">
                                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                                        {message.hotplacesDto && message.hotplacesDto.address && (
                                            <li className="fs-5 mb-4" style={{ marginBottom: '10px' }}>
                                                <span className="text-muted" style={{ marginRight: '20px' }}>주소</span>
                                                <span>{message.hotplacesDto.address}</span>
                                            </li>
                                        )}
                                        {message.hotplacesDto && message.hotplacesDto.length > 0 && (
                                            <li className="fs-5 mb-4" style={{ marginBottom: '10px' }}>
                                                <span className="text-muted" style={{ marginRight: '20px' }}>영업시간</span>
                                                <span>{message.hotplacesDto[0].runTime}</span>
                                            </li>
                                        )}
                                        {message.hotplacesDto && message.hotplacesDto.subway && (
                                            <li className="fs-5 mb-4" style={{ marginBottom: '10px' }}>
                                                <span className="text-muted" style={{ marginRight: '20px' }}>근처역</span>
                                                <span>{message.hotplacesDto.subway}</span>
                                            </li>
                                        )}
                                        {message.hotplacesDto && message.hotplacesDto.contentType && (
                                            <li className="fs-5 mb-4" style={{ marginBottom: '10px' }}>
                                                <span className="text-muted" style={{ marginRight: '20px' }}>주차</span>
                                                <span>{message.hotplacesDto.contentType}</span>
                                            </li>
                                        )}
                                    </ul>
                                </section>
                            </article>
                            <CommentHotplace message={message} id={id}></CommentHotplace>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
    );
}

export default HotplacePage;
