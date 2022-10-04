![header](https://capsule-render.vercel.app/api?type=waving&text=ta,iger&color=auto&height=200&align=center&animation=scaleIn)
<br>
# C2C 카 쉐어링 중개 플랫폼 - <a href="https://taiger.kr/">타, 이거</a>
## 프로젝트 기간
- 2022.08.26 ~ 2022.10.07
## 팀구성
이름 | 깃허브 주소 | 포지션 
--- | --- | --- 
손성우 | --- | Back-End
정윤혁 | --- | Back-End 
최준우 | --- | Back-End 
심채운 | --- | Front-End
권익현  | --- | Front-End
허지연 | --- | UI/UX 

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

## 그외 라이브러리 🛠
- React-icons
- Redux logger
- React Devtools
- React Hook Form
- React Swiper
- Sass

## 환경설정
```
- npm install --global yarn (yarn을 설치 안했을때)
- yarn install
- yarn start
```

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



