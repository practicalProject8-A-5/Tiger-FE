// eslint-disable-next-line

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import KakaoMapDetail from "./KakaoMapDetail";
import emails from "../../assets/email.jpg";
import phone from "../../assets/phone.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Scrollbar } from "swiper";
import { __vehicleDetail } from "../../redux/modules/vehicleDetail";
import like from "../../assets/Love.png";
import liked from "../../assets/liked.png";
import { __isLike } from "../../redux/modules/likeSlice";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { options } from "../../redux/modules/vehicleDetail";
import { FaStar, FaRegStar } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";

const VehicleDetailLeft = () => {
  const email = localStorage.getItem("email");
  console.log(email);
  const dispatch = useDispatch();

  const id = useParams();
  const vId = parseInt(id.id);

  // get response for vehicle info
  const vehicleDetails = useSelector(
    (state) => state.vehicleDetailSlice.vehicleDetails
  );
  console.log(vehicleDetails);

  const startDate = new URL(window.location.href).searchParams.get("startDate");
  const endDate = new URL(window.location.href).searchParams.get("endDate");

  useEffect(() => {
    dispatch(__vehicleDetail({ vId, startDate, endDate }));
    return () => {
      dispatch(options());
    };
  }, [dispatch, id]);

  const [isLike, setIsLike] = useState(vehicleDetails.heart);
  console.log(isLike);
  console.log(vehicleDetails.heart);

  const likeClickHandler = () => {
    dispatch(__isLike(vehicleDetails.vid));
    // console.log("222");
    setIsLike(!isLike);
  };

  useEffect(() => {
    // console.log(list.heart);
    setIsLike(vehicleDetails.heart);
  }, [vehicleDetails]);

  const styleTh = {
    width: "180px",
    height: "41px",
    borderTop: "2px solid #CCCCCC",
    borderBottom: "2px solid #CCCCCC",
    lineHeight: "41px",
    backgroundColor: "#F2F2F2",
  };
  const styleTd = {
    width: "249px",
    height: "41px",
    borderTop: "2px solid #CCCCCC",
    borderBottom: "2px solid #CCCCCC",
    textAlign: "center",
    lineHeight: "41px",
  };

  SwiperCore.use([Navigation, Scrollbar]);

  return (
    <>
      <StNewSwiper
        className="imageSwiperContainer"
        centeredSlides={true}
        spaceBetween={8}
        slidesPerView={1}
        scrollbar={{ draggable: true, dragSize: 24 }}
        navigation={true}
      >
        {vehicleDetails.imageList &&
          vehicleDetails.imageList.map((image, i) => {
            return (
              <SwiperSlide className="image" key={i}>
                <img src={image} alt="imageSlide" />
              </SwiperSlide>
            );
          })}
      </StNewSwiper>
      <StVehicleInfoContainer>
        <StVehicleInfoTitleWrapper>
          <div className="title">
            {vehicleDetails.vbrand}
            {vehicleDetails.vname}
          </div>
        </StVehicleInfoTitleWrapper>
        <StVehicleInfoLocationWrapper>
          <div className="locationTitle">
            <FaStar className="location_star_ico" />
            <span className="location_num">4.12</span>
            <span className="location_comment">후기 24개</span>
            <p>{vehicleDetails.location}</p>
            {email ? (
              isLike === true ? (
                <span className="heart" onClick={likeClickHandler}>
                  <img src={liked} alt="liked" />
                </span>
              ) : (
                <span className="heart" onClick={likeClickHandler}>
                  <img src={like} alt="liked" />
                </span>
              )
            ) : (
              <span className="heart" style={{ display: "none" }}></span>
            )}
          </div>
        </StVehicleInfoLocationWrapper>
        <StVehicleInfoContentsWrapper>
          <h1>차량정보</h1>
          <table border="1" cellSpacing="5" cellPadding="10">
            <tbody>
              <tr>
                <th style={styleTh}>연식</th>
                <td style={styleTd}>{vehicleDetails.years}</td>
                <th style={styleTh}>연료</th>
                <td style={styleTd}>{vehicleDetails.fuelType}</td>
              </tr>
              <tr>
                <th style={styleTh}>연비</th>
                <td style={styleTd}>{vehicleDetails.fuelEfficiency}</td>
                <th style={styleTh}>탑승 가능 인원</th>
                <td style={styleTd}>{vehicleDetails.passengers}</td>
              </tr>
              <tr>
                <th style={styleTh}>기어 변속</th>
                <td style={styleTd}>{vehicleDetails.transmission}</td>
                <th style={styleTh}>차 종류</th>
                <td style={styleTd}>{vehicleDetails.type}</td>
              </tr>
            </tbody>
          </table>
          <h1>설명</h1>
          <p>{vehicleDetails.description}</p>
        </StVehicleInfoContentsWrapper>
        <StRenterInfoWrapper>
          <div className="infoWrapper_nickname">
            <h1>Owner 정보</h1>
          </div>
          <div className="infoWrapper_personal">
            <div className="infoWrapper_personal__picture">
              <img src={vehicleDetails.profileImage} alt="" />
            </div>
            <div className="infoWrapper_personal__info">
              <p>{vehicleDetails.oname}</p>
              <div className="infoWrapper_personal__info__wrapper">
                <div className="infoWrapper_personal__info__wrapper__email"></div>
                <p>{vehicleDetails.email}</p>
                <div className="infoWrapper_personal__info__wrapper__phone"></div>
                <p>{vehicleDetails.tel}</p>
              </div>
            </div>
          </div>
        </StRenterInfoWrapper>
        <KakaoMapDetail vehicleDetails={vehicleDetails} />

        <h2 className="review">렌터 리뷰</h2>
        <div className="star_box">
          <div className="star_num">4.0</div>
          <div className="star">
            <FaStar className="star_ico" />
            <FaStar className="star_ico" />
            <FaStar className="star_ico" />
            <FaStar className="star_ico" />
            <FaRegStar className="star_ico_nofill" />
          </div>
        </div>
        <div className="comment_wrap">
          <div className="comment_item">
            <div className="user_img">
              <img src="" alt="" />
            </div>
            <div className="comment_main">
              <div className="comment_main__top">
                <div className="user_name">김렌터</div>
                <span className="user_star">
                  <AiFillStar />
                </span>
                <span className="user_total">4.12</span>
              </div>
              <div className="comment_desc">
                이 차 좋아
                좋아조아조아조앙ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇdddddddddddddddddddsdfsddfs
              </div>
            </div>
            <div className="comment_date">
              <span>2022-09-24</span>
            </div>
          </div>

          <div className="comment_item">
            <div className="user_img">
              <img src="" alt="" />
            </div>
            <div className="comment_main">
              <div className="comment_main__top">
                <div className="user_name">김렌터</div>
                <span className="user_star">
                  <AiFillStar />
                </span>
                <span className="user_total">4.12</span>
              </div>
              <div className="comment_desc">
                이 차 좋아
                좋아조아조아조앙ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇdddddddddddddddddddsdfsddfs
              </div>
            </div>
            <div className="comment_date">
              <span>2022-09-24</span>
            </div>
          </div>

          <div className="comment_item">
            <div className="user_img">
              <img src="" alt="" />
            </div>
            <div className="comment_main">
              <div className="comment_main__top">
                <div className="user_name">김렌터</div>
                <span className="user_star">
                  <AiFillStar />
                </span>
                <span className="user_total">4.12</span>
              </div>
              <div className="comment_desc">
                이 차 좋아
                좋아조아조아조앙ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇdddddddddddddddddddsdfsddfs
              </div>
            </div>
            <div className="comment_date">
              <span>2022-09-24</span>
            </div>
          </div>

          <div className="comment_item">
            <div className="user_img">
              <img src="" alt="" />
            </div>
            <div className="comment_main">
              <div className="comment_main__top">
                <div className="user_name">김렌터</div>
                <span className="user_star">
                  <AiFillStar />
                </span>
                <span className="user_total">4.12</span>
              </div>
              <div className="comment_desc">
                이 차 좋아
                좋아조아조아조앙ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇdddddddddddddddddddsdfsddfs
              </div>
            </div>
            <div className="comment_date">
              <span>2022-09-24</span>
            </div>
          </div>
        </div>
      </StVehicleInfoContainer>
    </>
  );
};

const StNewSwiper = styled(Swiper)`
  width: 79%;
  border-radius: 12px;
  margin: 0 !important;
  .swiper-button-next {
    right: 15px !important;
  }
  img {
    width: 100%;
    height: 429px;
    -o-object-fit: cover;
    object-fit: cover;
    outline: 1px solid rgba(0, 0, 0, 0.05);
    outline-offset: -1px;
    border-radius: 12px;
    object-position: center;
  }
`;

const StVehicleInfoContainer = styled.div`
  display: block;
  /* background-color: skyblue; */
  width: 79%;
  .review {
    font-weight: 600;
    font-size: 20px;
    color: #000000;
    margin: 50px 0 32px 0;
  }
  .star_box {
    display: flex;
    align-items: center;
    margin-bottom: 32px;
    /* background-color: pink; */
    .star_num {
      font-weight: 600;
      font-size: 32px;
      color: #000000;
      margin-right: 20px;
    }
    .star {
      .star_ico {
        font-size: 30px;
        color: #ffb979;
        margin-right: 5px;
      }
      .star_ico_nofill {
        font-size: 30px;
      }
    }
  }
  .comment_wrap {
    width: 100%;
    /* background-color: skyblue; */
    .comment_item {
      /* 임시 */
      width: 830px;
      height: 58px;

      position: relative;
      display: flex;
      border: 1px solid;
      margin-bottom: 30px;
      :nth-last-child(1) {
        margin-bottom: 0;
      }
      .user_img {
        width: 56px;
        height: 56px;
        background-color: pink;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 27px;
        img {
        }
      }
      .comment_main {
        width: calc(100% - 83px);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        /* padding: 5px 0; */
        box-sizing: border-box;
        /* background-color: yellowgreen; */
        .comment_main__top {
          /* background-color: tomato; */
          display: flex;
          align-items: center;
          .user_name {
            font-weight: 500;
            font-size: 18px;
            color: #000000;
            margin-right: 7px;
          }
          .user_star {
            font-size: 15px;
            margin-right: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .user_total {
            font-weight: 700;
            font-size: 18px;
            color: #4d4d4d;
          }
        }
        .comment_desc {
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 300;
          font-size: 18px;
          color: #8b8b8b;
          line-height: 25px;
          /* background-color: pink; */
          /* vertical-align: ; */
        }
      }
      .comment_date {
        position: absolute;
        top: 0;
        right: 0;
        span {
          font-weight: 300;
          font-size: 16px;
          color: #8b8b8b;
        }
      }
    }
  }
`;

const StVehicleInfoTitleWrapper = styled.div`
  /* background-color: tomato; */
  .title {
    margin-top: 29px;
    font-weight: 500;
    font-size: 38px;
    line-height: 52px;
    /* margin-bottom: 20px; */
  }
`;

const StVehicleInfoLocationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  /* background-color: tomato; */
  padding-bottom: 65px;
  border-bottom: 1px solid #cccccc;
  .locationTitle {
    width: 100%;
    line-height: 64px;
    display: flex;
    align-items: center;
    position: relative;
    .location_star_ico {
      font-size: 18px;
      margin-right: 9px;
      color: #ffb979;
    }
    .location_num {
      margin-right: 17px;
      font-weight: 700;
      font-size: 18px;
      color: #000000;
    }
    .location_comment {
      margin-right: 17px;
      text-decoration: underline;
      font-weight: 700;
      font-size: 18px;
      color: #000000;
    }
    p {
      font-family: 700;
      font-size: 18px;
      text-decoration: underline;
      color: #000000;
    }
    .heart {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      cursor: pointer;
      /* background-color: royalblue; */
      img {
        height: 25px;
        width: 25px;
      }
    }
  }
`;

const StVehicleInfoContentsWrapper = styled.div`
  border-bottom: 1px solid #cccccc;
  padding-bottom: 82px;
  h1 {
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
    margin-top: 62px;
    margin-bottom: 34px;
  }
  p {
    padding: 28px 26px;
    box-sizing: border-box;
    border: 1px solid #8b8b8b;
    border-radius: 20px;
  }
`;

const StRenterInfoWrapper = styled.div`
  margin-top: 48px;
  margin-bottom: 80px;
  .infoWrapper_nickname {
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
  }
  .infoWrapper_personal {
    margin-top: 64px;
    display: flex;
    &__picture img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      /* border: 1px solid black; */
      margin-right: 31px;
    }
    &__info {
      display: flex;
      flex-direction: column;
      p {
        margin-bottom: 10px;
      }
      &__wrapper {
        display: flex;
        a {
          text-decoration: underline;
          color: black;
        }
        &__email {
          background-image: url(${emails});
          background-size: contain;
          background-repeat: no-repeat;
          width: 20px;
          height: 20px;
          margin-right: 10px;
          background-position: bottom;
        }
        &__phone {
          background-image: url(${phone});
          background-size: contain;
          background-repeat: no-repeat;
          width: 20px;
          height: 20px;
          margin-right: 10px;
          margin-left: 10px;
          background-position: bottom;
        }
      }
    }

    p {
      font-weight: 500;
      font-size: 18px;
      line-height: 25px;
    }
  }
  .infoWrapper_desc {
    margin-top: 48px;
    margin-bottom: 80px;
    div {
      border: 1px solid #8b8b8b;
      border-radius: 20px;
      width: 840px;
      height: 320px;
      box-sizing: border-box;
      padding: 28px;
      p {
        font-weight: 400;
        font-size: 18px;
        line-height: 25px;
      }
    }
  }
`;

export default VehicleDetailLeft;
