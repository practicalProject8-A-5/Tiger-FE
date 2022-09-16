// eslint-disable-next-line

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import KakaoMapDetail from "./KakaoMapDetail";
import email from "../../assets/email.jpg";
import phone from "../../assets/phone.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Scrollbar } from "swiper";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { __vehicleDetail } from "../../redux/modules/vehicleDetail";

const VehicleDetailLeft = () => {
  const dispatch = useDispatch();

  const id = useParams();
  const vId = parseInt(id.id);

  // get response for vehicle info
  const vehicleDates = useSelector(
    (state) => state.vehicleDetailSlice.vehicleDates
  );
  // console.log(vehicleDates);

  const vehicleDetails = useSelector(
    (state) => state.vehicleDetailSlice.vehicleDetails
  );
  // console.log(vehicleDetails);

  const startDate = new URL(window.location.href).searchParams.get("startDate");
  const endDate = new URL(window.location.href).searchParams.get("endDate");

  // console.log(startDate);
  // console.log(endDate);

  useEffect(() => {
    dispatch(__vehicleDetail({ vId, startDate, endDate }));
  }, [dispatch, id]);

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

  // // const memberInfo = useSelector((state) => state.memberSlice.userInfo);
  // // console.log(memberInfo)

  SwiperCore.use([Navigation, Scrollbar]);

  return (
    <>
      <StNewSwiper
        className="imageSwiperContainer"
        centeredSlides={true}
        spaceBetween={8}
        slidesPerView={1}
        scrollbar={{ draggable: true, dragSize: 24 }}
        navigation={true}>
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
          <h1>
            <span>
              {vehicleDetails.vbrand} <span>{vehicleDetails.vname}</span>
            </span>
          </h1>
        </StVehicleInfoTitleWrapper>
        <StVehicleInfoLocationWrapper>
          <p>{vehicleDetails.location}</p>
        </StVehicleInfoLocationWrapper>
        <StVehicleInfoContentsWrapper>
          <h1>차량정보</h1>
          <table border="1" cellSpacing="5" cellPadding="10">
            {/* <col style={styleCol} />
            <col style={styleCol} />
            <col style={styleCol} />
            <col style={styleCol} /> */}
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
          {/* <div className="infoWrapper_desc">
            <div>
              <p>렌터 설명란</p>
            </div>
          </div> */}
        </StRenterInfoWrapper>
        <KakaoMapDetail vehicleDetails={vehicleDetails} />
      </StVehicleInfoContainer>
    </>
  );
};

const StNewSwiper = styled(Swiper)`
  position: relative;
  overflow: hidden;
  margin-bottom: 0;
  width: 79%;
  float: left;
  border-radius: 12px;
  .swiper-slide-active {
    /* width: auto !important; */
  }
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
  float: left;
  width: 79%;
`;

const StVehicleInfoTitleWrapper = styled.div`
  h1,
  span {
    margin-top: 29px;
    font-weight: 500;
    font-size: 38px;
    line-height: 52px;
  }
`;

const StVehicleInfoLocationWrapper = styled.div`
  p {
    font-family: 700;
    font-size: 18px;
    line-height: 25px;
    border-bottom: 1px solid #cccccc;
    padding-bottom: 64px;
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
      border: 1px solid black;
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
          background-image: url(${email});
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
