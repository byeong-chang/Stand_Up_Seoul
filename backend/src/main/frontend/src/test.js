import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Test() {
    const [location, setLocation] = useState({});

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => console.log(error)
        );
    }, []);

    useEffect(() => {
        if (location.latitude && location.longitude) {
            // 스프링 부트 API 엔드포인트
            const apiUrl = 'http://localhost:8080/live/home';

            // 위치 데이터를 스프링 부트로 전송하는 POST 요청
            axios
                .post(apiUrl, location)
                .then((response) => {
                    console.log('위치 데이터가 성공적으로 전송되었습니다.');
                })
                .catch((error) => {
                    console.error('위치 데이터 전송 중 오류가 발생했습니다:', error);
                });
        }
    }, [location]);

    return (
        <div>
            <h1>Latitude: {location.latitude}</h1>
            <h1>Longitude: {location.longitude}</h1>
        </div>
    );
}

export default Test;
