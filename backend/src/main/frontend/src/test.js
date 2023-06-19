import {useLocation, useParams} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import axios from 'axios'
const {kakao} = window;

function Test() {

    const { id } = useParams();
    const [message, setMessage] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                const result = await axios.get(`/board/restaurant/2`);
                setMessage(result.data);
            } catch (err) {
                console.log(err);
            }
        }
        getData();
    }, []);

    useEffect(() => {

            const container = document.getElementById('map');
            const options = {
                center: new kakao.maps.LatLng(37.5665, 126.9780),
                level: 3
            };
            const map = new kakao.maps.Map(container, options);

            const markerPosition = new kakao.maps.LatLng(25, 132);

            const marker = new kakao.maps.Marker({
                position: markerPosition,
            });

            marker.setMap(map);

    }, []);
    return(
        <div id="map" style={{width:'500px', height:'330px'}}></div>
    )
}

export default Test;