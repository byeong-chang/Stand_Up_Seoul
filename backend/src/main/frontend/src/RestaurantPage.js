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
        setLiked(result.data.restaurantLikeDto?.id > 0);
        console.log(result.data);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);

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
        await axios.get(`/board/restaurant/like/delete/${message.restaurantLikeDto.id}`, {
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
                      {message.restaurantDto && message.restaurantDto.title && (
                          <h2 className="fw-bolder mb-1 me-3">{message.restaurantDto.title}</h2>
                      )}
                      {message.restaurantDto && message.restaurantDto.starRating && (
                      <h2 className="text-info fst-normal mb-2">{Math.round(message.restaurantDto.starRating * 100) / 100}</h2>
                          )}
                      </div>
                      <div className="d-flex flex-wrap align-items-center">
                      {message.restaurantDto && (
                      <span className="text-decoration-none link-dark me-2" style={{ fontSize: '20px' }}>조회수: {message.restaurantDto.clickCount}</span>
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
                          {message.restaurantDto && message.restaurantDto.fileName && (
                              <img className="img-fluid rounded" style={{ objectFit: 'cover', width: '100%', height: '450px' }}
                                   src={message.restaurantDto.fileName} alt="..."/>
                          )}
                        </figure>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <figure className="mb-0">
                        <div id="map" className="rounded" style={{width:'100%', height:'300px'}}></div>
                        {/*<img className="img-fluid rounded" src="https://dummyimage.com/400x400/ced4da/6c757d.jpg"*/}
                        {/*     alt="..." style="max-width: 100%; height: auto;"/>*/}
                      </figure>
                    </div>
                  </div>


                  <section className="mb-5">
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                      {message.restaurantDto && message.restaurantDto.callNumber && (
                          <li className="fs-5 mb-4" style={{ marginBottom: '10px' }}>
                            <span className="text-muted" style={{ marginRight: '20px' }}>전화번호</span>
                            <span>{message.restaurantDto.callNumber}</span>
                          </li>
                      )}
                      {message.restaurantRuntimeDtos && message.restaurantRuntimeDtos.length > 0 && (
                        <li className="fs-5 mb-4" style={{ marginBottom: '10px' }}>
                      <span className="text-muted" style={{ marginRight: '20px' }}>영업시간</span>
                      <span>{message.restaurantRuntimeDtos[0].runTime}</span>
                    </li>
                      )}
                      {message.restaurantBreaktimeDtos && message.restaurantBreaktimeDtos.length > 0 && (
                          <li className="fs-5 mb-4" style={{ marginBottom: '10px' }}>
                            <span className="text-muted" style={{ marginRight: '20px' }}>휴게시간</span>
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
                          <li className="fs-5 mb-4" style={{ marginBottom: '10px' }}>
                            <span className="text-muted" style={{ marginRight: '20px' }}>음식 종류</span>
                            <span>{message.restaurantDto.restaurantCategory}</span>
                          </li>
                      )}
                      {message.restaurantDto && message.restaurantDto.parking && (
                        <li className="fs-5 mb-4" style={{ marginBottom: '10px' }}>
                      <span className="text-muted" style={{ marginRight: '20px' }}>주차</span>
                      <span>{message.restaurantDto.parking}</span>
                    </li>
                      )}
                      {message.restaurantDto && message.restaurantDto.holiday && (
                        <li className="fs-5 mb-4" style={{ marginBottom: '10px' }}>
                      <span className="text-muted" style={{ marginRight: '20px' }}>휴무일</span>
                      <span>{message.restaurantDto.holiday}</span>
                    </li>
                      )}
                      {message.restaurantDto && message.restaurantDto.newAddress && (
                        <li className="fs-5 mb-4" style={{ marginBottom: '10px' }}>
                      <span className="text-muted" style={{ marginRight: '20px' }}>주소</span>
                      <span>{message.restaurantDto.newAddress}</span>
                    </li>
                      )}
                    </ul>
                  </section>
                </article>
                <Comment message={message} id={id}></Comment>
              </div>
            </div>
          </div>
        </section>
      </main>
      </div>


      // <div>
      // {/*// <!-- Product section-->*/}
      // <section className="py-5">
      //   <div className="container px-4 px-lg-5 my-5">
      //     <div className="row gx-4 gx-lg-5 align-items-top">
      //       <div className="col-md-6">
      //         {message.restaurantDto && message.restaurantDto.fileName && (
      //             <img className="card-img-top mb-5 mb-md-0 img-fluid"
      //                  style={{ objectFit: 'cover', width: '100%', height: '600px' }}
      //                                      src={message.restaurantDto.fileName} alt="..."/>
      //         )}
      //       </div>
      //       <div className="col-md-6">
      //         {/*<div className="small mb-1">전화번호: 000-0000-00000</div>*/}
      //         {message.restaurantDto && message.restaurantDto.title && (
      //         <h1 className="display-5 fw-bolder font-monospace">{message.restaurantDto.title}</h1>
      //         )}
      //         <div className="fs-5 mb-4">
      //           {/*<span className="text-decoration-line-through">음식점 종류 ex.주점</span>*/}
      //         </div>
      //         <ul style={{ listStyleType: 'none', padding: 0 }}>
      //           {message.restaurantDto && message.restaurantDto.callNumber && (
      //           <li style={{ marginBottom: '10px' }}>
      //             <strong>전화번호:</strong> {message.restaurantDto.callNumber}
      //           </li>
      //           )}
      //           {message.restaurantRuntimeDtos && message.restaurantRuntimeDtos.length > 0 && (
      //               <li style={{ marginBottom: '10px' }}>
      //                 <strong>영업시간:</strong> {message.restaurantRuntimeDtos[0].runTime}
      //               </li>
      //           )}
      //           {message.restaurantBreaktimeDtos && message.restaurantBreaktimeDtos.length > 0 && (
      //               <li style={{ marginBottom: '10px' }}>
      //                 <strong>휴게시간: </strong>
      //                 <ul style={{ display: 'inline', margin: 0, padding: 0 }}>
      //                   {message.restaurantBreaktimeDtos.map((breaktime, index) => (
      //                       <li key={index} style={{ display: 'inline', listStyleType: 'none' }}>
      //                         {breaktime.breakTime}
      //                         {index !== message.restaurantBreaktimeDtos.length - 1 && ', '}
      //                       </li>
      //                   ))}
      //                 </ul>
      //               </li>
      //           )}
      //           {message.restaurantDto && message.restaurantDto.restaurantCategory && (
      //           <li style={{ marginBottom: '10px' }}>
      //             <strong>음식 종류:</strong> {message.restaurantDto.restaurantCategory}
      //           </li>
      //           )}
      //           {message.restaurantDto && message.restaurantDto.parking && (
      //           <li style={{ marginBottom: '10px' }}>
      //             <strong>주차:</strong> {message.restaurantDto.parking}
      //           </li>
      //           )}
      //           {message.restaurantDto && message.restaurantDto.holiday && (
      //           <li style={{ marginBottom: '10px' }}>
      //             <strong>휴무일:</strong> {message.restaurantDto.holiday}
      //           </li>
      //           )}
      //           {message.restaurantDto && message.restaurantDto.newAddress && (
      //               <li style={{ marginBottom: '10px' }}>
      //                 <strong>주소:</strong> {message.restaurantDto.newAddress}
      //               </li>
      //           )}
      //         </ul>
      //         <div id="map" style={{width:'500px', height:'360px'}}></div>
      //         <button className="btn btn-primary" onClick={handleLike}>
      //           {liked ? <IoHeartSharp /> : <IoHeartOutline />}
      //         </button>
      //         {message.restaurantDto && (
      //             <div className="d-flex text-secondary">
      //               조회수: {message.restaurantDto.clickCount}
      //             </div>
      //         )}
      //       </div>
      //     </div>
      //   </div>
      // </section>
      // {/*  // <!-- Comments section-->*/}
      //   <Comment message={message} id={id}></Comment>
      // {/*// <!-- Bootstrap core JS-->*/}
      // <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
      // {/*// <!-- Core theme JS-->*/}
      // <script src="js/scripts.js"></script>
      // </div>
  );
}

export default RestaurantPage;
