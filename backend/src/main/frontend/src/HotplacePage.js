import {Link, useLocation, useParams} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import axios from 'axios'
import { Map, MapMarker, MapTypeId } from "react-kakao-maps-sdk";
import CommentHotplace from "./CommentHotplace";


function HotplacePage(props) {
    const { id } = useParams();
    const [message, setMessage] = useState([]);
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

    return (
        <div>
            {/*// <!-- Product section-->*/}
            <section className="py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="row gx-4 gx-lg-5 align-items-top">
                        <div className="col-md-6">
                            {message.hotplacesDto && message.hotplacesDto.fileName && (
                                <img className="card-img-top mb-5 mb-md-0 img-fluid"
                                     style={{ objectFit: 'cover', width: '100%', height: '600px' }}
                                     src={message.hotplacesDto.fileName} alt="..."/>
                            )}
                        </div>
                        <div className="col-md-6">
                            {/*<div className="small mb-1">전화번호: 000-0000-00000</div>*/}
                            {message.hotplacesDto && message.hotplacesDto.title && (
                                <h1 className="display-5 fw-bolder">{message.hotplacesDto.title}</h1>
                            )}
                            <div className="fs-5 mb-4">
                                {/*<span className="text-decoration-line-through">음식점 종류 ex.주점</span>*/}
                            </div>
                            <ul style={{ listStyleType: 'none', padding: 0 }}>
                                {message.hotplacesDto && message.hotplacesDto.address && (
                                    <li style={{ marginBottom: '10px' }}>
                                        <strong>주소:</strong> {message.hotplacesDto.address}
                                    </li>
                                )}
                                {message.hotplacesDto && message.hotplacesDto.subway && (
                                    <li style={{ marginBottom: '10px' }}>
                                        <strong>근처역:</strong> {message.hotplacesDto.subway}역
                                    </li>
                                )}
                                {message.hotplacesDto && message.hotplacesDto.contentType && (
                                    <li style={{ marginBottom: '10px' }}>
                                        <strong>종류:</strong> {message.hotplacesDto.contentType}
                                    </li>
                                )}
                            </ul>
                            {/*<div id="map" style={{width:'500px', height:'360px'}}></div>*/}
                            {/*  <div className="d-flex">*/}
                                  {message && message.hotplacesDto && (
                                  <Map // 지도를 표시할 Container
                                      center={{
                                          // 지도의 중심좌표
                                          lat: message.hotplacesDto.mapY,
                                          lng: message.hotplacesDto.mapX,

                                      }}
                                      style={{
                                          // 지도의 크기
                                          width: "500px",
                                          height: "360px",
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
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </section>

            <CommentHotplace message={message} id={id}></CommentHotplace>
            {/*// <!-- Bootstrap core JS-->*/}
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
            {/*// <!-- Core theme JS-->*/}
            <script src="js/scripts.js"></script>
        </div>
    );
}

export default HotplacePage;
