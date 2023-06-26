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
                        <h1 className="mt-5 text-white">Stand Up Seoul</h1>
                        <p className="mt-5 text-white-50">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt voluptates rerum eveniet
                            sapiente repellat esse, doloremque quod recusandae deleniti nostrum assumenda vel beatae sed
                            aut modi nesciunt porro quisquam voluptatem.</p>
                        <button className="btn btn-secondary btn-lg" onClick={handleButtonClickStandUpSeoul}>시작하기</button>
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