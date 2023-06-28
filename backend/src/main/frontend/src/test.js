import React, { useState, useEffect } from "react";
import { Map, MapMarker, MapTypeId } from "react-kakao-maps-sdk";
import { Link, useNavigate } from 'react-router-dom';

const {kakao} = window;
const Test = (props) => {

    let navigate = useNavigate();

    const [markers, setMarkers] = useState([
        {
            position: {
                lat: 37.5673,
                lng: 126.9785,
            },
        },
    ])

    const handleMapClick = (target, mouseEvent) => {
        const newMarker = {
            position: {
                lat: mouseEvent.latLng.getLat(),
                lng: mouseEvent.latLng.getLng(),
            },
        };

        setMarkers([newMarker]);
        props.setLet(newMarker.position.lat);
        props.setLng(newMarker.position.lng);
        console.log(newMarker.position.lat);
    };

    const Click = () => {
        navigate("/home")
    };


    return (
        <Map // 지도를 표시할 Container
            center={{
                // 지도의 중심좌표
                lat: 37.5673,
                lng: 126.9785,
            }}
            style={{
                // 지도의 크기
                width: "100%",
                height: "100vh",
            }}
            level={3} // 지도의 확대 레벨
            onClick={handleMapClick}
        >
            <MapTypeId type={kakao.maps.MapTypeId.TRAFFIC}/>
            {markers.map((marker, index) => (
                <MapMarker
                    key={`${marker.position.lat}-${marker.position.lng}-${index}`}
                    position={marker.position}
                >
                    <div style={{display: "flex", alignItems: "center", whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis' }}>
                        해당지역으로 검색하시겠습니까?
                        <button
                            className="btn btn-secondary"
                            onClick={Click}
                            // rel="noreferrer"
                        >
                            이동
                        </button>
                    </div>

                </MapMarker>
            ))}

        </Map>
    );
};


export default Test;