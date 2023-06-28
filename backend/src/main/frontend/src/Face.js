import React, {useEffect, useState} from "react";
import Header from "./Header";
import {Link, useNavigate} from "react-router-dom";
import './App.css'
import image from "./static/IMG_4653.jpg"
import image2 from "./static/IMG_4660.jpg"
function Face(){

    const [loggedInUser, setLoggedInUser] = useState(null); // 로그인한 사용자

    const navigate = useNavigate();

    useEffect(() => {
        checkLoggedInUser(); // 사용자가 이미 로그인되어 있는지 확인
    }, []);

    const checkLoggedInUser = () => {
        const token = localStorage.getItem('token');

        if (token) {
            // 사용자가 로그인되어 있는 경우
            const username = localStorage.getItem('username'); // 로컬 스토리지 또는 서버에서 사용자 ID 가져오기
            setLoggedInUser({username: username}); // 사용자 ID를 loggedInUser 상태에 설정
        } else {
            // 사용자가 로그인되어 있지 않은 경우
            setLoggedInUser(null);
        }
    };


    const handleButtonClickStandUpSeoul = () => {
        if (loggedInUser) {
            // 사용자가 로그인된 경우
            navigate("/home"); // 원래 경로로 이동
        } else {
            // 사용자가 로그인되지 않은 경우
            navigate("/login"); // 로그인 페이지로 이동
        }
    };

    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        handleRedirect(); // 컴포넌트가 마운트될 때 초기 이미지 설정을 위해 호출
    }, []);

    const handleRedirect = () => {
        const images = [
            // 'https://rare-gallery.com/uploads/posts/340444-Aespa-Kpop-K-pop-Girl-Group-Girls-Karina-Yoo-Ji-Min-.jpg',
            'https://sojoong.joins.com/wp-content/uploads/sites/4/2019/10/bulkkot-3.jpg',
            // `${image}`,
            // `${image2}`
            // 다른 이미지 URL을 추가하세요.
        ];

        const getRandomImage = () => {
            const randomIndex = Math.floor(Math.random() * images.length);
            return images[randomIndex];
        };

        const newImageUrl = getRandomImage();
        setImageUrl(newImageUrl);
    };



    return(
        <div>
        {/*// <!-- Page Content-->*/}
        <section className="bg-image" style={{ backgroundImage: `url("${imageUrl}")`,
                                                backgroundSize: 'cover',
                                                     minHeight:'85vh',
                                                    alignItems:'center',
                                            backgroundPosition:'center'}}>
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5">
                    <div className="col-lg-6">
                        <h1 className="mt-5 text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 5)' }}>Stand Up Seoul</h1>
                        <p className="mt-5 text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 5)' }}>지금까지 서울시에서 발생한 사고로 인한 혼잡도에 대한 관심이 크게 늘어났습니다. 이에 우리는 안전성과 여가·문화 생활을 결합한 종합 정보 제공 웹 서비스를 제공하고 있습니다. 주요 장소에서 발생하는 혼잡 데이터를 수집하고, 데이터 분석과 기계 학습(ML)을 활용하여 신뢰할 수 있는 예측 웹 서비스를 제공하니, 안전하고 편안한 시간을 보내고 싶으신 분들은 저희 서비스를 이용해보세요.</p>
                        <button className="btn btn-outline-light btn-lg px-4" onClick={handleButtonClickStandUpSeoul}>시작하기</button>
                    </div>
                </div>
            </div>
        </section>
        {/*// <!-- Bootstrap core JS-->*/}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
        {/*// <!-- Core theme JS-->*/}
        <script src="js/scripts.js"></script>
        </div>
    )
}

export default Face;