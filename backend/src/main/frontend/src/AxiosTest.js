import React, {useState, useEffect} from "react";
import axios from "axios";

function AxiosTest(){
    const[message, setMessage] = useState([]);

    useEffect(() => {
        fetch("/live/home")
            .then(response => response.json())
            .then(response => {
                setMessage(response);
            });
    },[])
    return(
        // <div>
        //     {Object.keys(message).map(key => (
        //         <div key={key}>
        //             {/*<h2>Object Key: {key}</h2>*/}
        //             {/*<h3>Place: {message[key].place.areaName}</h3>*/}
        //             {/*<p>Population: {message[key].population.id}</p>*/}
        //             {message[key].restaurantList.map((restaurant, index) => (
        //                 <p key={index}>Restaurant Image: <img src={restaurant.fileName} alt="Restaurant" /></p>
        //             ))}
        //             {/* 추가적인 데이터 출력을 위한 코드 작성 */}
        //         </div>
        //     ))}
        //     {Object.keys(message).map(key => (
        //         <div key={key}>
        //         <div key={message[key].restaurant.id}>
        //             <img src={message[key].fileName} alt={message[key].title} />
        //         </div>
        //         </div>
        //     ))}
        // </div>

        <div>
            {Object.keys(message).map(key => (
                <div key={key}>
                    {/*<h2>Object Key: {key}</h2>*/}
                    {/*<h3>Place: {message[key].place.areaName}</h3>*/}
                    {/*<p>Population: {message[key].population.id}</p>*/}
                    {message[key].restaurantList.map((restaurant, index) => (
                        <p key={`${key}-${index}`}>Restaurant Image: <img src={restaurant.fileName} alt="Restaurant" /></p>
                    ))}
                    {/* 추가적인 데이터 출력을 위한 코드 작성 */}
                </div>
            ))}
        </div>

    )
}

export default AxiosTest;