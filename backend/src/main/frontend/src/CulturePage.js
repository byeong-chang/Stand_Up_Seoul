import {Link, useLocation, useParams} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import axios from 'axios'
import { Map, MapMarker, MapTypeId } from "react-kakao-maps-sdk";


function CulturePage(props) {
    const { id } = useParams();
    const [message, setMessage] = useState([]);
    const {kakao} = window;
    useEffect(() => {
        async function getData() {
            try {
                const result = await axios.get(`/board/culturalEvent/${id}`, {
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
            <section className="py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="row gx-4 gx-lg-5 align-items-top">
                        <div className="col-md-6">
                            {message && message.mainImage && (
                                <img className="card-img-top mb-5 mb-md-0 img-fluid"
                                     style={{ objectFit: 'cover', width: '100%', height: '600px' }}
                                     src={message.mainImage} alt="..."/>
                            )}
                        </div>
                        <div className="col-md-6">
                            {message && message.title && (
                                <h1 className="display-5 fw-bolder">{message.title}</h1>
                            )}
                            <div className="fs-5 mb-4">
                            </div>
                            <ul style={{ listStyleType: 'none', padding: 0 }}>
                                {message && message.codeName && (
                                    <li style={{ marginBottom: '10px' }}>
                                        <strong>분류:</strong> {message.codeName}
                                    </li>
                                )}
                                {message && message.useTarget && (
                                    <li style={{ marginBottom: '10px' }}>
                                        <strong>연령:</strong> {message.useTarget}
                                    </li>
                                )}
                                {message && message.useFee && (
                                    <li style={{ marginBottom: '10px' }}>
                                        <strong>가격:</strong> {message.useFee}
                                    </li>
                                )}
                                {message && message.place && (
                                    <li style={{ marginBottom: '10px' }}>
                                        <strong>장소:</strong> {message.place}
                                    </li>
                                )}
                                {message && message.startDate && (
                                    <li style={{ marginBottom: '10px' }}>
                                        <strong>기간:</strong> {message.startDate.substring(0, 10)} ~ {message.endDate.substring(0, 10)}
                                    </li>
                                )}
                                {message && message.orgLink && (
                                    <li style={{ marginBottom: '10px' }}>
                                        <strong>자세히보기:</strong> <Link to={`${message.orgLink}`}>{message.orgLink}</Link>
                                    </li>
                                )}
                            </ul>
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
                        </div>
                    </div>
                </div>
            </section>
            {/*// <!-- Bootstrap core JS-->*/}
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
            {/*// <!-- Core theme JS-->*/}
            <script src="js/scripts.js"></script>
        </div>
    );
}

export default CulturePage;
