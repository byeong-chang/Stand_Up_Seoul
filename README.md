# Stand_Up_Seoul
Playdata final project - 서울시 지하철 데이터를 사용하여 혼잡도를 분석하여 서비스 제공
## 😊 프로젝트 설명

- **서울시 주요 50 장소 중 혼잡도가 낮은 장소에 위치한 맛집, 놀거리, 문화 관광 정보를 제공 및 추천**하며, 각 **장소별 리뷰** 등 사용자 소통 공간이 있는 웹입니다.
- **현재 기반 추천 페이지,** 서울시 제공 실시간 도시 데이터 API 활용
- **예측 기반 추천 페이지,** 머신러닝 기반 혼잡도 예측 활용
    - 서울교통공사 역별, 시간대별 승,하차 인원 데이터 사용
    - 해당 시간대 주요 장소 주변 지하철역 혼잡도 예측
    - 주요 장소에서 가까운 다수의 지하철역 혼잡도 종합 및 주요 장소 혼잡도 예측

## 👍 팀원별 역할

- **우상욱(팀장)** : **데이터엔지니어링** + 머신러닝, 백엔드 보조
- **김호영** : **데이터 분석**, **머신러닝 +** 데이터엔지니어링 보조
- **민병창** : **백엔드** + 데이터엔지니어링, 머신러닝 보조
- **김민수** : **백엔드** + 데이터엔지니어링, 데이터분석 보조
- **김경목** : **프론트엔드** + 데이터분석 보조

## 데이터 출처
- [서울교통공사_역별 일별 시간대별 승하차인원 정보(CSV)](https://www.data.go.kr/data/15048032/fileData.do)
- [서울시 실시간 도시데이터(주요 50 장소)(OPEN API)](https://data.seoul.go.kr/dataList/OA-21285/F/1/datasetView.do)
- [서울시 문화행사 정보(OPEN API)](https://data.seoul.go.kr/dataList/OA-15486/S/1/datasetView.do)
- [전국 응급실 실시간 데이터(OPEN API)](https://www.data.go.kr/data/15000563/openapi.do)
- [서울시 주요 50장소 유명 맛집, 데이트 코스 크롤링](https://www.mangoplate.com/)
- [날씨 데이터(CSV)](https://data.kma.go.kr/data/grnd/selectAsosRltmList.do?pgmNo=36)
- [[sk open api전체 지하철 혼잡도(경기권 포함)](https://puzzle-skopenapi.readme.io/reference/%ED%86%B5%EA%B3%84%EC%84%B1-%ED%98%BC%EC%9E%A1%EB%8F%84)

## ⚒️ 기술스택(임시)

- **프론트엔드** : HTML, CSS, JavaScript, React, Vue.js, typeScript
- **백엔드** : Spring
- **데이터분석** : Pandas, Scikit-Learn,  Tableau
- **데이터엔지니어링** : Pandas, Selenium, Airflow
- **클라우드** : AWS(S3, EC2, RDS, Redshift)
- **형상관리** : Git, Github
- **커뮤니케이션**: Slack, Notion

## 🎺 기대효과

1. batch성 데이터 스크래핑 및 실시간 데이터 적재(Airflow) 기술 확보
2. 데이터파이프라인 구축 기술 확보
3. 데이터 분석, 머신러닝, 서비스 활용
4. 자연어 기반 딥러닝, 서비스 실제 활용
5. 프론트엔드, 백엔드 웹을 위한 기초 기술 획득
6. 서울시의 안전한 문화 생활을 위한 혼잡도 기반 웹(공공데이터 활용사례 출품 예정)
