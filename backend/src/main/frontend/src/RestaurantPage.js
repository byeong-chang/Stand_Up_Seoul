import React from 'react';

function RestaurantPage() {
  return (
    <div className="restaurant-container">
      <div className="restaurant-info">
        <h1 className="restaurant-name">레스토랑 이름</h1>
        <div className="restaurant-description">
          <img className="restaurant-image" src="레스토랑 사진 URL" alt="레스토랑 사진" />
          <p className="restaurant-hours">영업시간: 오픈 - 마감</p>
        </div>
      </div>
      <div className="restaurant-menu">
        <h2 className="menu-title">메뉴</h2>
        <div className="menu-items">
          <div className="menu-item">
            <img className="menu-item-image" src="메뉴1 사진 URL" alt="메뉴1 사진" />
            <div className="menu-item-info">
              <h3 className="menu-item-name">메뉴1 이름</h3>
              <p className="menu-item-description">메뉴1 설명</p>
              <p className="menu-item-price">가격: 메뉴1 가격</p>
            </div>
          </div>
          {/* 다른 메뉴 아이템들도 동일하게 추가 */}
          {/* ... */}
        </div>
      </div>
    </div>
  );
}

export default RestaurantPage;
