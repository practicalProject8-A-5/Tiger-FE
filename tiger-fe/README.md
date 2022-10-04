![header](https://capsule-render.vercel.app/api?type=waving&text=ta,iger&color=auto&height=200&align=center&animation=scaleIn)
<br>
# C2C 카 쉐어링 중개 플랫폼 - <a href="https://taiger.kr/">타, 이거</a>
## 프로젝트 기간
- 2022.08.26 ~ 2022.10.07
## 팀구성
이름 | 깃허브 주소 | 포지션 
--- | --- | --- 
손성우 | https://github.com/sungkong | Back-End
정윤혁 | https://github.com/tanibourne | Back-End 
최준우 | https://github.com/gitpher | Back-End 
심채운 | https://github.com/Sim0321 | Front-End
권익현  | https://github.com/kwonih1020 | Front-End
허지연 | yeooon02@gmail.com | UI/UX 

## 아키텍쳐
![서비스 아키텍처](https://user-images.githubusercontent.com/26310384/193829271-8159e1de-0727-4a9f-805b-5aac52cd7aee.png)

## 주요기능 🛠
<div align=center> 
<img src="https://img.shields.io/badge/React-F7DF1E?style=for-the-badge&logo=react&logoColor=#3776AB"/>
<img src="https://img.shields.io/badge/Styled_Components-000000?style=for-the-badge&logo=react&logoColor=#3776AB"/>
<img src="https://img.shields.io/badge/Redux/Toolkit-61DAFB?style=for-the-badge&logo=redux&logoColor=#CA4245"/>
<img src="https://img.shields.io/badge/ReactRouter-F7DF1E?style=for-the-badge&logo=redux&logoColor=#764ABC"/>
<img src="https://img.shields.io/badge/Axios-000000?style=for-the-badge&logo=axios&logoColor=#3776AB"/>
<img src="https://img.shields.io/badge/Javascript-red?style=for-the-badge&logo=javascript&logoColor=black"/>
<img src="https://img.shields.io/badge/HTML5-008000?style=for-the-badge&logo=HTML5&logoColor=#E34F26"/>
<img src="https://img.shields.io/badge/CSS3-blue?style=for-the-badge&logo=css3&logoColor=#1572B6"/>
<img src="https://img.shields.io/badge/Sock.js-black?style=for-the-badge&logo=socket.io&logoColor=#1572B6"/>
<img src="https://img.shields.io/badge/STOMP-61DAFB?style=for-the-badge&logo=stomp&logoColor=#CA4245"/>
<img src="https://img.shields.io/badge/Chart.js-F7DF1E?style=for-the-badge&logo=chart.js&logoColor=#4287f5"/>
<img src="https://img.shields.io/badge/AWS.S3-red?style=for-the-badge&logo=AWS&logoColor=#32a852"/>
<img src="https://img.shields.io/badge/AWS.CLOUDFRONT-000000?style=for-the-badge&logo=CLOUDFRONT&logoColor=#3776AB"/>
<img src="https://img.shields.io/badge/Kakao.Map-blue?style=for-the-badge&logo=kakao&logoColor=#1572B6"/>
</div>

## 그 외 라이브러리 🛠
- React-icons
- Redux logger
- React Devtools
- React Hook Form
- React Swiper
- React Multidate picker
- Sass

## 환경설정
```
- npm install --global yarn (yarn을 설치 안했을때)
- yarn install
- yarn start
```

## 핵심기능
Owner 와 Renter 간에 실시간 채팅, 알림 기능 💬
달력을 이용한 스케줄링 시스템 📅
검색을 이용해 주소 반경 20km안에 있는 차량 검색 기능 🔍
Owner 차량 월간/일간 수익지표 기능 🧮

## 🕹️ 기술적 의사결정
사용기술 | 기술설명 
--- | --- 
Sock.js | 실시간 데이터 통신으로서, 실시간으로 owner 와 renter가 채팅으로 정보 공유가 가능해졌다. 또한 실시간 알림을 통해 답장이 왔는지 알수 있게 되었다.
Redux-Toolkit | 액션타입, 리듀서, 액션 생성 함수, 초기상태를 하나의 함수로 편하게 선언할 수 있고, 불변성 유지를 위해 번거롭게 코드들을 작성하지 않고 유지를 해준다.
Chart.js | 사용자에게 수익을 한눈에 볼 수 있게끔 데이터를 시각화 하였다. 
React-Multidate-Picker | 오너의 편의성을 위해 등록날짜, 예약날짜를 구분하기 위함과 동시에 오너가 한 눈에 볼 수 있게 달력을 사용.
Kakao Map API &  Daum Postcode API | 두 가지 API를 같이 사용한 이유는 우선 kako map api 성능은 google map 다음으로 빠르다. google map은 대한미국에서 사용하기에 적잘하지 않기 때문에 kakao map 을 사용했고, daum postcode api는 카카오 맵과 호환성이 뛰어나고, 우리 서비스상 필요한 상세주소가 다 담겨져 있어서 사용하기 편했다.
Intersection Observer | scroll-height로 계산하여 무한스크롤 사용이 가능하지만, Intersection Observer 를 사용하면 이미 설정한 element가 노출이 되었는지 판단하고 감지가 되어서 이 점을 활용하여 무한스크롤을 구현했다. 불필요한 요청을 줄이고 필요할때만 요청이 가게끔 했다. 그리고 debounce & throttle 같이 추가적으로 코드를 안써도 되고, offsetTop으로 layout에 정확한 값을 구하기 위해 Reflow를 하는데, Intersection Observer를 사용하면 매번 Reflow를 할 필요없다.


## Trouble Shooting

### 이미지 렌더링 속도 최적화
#### Intersection Observer
- Intersection Observer 도입 후, db에 있는 모든 이미지들을 한번에 불러오는게 아니라 서버와 합을 맞춘대로 20장을 먼저 로딩하고, 미리 타겟으로 지정해둔 요소가 화면에 보일때 다음 20장 이미지를 로딩하게끔 설정하였다. 이렇게하면 모든 이미지를 한번에 요청할 필요없이 첫 20장만 먼저 렌더링이 되기 때문에 로딩 시간을 단축하였다. (영상참조)
<a href="https://youtu.be/qP9jnuBVW4w">Intersection Observer 영상</a>

#### Lazy Loading 
Lazy Loading 사용하여 화면에 나타나는 이미지 순으로 렌더링이 되게끔 설정하였습니다. 사용자가 스크롤을 내림으로서 보여지기 시작하는 이미지들이 렌더링이 되기 시작함. 밑에 사진과 (영상 참고).
<a href="https://youtu.be/o-cI2RKYUJ0">Lazy Loading 영상</a>
![mainPage](https://user-images.githubusercontent.com/26310384/193827274-742ab5e0-32cf-4d0c-a4d0-a6bf2c8e1ba3.png)
![mainPage_result](https://user-images.githubusercontent.com/26310384/193827300-f6642040-9bb0-41ee-9368-e98ee41dc289.png)

#### Lighthouse 성능결과
![lighthouse](https://user-images.githubusercontent.com/26310384/193827536-b1ee5061-4999-4e45-a77b-f691c58e7c1e.png)



