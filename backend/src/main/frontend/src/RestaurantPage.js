import {Link, useLocation, useParams} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import axios from 'axios'
import Comment from "./Comment";
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';
import Banner from "./Banner";
import Header from "./Header";
import {useNavigate} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation, Pagination} from "swiper";

const {kakao} = window;

// function SwiperLiveFood({ message }) {
//   return (
//       <Swiper
//           modules={[Navigation, Pagination, Autoplay]}
//           spaceBetween={30}
//           slidesPerView={3}
//           // pagination={{ clickable: true }}
//           // navigation={true}
//           className="container px-5"
//           style={{ width: "130%", paddingBottom: '20px'  }}
//           autoplay={{ delay: 2300, disableOnInteraction: false }}
//       >
//         {Object.keys(message).map((key) =>
//             message[key].restaurantList.map((restaurant, index) => (
//                 <SwiperSlide key={`${key}-${index}`}>
//                   <Link to={`/restaurant/${restaurant.id}`} style={{ textDecoration: 'none', color: 'black' }}>
//                     <div className="col mb-6 h-100 rounded-3" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
//                       <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"></div>
//                       <div className="image-container">
//                         <img className="img-fluid rounded-3 my-6" src={restaurant.fileName} alt="..." />
//                       </div>
//                       <h5 className="fw-bolder mt-3" style={{ paddingLeft: '20px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{restaurant.title}</h5>
//                       <p className="card-text mb-0" style={{ paddingLeft: '20px' }}>{restaurant.restaurantCategory}</p>
//                     </div>
//                   </Link>
//                 </SwiperSlide>
//             ))
//         )}
//       </Swiper>
//   );
// }

function RestaurantPage(props) {
  const { id } = useParams();
  const [message, setMessage] = useState([]);
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    async function getData() {
      try {
        const result = await axios.get(`/board/restaurant/${id}`, {
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

  // const handleLike = () => {
  //   setLiked(!liked); // 좋아요 상태를 반전시킴
  //   // 좋아요 상태에 따라 서버로 요청을 보낼 수 있음
  //   if (liked) {
  //     axios.get(`/board/restaurant/like/delete/${id}`, {
  //       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  //     });
  //   }
  //    else {
  //     // 좋아요 추가 요청 처리
  //     axios.get(`/board/restaurant/like/${id}`, null, {
  //     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  //     });
  //   }
  // };

  useEffect(() => {
    if (message.restaurantDto && message.restaurantDto.mapx && message.restaurantDto.mapy) {
      const container = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(message.restaurantDto.mapy, message.restaurantDto.mapx),
        level: 3
      };
      const map = new kakao.maps.Map(container, options);

      const markerPosition = new kakao.maps.LatLng(message.restaurantDto.mapy, message.restaurantDto.mapx);

      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(map);
    }
  }, [message]);

  // 좋아요를누르고 눌린상태면 다시 원래대로 되돌리고 데이터를 다시 가져와서 좋아요개수 줄이거나 늘리고
  const handleLike = async () => {
    setLiked(!liked); // 좋아요 상태를 반전시킴
    try {
      if (liked) {
        await axios.get(`/board/restaurant/like/delete/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      } else {
        // 좋아요 추가 요청 처리
        await axios.get(`/board/restaurant/like/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      }

      // 좋아요 요청 처리 후에 데이터를 다시 가져옴
      const result = await axios.get(`/board/restaurant/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMessage(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <div>
      {/*// <!-- Product section-->*/}
      <section className="py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-top">
            <div className="col-md-6">
              {message.restaurantDto && message.restaurantDto.fileName && (
                  <img className="card-img-top mb-5 mb-md-0 img-fluid"
                       style={{ objectFit: 'cover', width: '100%', height: '600px' }}
                                           src={message.restaurantDto.fileName} alt="..."/>
              )}
            </div>
            <div className="col-md-6">
              {/*<div className="small mb-1">전화번호: 000-0000-00000</div>*/}
              {message.restaurantDto && message.restaurantDto.title && (
              <h1 className="display-5 fw-bolder">{message.restaurantDto.title}</h1>
              )}
              <div className="fs-5 mb-4">
                {/*<span className="text-decoration-line-through">음식점 종류 ex.주점</span>*/}
              </div>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {message.restaurantDto && message.restaurantDto.callNumber && (
                <li style={{ marginBottom: '10px' }}>
                  <strong>전화번호:</strong> {message.restaurantDto.callNumber}
                </li>
                )}
                {message.restaurantRuntimeDtos && message.restaurantRuntimeDtos.length > 0 && (
                    <li style={{ marginBottom: '10px' }}>
                      <strong>영업시간:</strong> {message.restaurantRuntimeDtos[0].runTime}
                    </li>
                )}
                {message.restaurantBreaktimeDtos && message.restaurantBreaktimeDtos.length > 0 && (
                    <li style={{ marginBottom: '10px' }}>
                      <strong>휴게시간: </strong>
                      <ul style={{ display: 'inline', margin: 0, padding: 0 }}>
                        {message.restaurantBreaktimeDtos.map((breaktime, index) => (
                            <li key={index} style={{ display: 'inline', listStyleType: 'none' }}>
                              {breaktime.breakTime}
                              {index !== message.restaurantBreaktimeDtos.length - 1 && ', '}
                            </li>
                        ))}
                      </ul>
                    </li>
                )}
                {message.restaurantDto && message.restaurantDto.restaurantCategory && (
                <li style={{ marginBottom: '10px' }}>
                  <strong>음식 종류:</strong> {message.restaurantDto.restaurantCategory}
                </li>
                )}
                {message.restaurantDto && message.restaurantDto.parking && (
                <li style={{ marginBottom: '10px' }}>
                  <strong>주차:</strong> {message.restaurantDto.parking}
                </li>
                )}
                {message.restaurantDto && message.restaurantDto.holiday && (
                <li style={{ marginBottom: '10px' }}>
                  <strong>휴무일:</strong> {message.restaurantDto.holiday}
                </li>
                )}
                {message.restaurantDto && message.restaurantDto.newAddress && (
                    <li style={{ marginBottom: '10px' }}>
                      <strong>주소:</strong> {message.restaurantDto.newAddress}
                    </li>
                )}
              </ul>
              <div id="map" style={{width:'500px', height:'360px'}}></div>
              <button className="btn btn-primary" onClick={handleLike}>
                {liked ? <IoHeartSharp /> : <IoHeartOutline />}
              </button>
              {message.restaurantDto && (
                  <div className="d-flex text-secondary">
                    조회수: {message.restaurantDto.clickCount}
                  </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/*  // <!-- Comments section-->*/}
        <Comment message={message} id={id}></Comment>
      {/*// <!-- Bootstrap core JS-->*/}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
      {/*// <!-- Core theme JS-->*/}
      <script src="js/scripts.js"></script>
      </div>
  );
}

export default RestaurantPage;
